import React from "react";
import { getMyAnswerForTask } from "@/server/get-my-answer-for-task";

const Page = async () => {
  const answer = await getMyAnswerForTask(3);
  return <div>{JSON.stringify(answer, null, 2)}</div>;
};

export default Page;
