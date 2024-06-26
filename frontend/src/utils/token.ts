export const getAccessToken = (): string | null => {
  return typeof window !== "undefined"
    ? localStorage.getItem("accessToken")
    : null;
};

export const setAccessToken = (token: string): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem("accessToken", token);
  }
};

export const removeAccessToken = (): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("accessToken");
  }
};
