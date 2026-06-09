"use client";

import { HiOutlineTrash } from "react-icons/hi";
import { useRouter } from "next/navigation";

export default function RemoveBtn({ id }) {
  const router = useRouter();

  const removeNotification = async () => {
    const confirmed = confirm("Are you sure you want to delete this notification?");

    if (confirmed) {
      const res = await fetch(`/api/notifications?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        router.refresh();
      }
    }
  };

  return (
    <button onClick={removeNotification} className="text-red-400">
      <HiOutlineTrash size={24} />
    </button>
  );
}
