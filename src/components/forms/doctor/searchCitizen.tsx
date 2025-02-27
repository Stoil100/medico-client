import {
    SearchCitizenType,
    searchCitizenSchema as formSchema,
} from "@/components/schemas/doctor";
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
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Check, ChevronsUpDown } from "lucide-react";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useForm } from "react-hook-form";

type SearchCitizenFormProps = {
    t: (args: string) => string;
    setCitizenId: Dispatch<SetStateAction<string | undefined>>;
};

const patients = [
    { name: "Петър Димитров", ucn: "0105050505" },
    { name: "Jane Smith", ucn: "0205050505" },
    { name: "Alice Johnson", ucn: "0305050505" },
    { name: "Bob Williams", ucn: "0405050505" },
    { name: "Charlie Brown", ucn: "0505050505" },
] as const;

export default function SearchCitizenForm({ t,setCitizenId }: SearchCitizenFormProps) {
    const form = useForm<SearchCitizenType>({
        resolver: zodResolver(formSchema((key) => t(`errors.${key}`))),
        defaultValues: {
            patient: "",
            ucn: "",
        },
        mode: "onChange",
    });
    
    const { watch } = form;
    const ucnValue = watch("ucn");

    useEffect(() => {
        if (ucnValue) {
            // Simulate an API request using axios
            const fetchCitizenID = async () => {
                try {
                    const response = await axios.get("https://jsonplaceholder.typicode.com/posts/1");
                    setCitizenId(response.data.id); // Assuming API returns an ID
                } catch (error) {
                    console.error("Error fetching citizen ID:", error);
                }
            };

            fetchCitizenID();
        }
    }, [ucnValue]);
    return (
        <Form {...form}>
            <form className="space-y-6">
                <FormLabel className="text-lg font-medium">
                    {t("title")}
                </FormLabel>
                <FormField
                    control={form.control}
                    name={"patient"}
                    render={({ field }) => (
                        <FormItem className="space-y-2">
                            <FormLabel>{t("patient.label")}</FormLabel>
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
                                                ? patients.find(
                                                      (patient) =>
                                                          patient.name ===
                                                          field.value
                                                  )?.name
                                                : t("patient.select")}
                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-full p-0">
                                    <Command>
                                        <CommandInput
                                            placeholder={t(
                                                "patient.placeholder"
                                            )}
                                        />
                                        <CommandList>
                                            <CommandEmpty>
                                                {t("patient.notFound")}
                                            </CommandEmpty>
                                            <CommandGroup>
                                                {patients.map(
                                                    (patient, index) => (
                                                        <CommandItem
                                                            value={patient.name}
                                                            key={index}
                                                            onSelect={() => {
                                                                form.setValue(
                                                                    "patient",
                                                                    patient.name
                                                                );
                                                                form.setValue(
                                                                    "ucn",
                                                                    patient.ucn
                                                                );
                                                            }}
                                                        >
                                                            {patient.name}
                                                            <Check
                                                                className={cn(
                                                                    "ml-auto",
                                                                    patient.name ===
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
                <FormField
                    control={form.control}
                    name={"ucn"}
                    render={({ field }) => (
                        <FormItem className="space-y-2">
                            <FormLabel>{t("ucn.label")}</FormLabel>
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
                                                ? patients.find(
                                                      (patient) =>
                                                          patient.ucn ===
                                                          field.value
                                                  )?.ucn
                                                : t("ucn.select")}
                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-full p-0">
                                    <Command>
                                        <CommandInput
                                            placeholder={t("ucn.placeholder")}
                                        />
                                        <CommandList>
                                            <CommandEmpty>
                                                {t("ucn.notFound")}
                                            </CommandEmpty>
                                            <CommandGroup>
                                                {patients.map(
                                                    (patient, index) => (
                                                        <CommandItem
                                                            value={patient.ucn}
                                                            key={index}
                                                            onSelect={() => {
                                                                form.setValue(
                                                                    "patient",
                                                                    patient.name
                                                                );
                                                                form.setValue(
                                                                    "ucn",
                                                                    patient.ucn
                                                                );
                                                            }}
                                                        >
                                                            {patient.ucn}
                                                            <Check
                                                                className={cn(
                                                                    "ml-auto",
                                                                    patient.ucn ===
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
            </form>
        </Form>
    );
}
