import { ServiceLandingPage } from "@/components/service-landing-page";
import { getServiceLandingMetadata, serviceLandingPages } from "@/lib/service-landing-data";

const config = serviceLandingPages.toxina;

export const metadata = getServiceLandingMetadata(config);

export default function ToxinaBotulinicaNoRecreioPage() {
  return <ServiceLandingPage config={config} />;
}
