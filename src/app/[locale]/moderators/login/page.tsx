"use client";

import { ModeratorLoginForm } from "@/components/forms/moderators/moderatorLogin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleUserRound } from "lucide-react";
export default function ModeratorRedirectPage() {
    return (
        <div className="h-screen flex items-center justify-center">
            <Card className="w-full max-w-6xl">
                <CardHeader className="flex items-center justify-center ">
                    <CardTitle>
                        <CircleUserRound />
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <ModeratorLoginForm />
                </CardContent>
            </Card>
        </div>
    );
}
