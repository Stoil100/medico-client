import { Card } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Medicament } from "@/models/Medicament";
import { Pill } from "lucide-react";

interface MedicamentsTableProps {
    medicaments: Medicament[];
    t: (args: string) => string;
}

export function MedicamentsTable({ medicaments, t }: MedicamentsTableProps) {
    // const t = useTranslations("Pages.Citizen.Prescriptions");

    return (
        <div>
            <h3 className="text-sm font-medium mb-2">{t("title")}</h3>
            <Card>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>{t("name")}</TableHead>
                            <TableHead>{t("quantity")}</TableHead>
                            {/* <TableHead className="w-[100px]"></TableHead> */}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {medicaments.map((med) => (
                            <TableRow key={med.id}>
                                <TableCell className="font-medium">
                                    <div className="flex items-center">
                                        <Pill className="w-4 h-4 mr-2 text-primary" />
                                        {med.officialName}
                                    </div>
                                </TableCell>
                                <TableCell>{med.quantity}</TableCell>
                                {/* <TableCell>
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    asChild
                                                >
                                                    <Link
                                                        href={`/medicament/${med.id}`}
                                                    >
                                                        {t("info")}
                                                    </Link>
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>
                                                    
                                                    {t("medicament.info")}
                                                </p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </TableCell> */}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
        </div>
    );
}
