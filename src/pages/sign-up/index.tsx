import { registerUser } from "@/actions/register-user";
import ChannelsDropDown from "@/components/channels-dropdown";
import RoleSelectionDropDown from "@/components/role-selection-dropdown";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import OR from "../../../public/images/OR.png";
import candivetlogowhite from "../../../public/images/candivet-logo.png";
import { outfit, poppins } from "@/constants/app";
import { useIsMobile } from "@/hooks/use-mobile";
import { ArrowLeft } from "lucide-react";
import { toast } from "react-hot-toast";
import { GoogleLogin } from "@react-oauth/google";
import { loginUserWithGoogle } from "@/actions/login-with-google";
import { useUserStore } from "@/hooks/use-user-store";

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

const SignUpPage = () => {
  const [fullName, setFullName] = React.useState("");
  const [role, setRole] = React.useState("Select Role");
  const [channel, setChannel] = React.useState("Select Channel");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [step, setStep] = React.useState(1);
  const router = useRouter();
  const isMobile = useIsMobile();
  const { addUser } = useUserStore();
  const searchParams = useSearchParams();
  // Get the redirect URL from query parameters
  const redirectUrl = searchParams?.get("redirect") || "/dashboard";

  const data = {
    fullName,
    email,
    password,
    role,
    channel,
  };

  const registerUserMutation = useMutation({
    mutationFn: async () => await registerUser(data),
    onSuccess: () => {
      toast.success("Successful. Verify your email");
      router.push("/verify-email");
    },
    onError: (err: any) => {
      toast.error(err?.message || "Registration failed");
    },
  });

  const signUpWithGoogleMutation = useMutation({
    mutationFn: async (token: string) =>
      await loginUserWithGoogle({
        token,
      }),
    onSuccess: (res) => {
      if (res.user != null) {
        addUser(res.user);
        // Redirect to the saved URL or default based on role
        if (res.user.role === "job_seeker") {
          router.push(redirectUrl || "/dashboard/job-board");
        } else if (res.user.role === "recruiter") {
          router.push(redirectUrl || "/dashboard");
        }
      }
    },
    onError: (err: any) => {
      toast.error(err?.message || "Google sign up failed");
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
      return;
    }
    registerUserMutation.mutate();
  };

  const handleGoogleSignUp = (response: any) => {
    if (response.credential) {
      signUpWithGoogleMutation.mutate(response.credential);
    } else {
      toast.error("Google sign up failed");
    }
  };

  // Progress indicator
  const steps = ["Account Info", "Channel & Role", "Review & Submit"];

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

      <div className="w-full max-w-[400px] mx-auto py-6 md:py-0 md:pt-4 px-4">
        <div className="flex items-center justify-center cursor-pointer">
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

        {/* Progress Indicator */}
        <div className="flex justify-between items-center mt-6 mb-4">
          {steps.map((label, idx) => (
            <div key={label} className="flex-1 flex flex-col items-center">
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full font-bold text-sm mb-1
                  ${
                    step === idx + 1
                      ? "bg-white text-primary border-2 border-primary"
                      : "bg-gray-400 text-white"
                  }`}
              >
                {idx + 1}
              </div>
              <span
                className={`text-xs text-center ${
                  step === idx + 1 ? "text-white font-bold" : "text-gray-400"
                }`}
                style={
                  step === idx + 1
                    ? { textShadow: "0 1px 4px rgba(0,0,0,0.12)" }
                    : {}
                }
              >
                {label}
              </span>
            </div>
          ))}
        </div>

        <div
          className={`${
            poppins.className
          } w-full bg-white rounded-lg mt-4 p-4 md:p-6 ${
            step === 1 ? "" : "max-h-[70vh] overflow-y-auto"
          }`}
        >
          <form onSubmit={handleSubmit} className="mt-4 md:mt-6 space-y-4">
            {/* Step 1: Name/Email/Password */}
            {step === 1 && (
              <div className="space-y-3 md:space-y-4">
                <div className="space-y-1.5 md:space-y-2">
                  <label className="text-[10px] md:text-xs" htmlFor="fullName">
                    Full Name
                  </label>
                  <Input
                    id="fullName"
                    value={fullName}
                    name="fullName"
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full bg-[#EDF2F7] py-5 md:py-6 border-none text-sm md:text-base placeholder:text-[12px] md:placeholder:text-sm"
                  />
                </div>
                <div className="space-y-1.5 md:space-y-2">
                  <label className="text-[10px] md:text-xs" htmlFor="email">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    value={email}
                    name="email"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@gmail.com"
                    className="w-full bg-[#EDF2F7] py-5 md:py-6 border-none text-sm md:text-base placeholder:text-[12px] md:placeholder:text-sm"
                  />
                </div>
                <div className="space-y-1.5 md:space-y-2">
                  <label className="text-[10px] md:text-xs" htmlFor="password">
                    Password
                  </label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="********"
                    className="w-full bg-[#EDF2F7] py-5 md:py-6 border-none text-sm md:text-base placeholder:text-[12px] md:placeholder:text-sm"
                  />
                </div>
              </div>
            )}
            {/* Step 2: Channel/Role */}
            {step === 2 && (
              <div className="space-y-3 md:space-y-4">
                <div className="space-y-1.5 md:space-y-2">
                  <label className="text-[10px] md:text-xs">
                    How did you hear about us? (optional)
                  </label>
                  <ChannelsDropDown channel={channel} setChannel={setChannel} />
                </div>
                <div className="space-y-1.5 md:space-y-2">
                  <label className="text-[10px] md:text-xs">
                    Role Selection
                  </label>
                  <RoleSelectionDropDown role={role} setRole={setRole} />
                </div>
              </div>
            )}
            {/* Step 3: Review & Submit */}
            {step === 3 && (
              <div className="space-y-3 md:space-y-4">
                <h2 className="text-lg font-bold text-primary mb-2">
                  Review your details
                </h2>
                <div className="text-sm text-gray-700">
                  <div>
                    <span className="font-semibold">Full Name:</span> {fullName}
                  </div>
                  <div>
                    <span className="font-semibold">Email:</span> {email}
                  </div>
                  <div>
                    <span className="font-semibold">Role:</span> {role}
                  </div>
                  <div>
                    <span className="font-semibold">Channel:</span> {channel}
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-6">
              {step > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  className="text-white border-primary bg-primary/80 hover:bg-primary"
                  onClick={() => setStep(step - 1)}
                >
                  Back
                </Button>
              )}
              <div className="flex-1" />
              {step < 3 ? (
                <Button
                  type="submit"
                  variant="default"
                  className="bg-primary text-white"
                  disabled={
                    (step === 1 && (!email || !password || !fullName)) ||
                    (step === 2 && role === "Select Role")
                  }
                >
                  Next
                </Button>
              ) : (
                <Button
                  disabled={registerUserMutation.isPending}
                  variant="default"
                  className="bg-primary text-white"
                  type="submit"
                >
                  {registerUserMutation.isPending ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    "CREATE ACCOUNT"
                  )}
                </Button>
              )}
            </div>

            {/* Google Sign Up only on Step 1 */}
            {step === 1 && (
              <>
                <div className="flex items-center justify-center my-3 md:my-4">
                  <Image
                    src={OR}
                    alt="OR divider"
                    width={150}
                    height={20}
                    className="h-4 md:h-5 object-contain"
                  />
                </div>
                <div className="flex justify-center w-full">
                  <GoogleLogin
                    onSuccess={handleGoogleSignUp}
                    onError={() => {
                      toast.error("Google sign up failed");
                    }}
                    width="100%"
                    text="signup_with"
                    shape="rectangular"
                    theme="outline"
                    logo_alignment="left"
                    useOneTap={false}
                  />
                </div>
                <p className="text-center text-[12px] md:text-[14px] text-gray-400">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => router.push("/sign-in")}
                    className="text-primary font-semibold"
                  >
                    Sign In
                  </button>
                </p>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
