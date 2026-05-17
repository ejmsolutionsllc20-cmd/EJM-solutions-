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

const vehicleData: Record<string, string[]> = {
  Acura: ["ILX", "Integra", "MDX", "NSX", "RDX", "TLX"],
  "Alfa Romeo": ["Giulia", "Giulietta", "Stelvio", "Tonale"],
  Audi: ["A3", "A4", "A5", "A6", "A7", "A8", "e-tron", "Q3", "Q4 e-tron", "Q5", "Q7", "Q8", "RS3", "RS5", "S3", "S4", "S5", "TT"],
  BMW: ["2 Series", "3 Series", "4 Series", "5 Series", "7 Series", "8 Series", "i3", "i4", "i7", "iX", "X1", "X2", "X3", "X4", "X5", "X6", "X7", "Z4"],
  Buick: ["Enclave", "Encore", "Encore GX", "Envision", "LaCrosse", "Verano"],
  Cadillac: ["CT4", "CT5", "CT6", "Escalade", "Escalade ESV", "Lyriq", "XT4", "XT5", "XT6"],
  Chevrolet: ["Blazer", "Bolt EUV", "Bolt EV", "Camaro", "Colorado", "Corvette", "Equinox", "Express", "Impala", "Malibu", "Silverado 1500", "Silverado 2500HD", "Silverado 3500HD", "Sonic", "Spark", "Suburban", "Tahoe", "Trailblazer", "Traverse", "Trax"],
  Chrysler: ["300", "Pacifica", "Voyager"],
  Dodge: ["Challenger", "Charger", "Dart", "Durango", "Grand Caravan", "Journey", "Viper"],
  Fiat: ["124 Spider", "500", "500L", "500X"],
  Ford: ["Bronco", "Bronco Sport", "EcoSport", "Edge", "Escape", "Expedition", "Explorer", "F-150", "F-250 Super Duty", "F-350 Super Duty", "Flex", "Focus", "Fusion", "Maverick", "Mustang", "Mustang Mach-E", "Ranger", "Transit", "Transit Connect"],
  Genesis: ["G70", "G80", "G90", "GV60", "GV70", "GV80"],
  GMC: ["Acadia", "Canyon", "Envoy", "Sierra 1500", "Sierra 2500HD", "Sierra 3500HD", "Terrain", "Yukon", "Yukon XL"],
  Honda: ["Accord", "Civic", "CR-V", "CR-Z", "Fit", "HR-V", "Insight", "Odyssey", "Passport", "Pilot", "Prologue", "Ridgeline"],
  Hyundai: ["Elantra", "Ioniq", "Ioniq 5", "Ioniq 6", "Kona", "Palisade", "Santa Cruz", "Santa Fe", "Sonata", "Tucson", "Veloster", "Venue"],
  Infiniti: ["Q50", "Q60", "QX50", "QX55", "QX60", "QX80"],
  Jaguar: ["E-Pace", "F-Pace", "F-Type", "I-Pace", "XE", "XF", "XJ"],
  Jeep: ["Cherokee", "Compass", "Gladiator", "Grand Cherokee", "Grand Cherokee L", "Grand Wagoneer", "Renegade", "Wagoneer", "Wrangler"],
  Kia: ["Carnival", "EV6", "Forte", "K5", "Niro", "Rio", "Seltos", "Soul", "Sorento", "Sportage", "Stinger", "Telluride"],
  "Land Rover": ["Defender", "Discovery", "Discovery Sport", "Freelander", "Range Rover", "Range Rover Evoque", "Range Rover Sport", "Range Rover Velar"],
  Lexus: ["ES", "GS", "GX", "IS", "LC", "LS", "LX", "NX", "RC", "RX", "UX"],
  Lincoln: ["Aviator", "Continental", "Corsair", "MKC", "MKT", "MKX", "MKZ", "Nautilus", "Navigator"],
  Lucid: ["Air"],
  Maserati: ["Ghibli", "GranTurismo", "Grecale", "Levante", "MC20", "Quattroporte"],
  Mazda: ["CX-30", "CX-5", "CX-50", "CX-9", "CX-90", "Mazda3", "Mazda6", "MX-5 Miata", "MX-30"],
  Mini: ["Clubman", "Convertible", "Cooper", "Cooper S", "Countryman", "Paceman"],
  Mitsubishi: ["Eclipse Cross", "Galant", "Mirage", "Outlander", "Outlander PHEV", "Outlander Sport"],
  Nissan: ["Altima", "Armada", "Frontier", "Kicks", "LEAF", "Maxima", "Murano", "Pathfinder", "Rogue", "Rogue Sport", "Sentra", "Titan", "Versa"],
  Oldsmobile: ["Alero", "Aurora", "Bravada", "Cutlass", "Intrigue", "Silhouette"],
  Pontiac: ["Aztek", "Bonneville", "Firebird", "G5", "G6", "G8", "Grand Am", "Grand Prix", "Montana", "Solstice", "Torrent", "Vibe"],
  Porsche: ["718 Boxster", "718 Cayman", "911", "Cayenne", "Macan", "Panamera", "Taycan"],
  Ram: ["1500", "2500", "3500", "ProMaster", "ProMaster City"],
  Rivian: ["R1S", "R1T"],
  Saturn: ["Astra", "Aura", "Ion", "L-Series", "Outlook", "Sky", "Vue"],
  Scion: ["FR-S", "iA", "iM", "iQ", "tC", "xA", "xB", "xD"],
  Subaru: ["Ascent", "BRZ", "Crosstrek", "Forester", "Impreza", "Legacy", "Outback", "Solterra", "WRX"],
  Tesla: ["Cybertruck", "Model 3", "Model S", "Model X", "Model Y"],
  Toyota: ["4Runner", "86", "Avalon", "C-HR", "Camry", "Corolla", "Crown", "Highlander", "Land Cruiser", "Mirai", "Prius", "RAV4", "Sequoia", "Sienna", "Supra", "Tacoma", "Tundra", "Venza"],
  Volkswagen: ["Atlas", "Atlas Cross Sport", "Golf", "GTI", "ID.4", "Jetta", "Passat", "Taos", "Tiguan"],
  Volvo: ["C40", "S60", "S90", "V60", "V90", "XC40", "XC60", "XC90"],
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

  const selectedMake = form.watch("make");
  const models: string[] = selectedMake && vehicleData[selectedMake] ? vehicleData[selectedMake] : [];

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
