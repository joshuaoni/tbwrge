import { loginUser } from "@/actions/login-user";
import { loginUserWithGoogle } from "@/actions/login-with-google";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUserStore } from "@/hooks/use-user-store";
import { GoogleLogin } from "@react-oauth/google";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import OR from "../../../../public/images/OR.png";
import candivetlogowhite from "../../../../public/images/candivet-logo.png";
import toast from "react-hot-toast";

const Index = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const router = useRouter();
  const { addUser } = useUserStore();
  const signInMutation = useMutation({
    mutationFn: async () =>
      await loginUser({
        email,
        password,
      }),
    onSuccess: (res) => {
      if (res.user != null) {
        toast.success("Login successful");
        console.log(res.user);
        addUser({
          authenticatedUser: res.user,
          token: res.access_token,
        });
        router.push("/dashboard");
      }
    },
    onError: (err) => {
      toast.error("Login failed");
    },
  });
  const signInWithGoogleMutation = useMutation({
    mutationFn: async (token: string) =>
      await loginUserWithGoogle({
        token,
      }),
    onSuccess: (res) => {
      if (res.user != null) {
        addUser(res.user);
        router.push("/dashboard");
      }
    },
  });

  const responseMessage = async (response: any) => {
    console.log("response", response);
    signInWithGoogleMutation.mutate(response.credential);
  };
  const errorMessage: any = (error: any) => {
    console.log(error);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signInMutation.mutate();
  };

  return (
    <div className="h-screen w-screen bg-darkgreen flex flex-col items-center justify-center">
      <div className="flex items-center cursor-pointer">
        <Image
          src={candivetlogowhite}
          alt="Candivet Logo"
          width={50}
          height={50}
        />
        <h1 className="text-3xl font-bold text-white">Candivet</h1>
      </div>
      <div className="w-[400px] h-fit bg-white rounded-lg mt-4 flex flex-col items-center p-6">
        <h1 className="text-2xl font-semibold text-primary">Log In</h1>
        <p className="text-[#4A5568]">
          Welcome to simplified candidate vetting
        </p>
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col mt-4 space-y-4"
        >
          <div className="space-y-4 flex flex-col">
            <div className="flex flex-col space-y-2">
              <label className="text-xs" htmlFor="email">
                Email Address
              </label>
              <Input
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
                placeholder="example@email.com"
                className="w-full bg-[#EDF2F7] py-6 border-none"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="text-xs" htmlFor="password">
                Password
              </label>
              <Input
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
                placeholder="********"
                type="password"
                className="w-full bg-[#EDF2F7] py-6 border-none"
              />
            </div>
          </div>
          <Button
            variant="default"
            className="bg-primary text-white w-full"
            type="submit"
          >
            {signInMutation.isPending || signInWithGoogleMutation.isPending ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Log In"
            )}
          </Button>
          <Image
            src={OR}
            alt=""
            width={150}
            height={150}
            className="self-center my-4"
          />
          <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />

          <span className="font-semibold cursor-pointer self-center text-gray-400 text-sm text-center">
            Don’t have an account?{" "}
            <span
              onClick={() => router.push("/home/sign-up")}
              className="text-primary"
            >
              Register
            </span>
          </span>
          <span
            onClick={() => router.push("/home/forgot-password")}
            className="font-semibold cursor-pointer self-center text-gray-400 text-sm text-center"
          >
            Forgot password
          </span>
        </form>
      </div>
    </div>
  );
};

export default Index;
