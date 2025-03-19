import ApiService from "@/services/ApiService";
import { SignInResponse } from "@/@types/auth";

export const AuthService = {
  async signIn(username: string, password: string): Promise<SignInResponse> {
    const res = await ApiService.fetchData<{ username: string, password: string }, SignInResponse>({
      url: '/auth/login',
      method: 'POST',
      data: { username, password }
    })
    return res.data;
  }
}
