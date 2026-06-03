import { redirect } from "next/navigation";

export const metadata = {
  title: "Aerial Estimator - Get Your Tampa Bay Gutter Price Range Instantly",
  description: "Measure your roof from satellite imagery and get an instant price range for gutters (6\" and 7\"), soffit & fascia, and gutter guards. Free aerial estimates from JR One Aluminum, Tampa Bay.",
  alternates: { canonical: "https://www.jronegutters.com/estimator" },
};

export default function EstimatorPage() {
  redirect("/estimator.html");
}
