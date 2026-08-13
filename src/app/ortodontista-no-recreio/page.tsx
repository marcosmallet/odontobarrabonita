import { ServiceLandingPage } from "@/components/service-landing-page";
import { getServiceLandingMetadata, serviceLandingPages } from "@/lib/service-landing-data";

const config = serviceLandingPages.ortodontia;
export const metadata = getServiceLandingMetadata(config);
export default function OrtodontistaNoRecreioPage() {
  return <ServiceLandingPage config={config} />;
}
