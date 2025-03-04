"use client";

import PharmacistNavigation from "@/components/pharmacy/pharmacist/Navigation";
import type React from "react";

export default function PharmacyPharmacistsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-gray-100">
            <PharmacistNavigation />
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                {children}
            </main>
        </div>
    );
}
