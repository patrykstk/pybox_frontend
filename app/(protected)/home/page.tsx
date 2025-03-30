import { AllTaskTable } from "@/app/(protected)/tasks/_components/task-table/all-task-table";

const HomePage = () => {
  return (
    <div className="flex flex-col w-full space-y-5">
      <h1 className="text-5xl uppercase font-bold">Lista dostępnych zadań</h1>
      <h6 className="text-xl ">
        Rozwiąż dowolne z poniższych zadań i sprawdź swoje umiejętności!
      </h6>
      <AllTaskTable />
    </div>
  );
};

export default HomePage;
