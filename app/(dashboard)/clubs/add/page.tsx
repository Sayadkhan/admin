"use client";

import { useState, memo } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import ImageUpload from "@/components/common/ImageUpload";
import MultiImageUpload from "@/components/common/MultiImageUpload";

// --------------------------
// ZOD VALIDATION
// --------------------------
const ClubSchema = z.object({
  clubTitle: z.string().min(2),
  clubDescription: z.string().min(10),
  clubCategory: z.string(),
  clubPresidentName: z.string(),
  phone: z.string(),
  email: z.string().email(),
  address: z.string(),
});

// --------------------------
// REUSABLE FORM FIELD
// --------------------------
const FormField = memo(function FormField({
  label,
  name,
  register,
  placeholder,
}: any) {
  return (
    <div className="space-y-1">
      <Label>{label}</Label>
      <Input {...register(name)} placeholder={placeholder} />
    </div>
  );
});

// --------------------------
// PAGE COMPONENT
// --------------------------
export default function CreateClubPage() {
  const router = useRouter();

  const { register, handleSubmit } = useForm({
    resolver: zodResolver(ClubSchema),
  });

  const [clubLogo, setClubLogo] = useState<File | null>(null);
  const [locationBlocks, setLocationBlocks] = useState<any[]>([]);
  const [benefits, setBenefits] = useState<any[]>([]);

  const [loading, setLoading] = useState(false);

  const addLocationBlock = () =>
    setLocationBlocks((prev) => [
      ...prev,
      { id: crypto.randomUUID(), title: "", location: "", files: [] },
    ]);

  const addBenefit = () =>
    setBenefits((prev) => [
      ...prev,
      { id: crypto.randomUUID(), title: "", shortDescription: "", file: null },
    ]);

  async function onSubmit(values: any) {
    setLoading(true);

    try {
      const formData = new FormData();

      // Base values
      Object.entries(values).forEach(([k, v]) => formData.append(k, v));

      // Contact info
      formData.append(
        "contactInfo",
        JSON.stringify({
          phone: values.phone,
          email: values.email,
          address: values.address,
        })
      );

      // Logo
      if (clubLogo) formData.append("clubLogo", clubLogo);

      // Location blocks
      formData.append("locationBlocks", JSON.stringify(locationBlocks));
      locationBlocks.forEach((loc) =>
        loc.files.forEach((file: File) =>
          formData.append(`location_${loc.id}`, file)
        )
      );

      // Benefits
      formData.append("benefits", JSON.stringify(benefits));
      benefits.forEach((b) => {
        if (b.file) formData.append(`benefit_${b.id}`, b.file);
      });

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/club/create`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (data.success) {
        toast.success("Club has been created Successfully");

        router.push("/club/all");
      } else {
        toast.error("Unable to create club.");
      }
    } catch (error: any) {
      toast.error(`${error.message || "Unable to create club."}`);
    }

    setLoading(false);
  }
  return (
    <div className="container mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold">Create Club</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* BASIC INFO */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              register={register}
              name="clubTitle"
              label="Club Title"
              placeholder="Ex: Science Club"
            />

            <FormField
              register={register}
              name="clubCategory"
              label="Category"
              placeholder="Ex: Technology"
            />

            <FormField
              register={register}
              name="clubPresidentName"
              label="President Name"
              placeholder="Ex: John Doe"
            />

            <div className="space-y-1">
              <Label>Description</Label>
              <Textarea
                {...register("clubDescription")}
                placeholder="Write club description..."
              />
            </div>
          </CardContent>
        </Card>

        {/* CONTACT INFO */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Info</CardTitle>
          </CardHeader>

          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              register={register}
              name="phone"
              label="Phone"
              placeholder="017..."
            />

            <FormField
              register={register}
              name="email"
              label="Email"
              placeholder="email@example.com"
            />

            <FormField
              register={register}
              name="address"
              label="Address"
              placeholder="Dhaka, Bangladesh"
            />
          </CardContent>
        </Card>

        {/* LOGO */}
        <Card>
          <CardHeader>
            <CardTitle>Club Logo</CardTitle>
          </CardHeader>
          <CardContent>
            <ImageUpload file={clubLogo} setFile={setClubLogo} />
          </CardContent>
        </Card>

        {/* LOCATIONS */}
        <Card>
          <CardHeader className="flex justify-between">
            <CardTitle>Locations</CardTitle>
            <Button onClick={addLocationBlock}>+ Add Location</Button>
          </CardHeader>

          <CardContent className="space-y-5">
            {locationBlocks.map((loc, idx) => (
              <div key={loc.id} className="p-4 border rounded-xl space-y-4">
                <Input
                  placeholder="Location Title"
                  onChange={(e) => {
                    const updated = [...locationBlocks];
                    updated[idx].title = e.target.value;
                    setLocationBlocks(updated);
                  }}
                />

                <Input
                  placeholder="Location Name"
                  onChange={(e) => {
                    const updated = [...locationBlocks];
                    updated[idx].location = e.target.value;
                    setLocationBlocks(updated);
                  }}
                />

                <MultiImageUpload
                  files={loc.files}
                  setFiles={(newFiles) => {
                    const updated = [...locationBlocks];
                    updated[idx].files = newFiles;
                    setLocationBlocks(updated);
                  }}
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* BENEFITS */}
        <Card>
          <CardHeader className="flex justify-between">
            <CardTitle>Benefits</CardTitle>
            <Button onClick={addBenefit}>+ Add Benefit</Button>
          </CardHeader>

          <CardContent className="space-y-5">
            {benefits.map((ben, idx) => (
              <div key={ben.id} className="p-4 border rounded-xl space-y-4">
                <Input
                  placeholder="Benefit Title"
                  onChange={(e) => {
                    const updated = [...benefits];
                    updated[idx].title = e.target.value;
                    setBenefits(updated);
                  }}
                />

                <Input
                  placeholder="Short Description"
                  onChange={(e) => {
                    const updated = [...benefits];
                    updated[idx].shortDescription = e.target.value;
                    setBenefits(updated);
                  }}
                />

                <ImageUpload
                  file={ben.file}
                  setFile={(file) => {
                    const updated = [...benefits];
                    updated[idx].file = file;
                    setBenefits(updated);
                  }}
                />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Button className="w-full py-3 text-lg" onClick={handleSubmit(onSubmit)}>
        {loading ? "Processing..." : "Create Club"}
      </Button>
    </div>
  );
}
