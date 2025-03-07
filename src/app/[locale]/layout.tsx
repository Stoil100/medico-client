import { routing } from "@/i18n/routing";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";

export default async function LocaleLayout({
                                               children,
                                               params,
                                           }: {
    children: React.ReactNode;
    // Specify that params is a Promise, satisfying the LayoutProps constraint.
    params: Promise<{ locale: string }>;
}) {
    // Wrap params in Promise.resolve to handle both promise and plain object cases.
    const { locale } = await Promise.resolve(params);

    // Cast locale to "en" | "bg" for the includes check.
    if (!routing.locales.includes(locale as "bg")) {
        notFound();
    }
    const messages = await getMessages({ locale });

    return (
        <NextIntlClientProvider messages={messages}>
            {children}
        </NextIntlClientProvider>
    );
}
