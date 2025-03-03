import { Link, usePathname } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function PharmacistNavigation() {
    const t = useTranslations("Pages.Pharmacy.Pharmacist.navigation");
    const pathname = usePathname();

    const routes = [
        {
            href: "/pharmacy/pharmacist/prescriptions",
            label: t("prescriptions"),
            active: pathname === "/pharmacy/pharmacist/prescriptions",
        },
        {
            href: "/pharmacy/pharmacist/medicaments",
            label: t("medicaments"),
            active: pathname === "/pharmacy/pharmacist/medicaments",
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
