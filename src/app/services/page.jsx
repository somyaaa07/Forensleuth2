import Navbar from "@/components/Navbar";
import { SERVICES } from "../../data/service";
import ServicesListClient from "./ServiceListClient";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Services | Forensleuth",
  description: "Explore Forensleuth's forensic and cyber investigation services.",
};

export default function ServicesPage() {
  return (
    <div>
    <Navbar/>
    <ServicesListClient services={SERVICES} />
    <Footer/>
    </div>
  );
}