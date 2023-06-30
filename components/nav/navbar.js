import styles from "./navbar.module.css";
import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import magic from "@/lib/magic-client";
import { log } from "next/dist/server/typescript/utils";

const Navbar = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  useEffect(() => {
    try {
      const getUsername = async () => {
        const { email } = await magic.user.getMetadata();
        if (email) {
          setUsername(email);
        }
      };
      getUsername();
    } catch (e) {
      console.log(e);
    }
  }, []);

  function handleOnClickMyList(e) {
    e.preventDefault();
    router.push("/browse/my-list/");
  }
  async function handleSignout(e) {
    e.preventDefault();
    try {
      await magic.user.logout();
      router.push("/login");
    } catch (e) {
      console.log(e);
      router.push("/login");
    }
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
                  <Link
                    href="/login"
                    onClick={handleSignout}
                    className={styles.linkName}
                  >
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
