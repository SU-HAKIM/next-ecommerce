import Link from "next/link";
import type { NextPage } from "next";
import { useRouter } from "next/router";

const Navbar: NextPage = (props) => {
  const router = useRouter();
  const setActive = (route: string) => {
    if (route === router.pathname) {
      return "active";
    }
    return "";
  };
  return (
    <nav>
      <div className="nav-wrapper">
        <Link href="/" passHref>
          <a className="brand-logo">NEXTSHOP</a>
        </Link>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li className={setActive("/login")}>
            <Link href="/login" passHref>
              <a>login</a>
            </Link>
          </li>
          <li className={setActive("/signup")}>
            <Link href="/signup" passHref>
              <a>signup</a>
            </Link>
          </li>
          <li className={setActive("/create")}>
            <Link href="/create" passHref>
              <a>create</a>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
