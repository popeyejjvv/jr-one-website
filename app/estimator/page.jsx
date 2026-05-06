import { redirect } from "next/navigation";

export const metadata = {
  title: "Aerial Estimator, JR One Aluminum | Get Your Price Range Instantly",
  description: "Measure your roof from satellite imagery and get an instant price range for gutters, soffit, fascia, and gutter guards. Free aerial estimates from JR One Aluminum, Tampa Bay.",
};

export default function EstimatorPage() {
  redirect("/estimator.html");
}
