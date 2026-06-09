"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddNotification() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [studentID, setStudentID] = useState("");
  const [notificationType, setNotificationType] = useState("Event");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !message || !studentID) {
      alert("Title, message, and student ID are required.");
      return;
    }

    try {
      const res = await fetch("/api/notifications", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          title,
          message,
          studentID: parseInt(studentID),
          notificationType,
        }),
      });

      if (res.ok) {
        router.push("/");
        router.refresh();
      } else {
        throw new Error("Failed to create a notification");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Notification Title"
      />

      <input
        onChange={(e) => setMessage(e.target.value)}
        value={message}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Notification Message"
      />

      <input
        onChange={(e) => setStudentID(e.target.value)}
        value={studentID}
        className="border border-slate-500 px-8 py-2"
        type="number"
        placeholder="Student ID"
      />

      <select
        onChange={(e) => setNotificationType(e.target.value)}
        value={notificationType}
        className="border border-slate-500 px-8 py-2"
      >
        <option value="Event">Event</option>
        <option value="Result">Result</option>
        <option value="Placement">Placement</option>
      </select>

      <button
        type="submit"
        className="bg-green-600 font-bold text-white py-3 px-6 w-fit"
      >
        Add Notification
      </button>
    </form>
  );
}
