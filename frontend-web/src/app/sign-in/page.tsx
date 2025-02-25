"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";

const signInSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignInFormData = z.infer<typeof signInSchema>;

const SignInForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: SignInFormData) => {
    setIsSubmitting(true);
    try {
      console.log(data);

      toast.success("Sign in successful!", { duration: 3000 });
      reset(); 
    } catch (error) {
      toast.error("Sign in failed. Please try again.");
      console.error("Sign in failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-h-screen bg-black overflow-y-hidden h-screen flex items-center justify-center">
      <div className="max-w-lg w-96 mx-auto bg-white shadow-lg rounded-lg p-6">
        <Toaster position="top-center" />
        <h2 className="text-xl text-black font-semibold text-center mb-4">Sign In</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              {...register("email")}
              className="w-full border rounded-lg p-2 mt-1 focus:ring focus:ring-blue-300"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              {...register("password")}
              className="w-full border rounded-lg p-2 mt-1 focus:ring focus:ring-blue-300"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
          </button>
          <p className="mt-4 text-sm text-center text-gray-600">
            Don&apos;t have an account? <Link href="/sign-up" className="font-medium text-blue-600">Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignInForm;
