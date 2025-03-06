import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

import { MapPin } from "lucide-react";
import { CitizenPharmacy } from "@/components/models/Citizen";

interface PharmacyListProps {
    pharmacies: CitizenPharmacy[];
    selectedPharmacy: CitizenPharmacy | undefined;
    onSelectPharmacy: (pharmacy: CitizenPharmacy) => void;
    t: (args: string) => string;
}

export function PharmacyList({
    pharmacies,
    selectedPharmacy,
    onSelectPharmacy,
    t,
}: PharmacyListProps) {
    return (
        <Card>
            <CardHeader className="p-4 pb-2">
                <CardTitle className="text-base">{t("available")}</CardTitle>
                <CardDescription>{t("select")}</CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0">
                <ScrollArea className="h-[150px]">
                    {pharmacies.map((pharmacy) => (
                        <div
                            key={pharmacy.id}
                            className={`flex items-center justify-between py-2 border-b last:border-0 cursor-pointer hover:bg-muted/50 transition-colors rounded-sm px-2 ${
                                selectedPharmacy?.id === pharmacy.id
                                    ? "bg-muted"
                                    : ""
                            }`}
                            onClick={() => onSelectPharmacy(pharmacy)}
                        >
                            <div>
                                <div className="font-medium">
                                    {pharmacy.name}
                                </div>
                                {/*<div className="text-sm text-muted-foreground flex items-center">*/}
                                {/*    <MapPin className="h-3 w-3 mr-1" />*/}
                                {/*    {pharmacy.address}*/}
                                {/*</div>*/}
                            </div>
                            {/*<Badge variant="outline">{pharmacy.distance}</Badge>*/}
                        </div>
                    ))}
                </ScrollArea>
            </CardContent>
        </Card>
    );
}
