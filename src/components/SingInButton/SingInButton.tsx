"use client";
import React from "react";
import Button from "../Button/Button";
import { signIn } from "next-auth/react";

function SingInButton() {
  return <Button onClick={() => signIn("google")}>Iniciar sesión</Button>;
}

export default SingInButton;
