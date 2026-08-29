import { baseUrl } from "@/lib/api/server";
import { authClient } from "@/lib/auth-client";

export const GetAdminStats = async () => {
  const { data: tokenData } = await authClient.token();

  const token = tokenData?.token;

  const res = await fetch(`${baseUrl}/admin/stats`, {
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
        "Failed to fetch admin stats"
    );
  }

  return result;
};













export const verifyDoctor = async (doctorId) => {
  const { data: tokenData } = await authClient.token();

  const token = tokenData?.token;

  const res = await fetch(`${baseUrl}/admin/doctors/${doctorId}/approve`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to verify doctor");
  }

  return data;
};

// Delete doctor
export const deleteDoctor = async (doctorId) => {
  const { data: tokenData } = await authClient.token();

  const token = tokenData?.token;

  const res = await fetch(`${baseUrl}/admin/doctors/${doctorId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to delete doctor");
  }

  return data;
};






