import prisma from '../models';

async function main() {
  const strains = [
    { name: 'Northern Lights', thc: 18.0, cbd: 0.1 },
    { name: 'Blue Dream', thc: 20.0, cbd: 0.1 },
    { name: 'OG Kush', thc: 22.0, cbd: 0.2 },
  ];

  for (const data of strains) {
    await prisma.strain.create({ data });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
