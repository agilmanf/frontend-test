import { json, LoaderFunctionArgs } from "@remix-run/node";

import { parseCookie } from "~/lib/helpers";

export const loader = ({ request }: LoaderFunctionArgs) => {
  const cookies = parseCookie(request.headers.get("Cookie"));
  const authorization = decodeURIComponent(cookies["authorization"]);

  return json({ authorization });
};

export default function ChecklistDetailPage() {
  return <div>_index.$id</div>;
}
