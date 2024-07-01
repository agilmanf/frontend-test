import {
  json,
  redirect,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import { useLoaderData, useRevalidator } from "@remix-run/react";
import { useState } from "react";
import { toast } from "react-toastify";

import EmptySection from "~/components/EmptySection";
import ChecklistCard from "~/components/ChecklistCard";

import { addChecklist, getAllChecklist } from "~/lib/api/checklist";
import { parseCookie } from "~/lib/helpers";
import { Checklist, GetAllChecklistResponse } from "~/types/checklist";
import { DefaultResponseData } from "~/types/shared";

export const meta: MetaFunction = () => {
  return [
    { title: "My Todolist App" },
    { name: "description", content: "This is just simple todo list app" },
  ];
};

export const loader = async ({ request, context }: LoaderFunctionArgs) => {
  const cookies = parseCookie(request.headers.get("Cookie"));
  const authorization = decodeURIComponent(cookies["authorization"]);

  const res = (await getAllChecklist(authorization)) as GetAllChecklistResponse;
  const checklist: Checklist[] = res.data || [];

  return json({ authorization, checklist });
};

export default function Index() {
  const { authorization, checklist } = useLoaderData<typeof loader>();
  const { revalidate } = useRevalidator();

  const [name, setName] = useState("");

  return (
    <main className="container mx-auto my-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Checklist</h1>

        <div className="flex gap-2">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="shadow border p-2 rounded-lg"
            placeholder="Tambah checklist baru"
          />
          <button
            onClick={async () => {
              const res = (await addChecklist(
                name,
                authorization
              )) as DefaultResponseData<any>;

              if (res.errorMessage) {
                toast(res.errorMessage, { type: "error" });
                return;
              }

              toast(res.message, { type: "success" });
              setName("");
              revalidate();
            }}
            disabled={!name}
            className="bg-blue-500 text-white p-2 rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Tambah
          </button>
        </div>
      </div>

      <section className="mt-10">
        {checklist.length !== 0 ? (
          <div className="grid grid-cols-[repeat(auto-fill,_minmax(200px,1fr))] gap-5">
            {checklist.map((list) => (
              <ChecklistCard key={list.id} checklist={list} />
            ))}
          </div>
        ) : (
          <EmptySection title="Kamu Belum Mempunyai Checklist!" />
        )}
      </section>
    </main>
  );
}
