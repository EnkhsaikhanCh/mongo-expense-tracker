"use client";

import { Toaster, toast } from "sonner";
import { Mutator } from "@/app/utils";
import { useState } from "react";
import { Field } from "@/components/Field";
import { PasswordField } from "@/components/PasswordField";
import { AuthBtnSmall } from "@/components/AuthBtnSmall";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface ApiResponseError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export function RegisterForm() {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rePassword, setRePassword] = useState<string>("");
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const validateForm = () => {
    if (!username || !email || !password || !rePassword) {
      toast.warning("All fields are required");
      return false;
    }

    if (password !== rePassword) {
      toast.warning("Passwords do not match!");
      return false;
    }

    if (!email.match(emailRegex)) {
      toast.warning("Invalid email format");
      return false;
    }

    return true;
  };

  const SignUpSubmit = async () => {
    if (!validateForm()) return;

    try {
      const promise = Mutator("users/signUp", {
        username,
        email,
        password,
      });
      toast.promise(promise, {
        loading: "Loading...",
        success: () => {
          window.location.href = "/login";
          return "Success Sign Up. Now Login";
        },
        error: (error: ApiResponseError) => {
          const message =
            error.response?.data?.message || "Error during sign up.";
          return message;
        },
      });
    } catch (error) {
      console.error("Error during sign up:", error);
      toast.error("An unexpected error occurred while signing up.");
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <>
      <div className="card w-full rounded-md border bg-white">
        <Toaster position="top-center" richColors />
        <div className="card-body px-[20px] py-4">
          <div className="flex flex-col gap-3">
            {/* Username */}
            <Field
              label="Username"
              type="text"
              value={username}
              onChange={setUsername}
            />

            {/* Email */}
            <Field
              label="Email"
              type="email"
              value={email}
              onChange={setEmail}
            />

            {/* Password */}
            <PasswordField
              label="Password"
              visible={passwordVisible}
              value={password}
              onChange={setPassword}
              toggleVisibility={togglePasswordVisibility}
              showForgotPassword={false}
            />

            {/* Confirm Password */}
            <PasswordField
              label="Confirm Password"
              visible={passwordVisible}
              value={rePassword}
              onChange={setRePassword}
              toggleVisibility={togglePasswordVisibility}
              showForgotPassword={false}
            />
          </div>

          {/* Sign up button */}
          <AuthBtnSmall label="Sign up" onClick={SignUpSubmit} />
        </div>
      </div>
    </>
  );
}
