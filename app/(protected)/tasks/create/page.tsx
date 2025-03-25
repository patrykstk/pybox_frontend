import { CreateForm } from "@/app/(protected)/tasks/_components/create-form";

const CreateTestPage = () => {
  return (
    <div className="flex flex-col w-full space-y-5">
      <h1 className="text-5xl uppercase font-bold">Tworzenie testu</h1>
      <CreateForm />
    </div>
  );
};

export default CreateTestPage;
