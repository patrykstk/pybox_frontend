import { ManageRoles } from "@/app/(protected)/settings/_components/manage-roles";
import { getUserData } from "@/server/get-user-data";

const ManageRolesPage = async () => {
  const user = await getUserData();
  // if (user && !user.roles.includes("manager")) return <Forbidden />;

  return (
    <div className="flex flex-col">
      <h1>Zarządzanie rolami</h1>
      <ManageRoles />
    </div>
  );
};

export default ManageRolesPage;
