import { PaginatedResponse } from "@/interfaces/paginated-response";
import { z } from "zod";
import { zfd } from "zod-form-data";

interface EventResponse extends PaginatedResponse<Event> {}

export interface Event {
  id: number;
  name: string;
  image: string;
  description: string;
  start_date: string;
  end_date: string;
  min_age: string;
  price: string;
  max_participants: number;
  city: string;
  state: string;
  registration_deadline: string;
  categories: string;
  requires_payment: boolean;
  created_by: number;
}

export const EventForm = z.object({
  id: z.number(),
  name: z.string({ required_error: "Informe um nome para o evento" }),
  image: zfd
    .file()
    .refine((file) => file.size < 10000000, {
      message: "A imagem não pode ser maior que 10MB.",
    })
    .refine(
      (file) => ["image/jpeg", "image/png", "image/jpg"].includes(file.type),
      {
        message:
          "O arquivo deve ter o um dos seguintes formatos: jpg, jpeg, lub, png.",
      }
    ),
  description: z.string({
    required_error: "Informe uma descrição para o evento.",
  }),
  start_date: z
    .string({ required_error: "Informe uma data de início para o evento." })
    .date(),
  end_date: z
    .string({ required_error: "Informe uma data fim para o evento." })
    .date(),
  min_age: z.number().positive(),
  price: z.number(),
  max_participants: z.number(),
  city: z.string({ required_error: "Infome a cidade do evento." }),
  state: z.string({ required_error: "Selecione o estado do evento." }),
  registration_deadline: z
    .string({ required_error: "Informe uma data limite para inscrição." })
    .date(),
  categories: z.string({
    required_error: "Selecione uma categoria para o evento.",
  }),
});
