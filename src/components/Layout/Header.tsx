import React from "react";
import styles from "@app/styles/layout/header.module.scss";
import { FaGoogleDrive } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <nav className={styles.header}>
      <Link href="/">
        <div className={styles.header__brand}>
          <Image
            width={32}
            height={32}
            alt="drive-logo"
            src="/drive-logo.svg"
            priority
          />
          Drive
        </div>
      </Link>
    </nav>
  );
};

export default Header;
