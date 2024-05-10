"use client";

import { useFormStatus } from "react-dom";
import { type ComponentProps } from "react";
import { Button } from "./ui/button";

type Props = ComponentProps<"button"> & {
  pendingText: string | React.ReactNode;
};

export function SubmitButton({ children, pendingText, ...props }: Props) {
  const { pending } = useFormStatus();

  return (
    <Button {...props} type="submit" aria-disabled={pending} disabled={pending}>
      {pending ? pendingText : children}
    </Button>
  );
}
