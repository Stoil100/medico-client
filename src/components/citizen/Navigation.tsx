"use client";

import { Link, usePathname } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import Image from "next/image";

export function CitizenNavigation() {
    const t = useTranslations("Pages.Citizen.navigation");
    const pathname = usePathname();

    const routes = [
        {
            href: "/citizen",
            label: t("home"),
            active: pathname === "/citizen",
        },
        {
            href: "/citizen/settings",
            label: t("settings"),
            active: pathname === "/citizen/settings",
        },
        {
            href: "/citizen/prescriptions",
            label: t("prescriptions"),
            active: pathname === "/citizen/prescriptions",
        },
    ];

    return (
        <header className="w-full">
            <nav className="bg-white shadow-md px-4 py-1 flex justify-between items-center">
                <Link href="/">
                    <Image
                        src="/logoText.png"
                        alt="Medico Logo"
                        width={80}
                        height={80}
                        className="size-14"
                    />
                </Link>
                <div className="space-x-4">
                    {routes.map((route) =>
                        route.active ? null : (
                            <Link
                                key={route.href}
                                href={route.href}
                                className={cn(
                                    "text-md font-medium transition-colors hover:text-primary",
                                    route.active
                                        ? "text-primary"
                                        : "text-muted-foreground"
                                )}
                            >
                                {route.label}
                            </Link>
                        )
                    )}
                </div>
            </nav>
        </header>
    );
}
