import React from "react";
import candivetlogo from "../../../../public/images/candivet-logo.png";
import Image from "next/image";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

const LandingHeader = () => {
  return (
    <div className="w-full fixed flex items-center bg-white   top-0 border py-4">
      <div className="flex items-center ml-6 cursor-pointer">
        <Image src={candivetlogo} alt="" width={50} height={50} />
        <h1 className="text-3xl font-bold">Candivet</h1>
      </div>
      <NavigationHeader />
      <div className="ml-auto mr-8">
        <Button className="border-none outline-none tet-black">Log In</Button>
        <Button className="bg-primary text-white">Sign Up</Button>
      </div>
    </div>
  );
};

const NavigationHeader = () => {
  const Navs = [
    {
      title: "Home",
      link: "/home",
    },
    {
      title: "About",
      link: "/about",
    },
    {
      title: "Tools",
      link: "/tools",
    },
    {
      title: "Pricing",
      link: "/pricing",
    },
    {
      title: "Blog",
      link: "/blog",
    },
    {
      title: "Community",
      link: "/community",
    },
  ];
  return (
    <div>
      <div className="flex items-center space-x-8 ml-12">
        {Navs.map((nav, index) => (
          <NavItem {...nav} key={index} />
        ))}
      </div>
    </div>
  );
};
const NavItem = ({ title, link }: { title: string; link: string }) => {
  const pathName = usePathname();
  const router = useRouter();
  const isActive = link.includes(pathName);
  const onClick = () => {
    router.push(link);
  };
  return (
    <span
      onClick={() => {
        onClick();
      }}
      className={`${
        isActive
          ? "text-primary font-bold underline underline-offset-2 transform transition-all"
          : "text-black"
      } cursor-pointer`}
    >
      {title}
    </span>
  );
};

export default LandingHeader;
