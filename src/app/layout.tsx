import type { Metadata } from "next";
import "./globals.css";
import "leaflet/dist/leaflet.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";

export const metadata: Metadata = {
    title: "Medico",
    description: "Вашият личен медицински помощник",
    icons: [
        {
            rel: "icon",
            sizes: "any",
            url: "/favicon.ico",
        },
        {
            rel: "icon",
            type: "image/png",
            sizes: "32x32",
            url: "/favicon-32x32.png",
        },
        {
            rel: "icon",
            type: "image/png",
            sizes: "16x16",
            url: "/favicon-16x16.png",
        },
        {
            rel: "apple-touch-icon",
            sizes: "180x180",
            url: "/apple-touch-icon.png",
        },
    ],
    manifest: "/site.webmanifest",
};

const queryClient = new QueryClient();

export default async function AppLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <QueryClientProvider client={queryClient}>
            <body className=" font-helvetica antialiased">{children}</body>
        </QueryClientProvider>
        </html>
    );
}
