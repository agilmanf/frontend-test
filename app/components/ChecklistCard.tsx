import { useLoaderData, useNavigate, useRevalidator } from "@remix-run/react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { toast } from "react-toastify";

import { Checklist } from "~/types/checklist";
import { DefaultResponseData } from "~/types/shared";
import { deleteChecklist } from "~/lib/api/checklist";
import { loader } from "~/routes/checklist._index";

const ChecklistMenu = ({
  onEdit,
  onDelete,
}: {
  onEdit: () => void;
  onDelete: () => void;
}) => {
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
          <span
            onClick={onEdit}
            className="cursor-pointer rounded block px-2 py-1 data-[focus]:bg-blue-100"
          >
            Edit
          </span>
        </MenuItem>
        <MenuItem>
          <span
            onClick={onDelete}
            className="cursor-pointer rounded block px-2 py-1 text-red-500 data-[focus]:bg-red-100"
          >
            Delete
          </span>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
};

export default function ChecklistCard({ checklist }: { checklist: Checklist }) {
  const { authorization } = useLoaderData<typeof loader>();
  const { revalidate } = useRevalidator();
  const navigate = useNavigate();

  const handleDelete = async () => {
    const res = (await deleteChecklist(
      checklist.id.toString(),
      authorization
    )) as DefaultResponseData<any>;

    if (res.errorMessage) {
      toast(res.errorMessage, { type: "error" });
      return;
    }

    toast(res.message, { type: "success" });
    revalidate();
  };

  return (
    <div className="bg-stone-300 p-2">
      <div className="flex justify-between items-center">
        <h2 className="font-medium">{checklist.name}</h2>
        <ChecklistMenu
          onEdit={() => navigate(`/checklist/${checklist.id}`)}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}
