"use client";

import Image from "next/image";
import {
  FaEnvelope,
  FaUser,
  FaUserInjured,
} from "react-icons/fa";
import { authClient } from "@/lib/auth-client";

const PatientCard = () => {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <div className="rounded-2xl bg-white p-6 text-center shadow-sm dark:bg-slate-900">
        Loading...
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="rounded-2xl bg-white p-6 text-center shadow-sm dark:bg-slate-900">
        Please login first
      </div>
    );
  }

  const data = session.user;

  return (
    <div className="w-full">
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900">

        {/* Top Background */}
        <div className="h-24 bg-linear-to-r from-cyan-500 to-blue-600 sm:h-28" />

        <div className="relative px-5 pb-6 sm:px-7">

          {/* Profile Image */}
          <div className="-mt-12 sm:-mt-14">
            {data.image ? (
              <Image
                src={data.image}
                alt={data.name || "Patient"}
                width={110}
                height={110}
                className="h-24 w-24 rounded-2xl border-4 border-white object-cover shadow-md dark:border-slate-900 sm:h-28 sm:w-28"
              />
            ) : (
              <div className="flex h-24 w-24 items-center justify-center rounded-2xl border-4 border-white bg-cyan-100 dark:border-slate-900 sm:h-28 sm:w-28">
                <FaUser className="text-4xl text-cyan-600" />
              </div>
            )}
          </div>

          {/* Patient Info */}
          <div className="mt-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white sm:text-2xl">
              {data.name || "Patient"}
            </h2>

            <div className="mt-2 flex items-center gap-2 text-sm text-gray-500 dark:text-slate-400">
              <FaEnvelope className="text-cyan-600" />

              <span className="truncate">
                {data.email}
              </span>
            </div>
          </div>

          {/* Role */}
         <div className="flex flex-col">
             <div className="mt-5 flex items-center gap-3 rounded-xl bg-cyan-50 p-4 dark:bg-cyan-950/30">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-cyan-100 dark:bg-cyan-900">
              <FaUserInjured className="text-xl text-cyan-600" />
            </div>

            <div>
              <p className="text-xs text-gray-500 dark:text-slate-400">
                Account Type
              </p>

              <p className="font-semibold capitalize text-gray-800 dark:text-white">
                {data.role || "Patient"}
              </p>
            </div>


           



          </div>
            

             <div className="mt-5 flex items-center gap-3 rounded-xl bg-cyan-50 p-4 dark:bg-cyan-950/30">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-cyan-100 dark:bg-cyan-900">
              <FaUserInjured className="text-xl text-cyan-600" />
            </div>

            <div>
              <p className="text-xs text-gray-500 dark:text-slate-400">
                Account Status
              </p>

              <p className="font-semibold capitalize text-gray-800 dark:text-white">
                {data.status || "Patient"}
              </p>
            </div>


           



          </div>
         </div>
        </div>
      </div>
    </div>
  );
};

export default PatientCard;