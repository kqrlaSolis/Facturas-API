import prisma from "../config/database.js";

export const createInvoice = async (req, res) => {
  try {
    const { clientId, amount, dueDate, invoiceDetails } = req.body;

    if (
      !clientId ||
      !amount ||
      !dueDate ||
      !invoiceDetails ||
      invoiceDetails.length === 0
    ) {
      return res
        .status(400)
        .json({ message: "Faltan datos necesarios para crear la factura." });
    }

    const createInvoice = await prisma.invoice.create({
      data: {
        clientId: clientId,
        amount: amount,
        status: "pending",
        dueDate: new Date(dueDate),
        details: {
          create: invoiceDetails.map((detail) => ({
            description: detail.description,
            quantity: detail.quantity,
            unitPrice: detail.unitPrice,
            subtotal: detail.quantity * detail.unitPrice,
          })),
        },
      },
    });

    res.json({ message: "new invoice created", invoice: createInvoice });
  } catch (error) {
    console.error("create new invoice failed:", error);
    res
      .status(500)
      .json({ message: "Error al crear la factura", error: error.message });
  }
};

export const allInvoices = async (req, res) => {
  try {
    const invoices = await prisma.invoice.findMany({
      include: {
        details: true,
      },
    });

    res.json(
      invoices.map((invoice) => ({
        id: invoice.id,
        clientId: invoice.clientId,
        amount: invoice.amount,
        status: invoice.status,
        dueDate: invoice.dueDate,
        details: invoice.details.map((detail) => ({
          description: detail.description,
          quantity: detail.quantity,
          unitPrice: detail.unitPrice,
          subtotal: detail.subtotal,
        })),
      }))
    );
  } catch (error) {
    console.error("Error obteniendo las facturas", error);
    res.status(500).json({
      message: "Error obteniendo las facturas",
      error: error.message,
    });
  }
};

