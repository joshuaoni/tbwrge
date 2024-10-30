import Image from "next/image";
import localFont from "next/font/local";
import Dashboard from "./dashboard";

export default function Home() {
  return (
    <div className={`p-6`}>
      <Dashboard />
    </div>
  );
}
