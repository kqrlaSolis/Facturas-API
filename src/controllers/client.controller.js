import prisma from "../config/database.js";

export const createClient = async (req, res) => {
  try {
    const { name, rfc, email, phone } = req.body;

    if (!name || !rfc || !email || !phone) {
      return res.status(400).json({
        message: "Faltan datos necesarios para crear al cliente.",
      });
    }

    const newClient = await prisma.client.create({
      data: {
        name,
        rfc,
        email,
        phone,
      },
    });

    res.status(201).json({ message: "Nuevo cliente creado", client: newClient });
  } catch (error) {
    console.error("Error al crear cliente:", error);
    res.status(500).json({
      message: "Error al crear el cliente",
      error: error.message,
    });
  }
};

export const getClient = async (req, res) => {
  const { id } = req.params;

  const client =  await prisma.client.findUnique({
    where: {
       id: Number(id) ,
    }
  });

  res.json(client);
}

export const getAllClients = async(req, res) => {
  
  const allClients = await prisma.client.findMany();
  
  res.json(allClients.map((client)=> {
    return {
      id: client.id,
      name: client.name,
      rfc: client.rfc,
      email: client.email,
      phone: client.phone,
    }
  }));
}