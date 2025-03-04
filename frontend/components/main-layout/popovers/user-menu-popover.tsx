import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import Link from "next/link";

export default function UserMenuPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Menu</Button>
      </PopoverTrigger>
      <PopoverContent className="w-30 p-2">
        <div className="flex flex-col space-y-2">
          <Link href={"/login"}>
            <Button
              variant={"outline"}
              className="ml-0 w-25"
              style={{ cursor: "pointer" }}
            >
              Login
            </Button>
          </Link>
          <Link href={"/register"}>
            <Button
              variant={"outline"}
              className="ml-0 w-25"
              style={{ cursor: "pointer" }}
            >
              Registrar
            </Button>
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  );
}
