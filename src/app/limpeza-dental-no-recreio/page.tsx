import { ServiceLandingPage } from "@/components/service-landing-page";
import { getServiceLandingMetadata, serviceLandingPages } from "@/lib/service-landing-data";

const config = serviceLandingPages.limpeza;
export const metadata = getServiceLandingMetadata(config);
export default function LimpezaDentalNoRecreioPage() {
  return <ServiceLandingPage config={config} />;
}
