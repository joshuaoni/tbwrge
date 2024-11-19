import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import React from "react";
import OR from "../../../../public/images/OR.png";
import GOOGLEICON from "../../../../public/images/icons/google-icon.png";
import RoleSelectionDropDown from "@/components/role-selection-dropdown";
import { useRouter } from "next/router";
import candivetlogowhite from "../../../../public/images/candivet-logo.png";
import { registerUser } from "@/actions/register-user";
import { useMutation } from "@tanstack/react-query";
const index = () => {
  const [fullName, setFullName] = React.useState("");
  const [role, setRole] = React.useState("Select Role");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const registerUserMutation = useMutation({
    mutationFn: async () => await registerUser(data),
  });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log("logging");
    e.preventDefault();

    registerUserMutation.mutate();
  };

  const data = {
    fullName,
    email,
    password,
    role,
  };
  const router = useRouter();
  return (
    <div className="h-screen w-screen bg-darkgreen flex flex-col items-center justify-center ">
      <div className="flex items-center  cursor-pointer">
        <Image src={candivetlogowhite} alt="" width={50} height={50} />
        <h1 className="text-3xl font-bold text-white">Candivet</h1>
      </div>
      <div className="w-[400px] h-fit bg-white rounded-lg mt-4 flex flex-col items-center p-6">
        <h1 className="text-2xl font-semibold text-primary">
          Create an Account
        </h1>
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
                Full Name
              </label>
              <Input
                value={fullName}
                name="fullName"
                onChange={(e) => setFullName(e.target.value)}
                placeholder="John Doe"
                className="w-full bg-[#EDF2F7] py-6 border-none"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="text-xs" htmlFor="email">
                Email Address
              </label>
              <Input
                value={email}
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@gmail.com"
                className="w-full bg-[#EDF2F7] py-6 border-none"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="text-xs" htmlFor="email">
                Password
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                className="w-full bg-[#EDF2F7] py-6 border-none"
              />
            </div>
            <div className="flex  w-full flex-col space-y-2">
              <label className="text-xs" htmlFor="email">
                Role Selection
              </label>
              <div className="w-full ">
                <RoleSelectionDropDown role={role} setRole={setRole} />
              </div>
            </div>
          </div>
          <Button
            disabled={
              registerUserMutation.isPending ||
              !email ||
              !password ||
              !fullName ||
              role === "Select Role"
            }
            variant="default"
            className="bg-primary text-white w-full"
            type="submit"
          >
            CREATE ACCOUNT
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
            Already have an account ?{" "}
            <span
              onClick={() => router.push("/home/sign-in")}
              className="text-primary "
            >
              Sign In
            </span>{" "}
          </span>
        </form>
      </div>
    </div>
  );
};

export default index;
