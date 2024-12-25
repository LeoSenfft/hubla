import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

const load = async () => {
  try {
    await setSaleTypes();
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
  await client.saleTypes.createMany({
    data: [
      {
        value: 1,
        description: "Venda produtor",
        nature: "Entrada",
      },
      {
        value: 2,
        description: "Venda afiliado",
        nature: "Entrada",
      },
      {
        value: 3,
        description: "Comissão paga",
        nature: "Saída",
      },
      {
        value: 4,
        description: "Comissão recebida",
        nature: "Entrada",
      },
    ],
    skipDuplicates: true,
  });

  console.log("Added default sale types");
}
