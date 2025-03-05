import { Form } from "@/src/components/ui/form";
import { useFormContext } from "react-hook-form";

export default function EventoForm() {
  const formMethods = useFormContext();
  return (
    <Form {...formMethods}>
      <form action=""></form>
    </Form>
  );
}
