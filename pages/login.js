import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import styles from "./login.module.css";
import { useEffect, useState } from "react";
import magic from "@/lib/magic-client";

const Login = () => {
  const router = useRouter();

  useEffect(() => {
    const handleComplete = () => {
      setIsLoading(false);
    };
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);
    return () => {
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);
  const [email, setEmail] = useState("");
  const [userMsg, setUserMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleOnChangeEmail = (e) => {
    setUserMsg("");
    setEmail(e.target.value);
  };
  const handleLoginWithEmail = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (email) {
      try {
        const didToken = await magic.auth.loginWithMagicLink({
          email,
        });
        if (didToken) {
          router.push("/");
        }
      } catch (error) {
        console.log("something went wrong", error);
        setIsLoading(false);
      }

      // route to dashboard
    } else {
      setIsLoading(false);
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
              {isLoading ? "Loading..." : "Sign In"}
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Login;
