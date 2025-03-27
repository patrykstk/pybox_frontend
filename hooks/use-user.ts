import { useEffect, useState } from "react";
import api from "@/lib/api"; // Twoja instancja axios

// Hook do pobrania danych użytkownika
const useUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Funkcja do pobrania danych użytkownika
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await api.get("/user");
        console.log("Response:", response); // Logowanie odpowiedzi z serwera

        if (response.data.status === "success") {
          setUser(response.data.user);
        } else {
          setError(
            "Failed to fetch user data: " + response.data.message ||
              "Unknown error",
          );
        }
      } catch (err) {
        console.error("Error fetching user data:", err); // Logowanie błędu
        setError(
          "Error fetching user data: " +
            (err.response?.data?.message || err.message || "Unknown error"),
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []); // Pusty array sprawia, że zapytanie jest wykonywane tylko raz po załadowaniu komponentu

  return { user, loading, error };
};

export default useUser;
