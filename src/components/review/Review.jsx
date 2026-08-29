"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FaStar, FaUser } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import SectionHeading from "@/components/SectionHeading";
import { GetAllReviews } from "@/lib/api/reviews";

const Review = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadReviews = async () => {
      try {
        const result = await GetAllReviews();

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
      <section className="bg-cyan-50 py-20 dark:bg-black">
        <div className="container mx-auto px-5">
          <SectionHeading
            title="Patient Success Stories"
            subtitle="Hear what our patients say about their healthcare experience."
          />

          <p className="mt-10 text-center text-gray-500">
            Loading reviews...
          </p>
        </div>
      </section>
    );
  }

  if (reviews.length === 0) {
    return null;
  }

  return (
    <section className="bg-cyan-50 py-20 dark:bg-black">
      <div className="container mx-auto px-5">
        <SectionHeading
          title="Patient Success Stories"
          subtitle="Hear what our patients say about their healthcare experience."
        />

        <div className="mt-12">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={24}
            loop={reviews.length > 3}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
          >
            {reviews.map((review) => (
              <SwiperSlide key={review._id}>
                <div className="h-full rounded-2xl bg-white p-6 shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-xl dark:bg-slate-900">
                  
                  {/* Rating */}
                  <div className="mb-4 flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar
                        key={star}
                        className={
                          star <= Number(review.rating)
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </div>

                  {/* Review */}
                  <p className="mb-6 min-h-[110px] leading-7 text-gray-600 dark:text-slate-300">
                    "{review.comment}"
                  </p>

                  {/* Patient */}
                  <div className="flex items-center gap-4">
                    {review.patientImage ? (
                      <Image
                        src={review.patientImage}
                        alt={review.patientName || "Patient"}
                        width={56}
                        height={56}
                        className="h-14 w-14 rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-cyan-100 text-cyan-600">
                        <FaUser />
                      </div>
                    )}

                    <div>
                      <h3 className="font-semibold text-gray-800 dark:text-white">
                        {review.patientName || "Anonymous Patient"}
                      </h3>

                      <p className="text-sm text-gray-500">
                        Verified Patient
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Review;