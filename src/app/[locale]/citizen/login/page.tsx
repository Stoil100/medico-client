import { CitizenLoginForm } from "@/components/forms/citizen/citizenLogin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleUserRound } from "lucide-react";

export default function CitizenLoginPage() {
    return (
        <div>
            <Card>
                <CardHeader className="flex items-center justify-center">
                    <CardTitle>
                        <CircleUserRound />
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <CitizenLoginForm />
                </CardContent>
            </Card>
        </div>
    );
}
