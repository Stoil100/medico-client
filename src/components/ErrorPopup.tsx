"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useEffect } from "react";

interface ErrorPopupProps {
    errors: string[] | null;
    onClose: () => void;
    title?: string;
    autoClose?: boolean;
    autoCloseTime?: number;
}

export function ErrorPopup({
    errors,
    onClose,
    title = "Error",
    autoClose = true,
    autoCloseTime = 5000,
}: ErrorPopupProps) {
    useEffect(() => {
        let timeoutId: NodeJS.Timeout | null = null;

        if (errors && autoClose) {
            timeoutId = setTimeout(() => {
                onClose();
            }, autoCloseTime);
        }

        return () => {
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [errors, onClose, autoClose, autoCloseTime]);

    if (!errors || errors.length === 0) return null;

    return (
        <div className="fixed top-4 right-4 z-50 max-w-md w-full animate-in slide-in-from-top-5 duration-300">
            <Alert variant="destructive" className="border-red-500">
                <div className="flex justify-between items-start">
                    <AlertTitle className="text-lg font-semibold">
                        {title}
                    </AlertTitle>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 -mt-1 -mr-2 text-red-500 hover:text-red-600 hover:bg-red-50"
                        onClick={onClose}
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>
                <AlertDescription className="mt-2">
                    {errors.length === 1 ? (
                        <p>{errors[0]}</p>
                    ) : (
                        <ul className="list-disc pl-5 space-y-1">
                            {errors.map((error, index) => (
                                <li key={index}>{error}</li>
                            ))}
                        </ul>
                    )}
                </AlertDescription>
            </Alert>
        </div>
    );
}
