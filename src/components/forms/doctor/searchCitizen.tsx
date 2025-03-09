import {
    SearchCitizenType,
    searchCitizenSchema as formSchema
} from "@/schemas/doctor";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList
} from "@/components/ui/command";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Check, ChevronsUpDown } from "lucide-react";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { useGetCitizensByCommonUcn } from "@/api/doctor/useGetCitizensByCommonUcn";

type SearchCitizenFormProps = {
    t: (args: string) => string;
    setCitizenUcn: Dispatch<SetStateAction<string>>;
};


export default function SearchCitizenForm({ t, setCitizenUcn }: SearchCitizenFormProps) {
    const form = useForm<SearchCitizenType>({
        resolver: zodResolver(formSchema((key) => t(`errors.${key}`))),
        defaultValues: {
            // patient: "",
            ucn: ""
        },
        mode: "onChange"
    });

    const onSubmit = async (values: SearchCitizenType) => {
        setCitizenUcn(values.ucn)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormLabel className="text-lg font-medium">
                    {t("title")}
                </FormLabel>
                {/*<FormField*/}
                {/*    control={form.control}*/}
                {/*    name={"patient"}*/}
                {/*    render={({ field }) => (*/}
                {/*        <FormItem className="space-y-2">*/}
                {/*            <FormLabel>{t("patient.label")}</FormLabel>*/}
                {/*            <Popover>*/}
                {/*                <PopoverTrigger asChild>*/}
                {/*                    <FormControl>*/}
                {/*                        <Button*/}
                {/*                            variant="outline"*/}
                {/*                            role="combobox"*/}
                {/*                            className={cn(*/}
                {/*                                "w-full justify-between",*/}
                {/*                                !field.value &&*/}
                {/*                                "text-muted-foreground"*/}
                {/*                            )}*/}
                {/*                        >*/}
                {/*                            {field.value*/}
                {/*                                ? patients.find(*/}
                {/*                                    (patient) =>*/}
                {/*                                        patient.name ===*/}
                {/*                                        field.value*/}
                {/*                                )?.name*/}
                {/*                                : t("patient.select")}*/}
                {/*                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />*/}
                {/*                        </Button>*/}
                {/*                    </FormControl>*/}
                {/*                </PopoverTrigger>*/}
                {/*                <PopoverContent className="w-full p-0">*/}
                {/*                    <Command>*/}
                {/*                        <CommandInput*/}
                {/*                            placeholder={t(*/}
                {/*                                "patient.placeholder"*/}
                {/*                            )}*/}
                {/*                        />*/}
                {/*                        <CommandList>*/}
                {/*                            <CommandEmpty>*/}
                {/*                                {t("patient.notFound")}*/}
                {/*                            </CommandEmpty>*/}
                {/*                            <CommandGroup>*/}
                {/*                                {patients.map(*/}
                {/*                                    (patient, index) => (*/}
                {/*                                        <CommandItem*/}
                {/*                                            value={patient.name}*/}
                {/*                                            key={index}*/}
                {/*                                            onSelect={() => {*/}
                {/*                                                form.setValue(*/}
                {/*                                                    "patient",*/}
                {/*                                                    patient.name*/}
                {/*                                                );*/}
                {/*                                                form.setValue(*/}
                {/*                                                    "ucn",*/}
                {/*                                                    patient.ucn*/}
                {/*                                                );*/}
                {/*                                            }}*/}
                {/*                                        >*/}
                {/*                                            {patient.name}*/}
                {/*                                            <Check*/}
                {/*                                                className={cn(*/}
                {/*                                                    "ml-auto",*/}
                {/*                                                    patient.name ===*/}
                {/*                                                        field.value*/}
                {/*                                                        ? "opacity-100"*/}
                {/*                                                        : "opacity-0"*/}
                {/*                                                )}*/}
                {/*                                            />*/}
                {/*                                        </CommandItem>*/}
                {/*                                    )*/}
                {/*                                )}*/}
                {/*                            </CommandGroup>*/}
                {/*                        </CommandList>*/}
                {/*                    </Command>*/}
                {/*                </PopoverContent>*/}
                {/*            </Popover>*/}
                {/*            <FormMessage />*/}
                {/*        </FormItem>*/}
                {/*    )}*/}
                {/*/>*/}
                {/*<FormField*/}
                {/*    control={form.control}*/}
                {/*    name={"ucn"}*/}
                {/*    render={({ field }) => (*/}
                {/*        <FormItem className="space-y-2">*/}
                {/*            <FormLabel>{t("ucn.label")}</FormLabel>*/}
                {/*            <Popover>*/}
                {/*                <PopoverTrigger asChild>*/}
                {/*                    <FormControl>*/}
                {/*                        <Button*/}
                {/*                            variant="outline"*/}
                {/*                            role="combobox"*/}
                {/*                            className={cn(*/}
                {/*                                "w-full justify-between",*/}
                {/*                                !field.value &&*/}
                {/*                                    "text-muted-foreground"*/}
                {/*                            )}*/}
                {/*                        >*/}
                {/*                            {field.value*/}
                {/*                                ? citizens && citizens.find(*/}
                {/*                                      (patient) =>*/}
                {/*                                          patient.ucn ===*/}
                {/*                                          field.value*/}
                {/*                                  )?.ucn*/}
                {/*                                : t("ucn.select")}*/}
                {/*                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />*/}
                {/*                        </Button>*/}
                {/*                    </FormControl>*/}
                {/*                </PopoverTrigger>*/}
                {/*                <PopoverContent className="w-full p-0">*/}
                {/*                    <Command>*/}
                {/*                        <CommandInput*/}
                {/*                            placeholder={t("ucn.placeholder")}*/}
                {/*                        />*/}
                {/*                        <CommandList>*/}
                {/*                            <CommandEmpty>*/}
                {/*                                {t("ucn.notFound")}*/}
                {/*                            </CommandEmpty>*/}
                {/*                            <CommandGroup>*/}
                {/*                                {citizens && citizens.map(*/}
                {/*                                    (patient, index) => (*/}
                {/*                                        <CommandItem*/}
                {/*                                            value={patient.ucn}*/}
                {/*                                            key={index}*/}
                {/*                                            onSelect={() => {*/}
                {/*                                                form.setValue(*/}
                {/*                                                    "patient",*/}
                {/*                                                    patient.firstName*/}
                {/*                                                );*/}
                {/*                                                form.setValue(*/}
                {/*                                                    "ucn",*/}
                {/*                                                    patient.ucn*/}
                {/*                                                );*/}
                {/*                                            }}*/}
                {/*                                        >*/}
                {/*                                            {patient.ucn}*/}
                {/*                                            <Check*/}
                {/*                                                className={cn(*/}
                {/*                                                    "ml-auto",*/}
                {/*                                                    patient.ucn ===*/}
                {/*                                                        field.value*/}
                {/*                                                        ? "opacity-100"*/}
                {/*                                                        : "opacity-0"*/}
                {/*                                                )}*/}
                {/*                                            />*/}
                {/*                                        </CommandItem>*/}
                {/*                                    )*/}
                {/*                                )}*/}
                {/*                            </CommandGroup>*/}
                {/*                        </CommandList>*/}
                {/*                    </Command>*/}
                {/*                </PopoverContent>*/}
                {/*            </Popover>*/}
                {/*            <FormMessage />*/}
                {/*        </FormItem>*/}
                {/*    )}*/}
                {/*/>*/}
                <FormField
                    control={form.control}
                    name="ucn"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    placeholder={t("ucn.placeholder")}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type={"submit"}>
                    Изпрати
                </Button>
            </form>
        </Form>
    );
}
