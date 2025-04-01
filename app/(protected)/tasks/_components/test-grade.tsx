interface TestGradeProps {
  mark: number | null;
}

const TestGrade = ({ mark }: TestGradeProps) => {
  if (mark) {
    return (
      <div className="w-full flex items-center justify-center h-96">
        <div className="p-6 bg-yellow-600 text-white rounded-2xl shadow-lg flex flex-col items-center justify-center space-y-4">
          <span className="text-xl font-semibold text-yellow-200">
            Już zrobiłeś to zadanie. Otrzymałeś ocenę {mark}
          </span>
        </div>
      </div>
    );
  } else
    return (
      <div className="w-full flex items-center justify-center h-96">
        <div className="p-6 bg-yellow-600 text-white rounded-2xl shadow-lg flex flex-col items-center justify-center space-y-4">
          <span className="text-xl font-semibold text-yellow-200">
            Twoje zadanie oczekuje na ocenę.
          </span>
        </div>
      </div>
    );
};

export { TestGrade };
