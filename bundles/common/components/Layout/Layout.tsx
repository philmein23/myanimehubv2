import { NavigationBar } from "bundles/common/components/NavigationBar";

import styles from "./Layout.module.sass";

interface LayoutProps {
  children: React.ReactNode | React.ReactNode[];
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.container}>
      <header className={styles.navigation}>{<NavigationBar />}</header>
      <main>{children}</main>
      <footer className={styles.footer}>
        <p>My Anime Hub - 2020</p>
      </footer>
    </div>
  );
};

export default Layout;
