import { ServiceLandingPage } from "@/components/service-landing-page";
import { getServiceLandingMetadata, serviceLandingPages } from "@/lib/service-landing-data";

const config = serviceLandingPages.implante;
export const metadata = getServiceLandingMetadata(config);
export default function ImplanteDentarioNoRecreioPage() {
  return <ServiceLandingPage config={config} />;
}
