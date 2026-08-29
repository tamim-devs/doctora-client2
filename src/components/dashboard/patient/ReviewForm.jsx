"use client";

import { useEffect, useState } from "react";
import { FaStar, FaTimes } from "react-icons/fa";

const ReviewForm = ({ review, onClose, onSubmit }) => {
  const [rating, setRating] = useState(review?.rating || 0);
  const [reviewText, setReviewText] = useState(review?.review || "");

  useEffect(() => {
    setRating(review?.rating || 0);
    setReviewText(review?.review || "");
  }, [review]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!rating) {
      alert("Please select a rating.");
      return;
    }

    if (!reviewText.trim()) {
      alert("Please write your review.");
      return;
    }

    onSubmit({
      doctorId: review?.doctorId || "DOC-001",
      doctorName: review?.doctorName || "Dr. Sarah Ahmed",
      specialization: review?.specialization || "Cardiologist",
      rating,
      review: reviewText.trim(),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
      <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-slate-900">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4 dark:border-slate-800 sm:px-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {review ? "Edit Review" : "Add Review"}
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">
              {review
                ? "Update your experience."
                : "Share your experience with this doctor."}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-gray-100 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            <FaTimes />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 p-5 sm:p-6">
          {/* Doctor */}
          <div className="rounded-xl bg-cyan-50 p-4 dark:bg-cyan-500/10">
            <p className="text-xs font-medium text-gray-500 dark:text-slate-400">
              Doctor
            </p>

            <h3 className="mt-1 font-semibold text-gray-900 dark:text-white">
              {review?.doctorName || "Dr. Sarah Ahmed"}
            </h3>

            <p className="text-sm text-cyan-600">
              {review?.specialization || "Cardiologist"}
            </p>
          </div>

          {/* Rating */}
          <div>
            <label className="mb-3 block text-sm font-semibold text-gray-700 dark:text-slate-300">
              Your Rating
            </label>

            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="cursor-pointer transition hover:scale-110"
                >
                  <FaStar
                    className={`text-2xl ${
                      star <= rating
                        ? "text-yellow-400"
                        : "text-gray-300 dark:text-slate-700"
                    }`}
                  />
                </button>
              ))}
            </div>

            {rating > 0 && (
              <p className="mt-2 text-xs text-gray-500 dark:text-slate-400">
                You selected {rating} out of 5 stars.
              </p>
            )}
          </div>

          {/* Review */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-slate-300">
              Your Review
            </label>

            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              rows={5}
              placeholder="Write about your experience..."
              className="w-full resize-none rounded-xl border border-gray-200 bg-white p-4 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500"
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-cyan-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyan-700"
            >
              {review ? "Update Review" : "Submit Review"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewForm;