import { ChangePassword } from "@/app/(protected)/settings/_components/change-password";

const SettingsPage = () => {
  return (
    <div className="flex flex-col">
      <h1>Settings</h1>
      <h6>Tutaj zmienisz ustawienia</h6>
      <ChangePassword />
    </div>
  );
};

export default SettingsPage;
