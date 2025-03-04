import { Expand } from "lucide-react";

import { Pharmacy } from "@/components/models/Pharmacy";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { PharmacyMap } from "./Map";

interface ExpandPharmacyMapDialogProps {
    availablePharmacies: Pharmacy[];
    selectedPharmacy: Pharmacy | undefined;
    setSelectedPharmacy: (pharmacy: Pharmacy) => void;
}
export function ExpandPharmacyMapDialog({
    availablePharmacies,
    selectedPharmacy,
    setSelectedPharmacy,
}: ExpandPharmacyMapDialogProps) {
    return (
        <Dialog>
            <DialogTrigger className="absolute bottom-1 left-1 z-[999]">
                <Expand />
            </DialogTrigger>
            <DialogContent className="h-screen p-0 -translate-x-1/2 !w-screen !min-w-screen max-w-screen">
                <DialogHeader className="hidden">
                    <DialogTitle />
                </DialogHeader>
                <div className="h-screen">
                    <PharmacyMap
                        availablePharmacies={availablePharmacies}
                        selectedPharmacy={selectedPharmacy}
                        setSelectedPharmacy={setSelectedPharmacy}
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
}
