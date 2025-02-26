"use client";

import { useEffect, useState } from "react";
import { useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { LoginForm } from "@/components/forms/login";
export default function ModeratorRedirectPage() {
    const t = useTranslations("Pages.Moderators");
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(false);

    const getUserRoles = () => {
        // Replace this with actual authentication logic
        const user = null; // Simulate user being logged out
        return user ? "citizen" : null;
    };

    useEffect(() => {
        const userRoles = getUserRoles();

        if (!userRoles) {
            setIsAuthenticated(false);
            return;
        }

        setIsAuthenticated(true);

        const normalizedRoles = Array.isArray(userRoles) ? userRoles : [userRoles];

        if (normalizedRoles.length === 1) {
            router.replace(`/moderators/${normalizedRoles[0]}`);
        }
    }, [router]);

    if (isAuthenticated === false) {
        return <LoginForm />;
    }

    return (
        <div className="flex min-h-screen items-center justify-center">
            <p className="text-primary text-lg animate-pulse">{t("redirecting")}</p>
        </div>
    );
}
