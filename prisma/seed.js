import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Insertar clientes
  await prisma.client.createMany({
    data: [
      { name: "Juan Pérez", rfc: "JUPE890101XYZ", email: "juanperez@example.com", phone: "555-123-4567" },
      { name: "María López", rfc: "MALO900505ABC", email: "maria@example.com", phone: "555-987-6543" }
    ],
    skipDuplicates: true, // Evita errores si los datos ya existen
  });

  // Insertar facturas
  await prisma.invoice.create({
    data: {
      clientId: 1, // Asegúrate de que este ID exista
      amount: 1000,
      status: "pending",
      dueDate: new Date("2025-03-15"),
      details: {
        create: [
          { description: "Servicio de consultoría", quantity: 2, unitPrice: 500, subtotal: 1000 }
        ]
      }
    }
  });

  console.log('✅ Seeding completado!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
