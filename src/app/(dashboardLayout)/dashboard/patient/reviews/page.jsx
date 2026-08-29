"use client";

import EmptyReview from "@/components/dashboard/patient/EmptyReview";
import ReviewCard from "@/components/dashboard/patient/ReviewCard";
import { GetMyReviews } from "@/lib/api/reviews";
import { useEffect, useState } from "react";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadReviews = async () => {
      try {
        const result = await GetMyReviews();

        setReviews(result.data || []);
      } catch (error) {
        console.error("Failed to load reviews:", error);
        setReviews([]);
      } finally {
        setLoading(false);
      }
    };

    loadReviews();
  }, []);

  if (loading) {
    return (
      <section>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
          My Reviews
        </h1>

        <p className="mt-4 text-gray-500">
          Loading reviews...
        </p>
      </section>
    );
  }

  return (
    <section>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
          My Reviews
        </h1>

        <p className="mt-2 text-gray-500 dark:text-slate-400">
          See the reviews you have submitted for doctors.
        </p>
      </div>

      {/* Reviews */}
      {reviews.length > 0 ? (
        <div className="grid gap-5 lg:grid-cols-2">
          {reviews.map((review) => (
            <ReviewCard
              key={review._id}
              review={review}
            />
          ))}
        </div>
      ) : (
        <EmptyReview />
      )}
    </section>
  );
};

export default Reviews;