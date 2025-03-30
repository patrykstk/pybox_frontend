"use server";

import api from "@/lib/api";

const deleteAnswerWithId = async (answerId: number) => {
  try {
    const response = await api.delete(`/answer/${answerId}`);

    if (response.data.status === "success") {
      console.log(`usunieto zadanie o id ${answerId}`);
      return { success: "yay" };
    }
  } catch (error) {
    return { error: "bład" };
  }
};

export { deleteAnswerWithId };
