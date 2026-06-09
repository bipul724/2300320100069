import Link from "next/link";
import RemoveBtn from "./RemoveBtn"; 
import { HiPencilAlt } from "react-icons/hi";

import { prisma } from "@/lib/prisma";

export default async function NotificationList() {
  
  
  const notifications = await prisma.notification.findMany({
    orderBy: {
      createdAt: 'desc', 
    },
  });

  return (
    <>
      {notifications.map((n) => (
        <div
          key={n.id} 
          className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start"
        >
          <div>
            <h2 className="font-bold text-2xl">{n.title}</h2>
            
            <div>{n.message}</div>
            
           
            <p className="text-xs text-gray-500 mt-2">
              {n.isRead ? "Read" : "Unread"} 
            </p>
          </div>

          <div className="flex gap-2">
            
            <RemoveBtn id={n.id} />
            <Link href={`/editNotification/${n.id}`}>
              <HiPencilAlt size={24} />
            </Link>
          </div>
        </div>
      ))}
      
     
      {notifications.length === 0 && (
        <p>No notifications found.</p>
      )}
    </>
  );
}
