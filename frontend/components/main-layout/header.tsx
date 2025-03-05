"use client";

import Link from "next/link";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next/client";
import PerfilPopover from "./authenticated/popovers/perfil-popover";
import UserMenuOptions from "./user-menu-options";
import { usePathname } from "next/navigation";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const getUserIsLogged = () => {
      const accessToken = getCookie("token_access");
      return !!accessToken;
    };

    setIsLogged(getUserIsLogged());
  }, []);

  const toggleColorMode = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  const path = usePathname();

  return (
    <header className="flex items-center h-16 px-4 border-b bg-white lg:px-6 dark:bg-gray-950">
      <div className="flex items-center space-x-4">
        <Link
          href="#"
          className="flex items-center space-x-2"
          prefetch={false}
        ></Link>
      </div>
      <div className="flex items-center ml-auto space-x-4">
        <Link
          href="#"
          className="text-sm font-medium underline"
          prefetch={false}
        ></Link>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon">
              <MagnifyingGlassIcon className="w-4 h-4" />
              <span className="sr-only">Search</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-120 p-2">
            <form className="flex items-center space-x-2">
              <MagnifyingGlassIcon className="w-4 h-4 opacity-50" />
              <Input
                type="search"
                placeholder="Search"
                className="flex-1 text-sm"
                autoFocus
              />
            </form>
          </PopoverContent>
        </Popover>
        {isLogged === true && path !== "/area-do-criador" && (
          <div className="flex gap-x-4">
            <Link href={"area-do-criador/"}>
              <Button
                variant={"outline"}
                className="ml-0 w-35"
                style={{ cursor: "pointer" }}
              >
                CRIE SEU EVENTO
              </Button>
            </Link>
          </div>
        )}

        {isLogged ? <PerfilPopover /> : <UserMenuOptions />}
        <Button
          variant="outline"
          size="icon"
          onClick={toggleColorMode}
          style={{ cursor: "pointer" }}
        >
          {theme === "light" ? <MoonIcon /> : <SunIcon />}
        </Button>
      </div>
    </header>
  );
}
