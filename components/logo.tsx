import {cn} from "@/lib/utils";

interface LogoProps {
    className?: string;
}

const Logo = ({
                  className
              } : LogoProps) => {
    return (
        <div className={cn("font-logo font-bold flex items-center justify-center text-5xl text-primary", className)}>
            pybox
        </div>
    );
};

export { Logo };