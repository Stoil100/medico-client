"use client";

import {
    AddPharmacistType,
    addPharmacistSchema as formSchema,
} from "@/components/schemas/pharmacy";
import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown } from "lucide-react";
import { useForm } from "react-hook-form";

type PharmacyAddPharmacistFormProps = {
    t: (args: string) => string;
};

export default function PharmacyAddPharmacistForm({
    t,
}: PharmacyAddPharmacistFormProps) {
    const pharmacies = [
        { value: "pharmacy1", label: "Zdrave Pharmacy" },
        { value: "pharmacy2", label: "Zhivot Pharmacy" },
        { value: "pharmacy3", label: "Nadezhda Pharmacy" },
        { value: "pharmacy4", label: "Badeshte Pharmacy" },
        { value: "pharmacy5", label: "Grizha Pharmacy" },
    ];

    const form = useForm<AddPharmacistType>({
        resolver: zodResolver(formSchema((key) => t(`errors.${key}`))),
        defaultValues: {
            firstName: "",
            secondName: "",
            lastName: "",
            pharmacy: "",
        },
    });

    function onSubmit(data: AddPharmacistType) {
        console.log(data);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {/* First Name */}
                <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("firstName.label")}</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder={t("firstName.placeholder")}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Middle Name */}
                <FormField
                    control={form.control}
                    name="secondName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("secondName.label")}</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder={t("secondName.placeholder")}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Last Name */}
                <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("lastName.label")}</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder={t("lastName.placeholder")}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Pharmacy Selector */}
                <FormField
                    control={form.control}
                    name="pharmacy"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>{t("pharmacy.label")}</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            className={cn(
                                                "w-full justify-between",
                                                !field.value &&
                                                    "text-muted-foreground"
                                            )}
                                        >
                                            {field.value
                                                ? pharmacies.find(
                                                      (pharmacy) =>
                                                          pharmacy.value ===
                                                          field.value
                                                  )?.label
                                                : t("pharmacy.placeholder")}
                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-[200px] p-0">
                                    <Command>
                                        <CommandInput
                                            placeholder={t(
                                                "pharmacy.searchPlaceholder"
                                            )}
                                        />
                                        <CommandList>
                                            <CommandEmpty>
                                                {t("pharmacy.empty")}
                                            </CommandEmpty>
                                            <CommandGroup>
                                                {pharmacies.map((pharmacy) => (
                                                    <CommandItem
                                                        value={pharmacy.label}
                                                        key={pharmacy.value}
                                                        onSelect={() => {
                                                            form.setValue(
                                                                "pharmacy",
                                                                pharmacy.value
                                                            );
                                                        }}
                                                    >
                                                        <Check
                                                            className={cn(
                                                                "mr-2 h-4 w-4",
                                                                pharmacy.value ===
                                                                    field.value
                                                                    ? "opacity-100"
                                                                    : "opacity-0"
                                                            )}
                                                        />
                                                        {pharmacy.label}
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Submit Button */}
                <Button type="submit">{t("submit")}</Button>
            </form>
        </Form>
    );
}
