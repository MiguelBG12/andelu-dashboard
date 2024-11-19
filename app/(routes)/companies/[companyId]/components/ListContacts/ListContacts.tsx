import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";

import { db } from "@/lib/db";

import { Mail, Phone } from "lucide-react";

import { Separator } from "@/components/ui/separator";

import { ListContactsProps } from "./ListContacts.types";

export async function ListContacts(props: ListContactsProps) {
  const { company } = props;
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const contacts = await db.contact.findMany({
    where: {
      company: {
        id: company.id,
      },
    },
  });

  if (contacts.length === 0) {
    return <p>You currently have no contacts</p>;
  }
  return (
    <div>
      <div
        className="grid items-center justify-between grid-cols-3 p-2 px-4 mt-4 mb-2
        rounded-lg gap-x-3 bg-slate-400/20"
      >
        <p>Name</p>
        <p>Role</p>
        <p className="text-right">Contact</p>
      </div>

      {contacts.map((contact) => (
        <div key={contact.id}>
          <div className="grid items-center justify-between grid-cols-3 px-4 gap-x-3">
            <p>{contact.name}</p>
            <p>{contact.role}</p>
            <div className="flex items-center justify-end gap-x-6">
              <a href={`tel: ${contact.phone}`} target="_blank">
                <Phone className="w-4 h-4"></Phone>
              </a>
              <a href={`mailto: ${contact.phone}`} target="_blank">
                <Mail className="w-4 h-4"></Mail>
              </a>
            </div>
          </div>
          <Separator className="my-3" />
        </div>
      ))}
    </div>
  );
}
