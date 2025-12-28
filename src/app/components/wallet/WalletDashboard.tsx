import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Wallet, ArrowUpRight, ArrowDownLeft, Eye, EyeOff, TrendingUp } from "lucide-react";
import { useState } from "react";

interface WalletDashboardProps {
  balance: number;
  onAddMoney: () => void;
  onWithdraw: () => void;
}

export function WalletDashboard({ balance, onAddMoney, onWithdraw }: WalletDashboardProps) {
  const [showBalance, setShowBalance] = useState(true);

  return (
    <div className="space-y-4">
      <Card className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center gap-2">
              <Wallet className="w-5 h-5" />
              Wallet Balance
            </CardTitle>
            <button
              onClick={() => setShowBalance(!showBalance)}
              className="text-white/80 hover:text-white"
            >
              {showBalance ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
            </button>
          </div>
          <CardDescription className="text-white/80">
            Available balance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-4xl mb-6">
            {showBalance ? `₹${balance.toLocaleString("en-IN")}` : "₹••••••"}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Button
              onClick={onAddMoney}
              className="bg-white text-blue-600 hover:bg-white/90"
            >
              <ArrowDownLeft className="w-4 h-4 mr-2" />
              Add Money
            </Button>
            <Button
              onClick={onWithdraw}
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10"
            >
              <ArrowUpRight className="w-4 h-4 mr-2" />
              Withdraw
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quick Stats</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-sm text-gray-600">Total Savings</p>
            <p className="text-xl">₹{(balance * 0.6).toLocaleString("en-IN")}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-600">This Month</p>
            <p className="text-xl flex items-center gap-1 text-green-600">
              <TrendingUp className="w-4 h-4" />
              +12%
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
