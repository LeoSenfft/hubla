import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const client = new PrismaClient();

const load = async () => {
  try {
    console.log("Starting seed...");
    await setUsers();
    await setSaleTypes();
    await setProducts();
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await client.$disconnect();
  }
};
load();

//+++++++++++++++++++++++======FUNCTIONS SEED======+++++++++++++++++++++++++++++++

async function setSaleTypes() {
  try {
    await client.saleTypes.createMany({
      data: [
        {
          id: 1,
          description: "Venda produtor",
          nature: "Entrada",
        },
        {
          id: 2,
          description: "Venda afiliado",
          nature: "Entrada",
        },
        {
          id: 3,
          description: "Comissão paga",
          nature: "Saída",
        },
        {
          id: 4,
          description: "Comissão recebida",
          nature: "Entrada",
        },
      ],
      skipDuplicates: true,
    });

    console.log("Added default sale types");
  } catch (error) {
    console.error("Error in setSaleTypes:", error);
  }
}

async function setUsers() {
  const salt = await bcrypt.genSalt();
  const password = await bcrypt.hash("123456", salt);

  try {
    await client.user.createMany({
      data: [
        {
          id: 1,
          name: "ADMIN",
          balance: 0,
          password,
        },
        {
          id: 2,
          name: "JOSE CARLOS",
          balance: 0,
          password,
        },
        {
          id: 3,
          name: "MARIA CANDIDA",
          balance: 0,
          password,
        },
        {
          id: 4,
          name: "THIAGO OLIVEIRA",
          balance: 0,
          password,
        },
        {
          id: 5,
          name: "ELIANA NOGUEIRA",
          balance: 0,
          password,
        },
        {
          id: 6,
          name: "CARLOS BATISTA",
          balance: 0,
          password,
        },
        {
          id: 7,
          name: "CAROLINA MACHADO",
          balance: 0,
          password,
        },
        {
          id: 8,
          name: "CELSO DE MELO",
          balance: 0,
          password,
        },
      ],
      skipDuplicates: true,
    });

    console.log("Added default users");
  } catch (error) {
    console.error("Error in setUsers:", error);
  }
}

async function setProducts() {
  try {
    await client.product.createMany({
      data: [
        {
          description: "CURSO DE BEM-ESTAR",
          vendorId: 2,
        },
        {
          description: "DOMINANDO INVESTIMENTOS",
          vendorId: 3,
        },
        {
          description: "DESENVOLVEDOR FULL STACK",
          vendorId: 5,
        },
      ],
      skipDuplicates: true,
    });

    console.log("Added default products");
  } catch (error) {
    console.error("Error in setProducts:", error);
  }
}
