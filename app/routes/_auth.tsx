import { LoaderFunctionArgs } from "@remix-run/node";
import { Outlet, redirect } from "@remix-run/react";

import { parseCookie } from "~/lib/helpers";

export const loader = ({ request }: LoaderFunctionArgs) => {
  const cookies = parseCookie(request.headers.get("Cookie"));
  const authorization = cookies["authorization"];

  if (authorization) {
    return redirect("/");
  }

  return null;
};

export default function AuthPage() {
  return (
    <main className="bg-blue-50 h-full min-h-screen py-10">
      <Outlet />
    </main>
  );
}
