import PageClient from "./PageClient";
import ServicePortfolio from "@/components/ServicePortfolio";

export default function Page() {
  return (
    <PageClient
      portfolio={
        <ServicePortfolio
          serviceSlug="gutter-guards"
          serviceLabel="Gutter guard"
          limit={12}
        />
      }
    />
  );
}
