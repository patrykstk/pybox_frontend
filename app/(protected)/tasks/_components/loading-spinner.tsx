import {LoaderCircle} from "lucide-react";

const LoadingSpinner = () => {
    return (
        <div className="flex flex-col space-y-4 items-center justify-center">
            <div className="w-24 h-24">
                <LoaderCircle className="animate-spin w-full h-full text-yellow-400"/>
            </div>
            <h4 className="text-xl">Wczytuje edytor ...</h4>
        </div>
    );
};

export { LoadingSpinner };