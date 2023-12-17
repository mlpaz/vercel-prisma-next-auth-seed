import { IDataTable } from "@/components/Table/interface";
import { IUser } from "@/db/model";
import { getUsers } from "@/db/user/user";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const email: string = req.nextUrl.searchParams.get("email") || "";
  const limitParam: string | null = req.nextUrl.searchParams.get("limit");
  const limit: number = limitParam ? +limitParam : 5;
  const offsetParam: string | null = req.nextUrl.searchParams.get("offset");
  const offset: number = offsetParam ? +offsetParam : 0;
  const result: IDataTable<IUser> = await getUsers(limit, offset, email);
  return Response.json(result);
}
