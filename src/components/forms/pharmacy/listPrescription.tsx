"use client";

import { listPrescriptionsSchema as formSchema } from "@/components/schemas/pharmacy";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type * as z from "zod";

type ListPrescriptionFormProps = {
    t: (args: string) => string;
};

// Mock data
const mockCitizens = [
    { ucn: "1234567890", name: "John Doe" },
    { ucn: "2345678901", name: "Jane Smith" },
    { ucn: "3456789012", name: "Alice Johnson" },
];

const mockPrescriptions = {
    "1234567890": [
        { id: 1, medicament: "Aspirin", quantity: 30, fulfilled: false },
        { id: 2, medicament: "Ibuprofen", quantity: 20, fulfilled: false },
    ],
    "2345678901": [
        { id: 3, medicament: "Amoxicillin", quantity: 14, fulfilled: false },
        { id: 4, medicament: "Omeprazole", quantity: 28, fulfilled: false },
    ],
    "3456789012": [
        { id: 5, medicament: "Metformin", quantity: 60, fulfilled: false },
    ],
};

export default function ListPrescriptionForm({ t }: ListPrescriptionFormProps) {
    const [openAutocomplete, setOpenAutocomplete] = useState(false);
    const [prescriptions, setPrescriptions] = useState<
        {
            id: number;
            medicament: string;
            quantity: number;
            fulfilled: boolean;
        }[]
    >([]);
    const [ucnValue, setUcnValue] = useState("");

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            ucn: "",
            prescriptions: [],
        },
    });

    const updatePrescriptions = (ucn: string) => {
        if (mockPrescriptions.hasOwnProperty(ucn)) {
            const newPrescriptions =
                mockPrescriptions[ucn as keyof typeof mockPrescriptions];
            setPrescriptions(newPrescriptions);
            form.setValue("prescriptions", newPrescriptions, {
                shouldValidate: true,
            });
        } else {
            setPrescriptions([]);
            form.setValue("prescriptions", [], { shouldValidate: true });
        }
    };

    const handleUcnSelect = (selectedUcn: string) => {
        form.setValue("ucn", selectedUcn);
        setOpenAutocomplete(false);
        updatePrescriptions(selectedUcn);
    };

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log("Submitted prescriptions:", values.prescriptions);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name={"ucn"}
                    render={({ field }) => (
                        <FormItem className="space-x-2">
                            <FormLabel>{t("ucnLabel")}</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            className={cn(
                                                "w-[200px] justify-between",
                                                !field.value &&
                                                    "text-muted-foreground"
                                            )}
                                        >
                                            {field.value
                                                ? mockCitizens.find(
                                                      (citizen) =>
                                                          citizen.ucn ===
                                                          field.value
                                                  )?.ucn
                                                : t("selectPatient")}
                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="max-w-xs w-fit p-0">
                                    <Command>
                                        <CommandInput
                                            placeholder={t("searchPlaceholder")}
                                        />
                                        <CommandList>
                                            <CommandEmpty>
                                                {t("noPatientFound")}
                                            </CommandEmpty>
                                            <CommandGroup>
                                                {mockCitizens.map(
                                                    (citizen, index) => (
                                                        <CommandItem
                                                            value={citizen.ucn}
                                                            key={index}
                                                            onSelect={() =>
                                                                handleUcnSelect(
                                                                    citizen.ucn
                                                                )
                                                            }
                                                        >
                                                            <div className="flex gap-2">
                                                                <p>
                                                                    {
                                                                        citizen.ucn
                                                                    }
                                                                </p>
                                                                <p>
                                                                    {
                                                                        citizen.name
                                                                    }
                                                                </p>
                                                            </div>

                                                            <Check
                                                                className={cn(
                                                                    "ml-auto",
                                                                    citizen.ucn ===
                                                                        field.value
                                                                        ? "opacity-100"
                                                                        : "opacity-0"
                                                                )}
                                                            />
                                                        </CommandItem>
                                                    )
                                                )}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {prescriptions.length > 0 && (
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            {t("prescriptionsList")}
                        </h3>
                        {prescriptions.map((prescription, index) => (
                            <FormField
                                key={prescription.id}
                                control={form.control}
                                name={`prescriptions.${index}.fulfilled`}
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            {prescription.medicament} -{" "}
                                            {t("quantity")}:{" "}
                                            {prescription.quantity}
                                        </FormLabel>
                                    </FormItem>
                                )}
                            />
                        ))}
                    </div>
                )}
                <Button type="submit" className="w-full">
                    {t("submitButton")}
                </Button>
            </form>
        </Form>
    );
}
