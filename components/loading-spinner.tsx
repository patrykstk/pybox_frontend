import { LoaderCircle } from "lucide-react";

const LoadingSpinner = () => {
    return (
        <div className="flex flex-col space-y-4 items-center justify-center h-full mt-5">
            <div className="w-24 h-24">
                <LoaderCircle className="animate-spin w-full h-full text-yellow-400"/>
            </div>
            <h4 className="text-xl">Ładowanie ...</h4>
        </div>
    );
};

export { LoadingSpinner };