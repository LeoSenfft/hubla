import { PrismaClient, type Prisma, type Sale } from "@prisma/client";
import fs from "fs";
import readline from "readline";

const client = new PrismaClient();

type SaleWithProduct = Prisma.SaleGetPayload<{
  include: {
    product: {
      include: {
        vendor: true;
      };
    };
    user: true;
  };
}>;

export async function readFile(file?: Express.Multer.File) {
  if (!file) {
    throw new Error("Arquivo não encontrado");
  }

  const fileStream = fs.createReadStream(file!.path);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let new_sales = [];

  for await (const line of rl) {
    let type = line[0];
    let saleDate = "";
    let description = "";
    let value = "";
    let vendor = "";

    for (let i = 0; i < line.length; i++) {
      // data
      if (i > 0 && i < 26) {
        saleDate += line[i];
      }

      // descrição
      if (i > 25 && i < 56) {
        description += line[i];
      }

      // valor
      if (i > 55 && i < 66) {
        value += line[i];
      }

      // vendedor
      if (i > 65 && i < 86) {
        vendor += line[i];
      }
    }

    const vendorObj = await client.user.findFirst({
      where: {
        name: vendor,
      },
    });
    if (!vendorObj) {
      return;
    }

    const productObj = await client.product.findFirst({
      where: {
        description: description.trimEnd(),
      },
    });
    if (!productObj) {
      return;
    }

    const payload = {
      typeId: parseInt(type),
      saleDate: new Date(saleDate),
      productId: productObj.id,
      value: parseFloat(value) / 100,
      userId: vendorObj.id,
    };

    new_sales.push(payload);
  }

  const createdSales = await Promise.all(
    new_sales.map((sale) =>
      client.sale.create({
        data: sale,
        include: {
          product: {
            include: {
              vendor: true,
            },
          },
          user: true,
        },
      })
    )
  );

  await Promise.all(
    createdSales.map(async (sale) => {
      await recalculateUserAccount(sale);
    })
  );

  return createdSales;
}

// Função para cálculo
async function recalculateUserAccount(sale: SaleWithProduct) {
  let userToUpdate = sale.product.vendorId;
  let balanceToIncrement = sale.value;

  // Retirada
  if (sale.typeId === 3) {
    balanceToIncrement = sale.value * -1;
  }

  // Depósito na conta do parceiro
  if (sale.typeId === 4) {
    userToUpdate = sale.userId;
  }

  await client.user.update({
    where: { id: userToUpdate },
    data: { balance: { increment: balanceToIncrement } },
  });
}
