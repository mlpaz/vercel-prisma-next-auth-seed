import React from "react";
import Image from "next/image";

function Logo({ width = 50, height = 50, ...delegated }) {
  return (
    <>
      <Image
        src="/logo-TN.svg"
        alt="Logo"
        width={width}
        height={height}
        {...delegated}
      />
    </>
  );
}

export default Logo;
