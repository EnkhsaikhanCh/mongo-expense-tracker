"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { AuthBtnSmall } from "@/components/AuthBtnSmall";
import { AuthFooter } from "@/components/AuthFooter";
import { AuthHeader } from "@/components/AuthHeader";
import { Field } from "@/components/Field";
import { PasswordField } from "@/components/PasswordField";
import { WhiteAuthBtnSmall } from "@/components/WhiteAuthBtnSmall";
import { Toaster, toast } from "sonner";
import {
  validateEmail,
  validateOTP,
  validatePassword,
} from "@/utils/validation";

export default function Home() {
  const [step, setStep] = useState<string>("EMAIL");
  const [email, setEmail] = useState<string>("");
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [newPassword, setNewPassword] = useState<string>("");
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const otpRef = useRef<(HTMLInputElement | null)[]>(Array(6).fill(""));
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    gsap.fromTo(
      step === "EMAIL"
        ? emailRef.current
        : step === "OTP"
          ? otpRef.current
          : passwordRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
    );
  }, [step]);

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value.replace(/\D/g, ""); // Allows only digits
    setOtp(newOtp);

    gsap.fromTo(
      otpRef.current[index],
      {
        scale: 1.1,
        backgroundColor: "#e0ffe0",
      },
      {
        scale: 1,
        backgroundColor: "#ffffff",
        duration: 0.4,
        ease: "power2.out",
      },
    );

    if (otpRef.current[index]) {
      gsap.to(otpRef.current[index], {
        scale: 1.0,
        borderColor: "",
        duration: 0.2,
        ease: "power2.out",
      });
    }

    if (value && index < 5) {
      otpRef.current[index + 1]?.focus();
    } else if (!value && index > 0) {
      otpRef.current[index - 1]?.focus();
    }
  };

  function handleContinue() {
    switch (step) {
      case "EMAIL":
        if (!validateEmail(email)) {
          toast.warning("Invalid email format");
          return;
        }
        toast.info(
          `A 6-digit verification code has been sent to your ${email}. `,
        );
        setStep("OTP");
        break;

      case "OTP":
        otpSubmit();
        break;

      case "PASSWORD":
        if (!validatePassword(newPassword)) {
          toast.warning("Password must be at least 8 characters long");
          return;
        }
        submit();
        break;
    }
  }

  function otpSubmit() {
    if (!validateOTP(otp)) {
      toast.warning("OTP must be 6 digits");
      return;
    }

    gsap.to(otpRef.current, {
      scale: 0,
      opacity: 0,
      stagger: 0.1,
      duration: 0.3,
      ease: "power2.in",
    });

    const promise = () =>
      new Promise((resolve, reject) =>
        setTimeout(() => {
          // fake random response
          const response = Math.random() > 0.5;
          if (response) {
            resolve({
              status: "success",
              message: "Verified successfully",
            });
          } else {
            reject({
              status: "error",
              message: "Failed, Please try again.",
            });
          }
        }, 2000),
      );

    toast.promise(promise, {
      loading: "Verifying OTP...",
      success: () => {
        setStep("PASSWORD");
        return "Verified successfully";
      },
      error: (error) => {
        gsap.to(otpRef.current, {
          scale: 1,
          opacity: 1,
          stagger: 0.1,
          duration: 0.3,
          ease: "power2.out",
        });
        return error.message;
      },
    });
  }

  function submit() {
    const promise = () =>
      new Promise((resolve, reject) =>
        setTimeout(() => {
          // fake random response
          const response = Math.random() > 0.5;
          if (response) {
            resolve({
              status: "success",
              message: "Your password has been successfully changed.",
            });
          } else {
            reject({
              status: "error",
              message: "Failed to change password. Please try again.",
            });
          }
        }, 2000),
      );

    toast.promise(promise, {
      loading: "Changing password...",
      success: () => {
        window.location.href = "/login";
        reset();
        return "Your password has been successfully changed.";
      },
      error: "Failed to change password. Please try again.",
    });
  }

  function reset() {
    setEmail("");
    setOtp([]);
    setNewPassword("");
  }

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <main className="container mx-auto mt-10 flex w-[342px] flex-col items-center gap-3 px-4">
      <AuthHeader
        label={
          step === "EMAIL"
            ? "Enter Your Email"
            : step === "OTP"
              ? "Verify OTP"
              : "Set New Password"
        }
      />
      <div className="card w-full rounded-md border bg-white">
        <Toaster position="top-center" richColors />
        <div className="card-body px-[20px] py-4">
          <div className="flex flex-col gap-3">
            {step === "EMAIL" && (
              <Field
                ref={emailRef}
                label="Email"
                type="email"
                value={email}
                onChange={setEmail}
              />
            )}
            {step === "OTP" && (
              <label className="form-control gap-1">
                <span className="label-text font-bold">OTP</span>
                <ShowSendEmail email={email} />
                <div className="flex justify-between">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => {
                        otpRef.current[index] = el;
                      }}
                      className="h-10 w-10 rounded border text-center"
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(e.target.value, index)}
                      onFocus={(e) => e.target.select()}
                    />
                  ))}
                </div>
                <ResendOtp />
              </label>
            )}
            {step === "PASSWORD" && (
              <PasswordField
                ref={passwordRef}
                label="New Password"
                visible={passwordVisible}
                value={newPassword}
                onChange={setNewPassword}
                toggleVisibility={togglePasswordVisibility}
              />
            )}
            <div>
              {step === "EMAIL" ? (
                <div className="flex justify-end">
                  <AuthBtnSmall
                    label="Continue"
                    onClick={handleContinue}
                    showArrow
                  />
                </div>
              ) : (
                // Grid layout for the "OTP" step
                <div className="grid grid-cols-2 gap-2">
                  {step !== "EMAIL" && (
                    <WhiteAuthBtnSmall
                      label="Back"
                      onClick={() => setStep(step === "OTP" ? "EMAIL" : "OTP")}
                    />
                  )}
                  <AuthBtnSmall
                    label="Continue"
                    onClick={handleContinue}
                    disabled={
                      step === "PASSWORD" && !validatePassword(newPassword)
                    }
                    showArrow
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {step === "EMAIL" && (
        <AuthFooter
          label="Sign up"
          href="/register"
          text="Don't have account?"
        />
      )}
    </main>
  );
}

function ShowSendEmail({ email }: { email: string }) {
  return (
    <p className="mb-2 text-xs text-gray-500">
      Code has been send to
      <span className="ml-1 font-semibold">{email}</span>
    </p>
  );
}

function ResendOtp() {
  return (
    <p className="mt-2 text-center text-xs font-semibold text-gray-500">
      Didn't get the code?
      <a className="link ml-1 text-blue-500">Resend</a>
    </p>
  );
}
