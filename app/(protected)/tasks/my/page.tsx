import { MyTaskTable } from "@/app/(protected)/tasks/_components/task-table/my-task-table";

const MyTasksPage = () => {
  return (
    <div className="flex flex-col w-full space-y-5">
      <h1 className="text-5xl uppercase font-bold">Moje zadania</h1>
      <h6 className="text-xl ">Wybierz, które zadanie chcesz zmodyfikować.</h6>
      <MyTaskTable />
    </div>
  );
};

export default MyTasksPage;
