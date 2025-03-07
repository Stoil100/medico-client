import { PharmacyOwnerLoginForm } from "@/components/forms/pharmacy/admin/login";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleUserRound } from "lucide-react";
export default function PharmacyAdminLoginPage() {
    return (
        <div className="h-screen flex items-center justify-center">
            <Card className="w-full max-w-6xl">
                <CardHeader className="flex items-center justify-center ">
                    <CardTitle>
                        <CircleUserRound />
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <PharmacyOwnerLoginForm />
                </CardContent>
            </Card>
        </div>
    );
}
