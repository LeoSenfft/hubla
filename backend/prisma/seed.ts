import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

const load = async () => {
  try {
    console.log("Starting seed...");
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
