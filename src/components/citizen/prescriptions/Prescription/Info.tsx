import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Prescription } from "@/components/models/Prescription";
import { Calendar, Clock } from "lucide-react";

interface PrescriptionInfoProps {
    prescription: Prescription;
    t: (args: string) => string;
}

export function PrescriptionInfo({ prescription, t }: PrescriptionInfoProps) {
    return (
        <div>
            <h3 className="text-sm font-medium mb-2">{t("title")}</h3>
            <Card>
                <CardContent className="p-4 space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                        <div>
                            <div className="text-sm font-medium text-muted-foreground">
                                {t("issuedDate")}
                            </div>
                            <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1 text-muted-foreground" />
                                {prescription.issuedDate}
                            </div>
                        </div>
                        <div>
                            <div className="text-sm font-medium text-muted-foreground">
                                {t("expirationDate")}
                            </div>
                            <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-1 text-muted-foreground" />
                                {prescription.expirationDate}
                            </div>
                        </div>
                    </div>

                    <Separator />

                    <div>
                        <div className="text-sm font-medium text-muted-foreground mb-2">
                            {t("doctor")}
                        </div>
                        <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium mr-3">
                                {prescription.doctor.firstName[0]}
                                {prescription.doctor.surname[0]}
                            </div>
                            <div>
                                <div className="font-medium">
                                    {t("dr")} {prescription.doctor.firstName}{" "}
                                    {prescription.doctor.surname}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    {t("uin")} {prescription.doctor.UIN}
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
