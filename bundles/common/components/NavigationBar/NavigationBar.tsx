import styles from "./NavigationBar.module.sass";
import Link from "next/link";
import { Logo } from "@bundles/common/components/Logo";
import { NavItem } from "@bundles/common/types";
import { Search } from "@bundles/common/components/Search";

interface NavItemProps {
  name: string;
  route: string;
}

const navItems: NavItem[] = [
  { name: "Anime", route: "/anime" },
  { name: "Manga", route: "/manga" },
];

const NavTab: React.FC<NavItemProps> = ({ name, route }) => (
  <li>
    <Link href={route}>{name}</Link>
  </li>
);

const NavigationBar: React.FC = () => {
  return (
    <section>
      <Logo logoName="My Anime Hub" />
      <div className={styles["navigation-bar"]}>
        <nav className={styles.navbar}>
          <ul className={styles["nav-list-items"]}>
            {navItems.map((navItem, index) => (
              <NavTab key={index} route={navItem.route} name={navItem.name} />
            ))}
          </ul>
        </nav>
        <Search />
      </div>
    </section>
  );
};

export default NavigationBar;
