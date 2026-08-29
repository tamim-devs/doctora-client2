"use client";

import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash, FaUserDoctor } from "react-icons/fa6";
  import { useForm } from "react-hook-form";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);




const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm({
  mode: "all",
});

  const handleGoogleSignin = async()=>{
await authClient.signIn.social({
  provider: 'google'
})
}



 const onSubmit = async (data) => {
  setLoading(true);

  const { data: loginData, error } =
    await authClient.signIn.email({
      email: data.email,
      password: data.password,
    });

  if (error) {
    toast.error(error.message);
    setLoading(false);
    return;
  }

  toast.success("Login Successful");
  redirect('/')
  console.log(loginData);

  setLoading(false);
};
 
  return (
    <section className="min-h-screen bg-linear-to-br from-cyan-50 via-white to-blue-50">
      <div className="container mx-auto min-h-screen flex items-center justify-center px-5 py-10">
        <div className="grid w-full max-w-6xl overflow-hidden rounded-3xl bg-white shadow-2xl lg:grid-cols-2">
          {/* Left Side */}
          <div className="hidden lg:flex flex-col justify-center bg-cyan-600 p-14 text-white">
            <span className="mb-4 w-fit rounded-full bg-white/20 px-4 py-2 text-sm">
              Welcome Back
            </span>

            <h1 className="text-5xl font-bold leading-tight">DOCTORA</h1>

            <p className="mt-6 font-bold text-slate-100 leading-7">
              Receive trusted healthcare from experienced doctors. Book
              appointments, manage your medical history, and stay connected with
              quality care whenever you need it.
            </p>

            <div className="mt-12 grid grid-cols-3 gap-4">
              <div className="rounded-xl bg-white/10 p-5 text-center backdrop-blur">
                <h2 className="text-3xl font-bold">24/7</h2>
                <p className="mt-2 text-sm">Support</p>
              </div>

              <div className="rounded-xl bg-white/10 p-5 text-center backdrop-blur">
                <h2 className="text-3xl font-bold">500+</h2>
                <p className="mt-2 text-sm">Doctors</p>
              </div>

              <div className="rounded-xl bg-white/10 p-5 text-center backdrop-blur">
                <h2 className="text-3xl font-bold">50K+</h2>
                <p className="mt-2 text-sm">Patients</p>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center justify-center p-8 sm:p-12">
            <div className="w-full max-w-md">
              <div className="mb-8 text-center">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-white border ">
                  <FaUserDoctor className="text-4xl text-blue-500" />
                </div>

                <h2 className="text-3xl font-bold text-gray-800">Sign In</h2>

                <p className="mt-2 text-gray-500">
                  Login to your healthcare account
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div>
  <label className="mb-2 block font-medium text-gray-700">
    Email Address
  </label>

  <input
    {...register("email")}
    id="email"
    type="email"
    placeholder="doctor@example.com"
    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-cyan-500"
  />
</div>

          <div>
  <label className="mb-2 block font-medium text-gray-700">
    Password
  </label>

  <div className="relative">
    <input
      {...register("password", {
        required: "Password is required",
      })}
      type={showPassword ? "text" : "password"}
      placeholder="Enter your password"
      className={`w-full rounded-xl border px-4 py-3 pr-12 outline-none transition ${
        errors.password
          ? "border-red-500 focus:border-red-500"
          : "border-gray-300 focus:border-cyan-500"
      }`}
    />

    <button
      type="button"
      onClick={() => setShowPassword((prev) => !prev)}
      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-cyan-600"
    >
      {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
    </button>
  </div>

  {errors.password && (
    <p className="mt-1 text-sm text-red-500">
      {errors.password.message}
    </p>
  )}
</div>

{errors.password && (
  <p className="text-red-500 text-sm mt-1">
    {errors.password.message}
  </p>
)}

                <button
                type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-cyan-600 py-3 font-semibold text-white transition hover:bg-cyan-700 disabled:opacity-70"
                >
                  {loading ? "Signing In..." : "Sign In"}
                </button>
              </form>

              <div className="my-6 flex items-center">
                <div className="h-px flex-1 bg-gray-300" />
                <span className="mx-3 text-sm text-gray-400">OR</span>
                <div className="h-px flex-1 bg-gray-300" />
              </div>

              <button onClick={handleGoogleSignin} className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl border border-gray-300 py-3 font-medium transition hover:bg-gray-100 text-black">
                <FcGoogle className="text-2xl " />
                Sign up with Google
              </button>

              <p className="mt-8 text-center text-gray-500">
                Don't have an account?
                <Link href='/register' className="ml-2 cursor-pointer font-semibold text-cyan-600 hover:underline">
                  Register
                </Link>
              </p>

              <p className="text-xl font-bold text-black">gmail : admin1@gmail.com 

                pass : ADmin1@22


                gmail : Paiten@gmail.com

                pass : Paiten@22 


                gmail : doctor@gmail.com 

                pass : DOCtor@@2
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
