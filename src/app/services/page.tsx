import { redirect } from "next/navigation";

/** Redirects legacy /services requests directly to the homepage services overview section. */
export default function ServicesPage() {
  redirect("/#scene-what-we-do");
}
