"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

import { CldUploadWidget } from 'next-cloudinary';

import { CompanyFormProps } from "./CompanyForm.types";
import { formSchema } from "./CompanyForm.form";
import { toast } from "@/hooks/use-toast";

export function CompanyForm(props: CompanyFormProps) {
  const { company } = props;
  const router = useRouter();

  const [logoUploaded, setLogoUploaded] = useState(false);
  const [uniformUploaded, setUniformUploaded] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: company.name,
      description: company.description,
      country: company.country,
      website: company.website,
      phone: company.phone,
      CIF: company.CIF,
      logoCompany: company.logoCompany,
      uniformCompany: company.uniformCompany
    },
  });

  const handleUpload = (type: "logoCompany" | "uniformCompany", url: string) => {
    form.setValue(type, url);
    toast({ title: `${type === "logoCompany" ? "Logo" : "Uniform"} image uploaded!` });
    if (type === "logoCompany") setLogoUploaded(true);
    else setUniformUploaded(true);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/company/${company.id}`, values);
      toast({
        title: "Company uploaded!",
      });
      router.refresh();
    } catch (error) {
      toast({
        title: "Something went wrong",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company name</FormLabel>
                <FormControl>
                  <Input placeholder="Company name" type="text" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website</FormLabel>
                <FormControl>
                  <Input
                    placeholder="www.miguelbautista.com"
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input
                    placeholder="+51 999 999 999"
                    type="number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="CIF"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CIF</FormLabel>
                <FormControl>
                  <Input placeholder="B-1234567" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="logoCompany"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Logo company</FormLabel>
                <FormControl>
                  <CldUploadWidget
                    uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                    onUpload={(result) => handleUpload("logoCompany", result.info.secure_url)}
                  >
                    {({ open }) => (
                      <Button
                        type="button"
                        onClick={() => open()}
                        variant="outline"
                      >
                        {logoUploaded ? "Logo Uploaded! Click to Reupload" : "Upload Logo"}
                      </Button>
                    )}
                  </CldUploadWidget>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="uniformCompany"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Uniform Image</FormLabel>
                <FormControl>
                  <CldUploadWidget
                    uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                    onUpload={(result) => handleUpload("uniformCompany", result.info.secure_url)}
                  >
                    {({ open }) => (
                      <Button
                        type="button"
                        onClick={() => open()}
                        variant="outline"
                      >
                        {uniformUploaded ? "Uniform  Uploaded! Click to Reupload" : "Upload Uniform"}
                      </Button>
                    )}
                  </CldUploadWidget>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Description..."
                    {...field}
                    value={form.getValues().description ?? ""}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Edit company</Button>
      </form>
    </Form>
  );
}
