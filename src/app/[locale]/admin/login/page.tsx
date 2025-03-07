import { AdminLoginForm } from "@/components/forms/admin/adminLogin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleUserRound } from "lucide-react";
export default function AdminLoginPage() {
    return (
        <div className="h-screen flex items-center justify-center">
            <Card className="w-full max-w-6xl">
                <CardHeader className="flex items-center justify-center ">
                    <CardTitle>
                        <CircleUserRound />
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <AdminLoginForm />
                </CardContent>
            </Card>
        </div>
    );
}
