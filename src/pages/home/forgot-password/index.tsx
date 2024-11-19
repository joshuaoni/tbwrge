import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import React from "react";
import OR from "../../../../public/images/OR.png";
import GOOGLEICON from "../../../../public/images/icons/google-icon.png";
import RoleSelectionDropDown from "@/components/role-selection-dropdown";
import { useRouter } from "next/router";
import candivetlogowhite from "../../../../public/images/candivet-logo.png";
import { useMutation } from "@tanstack/react-query";
import { verifyEmail } from "@/actions/verifyEmail";
import { Loader2 } from "lucide-react";
import { forgotPassword } from "@/actions/forgot-password";
const index = () => {
  const [email, setEmail] = React.useState("");
  const forgotPasswordMutation = useMutation({
    mutationFn: async () => await forgotPassword(email),
    onSuccess: () => {
      router.push("/home/reset-password");
    },
  });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    forgotPasswordMutation.mutate();
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
            <div className="flex flex-col space-y-2">
              <label className="text-xs" htmlFor="email">
                Enter code sent to email
              </label>
              <Input
                value={email}
                name="email"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
                placeholder="email"
                className="w-full bg-[#EDF2F7] py-6 border-none"
              />
            </div>
          </div>
          <Button
            disabled={forgotPasswordMutation.isPending || !email}
            variant="default"
            className="bg-primary text-white w-full"
            type="submit"
          >
            {forgotPasswordMutation.isPending ? (
              <Loader2 className="animate-spin" />
            ) : (
              "RESET PASSWORD"
            )}
          </Button>
          <Image
            src={OR}
            alt=""
            width={150}
            height={150}
            className="self-center my-4"
          />

          <span className="font-semibold  cursor-pointer self-center text-gray-400 text-sm text-center">
            Back to{" "}
            <span
              onClick={() => router.push("/home/sign-in")}
              className="text-primary "
            >
              Log In
            </span>{" "}
          </span>
        </form>
      </div>
    </div>
  );
};

export default index;
