import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { Button } from "../ui/button";
import { Search, MessageCircle, Phone, Mail } from "lucide-react";
import { useState } from "react";

export function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState("");

  const faqs = [
    {
      question: "How do I add money to my wallet?",
      answer:
        "You can add money using UPI, debit/credit cards, or net banking. Go to Wallet > Add Money, enter the amount, and choose your preferred payment method.",
    },
    {
      question: "What is Lock Savings?",
      answer:
        "Lock Savings allows you to lock a certain amount for a fixed period (3, 6, or 12 months) and earn guaranteed returns. The locked amount cannot be withdrawn until maturity.",
    },
    {
      question: "How does Auto-Save work?",
      answer:
        "Auto-Save automatically transfers a fixed amount from your wallet to your savings goals daily. You can also enable Round-Up to save the spare change from every transaction.",
    },
    {
      question: "How long do withdrawals take?",
      answer:
        "Withdrawals to your bank account typically take 1-2 business days. The exact time may vary depending on your bank.",
    },
    {
      question: "Is my money safe?",
      answer:
        "Yes, your money is completely safe. We use bank-grade encryption and comply with all RBI regulations. Your funds are held in escrow accounts with partner banks.",
    },
    {
      question: "What documents do I need for KYC?",
      answer:
        "You need a valid PAN card and Aadhaar card for KYC verification. The process is completely digital and takes only a few minutes.",
    },
  ];

  const filteredFaqs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Help Center</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search for help..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          <div>
            <h3 className="mb-3">Frequently Asked Questions</h3>
            <Accordion type="single" collapsible className="space-y-2">
              {filteredFaqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-4">
                  <AccordionTrigger className="hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            {filteredFaqs.length === 0 && (
              <p className="text-center text-gray-500 py-8">No results found</p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contact Support</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full justify-start">
            <MessageCircle className="w-4 h-4 mr-2" />
            Live Chat
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Phone className="w-4 h-4 mr-2" />
            Call: 1800-123-4567
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Mail className="w-4 h-4 mr-2" />
            Email: support@savesmart.com
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
