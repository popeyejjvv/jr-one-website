import PageClient from "./PageClient";
import ServicePortfolio from "@/components/ServicePortfolio";

export default function Page() {
  return (
    <PageClient
      portfolio={
        <ServicePortfolio
          serviceSlug="seamless-aluminum-gutters"
          serviceLabel="Seamless aluminum gutter"
          limit={12}
        />
      }
    />
  );
}
