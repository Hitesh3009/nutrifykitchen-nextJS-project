import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Contact Page",
    description: "Generated by create next app",
};

export default function ContactLayout({ children }) {
    return <section>{children}</section>;
}
