"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { LoginForm } from "@/components/forms/login";

export default function PharmacyRedirectPage() {
    const router = useRouter();
    const pathname = usePathname();
    const locale = useLocale();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(false);

    const getUserRoles = () => {
        // Replace this with actual authentication logic
        const user = true; // Simulate user being logged out
        return user ? "pharmacist" : null;
    };

    useEffect(() => {
        const userRoles = getUserRoles();

        if (!userRoles) {
            setIsAuthenticated(false);
            return;
        }

        setIsAuthenticated(true);

        if (pathname === `/pharmacy`) {
            router.replace(`/pharmacy/pharmacist/prescriptions`);
        } else {
            router.replace(pathname);
        }
    }, [pathname, router, locale]);

    if (isAuthenticated === false) {
        return <LoginForm />;
    }

    return null;
}
