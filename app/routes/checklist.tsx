import {
  json,
  redirect,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import { Outlet } from "@remix-run/react";

import { parseCookie } from "~/lib/helpers";

export const meta: MetaFunction = () => {
  return [
    { title: "My Todolist App" },
    { name: "description", content: "This is just simple todo list app" },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const cookies = parseCookie(request.headers.get("Cookie"));
  const authorization = cookies["authorization"];

  if (!authorization) {
    return redirect("/login");
  }

  return json({});
};

export default function Index() {
  return <Outlet />;
}
