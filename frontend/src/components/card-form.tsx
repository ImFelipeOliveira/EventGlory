import React from "react";
import { Card, CardContent, CardTitle } from "./ui/card";

export default function CardForm({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex justify-center w-full">
      <Card className="w-full mt-10 max-w-300">
        <CardTitle className="text-center align-middle scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          {title}
        </CardTitle>
        <CardContent>{children}</CardContent>
      </Card>
    </div>
  );
}
