"use server";

import api from "@/lib/api";

const deleteTask = async (taskId: number) => {
  try {
    const response = await api.delete(`/task/${taskId}`);

    if (response.data.status === "success") {
      console.log(`usunieto zadanie o id ${taskId}`);
      return { success: "yay" };
    }
  } catch (error) {
    return { error: "bład" };
  }
};

export { deleteTask };
