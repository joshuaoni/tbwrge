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
import ChannelsDropDown from "@/components/channels-dropdown";
import { Loader2 } from "lucide-react";
import { resetPassword } from "@/actions/reset-password";
const index = () => {
  const [password, setPassword] = React.useState("");
  const [code, setCode] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const resetPasswordMutation = useMutation({
    mutationFn: async () =>
      await resetPassword({
        otp: code,
        new_password: password,
      }),
    onSuccess: () => {
      router.push("/home/sign-in");
    },
  });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log("logging");
    e.preventDefault();
    resetPasswordMutation.mutate();
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
                Enter Code
              </label>
              <Input
                value={code}
                name="code"
                onChange={(e) => setCode(e.target.value)}
                placeholder="1234"
                className="w-full bg-[#EDF2F7] py-6 border-none"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="text-xs" htmlFor="email">
                New Password
              </label>
              <Input
                value={password}
                name="password]"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                className="w-full bg-[#EDF2F7] py-6 border-none"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="text-xs" htmlFor="email">
                Retype Password
              </label>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="********"
                className="w-full bg-[#EDF2F7] py-6 border-none"
              />
            </div>
          </div>
          <Button
            disabled={
              resetPasswordMutation.isPending ||
              !password ||
              !code ||
              !confirmPassword ||
              password !== confirmPassword
            }
            variant="default"
            className="bg-primary text-white w-full"
            type="submit"
          >
            {resetPasswordMutation.isPending ? (
              <Loader2 className="animate-spin" />
            ) : (
              "RESET PASSWORD"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default index;
