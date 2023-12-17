import { IDataTable } from "@/components/Table/interface";
import { IUser } from "../model";
import prisma from "@/lib/prisma";

export async function getUsers(
  limit: number = 5,
  offset: number = 0,
  email?: string
): Promise<IDataTable<IUser>> {
  let where = {};
  if (email) {
    where = { email: { contains: email }, ...where };
  }
  const [users, count] = await prisma.$transaction([
    prisma.user.findMany({
      skip: offset,
      take: limit,
      where,
    }),

    prisma.user.count({ where }),
  ]);

  return { results: users, count };
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
