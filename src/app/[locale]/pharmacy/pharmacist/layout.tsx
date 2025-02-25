"use client";

import { Link, usePathname } from "@/i18n/routing";
import type React from "react";

export default function PharmacyPharmacistsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

 
    const isActive = (path: string) => pathname.includes(path);

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-start h-16">
                        <div className="flex space-x-8">
                            {!isActive("prescriptions") && (
                                <Link
                                    href={"/pharmacy/pharmacist/prescriptions"}
                                    className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                >
                                    Prescriptions
                                </Link>
                            )}
                            {!isActive("medicaments") && (
                                <Link
                                    href={"/pharmacy/pharmacist/medicaments"}
                                    className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                >
                                    Medicaments
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                {children}
            </main>
        </div>
    );
}
