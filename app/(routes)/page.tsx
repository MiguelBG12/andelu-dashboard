import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { CardSummary } from "./components/CardSummary";
import { UserRound } from "lucide-react";


export default function Home() {
  return (
  <div>
    <UserButton />
    <h2 className="text-2xl mb-4">Dashboard</h2>
    <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-x-20">
      <CardSummary 
        icon={UserRound}
        total="12.450"
        average={12}
        title="Companies created"
        tooltipText="See all the companies created"
      />
      <div>Card Summary</div>
      <div>Card Summary</div>
    </div>
  </div>
  );
}
