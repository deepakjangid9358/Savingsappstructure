import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { ArrowUpRight, Building2 } from "lucide-react";
import { toast } from "sonner";

interface WithdrawProps {
  balance: number;
  onSuccess: (amount: number) => void;
  onCancel: () => void;
}

export function Withdraw({ balance, onSuccess, onCancel }: WithdrawProps) {
  const [amount, setAmount] = useState("");
  const [processing, setProcessing] = useState(false);

  const handleWithdraw = () => {
    const amt = parseFloat(amount);
    if (amt > balance) {
      toast.error("Insufficient balance");
      return;
    }
    if (amt < 100) {
      toast.error("Minimum withdrawal is ₹100");
      return;
    }
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      toast.success(`₹${amt.toLocaleString("en-IN")} withdrawn successfully!`);
      onSuccess(amt);
    }, 1500);
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ArrowUpRight className="w-5 h-5" />
            Withdraw Money
          </CardTitle>
          <CardDescription>
            Available balance: ₹{balance.toLocaleString("en-IN")}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="withdraw-amount">Enter Amount</Label>
            <Input
              id="withdraw-amount"
              type="number"
              placeholder="₹ 0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Building2 className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1">
                <p>HDFC Bank</p>
                <p className="text-sm text-gray-600">Account ••••5678</p>
                <button className="text-sm text-blue-600 hover:underline mt-1">
                  Change bank account
                </button>
              </div>
            </div>
          </div>

          <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-sm text-amber-900">
              Money will be transferred to your bank account within 1-2 business days.
            </p>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={onCancel} className="flex-1">
              Cancel
            </Button>
            <Button
              onClick={handleWithdraw}
              disabled={!amount || parseFloat(amount) < 100 || parseFloat(amount) > balance || processing}
              className="flex-1"
            >
              {processing ? "Processing..." : "Withdraw"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
