import { AlertTriangle } from "lucide-react";

const DisableOwnTest = () => {
  return (
    <div className="w-full flex items-center justify-center h-96">
      <div className="p-6 bg-yellow-600 text-white rounded-2xl shadow-lg flex flex-col items-center justify-center space-y-4">
        <AlertTriangle className="w-10 h-10 text-yellow-200" />
        <span className="text-xl font-semibold text-yellow-200">
          Nie możesz podjąć się własnego zadania!
        </span>
      </div>
    </div>
  );
};

export { DisableOwnTest };
