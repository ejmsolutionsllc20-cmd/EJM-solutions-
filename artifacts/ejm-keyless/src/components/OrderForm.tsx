import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Car, Key, MapPin, Wrench } from "lucide-react";

const vehicleData = {
  Honda: ["Accord", "Civic", "CR-V", "Pilot"],
  Toyota: ["Camry", "Corolla", "RAV4", "Highlander"],
  Ford: ["F-150", "Escape", "Explorer", "Focus"],
  Chevrolet: ["Silverado", "Malibu", "Equinox", "Tahoe"],
  Nissan: ["Altima", "Sentra", "Rogue", "Maxima"],
};

const serviceOptions = [
  "Duplicate Key",
  "Lost All Keys",
  "Program Existing Key",
  "Emergency Lockout"
] as const;

const formSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  email: z.string().email("Valid email is required"),
  make: z.string().min(1, "Vehicle make is required"),
  model: z.string().min(1, "Vehicle model is required"),
  year: z.coerce.number().min(1950, "Invalid year").max(new Date().getFullYear() + 1, "Invalid year"),
  service: z.enum(serviceOptions, { required_error: "Service type is required" }),
  details: z.string().optional(),
  photos: z.any().optional(), // Handled natively by input type=file, schema mostly for existence
});

type FormValues = z.infer<typeof formSchema>;

export function OrderForm() {
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      make: "",
      model: "",
      year: "" as any,
      service: undefined,
      details: "",
    },
  });

  const selectedMake = form.watch("make") as keyof typeof vehicleData | "";
  const models = selectedMake && vehicleData[selectedMake] ? vehicleData[selectedMake] : [];

  const onSubmit = async (data: FormValues) => {
    const res = await fetch("/api/submit-form", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        email: data.email,
        make: data.make,
        model: data.model,
        year: data.year,
        service: data.service,
        details: data.details ?? "",
      }),
    });

    if (!res.ok) {
      toast({
        title: "Something went wrong",
        description: "We couldn't send your request. Please call us at 203-805-9220.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Request Received",
      description: "We've got your info. We'll text or call you shortly with a quote.",
      variant: "default",
    });
    form.reset();
  };

  return (
    <div className="bg-card border shadow-xl rounded-xl p-6 md:p-8 w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-foreground">Vehicle Key Order Form</h3>
        <p className="text-muted-foreground mt-1">Submit your vehicle information below for pricing and availability.</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John" {...field} data-testid="input-firstname" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Doe" {...field} data-testid="input-lastname" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="(203) 555-0123" {...field} data-testid="input-phone" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="john@example.com" {...field} data-testid="input-email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="h-px bg-border w-full my-6"></div>

          {/* Vehicle Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="make"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vehicle Make</FormLabel>
                  <Select 
                    onValueChange={(val) => {
                      field.onChange(val);
                      form.setValue("model", ""); // Reset model when make changes
                    }} 
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger data-testid="select-make">
                        <SelectValue placeholder="Select Make" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.keys(vehicleData).map((make) => (
                        <SelectItem key={make} value={make}>
                          {make}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="model"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vehicle Model</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value} disabled={!selectedMake}>
                    <FormControl>
                      <SelectTrigger data-testid="select-model">
                        <SelectValue placeholder="Select Model" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {models.map((model) => (
                        <SelectItem key={model} value={model}>
                          {model}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vehicle Year</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="2020" {...field} data-testid="input-year" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="service"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Service Needed</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger data-testid="select-service">
                      <SelectValue placeholder="Select Service" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {serviceOptions.map((svc) => (
                      <SelectItem key={svc} value={svc}>
                        {svc}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="details"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Additional Details</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Any specific issues or details we should know about?" 
                    className="resize-none" 
                    rows={4}
                    {...field} 
                    data-testid="textarea-details"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="photos"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Upload Vehicle or Key Photos (Optional)</FormLabel>
                <FormControl>
                  <Input 
                    type="file" 
                    accept="image/*" 
                    multiple 
                    onChange={(e) => field.onChange(e.target.files)} 
                    data-testid="input-file"
                    className="file:bg-muted file:text-muted-foreground file:border-0 file:rounded-sm file:px-3 file:py-1 hover:file:bg-muted/80 cursor-pointer"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button 
            type="submit" 
            size="lg" 
            className="w-full font-bold text-base h-12"
            disabled={form.formState.isSubmitting}
            data-testid="button-submit-quote"
          >
            {form.formState.isSubmitting ? "Sending..." : "Submit Request"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
