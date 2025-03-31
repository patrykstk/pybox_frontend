"use server";

import api from "@/lib/api";

interface RatingData {
  answerId: string;
  rating: number;
}

const submitRating = async (data: RatingData) => {
  try {
    if (data.rating < 0 || data.rating > 5) {
      return { success: false, error: "Ocena musi być liczbą od 0 do 5" };
    }

    const response = await api.post(`/answer/${data.answerId}/mark`, {
      mark: data.rating,
    });

    return {
      success: true,
      message: response.data.message || "Ocena została zapisana pomyślnie!",
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
