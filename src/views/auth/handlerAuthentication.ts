import { api } from "@/main";
import type { LoginForm } from "@/types/forms";
import { isAxiosError } from "axios";
import type { AxiosResponseError, ResponseApi } from "./types";

export async function handleAuthentication(form: LoginForm) {
  let message = "Erro ao realizar login";
  let result = false;
  try {
    const response: ResponseApi = await api.request({
      method: "POST",
      url: "/auth_admin/login",
      data: form,
    });

    if (response.data?.message) {
      result = true;
      message = response.data?.message;
    }
  } catch (err) {
    if (isAxiosError(err)) {
      const error: AxiosResponseError = err;
      if (error.response?.data?.message) {
        message = error.response?.data?.message;
        result = false;
      }
    }
  }

  if (import.meta.env.VITE_DEVMODE) {
    result = true;
  }

  return {
    message: message,
    result: result,
  };
}
