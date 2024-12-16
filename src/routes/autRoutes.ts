import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../index";
import User from "../entity/User";
import dotenv from "dotenv";
dotenv.config();

const router = Router();

const jwt_SECRET = process.env.JWT_SECRET || "default_secret";

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userRepository = AppDataSource.getRepository(User);

    const existingUser = await userRepository.findOneBy({ email });
    if (existingUser) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = userRepository.create({
      name,
      email,
      password: hashedPassword,
    });
    await userRepository.save(newUser);

    res.status(201).json({ message: "Usuario registrado con éxito." });
  } catch (error) {
    res.status(500).json({ message: "Error al registrar usuario.", error });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOneBy({ email });
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Contraseña incorrecta." });
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, jwt_SECRET, {
      expiresIn: "7d",
    });

    res.json({ message: "Inicio de sesión exitoso.", token });
  } catch (error) {
    res.status(500).json({ message: "Error en el inicio de sesión.", error });
  }
});

export default router;
