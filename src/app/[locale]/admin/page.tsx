"use client";

import AddModeratorForm from "@/components/forms/admin/moderators";
import { useTranslations } from "next-intl";
import React from "react";

export default function AdminPage() {
    const t = useTranslations("Pages.Admin");
    return (
        <div>
            <h1> {t("title")}</h1>
            <AddModeratorForm t={(key) => t(`form.${key}`)} />
        </div>
    );
}
