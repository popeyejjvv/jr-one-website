import PageClient from "./PageClient";
import ServicePortfolio from "@/components/ServicePortfolio";

export default function Page() {
  return (
    <PageClient
      portfolio={
        <ServicePortfolio
          serviceSlug="govee-lights"
          serviceLabel="Govee LED lighting"
          limit={12}
        />
      }
    />
  );
}
