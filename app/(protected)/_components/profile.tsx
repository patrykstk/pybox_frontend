import { getUserData } from "@/server/get-user-data";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Profile = async () => {
  const user = await getUserData();
  const initials =
    `${user.name.charAt(0)}${user.surname.charAt(0)}`.toUpperCase();

  return (
    <div className="flex flex-row gap-x-2 items-center">
      <Avatar>
        <AvatarFallback className="border border-black">
          {initials}
        </AvatarFallback>
      </Avatar>
      <span className="font-normal text-lg">
        {user.name} {user.surname}
      </span>
    </div>
  );
};

export { Profile };
