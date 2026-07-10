import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCreateContactRequest } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2, CheckCircle2 } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  service: z.string().min(1, "Please select a service"),
  message: z.string().optional(),
});

export function ContactForm() {
  const { toast } = useToast();
  const [isSuccess, setIsSuccess] = useState(false);
  const createContactRequest = useCreateContactRequest();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      service: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    createContactRequest.mutate(
      { data: values },
      {
        onSuccess: () => {
          setIsSuccess(true);
          form.reset();
        },
        onError: () => {
          toast({
            title: "Something went wrong",
            description: "We couldn't submit your request. Please call us directly.",
            variant: "destructive",
          });
        },
      }
    );
  }

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center bg-muted/50 rounded-lg border border-border">
        <CheckCircle2 className="w-12 h-12 text-green-500 mb-4" />
        <h3 className="text-2xl font-display font-bold text-foreground mb-2">Request Received</h3>
        <p className="text-muted-foreground mb-6">
          Thank you for reaching out. A member of our local crew will contact you shortly to schedule your inspection.
        </p>
        <Button variant="outline" onClick={() => setIsSuccess(false)}>
          Submit another request
        </Button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name *</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" className="bg-background" {...field} />
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
                <FormLabel>Phone Number *</FormLabel>
                <FormControl>
                  <Input placeholder="(571) 555-0123" className="bg-background" type="tel" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="john@example.com" className="bg-background" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="service"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Service Needed *</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-background">
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Roofing">Roofing (Repair/Replace)</SelectItem>
                    <SelectItem value="Storm Damage">Storm Damage & Claims</SelectItem>
                    <SelectItem value="Siding">Siding</SelectItem>
                    <SelectItem value="Gutters">Gutters</SelectItem>
                    <SelectItem value="Windows">Windows</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message (Optional)</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Tell us about the damage or what you're looking for..." 
                  className="min-h-[120px] bg-background resize-y" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button 
          type="submit" 
          className="w-full h-12 text-lg font-medium" 
          disabled={createContactRequest.isPending}
        >
          {createContactRequest.isPending ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Sending Request...
            </>
          ) : (
            "Request Free Inspection"
          )}
        </Button>
      </form>
    </Form>
  );
}
