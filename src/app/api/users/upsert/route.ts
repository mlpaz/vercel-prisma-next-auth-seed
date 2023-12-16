import { upsertUser } from "@/db/user/user";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const newUser = await req.json();
  const result = await upsertUser(newUser);
  return Response.json(result);
}
