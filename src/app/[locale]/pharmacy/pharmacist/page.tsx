"use client";

import React from "react";
import { useEffect } from "react";
import { Link, useRouter, usePathname } from "@/i18n/routing";
import { useLocale } from "next-intl";

export default function page() {
    const router = useRouter();
    const pathname = usePathname();
    const locale = useLocale();

    useEffect(() => {
        if (typeof window !== "undefined") {
            if (pathname === `/pharmacy/pharmacist`) {
                router.replace(`/pharmacy/pharmacist/prescriptions`);
            }
        }
    }, [pathname, router, locale]);
    return null;
}
