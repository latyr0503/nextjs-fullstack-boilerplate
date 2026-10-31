/**
 * Utilitaires d'authentification pour le client et le serveur
 */

export const getToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

export const getServerToken = async (): Promise<string | null> => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  try {
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    return cookieStore.get("token")?.value || null;
  } catch (error) {
    console.error("Erreur lors de la récupération du token côté serveur:", error);
    return null;
  }
};

export const getUser = <T = Record<string, unknown>>(): T | null => {
  if (typeof window !== "undefined") {
    const userStr = localStorage.getItem("user");
    if (!userStr) return null;
    try {
      return JSON.parse(userStr) as T;
    } catch {
      return null;
    }
  }
  return null;
};

export const isAuthenticated = (): boolean => {
  return !!getToken();
};

export const logout = async () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    document.cookie =
      "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax";
    window.location.href = "/login";
  }
};
