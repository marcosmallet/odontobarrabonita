import { ServiceLandingPage } from "@/components/service-landing-page";
import { getServiceLandingMetadata, serviceLandingPages } from "@/lib/service-landing-data";

const config = serviceLandingPages.protese;
export const metadata = getServiceLandingMetadata(config);
export default function ProteseDentariaNoRecreioPage() {
  return <ServiceLandingPage config={config} />;
}
