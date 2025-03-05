"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import Image from "next/image";
import favicon from "../../../../app/favicon.ico";
import Link from "next/link";
import { IoSettings } from "react-icons/io5";
import { RxAvatar } from "react-icons/rx";
import { logout } from "@/app/(auth)/_actions/actions";

export default function PerfilPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild style={{ cursor: "pointer" }}>
        <Button variant="outline" size="icon" className="rounded-full">
          <Image
            src={favicon}
            alt="Avatar"
            width={32}
            height={32}
            style={{
              aspectRatio: "32/32",
              objectFit: "cover",
              borderRadius: "calc(infinity * 1px)",
            }}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-40 p-2">
        <div className="flex flex-col space-y-2">
          <Link href={""}>
            <Button
              variant={"outline"}
              className="justify-start w-full cursor-pointer"
            >
              <IoSettings />
              Área do Criador
            </Button>
          </Link>
          <Link href={""}>
            <Button
              variant={"outline"}
              className="justify-start w-full cursor-pointer"
            >
              <RxAvatar />
              Perfil
            </Button>
          </Link>
          <Button
            variant={"outline"}
            className="justify-start w-full cursor-pointer"
            onClick={logout}
          >
            <RxAvatar />
            Sair
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
