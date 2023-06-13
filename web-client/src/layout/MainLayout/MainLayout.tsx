import { Outlet } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export default function MainLayout() {
  return (
    <div className="w-full h-full">
      <div className="flex relative flex-row">
        <div className="fixed w-60 h-full bg-cyan-200">
          <div className="flex justify-between">
            <div>
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <NavigationMenuLink>Link</NavigationMenuLink>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
            <div>asd</div>
          </div>
        </div>
        <div className="flex-1 ml-60 w-full h-full bg-green-300">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
