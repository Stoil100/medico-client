import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
    status: string;
    t: (args: string) => string;
}

export function StatusBadge({ status, t }: StatusBadgeProps) {
    switch (status) {
        case "active":
            return (
                <Badge variant="default" className="bg-green-500">
                    {t("active")}
                </Badge>
            );
        case "fulfilled":
            return <Badge variant="secondary">{t("fulfilled")}</Badge>;
        case "invalid":
            return <Badge variant="destructive">{t("invalid")}</Badge>;
        default:
            return <Badge variant="outline">{status}</Badge>;
    }
}
