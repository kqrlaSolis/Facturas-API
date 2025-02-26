import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../config/database.js";

export const login = async(req, res) => {
    const body = req.body;
    const user =  await prisma.user.findUnique({
        where: {
            email: body.email,
        }
    })
    if (!user) {
        return res.status(404).json({message: "Usuario no encontrado"});
    }

    const passwordMatch = await bcrypt.compare(body.password, user.password);

    if(!passwordMatch) {
        return res.status(401).json({message: "Contraseña incorrecta"});
    }

    if (!process.env.JWT_SECRET) {
        return res.status(500).json({message: "JWT_SECRET is not defined"});
    }

    const token = jwt.sign(
        {
          id: user.id,
          name: user.name,
          email: user.email,
          password: user.password
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        }
      );
      

      res.json({token});


}

export const register = async(req, res) => {
    const body = req.body;

    const user =  await prisma.user.findUnique({
        where: {
            email: body.email,
        }
    });

    if (user) {
        return res.status(409).json({message: "Usuario ya existe"});
    }
    const hashedPassword = await bcrypt.hash(body.password, 10);

    await prisma.user.create({
        data: {
            name: body.name,
            email: body.email,
            password: hashedPassword,
        },
    });

    res.json({message: "Usuario creado"});

}

export const users = async(req, res) => {
    const users = await prisma.user.findMany();

    res.json(users.map((user) => {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
        }
    }))
}