import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "My Todoist App" },
    { name: "description", content: "This is just simple todo list app" },
  ];
};

export const loader = () => {
  return null;
};

export default function Index() {
  return (
    <main className="container mx-auto my-8">
      <h1 className="text-2xl font-bold">Just simple todo list app</h1>
    </main>
  );
}
