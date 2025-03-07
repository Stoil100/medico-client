import { DoctorLoginForm } from "@/components/forms/doctor/doctorLogin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleUserRound } from "lucide-react";

export default function DoctorLoginPage() {
    return (
        <div>
            <Card>
                <CardHeader className="flex items-center justify-center">
                    <CardTitle>
                        <CircleUserRound />
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <DoctorLoginForm />
                </CardContent>
            </Card>
        </div>
    );
}
