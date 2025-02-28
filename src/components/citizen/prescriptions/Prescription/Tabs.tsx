import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Prescription } from "@/components/models/Prescription";
import { AlertCircleIcon, CheckCircle2, Clock } from "lucide-react";
import { PrescriptionItem } from "./Item";

interface PrescriptionTabsProps {
    groupedPrescriptions: Record<string, Prescription[]>;
    onSelectPrescription: (prescription: Prescription) => void;
    t: (args: string, status?: string) => string;
}

export function PrescriptionTabs({
    groupedPrescriptions,
    onSelectPrescription,
    t,
}: PrescriptionTabsProps) {
    return (
        <Tabs defaultValue="active" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="active" className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4" />
                    {t("active")}
                </TabsTrigger>
                <TabsTrigger
                    value="fulfilled"
                    className="flex items-center gap-2"
                >
                    <Clock className="h-4 w-4" />
                    {t("fulfilled")}
                </TabsTrigger>
                <TabsTrigger
                    value="invalid"
                    className="flex items-center gap-2"
                >
                    <AlertCircleIcon className="h-4 w-4" />
                    {t("invalid")}
                </TabsTrigger>
            </TabsList>

            {Object.entries(groupedPrescriptions).map(
                ([status, prescriptions]) => (
                    <TabsContent key={status} value={status} className="mt-4">
                        {prescriptions && prescriptions.length > 0 ? (
                            <ScrollArea className="h-[400px] pr-4">
                                {prescriptions.map((prescription) => (
                                    <PrescriptionItem
                                        key={prescription.id}
                                        prescription={prescription}
                                        onSelect={onSelectPrescription}
                                        t={(key) => t(`Item.${key}`)}
                                    />
                                ))}
                            </ScrollArea>
                        ) : (
                            <Alert>
                                <AlertTitle>{t("alert.title")}</AlertTitle>
                                <AlertDescription>
                                    {t("alert.description", status)}
                                </AlertDescription>
                            </Alert>
                        )}
                    </TabsContent>
                )
            )}
        </Tabs>
    );
}
