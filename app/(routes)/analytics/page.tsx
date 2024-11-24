import { redirect } from "next/navigation"
import { auth } from "@clerk/nextjs"
import { db } from "@/lib/db"

export default async function PageAnalytics() {
    const  {userId}= auth()

    if (!userId) {
        return redirect("/")
    }

    const companies = await db.company.findMany({
        where: {
            userId
        },
        orderBy: {
            createdAt: "desc"
        }

    })

    const events = await db.event.findMany({
        orderBy: {
            createdAt: "desc"
        }
    })
  return (
    <div>PageAnalytics</div>
  )
}
