"use client";

import Image from "next/image";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

const Banner = ({ title, subtitle, buttonText, buttonLink, image }) => {
  const images = [image, "/doctor.png", "/doctor2.png", "/doctor3.png"].filter(
    (img) => typeof img === "string" && img.trim() !== "",
  );

  return (
    <section className="overflow-hidden bg-linear-to-r from-cyan-50 dark:from-black dark:via-black to-blue-50 dark:bg-black">
      <div className="container mx-auto flex flex-col-reverse items-center gap-10 px-5 pt-16 lg:flex-row lg:items-end lg:gap-16 lg:pt-20">
        {/* Left */}
        <div className="w-full lg:w-1/2 pb-10 lg:pb-16">
          <span className="inline-block rounded-full bg-cyan-100 px-4 py-2 text-sm font-medium text-cyan-700">
            🩺 Trusted Healthcare Platform
          </span>

          <h1 className="mt-6 text-black text-gray-600 dark:text-gray-300  max-w-4xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            {title}
          </h1>

          <p className="mt-6 max-w-xl text-gray-600 dark:text-gray-300 text-base leading-8 sm:text-lg">
  {subtitle}
</p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href={buttonLink}
              className="rounded-xl bg-cyan-600 px-7 py-4 font-semibold text-white transition hover:bg-cyan-700"
            >
              {buttonText}
            </Link>

            <Link
              href="/contact"
              className="rounded-xl border border-cyan-600 px-7 py-4 font-semibold text-cyan-600 transition hover:bg-cyan-50"
            >
              Contact Us
            </Link>
          </div>
        </div>

        {/* Right */}
        <div className="relative h-[320px] w-full lg:w-[45%] sm:h-[420px] md:h-[500px] lg:h-[620px]">
          {" "}
          <Swiper
            modules={[Autoplay]}
            loop
            speed={1000}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            className="h-full w-full"
          >
            {images.map((img, index) => (
              <SwiperSlide key={index}>
                <div className="relative h-full w-full">
                  <Image
                    src={img}
                    alt={`Banner ${index + 1}`}
                    fill
                    priority={index === 0}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-contain object-bottom"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Banner;
