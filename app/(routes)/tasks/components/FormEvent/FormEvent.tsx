"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { FormEventProps } from "./FormEvent.types";

const formSchema = z.object({
  eventName: z.string().min(2),
  companieSelected: z.object({
    name: z.string().min(2),
    id: z.string(),
  }),
});

export function FormEvent(props: FormEventProps) {
  const { companies, setNewEvent, setOnSaveNewEvent, setOpen } = props;

  const [selectedCompany, setSelectedCompany] = useState({
    name: "",
    id: "",
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      eventName: "",
      companieSelected: {
        name: "",
        id: "",
      },
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setNewEvent(values);
    setOpen(false);
    setOnSaveNewEvent(true);
  }

  const handleCompanyChange = (newValue: string) => {
    const selectedCompany = companies.find(
      (company) => company.name === newValue
    );
    if (selectedCompany) {
      setSelectedCompany({
        name: selectedCompany.name,
        id: selectedCompany.id,
      });
      form.setValue("companieSelected.name", selectedCompany.name)
      form.setValue("companieSelected.id", selectedCompany.id)
    }
  };
  return <div>FormEvent</div>;
}
