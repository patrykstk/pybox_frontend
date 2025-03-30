import { ChangePassword } from "@/app/(protected)/settings/_components/change-password";

const SettingsPage = () => {
  return (
    <div className="flex flex-col">
      <h1>Zmiana hasła</h1>
      <ChangePassword />
    </div>
  );
};

export default SettingsPage;
