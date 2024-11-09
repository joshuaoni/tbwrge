import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push("/landing");
  }, []);
  return <div className={`p-6`}></div>;
}
