"use client";

import { getPatientAppointments } from "@/lib/appoinment";
import { useEffect, useState } from "react";
import {
  FaCheckCircle,
  FaClock,
  FaMoneyBillWave,
  FaReceipt,
} from "react-icons/fa";

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPayments = async () => {
      try {
        const result = await getPatientAppointments();

        console.log("Payment appointments:", result);

        setPayments(result.data || []);
      } catch (error) {
        console.error("Get payment history error:", error);
        setPayments([]);
      } finally {
        setLoading(false);
      }
    };

    loadPayments();
  }, []);

  // ==============================
  // Paid payments
  // ==============================

  const paidPayments = payments.filter(
    (payment) =>
      payment.paymentStatus?.toLowerCase() === "paid"
  );

  // ==============================
  // Pending payments
  // ==============================

  const pendingPayments = payments.filter(
    (payment) =>
      payment.paymentStatus?.toLowerCase() === "pending"
  );

  // ==============================
  // Total paid amount
  // ==============================

  const totalPayments = paidPayments.reduce(
    (total, payment) =>
      total + Number(payment.consultationFee || 0),
    0
  );

  // ==============================
  // Date formatter
  // ==============================

  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // ==============================
  // Loading
  // ==============================

  if (loading) {
    return (
      <section className="min-h-screen bg-gray-50 px-4 py-8 dark:bg-slate-950 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
            Payment History
          </h1>

          <p className="mt-2 text-gray-500 dark:text-slate-400">
            Loading your payment history...
          </p>

          <div className="mt-10 flex justify-center">
            <span className="loading loading-spinner loading-lg text-cyan-600" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 px-4 py-8 dark:bg-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
            Payment History
          </h1>

          <p className="mt-2 text-gray-500 dark:text-slate-400">
            View your paid appointments and transaction records.
          </p>
        </div>

        {/* Summary */}

        <div className="mb-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {/* Total Payments */}

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-slate-400">
                  Total Payments
                </p>

                <h2 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                  ৳ {totalPayments.toLocaleString()}
                </h2>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-100 text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-400">
                <FaMoneyBillWave />
              </div>
            </div>
          </div>

          {/* Paid */}

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-slate-400">
                  Paid Appointments
                </p>

                <h2 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                  {paidPayments.length}
                </h2>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-600 dark:bg-green-500/10 dark:text-green-400">
                <FaCheckCircle />
              </div>
            </div>
          </div>

          {/* Pending */}

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-slate-400">
                  Pending Payments
                </p>

                <h2 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                  {pendingPayments.length}
                </h2>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-100 text-yellow-600 dark:bg-yellow-500/10 dark:text-yellow-400">
                <FaClock />
              </div>
            </div>
          </div>
        </div>

        {/* Transaction Records */}

        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="border-b border-gray-200 px-5 py-5 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <FaReceipt className="text-cyan-600" />

              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                Transaction Records
              </h2>
            </div>
          </div>

          {payments.length === 0 ? (
            <div className="px-5 py-16 text-center">
              <FaReceipt className="mx-auto text-4xl text-gray-300 dark:text-slate-700" />

              <h3 className="mt-4 font-semibold text-gray-700 dark:text-slate-300">
                No payment records found
              </h3>

              <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">
                Your payment history will appear here after booking an
                appointment.
              </p>
            </div>
          ) : (
            <>
              {/* Desktop Table */}

              <div className="hidden overflow-x-auto md:block">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 dark:bg-slate-800/50">
                    <tr>
                      <th className="px-5 py-4 text-sm font-semibold text-gray-600 dark:text-slate-300">
                        Doctor
                      </th>

                      <th className="px-5 py-4 text-sm font-semibold text-gray-600 dark:text-slate-300">
                        Appointment
                      </th>

                      <th className="px-5 py-4 text-sm font-semibold text-gray-600 dark:text-slate-300">
                        Amount
                      </th>

                      <th className="px-5 py-4 text-sm font-semibold text-gray-600 dark:text-slate-300">
                        Transaction ID
                      </th>

                      <th className="px-5 py-4 text-sm font-semibold text-gray-600 dark:text-slate-300">
                        Status
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {payments.map((payment) => {
                      const isPaid =
                        payment.paymentStatus?.toLowerCase() === "paid";

                      return (
                        <tr
                          key={payment._id}
                          className="border-t border-gray-100 dark:border-slate-800"
                        >
                          {/* Doctor */}

                          <td className="px-5 py-5">
                            <p className="font-semibold text-gray-800 dark:text-white">
                              {payment.doctorName || "Doctor"}
                            </p>

                            <p className="text-sm text-gray-500 dark:text-slate-400">
                              {payment.specialization || "Specialist"}
                            </p>
                          </td>

                          {/* Appointment */}

                          <td className="px-5 py-5 text-sm text-gray-600 dark:text-slate-300">
                            {formatDate(payment.createdAt)}
                          </td>

                          {/* Amount */}

                          <td className="px-5 py-5 font-semibold text-gray-800 dark:text-white">
                            ৳{" "}
                            {Number(
                              payment.consultationFee || 0
                            ).toLocaleString()}
                          </td>

                          {/* Transaction */}

                          <td className="px-5 py-5 text-sm text-gray-500 dark:text-slate-400">
                            {payment.stripeSessionId || "N/A"}
                          </td>

                          {/* Status */}

                          <td className="px-5 py-5">
                            <span
                              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                isPaid
                                  ? "bg-green-100 text-green-600 dark:bg-green-500/10 dark:text-green-400"
                                  : "bg-yellow-100 text-yellow-600 dark:bg-yellow-500/10 dark:text-yellow-400"
                              }`}
                            >
                              {isPaid ? "Paid" : "Pending"}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}

              <div className="space-y-4 p-4 md:hidden">
                {payments.map((payment) => {
                  const isPaid =
                    payment.paymentStatus?.toLowerCase() === "paid";

                  return (
                    <div
                      key={payment._id}
                      className="rounded-xl border border-gray-200 p-4 dark:border-slate-700"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="font-semibold text-gray-800 dark:text-white">
                            {payment.doctorName || "Doctor"}
                          </h3>

                          <p className="text-sm text-gray-500 dark:text-slate-400">
                            {payment.specialization || "Specialist"}
                          </p>
                        </div>

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            isPaid
                              ? "bg-green-100 text-green-600 dark:bg-green-500/10 dark:text-green-400"
                              : "bg-yellow-100 text-yellow-600 dark:bg-yellow-500/10 dark:text-yellow-400"
                          }`}
                        >
                          {isPaid ? "Paid" : "Pending"}
                        </span>
                      </div>

                      <div className="mt-4 space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-500 dark:text-slate-400">
                            Appointment
                          </span>

                          <span className="text-gray-700 dark:text-slate-300">
                            {formatDate(payment.createdAt)}
                          </span>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-gray-500 dark:text-slate-400">
                            Amount
                          </span>

                          <span className="font-semibold text-gray-800 dark:text-white">
                            ৳{" "}
                            {Number(
                              payment.consultationFee || 0
                            ).toLocaleString()}
                          </span>
                        </div>

                        <div className="flex justify-between gap-4">
                          <span className="text-gray-500 dark:text-slate-400">
                            Transaction
                          </span>

                          <span className="max-w-[180px] truncate text-gray-700 dark:text-slate-300">
                            {payment.stripeSessionId || "N/A"}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default PaymentHistory;