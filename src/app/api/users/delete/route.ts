import { IUser } from "@/db/model";
import { deleteUser } from "@/db/user/user";
import { NextRequest } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const user: IUser = await deleteUser(params.id);
  return Response.json(user);
}
