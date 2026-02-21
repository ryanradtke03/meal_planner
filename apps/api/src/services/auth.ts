import bcrypt from "bcrypt";
import { prisma } from "../db/prisma";

const SALT_ROUNDS = 12;

export async function registerUser(data: {
  email: string;
  password: string;
}) {
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);

  const user = await prisma.user.create({
    data: {
      email: data.email,
      passwordHash: hashedPassword,
    },
  });

  return user;
}