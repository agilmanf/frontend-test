import { LoaderFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/react";
import { parseCookie } from "~/lib/helpers";

export const loader = ({ request }: LoaderFunctionArgs) => {
  const cookies = parseCookie(request.headers.get("Cookie"));
  const authorization = cookies["authorization"];

  if (!authorization) {
    return redirect("/login");
  }

  return redirect("/checklist");
};

export default function IndexPage() {
  return null;
}
