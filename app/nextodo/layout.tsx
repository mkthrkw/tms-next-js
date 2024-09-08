import type { Metadata } from "next";
import { Header } from "@/components/layouts/Header";
import { Footer } from "@/components/layouts/Footer";
import { Aside } from "@/components/layouts/Aside";

export const metadata: Metadata = {
    title: "Nextodo",
    description: "Nextodo is a Todo app built with Next.js and Tailwind CSS",
  };

export default function NextodoLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    const drawerId = "layout-drawer";
    return (
      <div>
        <div className="drawer lg:drawer-open">
          <input id={drawerId} type="checkbox" className="drawer-toggle" />
          {/* ===== Drawer content ===== */}
          <div className="drawer-content flex flex-col min-h-screen">
            <Header drawerId={drawerId} />
            <main className="flex-grow">
              {children}
            </main>
            <Footer/>
          </div>
          {/* ===== Drawer side ===== */}
          <div className="drawer-side z-40">
            <label htmlFor={drawerId} aria-label="close sidebar" className="drawer-overlay"></label>
            <Aside/>
          </div>
        </div>
      </div>
    );
  }