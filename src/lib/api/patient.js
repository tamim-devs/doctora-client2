import { baseUrl } from "@/lib/api/server";


export const verifiedPatients = async (data) => {
  try {
    const res = await fetch(`${baseUrl}/patients/profile`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    console.log("Status:", res.status);
    console.log("Response OK:", res.ok);

    const result = await res.json();

    console.log("Backend Response:", result);

    if (!res.ok) {
      throw new Error(
        result.message || result.msg || "Failed to update patient profile"
      );
    }

    return result;
  } catch (error) {
    console.error("verifiedPatients error:", error);
    throw error;
  }
};