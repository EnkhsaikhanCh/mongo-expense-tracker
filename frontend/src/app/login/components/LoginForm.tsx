"use client";

import { Toaster, toast } from "sonner";
import { useState } from "react";
import { Field } from "@/components/Field";
import { PasswordField } from "@/components/PasswordField";
import { Mutator } from "@/app/utils";
import { AuthBtnSmall } from "@/components/AuthBtnSmall";
import { ApiResponseError } from "@/app/interface";
import { useAuth } from "@/context/AuthContext";

export function LoginForm() {
  const { login } = useAuth();
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const validateForm = () => {
    if (!username || !email || !password) {
      toast.warning("All fields are required");
      return false;
    }

    return true;
  };

  const LoginSubmit = async () => {
    if (!validateForm()) return;

    try {
      const loginPromise = Mutator("users/login", {
        username,
        email,
        password,
      });

      toast.promise(loginPromise, {
        loading: "Logging in...",
        success: (accessToken: string) => {
          login(accessToken);
          return "Logged in successfully!";
        },
        error: (error: ApiResponseError) => {
          const message =
            error.response?.data?.message || "Error during login.";
          return message;
        },
      });
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
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
          <Field label="Email" type="email" value={email} onChange={setEmail} />

          {/* Password */}
          <PasswordField
            label="Password"
            visible={passwordVisible}
            value={password}
            onChange={setPassword}
            toggleVisibility={togglePasswordVisibility}
            showForgotPassword={true}
          />

          {/* Login button */}
          <AuthBtnSmall label="Log in" onClick={LoginSubmit} />
        </div>
      </div>
    </div>
  );
}
