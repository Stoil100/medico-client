import { CitizenNavigation } from "@/components/citizen/Navigation";

export default async function CitizenLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <CitizenNavigation />
            <div className="p-4">{children}</div>
        </>
    );
}
