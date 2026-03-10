import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Website Checker",
    description: "Instant diagnostics for your web infrastructure",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
