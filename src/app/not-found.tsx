"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
export default function NotFound() {
    return (
        <div className="flex items-center min-h-screen px-4 py-12 sm:px-6 md:px-8 lg:px-12 xl:px-16">
            <div className="w-full gap-4 text-center flex flex-col justify-center items-center">
                <Link href={"/"}>
                    <Image
                        src="/logoText.png"
                        alt="Medico Logo"
                        width={50}
                        height={50}
                        className="size-20"
                    />
                </Link>
                <div className="space-y-3">
                    <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl transition-transform hover:scale-110">
                        404
                    </h1>
                    <p className="text-gray-500">
                        Опа! Изглежда сте се отклонили от границите на
                        медицинската грижа.
                    </p>
                    <p className="text-gray-400 text-sm italic">
                        Oops! You've wandered beyond the boundaries of medical
                        care.
                    </p>
                </div>
                <div className="space-y-1">
                    <Link
                        href="/"
                        className="inline-flex items-center rounded-md  text-sm font-medium shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                        prefetch={false}
                    >
                        <Button>Върнете се в началото</Button>
                    </Link>
                    <p className="text-gray-400 text-xs italic">
                        Return to Home
                    </p>
                </div>
            </div>
        </div>
    );
}
