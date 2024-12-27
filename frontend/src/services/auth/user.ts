import axiosInstance from "@/lib/axios-instance";

export async function getUserByToken() {
  try {
    const resp = await axiosInstance.get("/auth/me");

    return resp;
  } catch (error: any) {
    return error?.response?.data?.message ?? "Error!";
  }
}
