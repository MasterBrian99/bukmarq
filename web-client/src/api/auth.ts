import axios from "@/utils/axios";

type loginData = {
  username: string;
  password: string;
};
export async function loginAuth(
  data: loginData
): Promise<{ jwt: string; message: string; expiresIn: number }> {
  const res = await axios.post("/auth/login", data);
  return res as unknown as { jwt: string; message: string; expiresIn: number };
}
