import HomeNavigation from "@/components/HomeNavigation";
import { Link } from "@/i18n/routing";
import {
  Activity,
  ArrowRight,
  LockKeyhole,
  PersonStanding
} from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function HomePage() {
    const t = useTranslations("Pages.Home");

    const features = [
        { title: t("features.secure"), icon: LockKeyhole },
        { title: t("features.support"), icon: PersonStanding },
        { title: t("features.insights"), icon: Activity },
    ];

    return (
        <>
            <HomeNavigation />
            <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 px-4 text-center">
                <div className="max-w-3xl">
                    <div className="mb-8 flex items-center flex-col justify-center space-x-4">
                        <Image
                            src="/logo.png"
                            alt="Medico Logo"
                            width={80}
                            height={80}
                            className="h-20 w-20"
                        />
                        <h1 className="text-4xl font-bold text-foreground sm:text-5xl md:text-6xl">
                            {t("title")}
                        </h1>
                    </div>
                    <p className="mb-8 text-xl text-gray-600 sm:text-2xl">
                        {t("subtitle")}
                    </p>
                    <div className="flex justify-center flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                        <Link
                            href="/citizen/login"
                            className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                        >
                            {t("loginButton")}
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                        <Link
                            href="/about"
                            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-3 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                        >
                            {t("learnMoreButton")}
                        </Link>
                    </div>
                </div>
                <div className="mt-12 flex flex-wrap gap-10 justify-center items-start">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center flex-1"
                        >
                            <div className="mb-2 rounded-full bg-primary/10 p-3">
                                <feature.icon className="h-6 w-6 text-primary" />
                            </div>
                            <p className="text-sm font-medium text-gray-700">
                                {feature.title}
                            </p>
                        </div>
                    ))}
                </div>
            </main>
        </>
    );
}
