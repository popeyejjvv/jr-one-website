import PageClient from "./PageClient";
import ServicePortfolio from "@/components/ServicePortfolio";

export default function Page() {
  return (
    <PageClient
      portfolio={
        <ServicePortfolio
          serviceSlug="commercial-gutters"
          serviceLabel="Commercial gutter system"
          limit={12}
        />
      }
    />
  );
}
