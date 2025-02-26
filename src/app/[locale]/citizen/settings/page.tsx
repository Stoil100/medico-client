import { useTranslations } from "next-intl";

export default function CitizenSettingsPage() {
    const t = useTranslations("Pages.Citizen.Settings");
    return <div>{t("title")}</div>;
}
