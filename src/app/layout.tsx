import type { Metadata } from "next";
import "./globals.css";

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

export default async function AppLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className=" font-helvetica antialiased">{children}</body>
        </html>
    );
}
