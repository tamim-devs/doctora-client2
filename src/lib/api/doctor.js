import { baseUrl } from "@/lib/api/server";
import { authClient } from "@/lib/auth-client";






export const completeDoctorProfile = async (data) => {
  const { data: tokenData } = await authClient.token();

  const token = tokenData?.token;

  const res = await fetch(
    `${baseUrl}/doctors/profile`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );

  const result = await res.json();

  if (!res.ok) {
    throw new Error(
      result.message || result.msg || "Failed to complete doctor profile"
    );
  }

  return result;
};


export const GetAllDoctors = async ({
  search = "",
  specialization = "",
} = {}) => {
  const params = new URLSearchParams();

  if (search.trim()) {
    params.set("search", search.trim());
  }

  if (specialization.trim()) {
    params.set("specialization", specialization.trim());
  }

  const url = `${baseUrl}/doctors${
    params.toString() ? `?${params.toString()}` : ""
  }`;

  const res = await fetch(url, {
    method: "GET",
    cache: "no-store",
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(
      result.message || "Failed to fetch doctors"
    );
  }

  return result.data || [];
};

export const GetDoctorById = async (id) => {
  const res = await fetch(`${baseUrl}/doctors/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const result = await res.json().catch(() => ({}));

    throw new Error(
      result.message || result.msg || "Failed to fetch doctor"
    );
  }

  return res.json();
};


export const GetDoctorAppointments = async () => {
  const { data: tokenData } = await authClient.token();

  const token = tokenData?.token;

  const res = await fetch(`${baseUrl}/doctor/appointments`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(
      result.message ||
        result.msg ||
        "Failed to fetch doctor appointments"
    );
  }

  return result;
};


export const GetFeaturedDoctors = async () => {
  const res = await fetch(`${baseUrl}/doctors/featured`, {
    cache: "no-store",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(
      data.msg || "Failed to fetch featured doctors"
    );
  }

  return data;
};






export const getDoctorPatients = async () => {
  try {
    const { data: tokenData } = await authClient.token();

    const token = tokenData?.token;

    if (!token) {
      throw new Error("Authentication token not found");
    }

    const res = await fetch(`${baseUrl}/doctor/patients`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    const contentType = res.headers.get("content-type");

    console.log("PATIENT API URL:", `${baseUrl}/doctor/patients`);
    console.log("PATIENT API STATUS:", res.status);
    console.log("PATIENT API CONTENT TYPE:", contentType);

    // JSON না হলে সরাসরি error দেখাবে
    if (!contentType?.includes("application/json")) {
      const text = await res.text();

      console.error("PATIENT API RETURNED HTML:", text);

      throw new Error(
        `API returned ${contentType || "unknown response"} instead of JSON`
      );
    }

    const result = await res.json();

    if (!res.ok) {
      throw new Error(
        result.message ||
          result.msg ||
          "Failed to fetch patients"
      );
    }

    return result;
  } catch (error) {
    console.error("Failed to load patients:", error);
    throw error;
  }
};