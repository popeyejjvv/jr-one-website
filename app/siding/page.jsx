import PageClient from "./PageClient";
import ServicePortfolio from "@/components/ServicePortfolio";

export default function Page() {
  return (
    <PageClient
      portfolio={
        <ServicePortfolio
          serviceSlug="siding"
          serviceLabel="Siding"
          limit={12}
        />
      }
    />
  );
}
