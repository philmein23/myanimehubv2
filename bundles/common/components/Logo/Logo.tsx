import Link from "next/link";

import styles from "./Logo.module.sass";

interface LogoProps {
  logoName: string;
}

function Logo({ logoName }: LogoProps) {
  return (
    <div className={styles.logo}>
      <Link href="/">
        <h1>{logoName}</h1>
      </Link>
    </div>
  );
}

export default Logo;
