"use client";

import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaUserDoctor } from "react-icons/fa6";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { imageUpload } from "@/utils/imgUpload";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { redirect, useRouter } from "next/navigation";
export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "all",
  });
  

  const handleGoogleSignin = async()=>{
await authClient.signIn.social({
  provider: 'google'
})
}

  const router = useRouter()
  const onSubmit = async (data) => {
    console.log("🔥 SUBMIT CALLED");
    try {
      setLoading(true);
      console.log(data);
      setUploadProgress(0);

      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(interval);
            return prev;
          }
          return prev + 10;
        });
      }, 200);
      const imageFile = data.image[0];
      const imageUrl = await imageUpload(imageFile);
      console.log("Image URL:", imageUrl);
      clearInterval(interval);
      setUploadProgress(100);

      const { data: signupData, error: signUpError } =
        await authClient.signUp.email({
          email: data.email,
          password: data.password,
          name: data.name,
          image: imageUrl,
          role: data.role,
          number: data.number,
          gender: data.gender,
          status: data.role === "doctor" ? "unverified" : "active",
        });
     console.log("SIGNUP DATA:", signupData);
console.log("SIGNUP ERROR:", signUpError);
     
if (signUpError) {
  console.log("Registration error:", signUpError);
  toast.error(signUpError.message || "Registration failed");
  return;
}

