import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Send, Sparkles } from "lucide-react";
import { z } from "zod";
import toast from "react-hot-toast";

const contactSchema = z.object({
  name: z.string().trim().min(1, { message: "Name is required" }).max(100, { message: "Name must be less than 100 characters" }),
  email: z.string().trim().email({ message: "Invalid email address" }).max(255, { message: "Email must be less than 255 characters" }),
  message: z.string().trim().min(1, { message: "Message is required" }).max(1000, { message: "Message must be less than 1000 characters" })
});

const Footer = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const validatedData = contactSchema.parse(formData);

      // Simulate message sending
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast.success("Message sent! Thank you for reaching out. I'll get back to you soon.");

      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="relative bg-[#000000] overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 py-20 max-w-7xl relative">
        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-5 gap-16 mb-20">
          {/* Left Column - Text Section */}
          <div className="lg:col-span-2 space-y-8 animate-fade-in">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-400/10 border border-yellow-400/20">
                <Sparkles className="w-4 h-4 text-yellow-400 animate-glow" />
                <span className="text-sm font-medium text-yellow-400">Available for opportunities</span>
              </div>

              <h2 className="text-6xl md:text-8xl font-bold font-[Bebas_Neue] text-[#FFFFF0] leading-tight">
                Let's
                <br />
                <span className="text-yellow-400 relative inline-block">
                  Connect
                  <span className="absolute -bottom-2 left-0 w-full h-1 bg-yellow-400/30 blur-sm" />
                </span>
              </h2>
            </div>

            <div className="space-y-6">
              <p className="text-gray-400 text-lg leading-relaxed max-w-md">
                Always interested in new <span className="text-[#FFFFF0] font-medium">opportunities</span>, 
                <span className="text-[#FFFFF0] font-medium"> collaborations</span>, and conversations about 
                <span className="text-[#FFFFF0] font-medium"> technology</span> and 
                <span className="text-[#FFFFF0] font-medium"> design</span>.
              </p>

              <div className="flex items-center gap-3 text-sm text-gray-400">
                <Mail className="w-5 h-5 text-yellow-400" />
                <span>Usually responds within 24 hours</span>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="lg:col-span-3 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2 group">
                  <label className="text-sm font-medium text-gray-400 group-focus-within:text-yellow-400 transition-colors">
                    Your Name
                  </label>
                  <Input
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="cursor-target bg-[#141414]/50 border-gray-800 text-[#FFFFF0] placeholder:text-gray-500 h-14 text-base backdrop-blur-sm focus:border-yellow-400/50 transition-all duration-300 focus:shadow-lg focus:shadow-yellow-400/10"
                    required
                  />
                </div>

                <div className="space-y-2 group">
                  <label className="text-sm font-medium text-gray-400 group-focus-within:text-yellow-400 transition-colors">
                    Your Email
                  </label>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="cursor-target bg-[#141414]/50 border-gray-800 text-[#FFFFF0] placeholder:text-gray-500 h-14 text-base backdrop-blur-sm focus:border-yellow-400/50 transition-all duration-300 focus:shadow-lg focus:shadow-yellow-400/10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2 group">
                <label className="text-sm font-medium text-gray-400 group-focus-within:text-yellow-400 transition-colors">
                  Your Message
                </label>
                <Textarea
                  placeholder="Tell me about your project, idea, or just say hello..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="cursor-target bg-[#141414]/50 border-gray-800 text-[#FFFFF0] placeholder:text-gray-500 min-h-[160px] resize-none text-base backdrop-blur-sm focus:border-yellow-400/50 transition-all duration-300 focus:shadow-lg focus:shadow-yellow-400/10"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="cursor-target w-full md:w-auto bg-yellow-400 text-black hover:bg-yellow-500 h-14 px-12 text-base font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-yellow-400/20 hover:scale-105 group"
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    Send Message
                    <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Section - Credits */}
        <div className="pt-10 border-t border-gray-800/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-yellow-400/10 flex items-center justify-center border border-yellow-400/20">
                <span className="text-yellow-400 font-bold text-lg">P</span>
              </div>
              <div className="text-left">
                <p className="text-sm text-gray-400">Designed and created by</p>
                <p className="text-base font-semibold text-[#FFFFF0]">Prasoon</p>
              </div>
            </div>

            <div className="flex items-center gap-6 text-sm text-gray-400">
              <span>© 2025-26</span>
              <span className="hidden md:inline">•</span>
              <span className="hidden md:inline">All rights reserved</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
