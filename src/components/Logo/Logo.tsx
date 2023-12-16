import React from "react";
import Image from "next/image";
import logo from "../../../public/logoTN.svg";

function Logo({ width = 50, height = 50, ...delegated }) {
  return (
    <>
      <Image
        src={logo}
        alt="Logo"
        width={width}
        height={height}
        {...delegated}
      />
    </>
  );
}

export default Logo;
