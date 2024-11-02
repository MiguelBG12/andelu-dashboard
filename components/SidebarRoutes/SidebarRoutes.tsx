import { SidebarItem } from "../SidebarItem";
import { Separator } from "@/components/ui/separator";
import {
  dataGeneralSidebar,
  dataToolsSidebar,
  dataSupportSidebar,
} from "./SidebarRoutes.data";

export function SidebarRoutes() {
  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <div className="p-2 md:p-6">
            <p>GENERAL</p>
            {dataGeneralSidebar.map((item) => (
                <SidebarItem key={item.label} item={item}/>
            ))}
        </div>

        <Separator />
      </div>
    </div>
  );
}
