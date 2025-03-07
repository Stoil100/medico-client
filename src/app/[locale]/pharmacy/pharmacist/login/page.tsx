import { PharmacistLoginForm } from "@/components/forms/pharmacy/pharmacist/pharmacistLoginForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleUserRound } from "lucide-react";

export default function PharmacyPharmacistLoginPage() {
    return (
        <div>
            <Card>
                <CardHeader className="flex items-center justify-center">
                    <CardTitle>
                        <CircleUserRound />
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <PharmacistLoginForm />
                </CardContent>
            </Card>
        </div>
    );
}
