import PageClient from "./PageClient";
import ServicePortfolio from "@/components/ServicePortfolio";

export default function Page() {
  return (
    <PageClient
      portfolio={
        <ServicePortfolio
          serviceSlug="soffit-and-fascia"
          serviceLabel="Soffit and fascia"
          limit={12}
        />
      }
    />
  );
}
