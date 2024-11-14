import { redirect } from "next/navigation";

import { auth } from "@clerk/nextjs";

import { db } from "@/lib/db";

export async function ListCompanies() {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }

  const companies = await db.company.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  console.log(companies)

  return <div>ListCompanies</div>;
}
