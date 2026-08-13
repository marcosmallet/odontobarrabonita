import { ServiceLandingPage } from "@/components/service-landing-page";
import { getServiceLandingMetadata, serviceLandingPages } from "@/lib/service-landing-data";

const config = serviceLandingPages.restauracao;
export const metadata = getServiceLandingMetadata(config);
export default function RestauracaoDentariaNoRecreioPage() {
  return <ServiceLandingPage config={config} />;
}
