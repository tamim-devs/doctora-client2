
"use client";

import { CreateReview } from "@/lib/api/reviews";
import { useState } from "react";
import {
  FaStar,
  FaTimes,
  FaUserMd,
} from "react-icons/fa";

const WriteReview = ({ appointment, isOpen, onClose }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen || !appointment) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!rating) {
      alert("Please select a rating");
      return;
    }

    if (!comment.trim()) {
      alert("Please write your review");
      return;
    }

    try {
      setLoading(true);

      const reviewData = {
        doctorName: appointment.doctorName,
        appointmentId: appointment._id,
        doctorId: appointment.doctorId,
        rating: Number(rating),
        comment: comment.trim(),
      };

      const result = await CreateReview(reviewData);

      console.log("Review created:", result);

      alert("Review submitted successfully!");

      // Reset form
      setRating(0);
      setHoverRating(0);
      setComment("");

      onClose();
    } catch (error) {
      console.error("Submit review error:", error);

      alert(
        error.message || "Failed to submit review"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-6 backdrop-blur-sm">
      <div className="relative w-full max-w-lg rounded-3xl bg-white shadow-2xl dark:bg-slate-900">

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          disabled={loading}
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl text-gray-500 transition hover:bg-gray-100 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-slate-800"
        >
          <FaTimes />
        </button>

        <div className="p-6 sm:p-8">

          {/* Header */}
          <div className="pr-10">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-100 text-yellow-500 dark:bg-yellow-500/10">
              <FaStar className="text-2xl" />
            </div>

            <h2 className="mt-5 text-2xl font-bold text-gray-900 dark:text-white">
              Write a Review
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-slate-400">
              Share your experience and help other patients.
            </p>
          </div>

          {/* Doctor */}
          <div className="mt-6 flex items-center gap-4 rounded-2xl bg-cyan-50 p-4 dark:bg-cyan-500/10">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-100 text-cyan-600 dark:bg-cyan-500/20 dark:text-cyan-400">
              <FaUserMd />
            </div>

            <div>
              <p className="font-bold text-gray-900 dark:text-white">
                Dr. {appointment.doctorName}
              </p>

              <p className="text-sm text-cyan-600">
                {appointment.specialization}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-6">

            {/* Rating */}
            <div>
              <label className="mb-3 block text-sm font-bold text-gray-700 dark:text-slate-300">
                Your Rating
              </label>

              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    disabled={loading}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="text-3xl transition-transform hover:scale-110 disabled:cursor-not-allowed"
                  >
                    <FaStar
                      className={
                        star <= (hoverRating || rating)
                          ? "text-yellow-400"
                          : "text-gray-200 dark:text-slate-700"
                      }
                    />
                  </button>
                ))}
              </div>

              {rating > 0 && (
                <p className="mt-2 text-sm text-gray-500">
                  You selected {rating} out of 5 stars
                </p>
              )}
            </div>

            {/* Review */}
            <div className="mt-6">
              <label className="mb-2 block text-sm font-bold text-gray-700 dark:text-slate-300">
                Your Review
              </label>

              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={5}
                disabled={loading}
                placeholder="Tell us about your experience with this doctor..."
                className="w-full resize-none rounded-2xl border border-gray-200 bg-white p-4 text-sm text-gray-700 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            {/* Buttons */}
            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="rounded-xl bg-cyan-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Submitting..." : "Submit Review"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WriteReview;

