import { getUserData } from "@/server/get-user-data";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User } from "@/interfaces/models/user";

const Profile = async () => {
  const user: User | undefined = await getUserData();

  if (!user) return <div>Anonim</div>;

  const initials =
    `${user.name.charAt(0)}${user.surname.charAt(0)}`.toUpperCase();

  return (
    <div className="flex flex-row gap-x-3 items-center">
      <Avatar>
        <AvatarFallback className="border border-black p-2">
          {initials}
        </AvatarFallback>
      </Avatar>
      <span className="font-medium text-lg">
        {user.name} {user.surname}
      </span>
    </div>
  );
};

export { Profile };
