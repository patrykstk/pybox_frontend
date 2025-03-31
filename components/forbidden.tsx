import React from "react";

const Forbidden = () => {
  return (
    <div className="flex justify-center items-center h-[85vh] text-lg font-bold">
      <p className="bg-red-400 text-white  py-10 px-6 rounded-lg">
        Nie masz dostępu do tych zasobów. Proszę skontaktować się z
        administratorem.
      </p>
    </div>
  );
};

export default Forbidden;
