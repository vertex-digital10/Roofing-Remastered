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
import { Loader2, CheckCircle2, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  service: z.string().min(1, "Please select a service"),
  message: z.string().optional(),
});

const inputClasses = "bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-accent focus-visible:border-accent transition-all duration-300 h-14 rounded-2xl hover:bg-white/10 hover:border-white/20";
const labelClasses = "text-slate-300 font-bold uppercase tracking-widest text-[10px] mb-2";

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

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {isSuccess ? (
          <motion.div 
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col items-center justify-center py-16 px-8 text-center bg-white/5 backdrop-blur-md rounded-3xl border border-white/10"
          >
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 15, delay: 0.2 }}
              className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center mb-8 border border-green-500/30"
            >
              <CheckCircle2 className="w-12 h-12 text-green-400" />
            </motion.div>
            <h3 className="text-4xl font-display font-black text-white mb-4">Request Received</h3>
            <p className="text-slate-300 text-lg mb-10 max-w-md">
              Thank you for reaching out. Our dispatch team will contact you shortly to schedule your free inspection.
            </p>
            <Button 
              variant="outline" 
              onClick={() => setIsSuccess(false)}
              className="bg-transparent border-white/20 text-white hover:bg-white/10 rounded-full px-8 h-12 font-bold tracking-wider uppercase text-sm"
            >
              Submit Another
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={labelClasses}>Full Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Jane Doe" className={inputClasses} {...field} />
                        </FormControl>
                        <FormMessage className="text-accent text-xs" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={labelClasses}>Phone Number *</FormLabel>
                        <FormControl>
                          <Input placeholder="(571) 555-0123" className={inputClasses} type="tel" {...field} />
                        </FormControl>
                        <FormMessage className="text-accent text-xs" />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={labelClasses}>Email Address (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="jane@example.com" className={inputClasses} type="email" {...field} />
                        </FormControl>
                        <FormMessage className="text-accent text-xs" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="service"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={labelClasses}>Service Needed *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className={inputClasses}>
                              <SelectValue placeholder="Select a service" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-primary border-white/10 text-white rounded-xl">
                            <SelectItem value="Roofing" className="hover:bg-white/10 focus:bg-white/10 cursor-pointer py-3 rounded-lg">Roofing (Repair/Replace)</SelectItem>
                            <SelectItem value="Storm Damage" className="hover:bg-white/10 focus:bg-white/10 cursor-pointer py-3 rounded-lg">Storm Damage & Claims</SelectItem>
                            <SelectItem value="Siding" className="hover:bg-white/10 focus:bg-white/10 cursor-pointer py-3 rounded-lg">Siding</SelectItem>
                            <SelectItem value="Gutters" className="hover:bg-white/10 focus:bg-white/10 cursor-pointer py-3 rounded-lg">Gutters</SelectItem>
                            <SelectItem value="Windows" className="hover:bg-white/10 focus:bg-white/10 cursor-pointer py-3 rounded-lg">Windows</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-accent text-xs" />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={labelClasses}>Message (Optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell us about the damage or what you're looking for..." 
                          className={`${inputClasses} min-h-[140px] pt-4 resize-none`} 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage className="text-accent text-xs" />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full h-16 rounded-2xl bg-white text-primary hover:bg-slate-200 text-lg font-black tracking-widest uppercase transition-all duration-300 group shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:shadow-[0_0_60px_rgba(255,255,255,0.25)]" 
                  disabled={createContactRequest.isPending}
                >
                  {createContactRequest.isPending ? (
                    <>
                      <Loader2 className="mr-3 h-6 w-6 animate-spin text-accent" />
                      <span className="opacity-80">Sending Request...</span>
                    </>
                  ) : (
                    <span className="flex items-center gap-3">
                      Request Free Inspection 
                      <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform text-accent" />
                    </span>
                  )}
                </Button>
              </form>
            </Form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}