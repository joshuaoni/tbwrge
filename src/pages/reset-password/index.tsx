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
import { outfit, poppins } from "@/constants/app";
import { useIsMobile } from "@/hooks/use-mobile";
import { ArrowLeft } from "lucide-react";
import { toast } from "react-hot-toast";

const DecorativeCircles = ({ position }: { position: "top" | "bottom" }) => {
  if (position === "top") {
    return (
      <div className="absolute top-[50px] right-[30px] md:right-[50px]">
        <div className="relative scale-75 md:scale-100">
          <div className="w-[145px] h-[145px] rounded-full bg-[#FFB547] border-[25px] border-[#009379]" />
          <div className="absolute -bottom-[-90px] -left-[60px] w-[90px] h-[90px] border-[25px] border-[#FF725E] rounded-full bg-[#FFB547]" />
        </div>
      </div>
    );
  }

  return (
    <div className="absolute bottom-[50px] left-[30px] md:left-[50px]">
      <div className="relative scale-75 md:scale-100">
        <div className="w-[145px] h-[145px] -top-10 -left-10 rounded-full bg-[#FFB547] border-[25px] border-[#009379]" />
        <div className="absolute -top-[40px] -right-[40px] w-[90px] h-[90px] border-[25px] border-[#FF725E] rounded-full bg-[#FFB547]" />
      </div>
    </div>
  );
};

const ResetPassword = () => {
  const [password, setPassword] = React.useState("");
  const [code, setCode] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const router = useRouter();
  const isMobile = useIsMobile();
  const resetPasswordMutation = useMutation({
    mutationFn: async () =>
      await resetPassword({
        otp: code,
        new_password: password,
      }),
    onSuccess: () => {
      toast.success("Password reset successful");
      router.push("/sign-in");
    },
    onError: (err: any) => {
      toast.error(err?.message || "Failed to reset password");
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetPasswordMutation.mutate();
  };

  return (
    <div className="min-h-screen w-full bg-darkgreen overflow-y-auto relative">
      {!isMobile && (
        <>
          <DecorativeCircles position="top" />
          <DecorativeCircles position="bottom" />
        </>
      )}

      <div className="absolute top-6 left-6">
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-2 text-white hover:opacity-80 transition-opacity"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className={`${poppins.className} text-sm`}>Back to home</span>
        </button>
      </div>

      <div className="w-full max-w-[400px] mx-auto py-6 md:py-8 px-4">
        <div
          onClick={() => router.push("/")}
          className="flex items-center justify-center cursor-pointer"
        >
          <Image
            src="/footer-logo.png"
            alt=""
            width={30}
            height={26}
            className="w-[26px] h-[22px] md:w-[30px] md:h-[26px]"
          />
          <h1
            className={`${outfit.className} ml-2 text-white text-[20px] md:text-[24px] font-bold`}
          >
            Candivet
          </h1>
        </div>

        <div
          className={`${poppins.className} w-full bg-white rounded-lg mt-4 p-4 md:p-6`}
        >
          <h1 className="text-[18px] md:text-[20px] text-center font-bold text-primary">
            Reset Password
          </h1>
          <p className="text-[12px] md:text-[14px] text-[#4A5568] text-center mt-2">
            Enter reset code and your new password
          </p>

          <form onSubmit={handleSubmit} className="mt-4 md:mt-6 space-y-4">
            <div className="space-y-3 md:space-y-4">
              <div className="space-y-1.5 md:space-y-2">
                <label className="text-[10px] md:text-xs" htmlFor="code">
                  Enter Code
                </label>
                <Input
                  id="code"
                  value={code}
                  name="code"
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="1234"
                  className="w-full bg-[#EDF2F7] py-5 md:py-6 border-none text-sm md:text-base placeholder:text-[12px] md:placeholder:text-sm"
                />
              </div>

              <div className="space-y-1.5 md:space-y-2">
                <label className="text-[10px] md:text-xs" htmlFor="password">
                  New Password
                </label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="********"
                  className="w-full bg-[#EDF2F7] py-5 md:py-6 border-none text-sm md:text-base placeholder:text-[12px] md:placeholder:text-sm"
                />
              </div>

              <div className="space-y-1.5 md:space-y-2">
                <label
                  className="text-[10px] md:text-xs"
                  htmlFor="confirmPassword"
                >
                  Retype Password
                </label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="********"
                  className="w-full bg-[#EDF2F7] py-5 md:py-6 border-none text-sm md:text-base placeholder:text-[12px] md:placeholder:text-sm"
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
              className="bg-primary text-white w-full h-10 md:h-11 text-sm md:text-base"
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
    </div>
  );
};

export default ResetPassword;
