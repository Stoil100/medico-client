import { Prescription } from "@/components/models/Prescription";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { usePharmacies } from "../hooks/usePharmacies";
import { MedicamentsTable } from "../MedicamentsTable";
import { ExpandPharmacyMapDialog } from "../Pharmacy/Expand";
import { PharmacyList } from "../Pharmacy/List";
import { PharmacyMap } from "../Pharmacy/Map";
import { StatusBadge } from "../StatusBadge";
import { PrescriptionInfo } from "./Info";

interface PrescriptionDetailDialogProps {
    prescription: Prescription | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    t: (args: string) => string;
}

export function PrescriptionDetailDialog({
    prescription,
    open,
    onOpenChange,
    t,
}: PrescriptionDetailDialogProps) {
    const { pharmacies, selectedPharmacy, setSelectedPharmacy, isLoading } =
        usePharmacies(prescription);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
                <DialogHeader>
                    <DialogTitle className="text-xl flex items-center gap-2">
                        {prescription?.name}
                        {prescription && (
                            <StatusBadge
                                status={prescription.status}
                                t={(key) => t(`Badge.${key}`)}
                            />
                        )}
                    </DialogTitle>
                    <DialogDescription>{t("title")}</DialogDescription>
                </DialogHeader>

                {prescription && (
                    <div
                        className={cn(
                            "grid grid-cols-1 gap-6 overflow-auto py-2",
                            prescription.status === "active" && "md:grid-cols-2"
                        )}
                    >
                        <div className="space-y-6">
                            <PrescriptionInfo
                                prescription={prescription}
                                t={(key) => t(`Info.${key}`)}
                            />
                            <MedicamentsTable
                                medicaments={prescription.medicaments}
                                t={(key) => t(`Table.${key}`)}
                            />
                        </div>

                        {prescription.status === "active" && (
                            <div className="space-y-4">
                                <h3 className="text-sm font-medium">
                                    {t("nearby")}
                                </h3>
                                {isLoading ? (
                                    <div className="flex items-center justify-center h-[300px] border rounded-md bg-muted/20">
                                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                                        <span className="ml-2">
                                            {t("loading")}
                                        </span>
                                    </div>
                                ) : (
                                    <>
                                        <div className="h-[300px] border relative rounded-md bg-muted/20 overflow-hidden">
                                            <PharmacyMap
                                                availablePharmacies={pharmacies}
                                                selectedPharmacy={
                                                    selectedPharmacy
                                                }
                                                setSelectedPharmacy={
                                                    setSelectedPharmacy
                                                }
                                            />
                                            <ExpandPharmacyMapDialog
                                                availablePharmacies={pharmacies}
                                                selectedPharmacy={
                                                    selectedPharmacy
                                                }
                                                setSelectedPharmacy={
                                                    setSelectedPharmacy
                                                }
                                            />
                                        </div>

                                        {pharmacies.length > 0 && (
                                            <PharmacyList
                                                pharmacies={pharmacies}
                                                selectedPharmacy={
                                                    selectedPharmacy
                                                }
                                                onSelectPharmacy={
                                                    setSelectedPharmacy
                                                }
                                                t={(key) => t(`List.${key}`)}
                                            />
                                        )}
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
