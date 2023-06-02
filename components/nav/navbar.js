import styles from "./navbar.module.css";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

const Navbar = ({ username }) => {
  const router = useRouter();

  function handleOnClickMyList(e) {
    e.preventDefault();
    router.push("/browse/my-list/");
  }

  function handleOnClickHome(e) {
    e.preventDefault();
    router.push("/");
  }
  const [showDropDown, setShowDropDown] = useState(false);

  function handleShowDropDown(e) {
    e.preventDefault();
    setShowDropDown(!showDropDown);
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <a href="/" className={styles.logoLink}>
          <div className={styles.logoWrapper}>
            <Image
              src={"/static/netflix.svg"}
              width={128}
              height={34}
              alt="Netflix Logo"
            ></Image>
          </div>
        </a>
        <ul className={styles.navItems}>
          <li className={styles.navItem} onClick={handleOnClickHome}>
            Home
          </li>
          <li className={styles.navItem2} onClick={handleOnClickMyList}>
            My list
          </li>
        </ul>
        <nav className={styles.navContainer} onClick={handleShowDropDown}>
          <div>
            <button className={styles.usernameBtn}>
              <p className={styles.username}>{username}</p>
              <Image
                src={"./static/expand_more.svg"}
                alt="arrow dropdown"
                width={24}
                height={24}
              ></Image>
            </button>
            {showDropDown && (
              <div className={styles.navDropdown}>
                <div>
                  <Link href="/login" className={styles.linkName}>
                    Sign out
                  </Link>
                  <div className={styles.lineWrapper}></div>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
