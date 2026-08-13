import { ServiceLandingPage } from "@/components/service-landing-page";
import { getServiceLandingMetadata, serviceLandingPages } from "@/lib/service-landing-data";

const config = serviceLandingPages.canal;
export const metadata = getServiceLandingMetadata(config);
export default function TratamentoDeCanalNoRecreioPage() {
  return <ServiceLandingPage config={config} />;
}
