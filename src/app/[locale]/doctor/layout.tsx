import { DoctorNavigation } from "@/components/doctor/Navigation";

export default async function DoctorLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <DoctorNavigation />
            <div className="p-4">{children}</div>
        </>
    );
}
