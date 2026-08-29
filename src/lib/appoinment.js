import { baseUrl } from "@/lib/api/server";
import { authClient } from "@/lib/auth-client";

export const CreateAppointment = async (appointmentData) => {
  const { data: tokenData } = await authClient.token();

  const token = tokenData?.token;

  const res = await fetch(`${baseUrl}/appointments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(appointmentData),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.msg || result.message || "Failed to create appointment");
  }

  return result;
};

export const getPatientAppointments = async () => {
  const { data: tokenData } = await authClient.token();

  const token = tokenData?.token;

  console.log("GET APPOINTMENT TOKEN:", token);

  const res = await fetch(`${baseUrl}/appointments`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(
      result.msg || result.message || "Failed to fetch appointments"
    );
  }

  return result;
};



export const updateDoctorAppointmentStatus = async (
  appointmentId,
  status
) => {
  const { data: tokenData } = await authClient.token();

  const token = tokenData?.token;

  const res = await fetch(
    `${baseUrl}/doctor/appointments/${appointmentId}/status`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        status,
      }),
    }
  );

  const result = await res.json();

  if (!res.ok) {
    throw new Error(
      result.msg ||
        result.message ||
        "Failed to update appointment status"
    );
  }

  return result;
};


export const GetDoctorAppointments = async () => {
  const { data: tokenData } = await authClient.token();

  const token = tokenData?.token;

  const res = await fetch(`${baseUrl}/doctor/appointments`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch appointments");
  }

  return data;
};


