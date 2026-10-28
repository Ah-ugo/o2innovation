import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import RouteMotion from "@/components/RouteMotion";
export default function Site({ children }: { children: React.ReactNode }) { return <><Nav /><RouteMotion>{children}</RouteMotion><Footer /></>; }
