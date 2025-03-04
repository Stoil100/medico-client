import { LoaderCircle } from "lucide-react";
import Image from "next/image";

export default function Loader() {
    return (
        <div className="flex justify-center items-center h-screen w-screen fixed top-0 left-0 bg-background">
            <Image
                src="/logoText.png"
                alt="Medico Logo"
                width={80}
                height={80}
                className="size-32"
            />
            <LoaderCircle
                className="animate-spin text-primary absolute size-64"
                strokeWidth={1}
            />
        </div>
    );
}
