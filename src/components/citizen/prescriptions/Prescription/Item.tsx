import { Card, CardContent } from "@/components/ui/card";
import { Prescription } from "@/components/models/Prescription";
import { Calendar, User } from "lucide-react";
import { StatusBadge } from "../StatusBadge";
import { CitizenPrescription } from "@/components/models/Citizen";

interface PrescriptionItemProps {
    prescription: CitizenPrescription;
    onSelect: (prescription: CitizenPrescription) => void;
    t: (args: string) => string;
}

export function PrescriptionItem({
    prescription,
    onSelect,
    t,
}: PrescriptionItemProps) {
    return (
        <Card
            className="mb-3 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => onSelect(prescription)}
        >
            <CardContent className="p-4">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <h3 className="font-medium text-base">
                            {prescription.name}
                        </h3>
                        <StatusBadge
                            status={prescription.status}
                            t={(key) => t(`Badge.${key}`)}
                        />
                    </div>
                    {/*<div className="text-sm text-muted-foreground flex items-center">*/}
                    {/*    <Calendar className="inline-block w-4 h-4 mr-1" />*/}
                    {/*    {prescription.issuedDate} -{" "}*/}
                    {/*    {prescription.expirationDate}*/}
                    {/*</div>*/}
                    <div className="text-sm text-muted-foreground flex items-center">
                        <User className="inline-block w-4 h-4 mr-1" />
                        {t("dr")} {prescription.doctor.firstName}{" "}
                        {prescription.doctor.lastName}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
