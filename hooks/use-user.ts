"use client";

import { useEffect, useState } from "react";
import axios from "axios";

// Typ dla danych użytkownika
interface User {
  id: number;
  name: string;
  surname: string;
  email: string;
  created_at: string;
  roles: string[];
}

const useUser = () => {
  const [user, setUser] = useState<User | null>(null); // Stan użytkownika
  const [loading, setLoading] = useState<boolean>(true); // Stan ładowania
  const [error, setError] = useState<string | null>(null); // Stan błędu
  const [errorDetails, setErrorDetails] = useState<any | null>(null); // Szczegóły błędu

  useEffect(() => {
    // Funkcja do pobierania danych o użytkowniku
    const fetchUserData = async () => {
      try {
        const response = await axios.get("/user"); // Zapytanie do API
        setUser(response.data.user); // Ustaw dane użytkownika
      } catch (err: any) {
        // Jeżeli błąd jest związany z axios (np. odpowiedź HTTP 400/500)
        setError("Błąd podczas pobierania danych użytkownika.");
        setErrorDetails(err.response?.data || err.message || err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData(); // Uruchomienie funkcji po załadowaniu komponentu
  }, []); // Tylko raz, gdy komponent się zamontuje

  return { user, loading, error, errorDetails }; // Zwracamy dane użytkownika, stany i szczegóły błędu
};

export default useUser;
