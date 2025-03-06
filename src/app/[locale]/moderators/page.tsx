"use client";

import { useEffect } from "react";
import { useRouter } from "@/i18n/routing";

export default function ModeratorRedirectPage() {
    const router = useRouter();

    useEffect(() => {
            router.replace(`/moderators/login`, {locale: "bg"});
    }, [router]);

    return null;
}
