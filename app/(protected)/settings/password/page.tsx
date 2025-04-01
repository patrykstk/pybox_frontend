import { ChangePassword } from "@/app/(protected)/settings/_components/change-password";

const SettingsPage = () => {
  return (
    <div className="flex flex-col w-full space-y-5">
      <h1 className="text-5xl uppercase font-bold">Zmiana hasła</h1>
      <ChangePassword />
    </div>
  );
};

export default SettingsPage;
