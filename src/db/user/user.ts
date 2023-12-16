import { IUser } from "../model";
import prisma from "@/lib/prisma";

export async function getUsers(email?: string): Promise<IUser[]> {
  let where = {};
  if (email) {
    where = { email: { contains: email }, ...where };
  }
  const results: IUser[] = await prisma.user.findMany({
    where,
  });

  return results;
}

export async function deleteUser(id: string) {
  const result: IUser = await prisma.user.delete({
    where: { id: id },
  });

  return result;
}

export async function getUserByEmail(email: string): Promise<IUser | null> {
  let where = {};
  if (email) {
    where = { email: email, ...where };
  }
  const result: IUser | null = await prisma.user.findFirst({
    where,
  });

  return result;
}

export async function upsertUser(newUser: IUser) {
  let response;
  if (newUser.id) {
    response = await prisma.user.update({
      where: {
        id: newUser.id,
      },
      data: newUser,
    });
  } else {
    response = await prisma.user.create({
      data: newUser,
    });
  }
  return response;
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
