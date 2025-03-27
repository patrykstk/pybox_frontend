"use client";

import useUser from "@/hooks/use-user";

const HomePage = () => {
  const { user, loading, error } = useUser();

  if (loading) {
    return <div>Loading...</div>; // Możesz dodać loader
  }

  if (error) {
    return <div>Error: {error}</div>; // Obsługa błędów
  }

  return (
    <div>
      <h1>User Profile</h1>
      <p>ID: {user.id}</p>
      <p>
        Name: {user.name} {user.surname}
      </p>
      <p>Email: {user.email}</p>
      <p>Created At: {new Date(user.created_at).toLocaleString()}</p>
      <p>Roles: {user.roles.join(", ")}</p>
    </div>
  );
};

export default HomePage;
