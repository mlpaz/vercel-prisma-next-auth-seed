import React from "react";
import styles from "./Footer.module.css";
import Image from "next/image";

function Footer() {
  return (
    <div className={styles.wrapper}>
      © 2023 Tapiceria Nautica Buenos Aires, Inc. All rights reserved.
      <div className={styles.iconsContainer}>
        <a href="https://www.google.com/">
          <Image
            src="/social-media/facebook.png"
            alt="FaceBook"
            width={24}
            height={24}
          />
        </a>
        <a href="https://www.google.com/">
          <Image
            src="/social-media/instagram.png"
            alt="FaceBook"
            width={24}
            height={24}
          />
        </a>
        <a href="https://www.google.com/">
          <Image
            src="/social-media/tik-tok.png"
            alt="FaceBook"
            width={24}
            height={24}
          />
        </a>
      </div>
    </div>
  );
}

export default Footer;
