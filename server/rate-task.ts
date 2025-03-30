"use server";

import api from "@/lib/api";

interface RatingData {
  answerId: string;
  rating: number;
}

const submitRating = async (data: RatingData) => {
  try {
    if (!data.rating || data.rating < 0 || data.rating > 5) {
      return { success: false, error: "Ocena musi być liczbą od 0 do 5" };
    }

    const response = await api.post(`/answer/${data.answerId}/mark`, {
      mark: data.rating,
    });

    return {
      success: true,
      data: {
        id: Math.random().toString(36).substring(2, 9),
        ...data,
        createdAt: new Date().toISOString(),
      },
    };
  } catch (error) {
    console.error("Błąd podczas zapisywania oceny:", error);
    return {
      success: false,
      error:
        "Wystąpił błąd podczas zapisywania oceny. Spróbuj ponownie później.",
    };
  }
};

export { submitRating };
