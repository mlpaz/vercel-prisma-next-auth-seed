import { IUser } from "@/db/model";
import { getUsers } from "@/db/user/user";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const email: string = req.nextUrl.searchParams.get("email") || "";
  const users: IUser[] = await getUsers(email);
  return Response.json({ results: users, count: users.length });
}
