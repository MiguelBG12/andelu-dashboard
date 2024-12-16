"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import axios from "axios";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormCreateCustomerProps } from "./FormCreateCustomer.type";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CldUploadWidget } from "next-cloudinary";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string(),
  country: z.string().min(2),
  website: z.string().min(2),
  phone: z.string().min(9),
  CIF: z.string().min(6),
  logoCompany: z.string(),
  uniformCompany: z.string(),
});

export function FormCreateCustomer(props: FormCreateCustomerProps) {
  const { setOpenModalCreate } = props;
  const router = useRouter();
  const [logoUploaded, setLogoUploaded] = useState(false);
  const [uniformUploaded, setUniformUploaded] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      country: "",
      website: "",
      phone: "",
      CIF: "",
      logoCompany: "",
      uniformCompany: "",
    },
  });

  const handleUpload = (
    type: "logoCompany" | "uniformCompany",
    url: string
  ) => {
    form.setValue(type, url);
    toast({
      title: `${type === "logoCompany" ? "Logo" : "Uniform"} image uploaded!`,
    });
    if (type === "logoCompany") setLogoUploaded(true);
    else setUniformUploaded(true);
  };

  const { isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post("api/company", values);
      toast({ title: "Company created" });
      router.refresh();
      setOpenModalCreate(false);
    } catch (error) {
      toast({
        title: "Something went wrong",
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Company name" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select the country" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="argentina">Argentina</SelectItem>
                      <SelectItem value="brasil">Brasil</SelectItem>
                      <SelectItem value="usa">USA</SelectItem>
                      <SelectItem value="chile">Chile</SelectItem>
                      <SelectItem value="colombia">Colombia</SelectItem>
                      <SelectItem value="peru">Peru</SelectItem>
                      <SelectItem value="mexico">Mexico</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
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
                      placeholder="www.example.com"
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
                  <FormLabel>Logo</FormLabel>
                  <FormControl>
                    <CldUploadWidget
                      uploadPreset={
                        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
                      }
                      onUpload={(result: { info: { secure_url: string } }) => {
                        console.log("Upload Result:", result);
                        handleUpload("logoCompany", result.info.secure_url)
                      }}
                    >
                      {({ open }) => (
                        <Button
                          type="button"
                          onClick={() => open()}
                          variant="outline"
                        >
                          {logoUploaded ? "Logo Uploaded" : "Max. 4mb"}
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
                  <FormLabel>Uniform</FormLabel>
                  <FormControl>
                    <CldUploadWidget
                      uploadPreset={
                        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
                      }
                      onUpload={(result) =>
                        handleUpload("uniformCompany", result.info.secure_url)
                      }
                    >
                      {({ open }) => (
                        <Button
                          type="button"
                          onClick={() => open()}
                          variant="outline"
                        >
                          {uniformUploaded
                            ? "Uniform Uploaded"
                            : "Upload Uniform"}
                        </Button>
                      )}
                    </CldUploadWidget>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" disabled={!isValid}>
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
