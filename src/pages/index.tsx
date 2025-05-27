import { useRouter } from "next/router";
import { useEffect } from "react";
import Head from "next/head";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push("/home");
  }, []);
  return (
    <>
      <Head>
        <title>Welcome to Candivet - Your AI-Powered Hiring Platform</title>
        <meta
          name="description"
          content="Welcome to Candivet - The #1 global AI-powered platform for recruiters and job seekers. Start your journey to smarter hiring and job seeking today."
        />
      </Head>
      <div className={`p-6`}></div>
    </>
  );
}
