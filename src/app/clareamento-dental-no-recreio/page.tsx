import { ServiceLandingPage } from "@/components/service-landing-page";
import { getServiceLandingMetadata, serviceLandingPages } from "@/lib/service-landing-data";

const config = serviceLandingPages.clareamento;
export const metadata = getServiceLandingMetadata(config);
export default function ClareamentoDentalNoRecreioPage() {
  return <ServiceLandingPage config={config} />;
}
