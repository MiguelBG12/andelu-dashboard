import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";

import { db } from "@/lib/db";

import { Mail, Phone } from "lucide-react";

import { Separator } from "@/components/ui/separator";

import { ListContactsProps } from "./ListContacts.types";

export async function ListContacts(props: ListContactsProps) {
  const { company } = props;
  const { userId } = auth()

  if(!userId) {
      return redirect("/")
  }

  const contacts = await db.contact.findMany({
    where: {
        company: {
            id: company.id
        }
    }
  })

  if (contacts.length === 0) {
    return <p>You currently have no contacts</p>
  }
  return <div>ListContacts</div>;
}
