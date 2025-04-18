
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";

const formSchema = z.object({
  firstName: z.string().min(2, { message: "First name is required" }),
  lastName: z.string().min(2, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  websiteType: z.string().min(1, { message: "Please select a website type" }),
  information: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      websiteType: "",
      information: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // Send email using a simple form submission to formsubmit.co service
      const formData = new FormData();
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("email", data.email);
      formData.append("websiteType", data.websiteType);
      formData.append("information", data.information || "");
      
      const response = await fetch("https://formsubmit.co/info@visionarysolutions.co.za", {
        method: "POST",
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error("Form submission failed");
      }
      
      toast({
        title: "Quote request submitted!",
        description: "We'll get back to you as soon as possible.",
      });
      
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Submission failed",
        description: "There was an error sending your request. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white py-16 pt-24 md:pt-28">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0a1657] text-center mb-6 md:mb-10">
          CONTACT US
        </h1>
        
        <div className="bg-[#e6eeff] rounded-lg p-4 sm:p-6 md:p-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#0a1657] text-center mb-6 md:mb-8">
            REQUEST A QUOTE
          </h2>
          
          <div className="border-t border-[#0a1657]/20 mb-6 md:mb-8 mt-4"></div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 md:space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#0a1657] font-medium">
                        FIRST NAME <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="First name" {...field} />
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
                      <FormLabel className="text-[#0a1657] font-medium">
                        LAST NAME <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Last name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#0a1657] font-medium">
                      EMAIL <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="example@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="websiteType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#0a1657] font-medium">
                      TYPE OF WEBSITE <span className="text-red-500">*</span>
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Please Select" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="business">Business Website</SelectItem>
                        <SelectItem value="ecommerce">E-commerce Website</SelectItem>
                        <SelectItem value="portfolio">Portfolio Website</SelectItem>
                        <SelectItem value="blog">Blog Website</SelectItem>
                        <SelectItem value="other">Other Services</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="information"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#0a1657] font-medium">
                      MORE INFORMATION ABOUT THE WEBSITE OR SERVICE REQUESTED
                    </FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Tell us more about your project..." 
                        className="min-h-[150px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="border-t border-[#0a1657]/20 pt-6 flex justify-center">
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-[#0a1657] hover:bg-[#0a1657]/90 text-white font-bold py-2 px-6 sm:px-8 rounded-full"
                >
                  {isSubmitting ? "Submitting..." : "SUBMIT"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
