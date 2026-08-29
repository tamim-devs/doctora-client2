"use client";

import { useState } from "react";
import { FaSearch, FaFilter, FaRedo } from "react-icons/fa";

const SPECIALIZATIONS = [
  "Cardiologist",
  "Neurologist",
  "Dermatologist",
  "Orthopedics",
  "Pediatrics",
  "Psychiatrist",
];

const DoctorFilterPanel = ({
  onFilter,
}) => {
  const [search, setSearch] = useState("");
  const [specialization, setSpecialization] = useState("");

  const handleSearch = () => {
    onFilter({
      search,
      specialization,
    });
  };

  const handleReset = () => {
    setSearch("");
    setSpecialization("");

    onFilter({
      search: "",
      specialization: "",
    });
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
      <div className="grid gap-4 md:grid-cols-3">

        {/* Search */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-slate-300">
            Search Doctor
          </label>

          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
              placeholder="Doctor name..."
              className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-cyan-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            />
          </div>
        </div>

        {/* Specialization */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-slate-300">
            Specialization
          </label>

          <select
            value={specialization}
            onChange={(e) =>
              setSpecialization(e.target.value)
            }
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-cyan-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
          >
            <option value="">
              All Specializations
            </option>

            {SPECIALIZATIONS.map((item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            ))}
          </select>
        </div>

        {/* Buttons */}
        <div className="flex items-end gap-3">
          <button
            onClick={handleSearch}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-cyan-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-cyan-700"
          >
            <FaFilter />
            Apply Filter
          </button>

          <button
            onClick={handleReset}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-300 text-gray-500 transition hover:bg-gray-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <FaRedo />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorFilterPanel;