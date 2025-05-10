import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import SectionTitle from "../ui/SectionTitle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Mail, MapPin, Phone, Github, Linkedin, Twitter, Instagram } from "lucide-react";

// Form schema
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

type FormValues = z.infer<typeof formSchema>;

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // In a real implementation, this would send data to a service like EmailJS or backend API
      console.log("Form data:", data);
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast({
        title: "Message sent!",
        description: "Thanks for reaching out. I'll get back to you soon.",
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: "Message failed to send",
        description: "There was an error sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 transition-all duration-300">
      <div className="container mx-auto px-6">
        <SectionTitle number="05." title="Contact" />

        <div className="max-w-3xl mx-auto text-center mb-12">
          <motion.h3
            className="text-3xl font-bold text-navy dark:text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Get In Touch
          </motion.h3>
          <motion.p
            className="text-slate dark:text-slate-light mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            I'm currently looking for new opportunities. Whether you have a question or just want to say hi, 
            I'll do my best to get back to you!
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            className="bg-white dark:bg-navy shadow-md rounded-lg p-8"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h4 className="text-xl font-bold text-navy dark:text-white mb-6">Send me a message</h4>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-mono text-slate dark:text-slate-light">Name</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            className="w-full px-4 py-2 rounded border border-slate/20 dark:border-slate-dark/20 bg-white dark:bg-navy-light focus:outline-none focus:ring-2 focus:ring-green/50 text-navy dark:text-white" 
                          />
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
                        <FormLabel className="font-mono text-slate dark:text-slate-light">Email</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            type="email" 
                            className="w-full px-4 py-2 rounded border border-slate/20 dark:border-slate-dark/20 bg-white dark:bg-navy-light focus:outline-none focus:ring-2 focus:ring-green/50 text-navy dark:text-white" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-mono text-slate dark:text-slate-light">Subject</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          className="w-full px-4 py-2 rounded border border-slate/20 dark:border-slate-dark/20 bg-white dark:bg-navy-light focus:outline-none focus:ring-2 focus:ring-green/50 text-navy dark:text-white" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-mono text-slate dark:text-slate-light">Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          {...field} 
                          rows={5} 
                          className="w-full px-4 py-2 rounded border border-slate/20 dark:border-slate-dark/20 bg-white dark:bg-navy-light focus:outline-none focus:ring-2 focus:ring-green/50 text-navy dark:text-white resize-none" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-green text-navy font-mono hover:bg-opacity-90 transition-colors duration-200 rounded"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Form>
          </motion.div>

          <motion.div
            className="bg-white dark:bg-navy shadow-md rounded-lg p-8 flex flex-col justify-between"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <h4 className="text-xl font-bold text-navy dark:text-white mb-6">Contact Information</h4>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-green/10 p-3 rounded-lg text-green">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-navy dark:text-white">Email</h5>
                    <a
                      href="mailto:hello@johndoe.dev"
                      className="text-slate dark:text-slate-light hover:text-primary dark:hover:text-primary transition-colors duration-200"
                    >
                      hello@johndoe.dev
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-green/10 p-3 rounded-lg text-green">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-navy dark:text-white">Location</h5>
                    <p className="text-slate dark:text-slate-light">San Francisco, CA</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-green/10 p-3 rounded-lg text-green">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-navy dark:text-white">Phone</h5>
                    <p className="text-slate dark:text-slate-light">(123) 456-7890</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <h4 className="text-xl font-bold text-navy dark:text-white mb-6">Connect with me</h4>
              <div className="flex gap-4">
                <a
                  href="https://github.com/johndoe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate/10 dark:bg-slate-dark/20 w-12 h-12 rounded-full flex items-center justify-center text-slate dark:text-slate-light hover:bg-green/10 hover:text-green transition-all duration-200"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="https://linkedin.com/in/johndoe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate/10 dark:bg-slate-dark/20 w-12 h-12 rounded-full flex items-center justify-center text-slate dark:text-slate-light hover:bg-green/10 hover:text-green transition-all duration-200"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="https://twitter.com/johndoe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate/10 dark:bg-slate-dark/20 w-12 h-12 rounded-full flex items-center justify-center text-slate dark:text-slate-light hover:bg-green/10 hover:text-green transition-all duration-200"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="https://instagram.com/johndoe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate/10 dark:bg-slate-dark/20 w-12 h-12 rounded-full flex items-center justify-center text-slate dark:text-slate-light hover:bg-green/10 hover:text-green transition-all duration-200"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
