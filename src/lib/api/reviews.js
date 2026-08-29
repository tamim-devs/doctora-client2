import { baseUrl } from "@/lib/api/server";
import { authClient } from "@/lib/auth-client";

export const GetDoctorReviews = async (doctorId) => {
  const res = await fetch(
    `${baseUrl}/reviews/doctor/${doctorId}`,
    {
      method: "GET",
      cache: "no-store",
    }
  );

  const result = await res.json();

  if (!res.ok) {
    throw new Error(
      result.msg ||
        result.message ||
        "Failed to fetch doctor reviews"
    );
  }

  return result;
};


export const GetMyReviews = async () => {
  const { data: tokenData } = await authClient.token();

  const token = tokenData?.token;

  const res = await fetch(`${baseUrl}/reviews/my`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(
      result.msg ||
        result.message ||
        "Failed to fetch my reviews"
    );
  }

  return result;
};




export const GetAllReviews = async () => {
  const res = await fetch(`${baseUrl}/reviews`, {
    method: "GET",
    cache: "no-store",
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(
      result.msg ||
        result.message ||
        "Failed to fetch reviews"
    );
  }

  return result;
};

export const CreateReview = async (reviewData) => {
  const { data: tokenData } = await authClient.token();

  const token = tokenData?.token;

  const res = await fetch(`${baseUrl}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(reviewData),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(
      result.msg ||
        result.message ||
        "Failed to submit review"
    );
  }

  return result;
};