toast.success("Registration Successful");
router.push("/login");
    } catch (error) {
      console.error(error);
      toast.error("Registration failed");
    } finally {
      setTimeout(() => {
        setLoading(false);
        setUploadProgress(0);
      }, 1000);
    }
  };

  return (
    <section className="min-h-screen bg-linear-to-br from-cyan-50 via-white to-blue-50">
      <div className="container mx-auto flex min-h-screen items-center justify-center px-5 py-10">
        <div className="grid w-full max-w-6xl overflow-hidden rounded-3xl bg-white shadow-2xl lg:grid-cols-2">
      
          <div className="hidden flex-col justify-center bg-cyan-600 p-14 text-white lg:flex">
            <span className="mb-4 w-fit rounded-full bg-white/20 px-4 py-2 text-sm">
              Join Our Healthcare Platform
            </span>

            <h1 className="text-5xl font-bold">DOCTORA</h1>

            <p className="mt-6 leading-8 text-cyan-100">
              Create your DOCTORA account to book appointments, connect with
              experienced doctors, access your medical records, and receive
              quality healthcare services anytime, anywhere.
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

       
          <div className="flex items-center justify-center p-8 sm:p-12">
            <div className="w-full max-w-md">
              <div className="mb-8 text-center">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border bg-white">
                  <FaUserDoctor className="text-4xl text-cyan-600" />
                </div>

                <h2 className="text-3xl font-bold text-gray-800">
                  Create Account
                </h2>

                <p className="mt-2 text-gray-500">
                  Join DOCTORA and start your healthcare journey.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <label className="mb-2 block font-medium text-gray-700">
                  Full Name
                </label>
                <div className="relative">
                  <input
                    {...register("name", {
                      required: "Please write your  full name",
                    })}
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    className="w-full rounded-xl text-black border border-gray-300 px-4 py-3 outline-none transition focus:border-cyan-500"
                  />

                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block font-medium text-gray-700">
                    Email Address
                  </label>

                  <input
                    {...register("email", {
                      required: "Please write your  email",
                    })}
                    id="email"
                    type="email"
                    placeholder="doctor@example.com"
                    className="w-full rounded-xl text-black border border-gray-300 px-4 py-3 outline-none transition focus:border-cyan-500"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block font-medium text-gray-700">
                    Password
                  </label>

                  <div className="relative">
                    <input
                      {...register("password", {
                        required: "Password is required",
                        validate: (value) => {
                          if (value.length < 6) {
                            return "Password must be at least 6 characters.";
                          }

                          if (!/\d/.test(value)) {
                            return "Password must contain at least one number.";
                          }

                          if (!/[^A-Za-z0-9]/.test(value)) {
                            return "Password must contain at least one special character.";
                          }

                          return true;
                        },
                      })}
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className={`w-full text-black rounded-xl border px-4 py-3 pr-12 outline-none transition ${
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
                      {showPassword ? (
                        <FaEyeSlash size={18} />
                      ) : (
                        <FaEye size={18} />
                      )}
                    </button>
                  </div>

                  {errors.password && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>

              
                <div className="space-y-3">
                  <label className="block font-medium text-gray-700">
                    Profile Photo
                  </label>

                  <input
                    id="image"
                    type="file"
                    accept="image/*"
                    {...register("image", { required: "Image is required" })}
                    className="w-full cursor-pointer rounded-xl border border-gray-300 text-black bg-white px-3 py-2"
                  />

                  <div>
                    <label className="mb-2 block font-medium text-black">
                      Phone Number
                    </label>

                    <Controller
                      name="number"
                      control={control}
                      rules={{
                        required: "Please enter your phone number",
                        validate: (value) => {
                          if (!value) return "Please enter your phone number";

                        
                          if (!/^\d+$/.test(value)) {
                            return "Invalid phone number";
                          }

                       
                          if (value.length < 10 || value.length > 15) {
                            return "Phone number must be between 10 and 15 digits";
                          }

                          return true;
                        },
                      }}
                      render={({ field }) => (
                        <PhoneInput
                          country="bd"
                          enableSearch
                          value={field.value}
                          onChange={field.onChange}
                          inputStyle={{
                            width: "100%",
                            height: "52px",
                            color: "black",
                            borderRadius: "12px",
                            border: errors.number
                              ? "1px solid #ef4444"
                              : "1px solid #d1d5db",
                            fontSize: "16px",
                          }}
                          buttonStyle={{
                            borderTopLeftRadius: "12px",
                            borderBottomLeftRadius: "12px",
                            border: errors.number
                              ? "1px solid #ef4444"
                              : "1px solid #d1d5db",
                          }}
                          containerStyle={{
                            width: "100%",
                          }}
                        />
                      )}
                    />

                    {errors.number && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.number.message}
                      </p>
                    )}
                  </div>

                  {/* Role  */}

                  <div>
                    <label className="mb-3 block font-medium text-gray-700">
                      Gender
                    </label>

                    <div className="flex items-center gap-6">
                      <label className="flex cursor-pointer items-center gap-2">
                        <input
                          value="male"
                          type="radio"
                          {...register("gender", {
                            required: "Please select your gender",
                          })}
                          className="h-4 w-4 accent-cyan-600"
                        />
                        <span className="text-black">👨 Male</span>
                      </label>

                      <label className="flex cursor-pointer items-center gap-2">
                        <input
                          type="radio"
                          value="female"
                          {...register("gender", {
                            required: "Please select your gender",
                          })}
                          className="h-4 w-4 accent-cyan-600"
                        />
                        <span className="text-black">👩 Female</span>
                      </label>

                      <label className="flex cursor-pointer items-center gap-2">
                        <input
                          type="radio"
                          value="other"
                          {...register("gender", {
                            required: "Please select your gender",
                          })}
                          className="h-4 w-4 accent-cyan-600"
                        />
                        <span>
                          <span className="text-2xl font-bold text-blue-400">
                            ⚧️
                          </span>{" "}
                          <p className="text-black">Other</p>
                        </span>
                      </label>
                    </div>

                    {errors.gender && (
                      <p className="mt-2 text-sm text-red-500">
                        {errors.gender.message}
                      </p>
                    )}
                  </div>
                  {/* Progress */}
                  {loading && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium text-cyan-600">
                          Uploading Image...
                        </span>

                        <span className="font-bold">{uploadProgress}%</span>
                      </div>

                      <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200">
                        <div
                          className="h-full rounded-full bg-linear-to-r from-cyan-500 to-blue-600 transition-all duration-300"
                          style={{ width: `${uploadProgress}%` }}
                        />
                      </div>

                      <p className="text-center text-xs text-gray-500">
                        {uploadProgress < 100
                          ? `${100 - uploadProgress}% remaining`
                          : "Upload Complete 🎉"}
                      </p>
                    </div>
                  )}

                  {errors.image && (
                    <p className="text-sm text-red-500">
                      {errors.image.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="mb-2 block font-medium text-gray-700">
                    Register As
                  </label>

                  <select
                    defaultValue=""
                    {...register("role", {
                      required: "Please select a role",
                    })}
                    id="role"
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm sm:text-base outline-none transition text-black focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                  >
                    <option value="" disabled>
                      Select your role
                    </option>
                    <option value="patient">🧑 Patient</option>
                    <option value="doctor">🩺 Doctor</option>
                  </select>
                  {errors.role && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.role.message}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-cyan-600 py-3 font-semibold text-white transition hover:bg-cyan-700 disabled:opacity-70"
                >
                  {loading
                    ? `Uploading... ${uploadProgress}%`
                    : "Create Account"}
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
                Already have an account?
                <Link
                  href="/login"
                  className="ml-2 cursor-pointer font-semibold text-cyan-600 hover:underline"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
