import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import React from "react";
import OR from "../../../../public/images/OR.png";
import GOOGLEICON from "../../../../public/images/icons/google-icon.png";

const index = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <div className="h-screen w-screen bg-darkgreen flex items-center justify-center ">
      <div className="w-[400px] h-fit bg-white rounded-lg flex flex-col items-center p-6">
        <h1 className="text-2xl font-semibold text-primary">Log In</h1>
        <p className="text-[#4A5568]">
          Welcome to simplified candidate vetting
        </p>
        <form
          onSubmit={handleSubmit}
          className=" w-full flex flex-col mt-4 space-y-4"
        >
          <div className="space-y-4 flex flex-col">
            <div className="flex flex-col space-y-2 ">
              <label className="text-xs" htmlFor="email">
                Email Address
              </label>
              <Input
                placeholder="example@email.com"
                className="w-full bg-[#EDF2F7] py-6 border-none"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="text-xs" htmlFor="email">
                Password
              </label>
              <Input
                placeholder="********"
                className="w-full bg-[#EDF2F7] py-6 border-none"
              />
            </div>
          </div>
          <Button
            variant="default"
            className="bg-primary text-white w-full"
            type="submit"
          >
            Log In
          </Button>
          <Image
            src={OR}
            alt=""
            width={150}
            height={150}
            className="self-center my-4"
          />
          <Button
            variant="default"
            className="bg-white flex items-center text-black w-full"
            type="submit"
          >
            <Image src={GOOGLEICON} alt="" width={25} height={25} />
            <p>Continue with google</p>
          </Button>
          <span className="font-semibold  cursor-pointer self-center text-gray-400 text-sm text-center">
            Dont have an account ?{" "}
            <span className="text-primary ">Register</span>{" "}
          </span>
          <span className="font-semibold cursor-pointer  self-center text-gray-400 text-sm text-center">
            Forgot password{" "}
          </span>
        </form>
      </div>
    </div>
  );
};

export default index;
