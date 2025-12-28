import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { CreditCard, Wallet } from "lucide-react";
import { toast } from "sonner";

interface AddMoneyProps {
  onSuccess: (amount: number) => void;
  onCancel: () => void;
}

export function AddMoney({ onSuccess, onCancel }: AddMoneyProps) {
  const [amount, setAmount] = useState("");
  const [selectedMethod, setSelectedMethod] = useState<"upi" | "card" | "netbanking">("upi");
  const [processing, setProcessing] = useState(false);

  const quickAmounts = [500, 1000, 2000, 5000];

  const handleAddMoney = () => {
    const amt = parseFloat(amount);
    if (amt < 100) {
      toast.error("Minimum amount is ₹100");
      return;
    }
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      toast.success(`₹${amt.toLocaleString("en-IN")} added successfully!`);
      onSuccess(amt);
    }, 1500);
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="w-5 h-5" />
            Add Money to Wallet
          </CardTitle>
          <CardDescription>Choose an amount and payment method</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="amount">Enter Amount</Label>
            <Input
              id="amount"
              type="number"
              placeholder="₹ 0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <div className="flex gap-2 flex-wrap">
              {quickAmounts.map((amt) => (
                <Button
                  key={amt}
                  variant="outline"
                  size="sm"
                  onClick={() => setAmount(amt.toString())}
                >
                  ₹{amt}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Label>Payment Method</Label>
            <div className="space-y-2">
              <button
                onClick={() => setSelectedMethod("upi")}
                className={`w-full p-4 border rounded-lg flex items-center gap-3 transition-colors ${
                  selectedMethod === "upi"
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <Wallet className="w-5 h-5 text-purple-600" />
                </div>
                <div className="flex-1 text-left">
                  <p>UPI</p>
                  <p className="text-sm text-gray-600">PhonePe, GPay, Paytm</p>
                </div>
              </button>
              <button
                onClick={() => setSelectedMethod("card")}
                className={`w-full p-4 border rounded-lg flex items-center gap-3 transition-colors ${
                  selectedMethod === "card"
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1 text-left">
                  <p>Debit/Credit Card</p>
                  <p className="text-sm text-gray-600">Visa, Mastercard, RuPay</p>
                </div>
              </button>
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={onCancel} className="flex-1">
              Cancel
            </Button>
            <Button
              onClick={handleAddMoney}
              disabled={!amount || parseFloat(amount) < 100 || processing}
              className="flex-1"
            >
              {processing ? "Processing..." : "Add Money"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
