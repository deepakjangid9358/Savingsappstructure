import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Lock, Calendar, TrendingUp } from "lucide-react";
import { toast } from "sonner";

interface LockSavingsProps {
  balance: number;
  onLock: (amount: number, duration: number) => void;
}

export function LockSavings({ balance, onLock }: LockSavingsProps) {
  const [amount, setAmount] = useState("");
  const [selectedDuration, setSelectedDuration] = useState<3 | 6 | 12>(6);

  const durations = [
    { months: 3, interestRate: 5.5 },
    { months: 6, interestRate: 6.5 },
    { months: 12, interestRate: 7.5 },
  ];

  const calculateReturns = () => {
    const amt = parseFloat(amount || "0");
    const duration = durations.find((d) => d.months === selectedDuration);
    if (!duration) return 0;
    return (amt * duration.interestRate * selectedDuration) / (12 * 100);
  };

  const handleLock = () => {
    const amt = parseFloat(amount);
    if (amt > balance) {
      toast.error("Insufficient balance");
      return;
    }
    if (amt < 1000) {
      toast.error("Minimum lock amount is ₹1,000");
      return;
    }
    onLock(amt, selectedDuration);
    toast.success(`₹${amt.toLocaleString("en-IN")} locked for ${selectedDuration} months`);
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="w-5 h-5" />
            Lock Savings
          </CardTitle>
          <CardDescription>
            Earn guaranteed returns by locking your money
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="lock-amount">Amount to Lock</Label>
            <Input
              id="lock-amount"
              type="number"
              placeholder="₹ 0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <p className="text-sm text-gray-600">
              Available: ₹{balance.toLocaleString("en-IN")}
            </p>
          </div>

          <div className="space-y-3">
            <Label>Lock Duration</Label>
            <div className="grid gap-3">
              {durations.map((duration) => (
                <button
                  key={duration.months}
                  onClick={() => setSelectedDuration(duration.months as 3 | 6 | 12)}
                  className={`p-4 border rounded-lg text-left transition-colors ${
                    selectedDuration === duration.months
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <p>{duration.months} Months</p>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {duration.interestRate}% p.a. interest
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-green-600">{duration.interestRate}%</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {amount && parseFloat(amount) >= 1000 && (
            <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
              <div className="flex items-start gap-3">
                <TrendingUp className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm">Estimated Returns</p>
                  <p className="text-2xl text-green-700 mt-1">
                    ₹{calculateReturns().toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Maturity amount: ₹
                    {(parseFloat(amount) + calculateReturns()).toLocaleString("en-IN", {
                      maximumFractionDigits: 0,
                    })}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-sm text-amber-900">
              ⚠️ Locked amount cannot be withdrawn until maturity. Early withdrawal may
              result in penalty.
            </p>
          </div>

          <Button
            onClick={handleLock}
            disabled={!amount || parseFloat(amount) < 1000 || parseFloat(amount) > balance}
            className="w-full"
          >
            Lock Amount
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
