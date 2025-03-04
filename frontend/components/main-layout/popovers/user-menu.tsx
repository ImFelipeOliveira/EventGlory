import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function () {
  return (
    <div className="flex gap-x-4">
      <Link href={"/login"}>
        <Button
          variant={"outline"}
          className="ml-0 w-35"
          style={{ cursor: "pointer" }}
        >
          Acessar Sua Conta
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
  );
}
