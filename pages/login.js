import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import styles from "./login.module.css";
import { useState } from "react";
import magic from "@/lib/magic-client";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [userMsg, setUserMsg] = useState("");
  const handleOnChangeEmail = (e) => {
    setUserMsg("");
    setEmail(e.target.value);
  };
  const handleLoginWithEmail = async (e) => {
    e.preventDefault();

    if (email) {
      try {
        const didToken = await magic.auth.loginWithMagicLink({
          email,
        });
        console.log({ didToken });
        console.log(didToken);
      } catch (error) {
        console.log("something went wrong", error);
      }

      // route to dashboard
    } else {
      // show user message
      setUserMsg("Enter a valid email address");
    }
  };

  return (
    <div>
      <Head>
        <title>Netflix Like</title>
      </Head>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.headerWrapper}>
            <Link className={styles.logoLink} href="/">
              <div className={styles.logoWrapper}>
                <Image
                  src="/static/netflix.svg"
                  alt="Netflix logo"
                  width={128}
                  height={34}
                />
              </div>
            </Link>
          </div>
        </header>
        <main className={styles.main}>
          <div className={styles.mainWrapper}>
            <h1 className={styles.signinHeader}>Sign In</h1>

            <input
              type="text"
              placeholder="Email address"
              className={styles.emailInput}
              onChange={handleOnChangeEmail}
            />

            <p className={styles.userMsg}>{userMsg}</p>

            <button onClick={handleLoginWithEmail} className={styles.loginBtn}>
              Sign In
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Login;
