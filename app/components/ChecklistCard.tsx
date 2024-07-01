import { Link, useLoaderData } from "@remix-run/react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { loader } from "~/routes/_index";

import { Checklist } from "~/types/checklist";
import { deleteChecklist } from "~/lib/api/checklist";

const ChecklistMenu = ({ id }: { id: number }) => {
  const data = useLoaderData<typeof loader>();
  const authorization = decodeURIComponent(data.authorization);

  const handleDelete = async () => {
    const res = await deleteChecklist(id.toString(), authorization);
  };

  return (
    <Menu>
      <MenuButton>
        <img className="size-4" src="/static/icons/menu-dots-vertical.svg" />
      </MenuButton>
      <MenuItems
        className="bg-white px-4 py-3 rounded-lg shadow-md"
        anchor="bottom end"
      >
        <MenuItem>
          <Link
            to={`/${id}`}
            className="cursor-pointer rounded block px-2 py-1 data-[focus]:bg-blue-100"
          >
            Edit
          </Link>
        </MenuItem>
        <MenuItem>
          <span className="cursor-pointer rounded block px-2 py-1 text-red-500 data-[focus]:bg-red-100">
            Delete
          </span>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
};

export default function ChecklistCard({ checklist }: { checklist: Checklist }) {
  return (
    <div className="bg-stone-300 p-2">
      <div className="flex justify-between items-center">
        <h2 className="font-medium">{checklist.name}</h2>
        <ChecklistMenu id={checklist.id} />
      </div>
    </div>
  );
}
