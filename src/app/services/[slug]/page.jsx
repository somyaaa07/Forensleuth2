import { notFound } from "next/navigation";
import { SERVICES, getServiceBySlug } from "../../../data/service";
import { ForensleuthStyles } from "../../../components/service/ui";
import ServiceDetailClient from "./ServiceDetailClient";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export async function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: "Not Found | Forensleuth" };
  return {
    title: `${service.title} | Forensleuth Services`,
    description: service.shortDescription,
  };
}

export default async function ServiceDetailPage({ params }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  return (
    <>
    <Navbar/>
      <ForensleuthStyles />
      <ServiceDetailClient service={service} />
      <Footer/>
    </>
  );
}