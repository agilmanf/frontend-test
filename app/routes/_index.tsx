import {
  json,
  redirect,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ChecklistCard from "~/components/ChecklistCard";

import EmptySection from "~/components/EmptySection";

import { addChecklist, getAllChecklist } from "~/lib/api/checklist";
import { parseCookie } from "~/lib/helpers";
import {
  AddChecklistResponse,
  Checklist,
  GetAllChecklistResponse,
} from "~/types/checklist";

export const meta: MetaFunction = () => {
  return [
    { title: "My Todolist App" },
    { name: "description", content: "This is just simple todo list app" },
  ];
};

export const loader = ({ request }: LoaderFunctionArgs) => {
  const cookies = parseCookie(request.headers.get("Cookie"));
  const authorization = cookies["authorization"];

  if (!authorization) {
    return redirect("/login");
  }

  return json({ authorization });
};

export default function Index() {
  const data = useLoaderData<typeof loader>();
  const authorization = decodeURIComponent(data.authorization);

  const [name, setName] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [checklist, setChecklist] = useState<Checklist[]>([]);

  const fetchChecklist = async () => {
    setIsLoading(true);

    const res = (await getAllChecklist(
      authorization
    )) as GetAllChecklistResponse;

    if (res.data) {
      setChecklist(res.data);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchChecklist();
  }, []);

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
              )) as AddChecklistResponse;

              if (res.errorMessage) {
                toast(res.errorMessage, { type: "error" });
                return;
              }

              toast(res.message, { type: "success" });
              fetchChecklist();
              setName("");
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
