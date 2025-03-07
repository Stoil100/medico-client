"use client";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import Image from "next/image";

const roles = [
    { name: "Админ", path: "/admin/login" },
    { name: "Модератор", path: "/moderators/login" },
    { name: "Собственик на аптека", path: "/pharmacy/admin/login" },
    { name: "Фармацевт", path: "/pharmacy/pharmacist/login" },
    { name: "Доктор", path: "/doctor/login" },
    { name: "Гражданин", path: "/citizen/login" },
];

export default function HomeNavigation() {
    return (
        <nav className="w-full bg-white shadow-md fixed top-0 left-0 z-50 py-2 flex items-center justify-between px-4">
            <Link href={"/"}>
                <Image
                    src="/logoText.png"
                    alt="Medico Logo"
                    width={40}
                    height={40}
                    className="size-16"
                />
            </Link>
            <div className="flex gap-4">
                {roles.map((role) => (
                    <Link key={role.name} href={role.path}>
                        {role.name}
                    </Link>
                ))}
            </div>
        </nav>
    );
}
