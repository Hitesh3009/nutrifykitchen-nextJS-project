import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Blogs Page",
    description: "Generated by create next app",
};

export default function BlogsLayout({ children }) {
    return <section>{children}</section>;
}
