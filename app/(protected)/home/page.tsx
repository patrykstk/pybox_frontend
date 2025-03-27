import { getUserData } from "@/server/get-user-data";

const HomePage = async () => {
  const data = await getUserData();

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      {data.name} {data.surname}
    </div>
  );
};

export default HomePage;
