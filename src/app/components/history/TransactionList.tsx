import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { 
  History, 
  Search, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Filter,
  Target,
  Lock
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface Transaction {
  id: string;
  type: "credit" | "debit" | "goal" | "locked";
  amount: number;
  description: string;
  date: string;
  status: "completed" | "pending" | "failed";
}

export function TransactionList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("all");

  // Mock transaction data
  const transactions: Transaction[] = [
    {
      id: "1",
      type: "credit",
      amount: 5000,
      description: "Added to wallet",
      date: "2024-12-28",
      status: "completed",
    },
    {
      id: "2",
      type: "goal",
      amount: 2000,
      description: "New Laptop Goal",
      date: "2024-12-27",
      status: "completed",
    },
    {
      id: "3",
      type: "locked",
      amount: 10000,
      description: "6-month lock savings",
      date: "2024-12-26",
      status: "completed",
    },
    {
      id: "4",
      type: "debit",
      amount: 3000,
      description: "Withdrawn to bank",
      date: "2024-12-25",
      status: "completed",
    },
    {
      id: "5",
      type: "credit",
      amount: 1500,
      description: "Auto-save deposit",
      date: "2024-12-24",
      status: "completed",
    },
  ];

  const getIcon = (type: Transaction["type"]) => {
    switch (type) {
      case "credit":
        return <ArrowDownLeft className="w-4 h-4 text-green-600" />;
      case "debit":
        return <ArrowUpRight className="w-4 h-4 text-red-600" />;
      case "goal":
        return <Target className="w-4 h-4 text-blue-600" />;
      case "locked":
        return <Lock className="w-4 h-4 text-purple-600" />;
    }
  };

  const getAmountColor = (type: Transaction["type"]) => {
    return type === "credit" ? "text-green-600" : "text-gray-900";
  };

  const filteredTransactions = transactions.filter((txn) => {
    const matchesSearch = txn.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === "all" || txn.type === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="w-5 h-5" />
            Transaction History
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search transactions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[130px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="credit">Credit</SelectItem>
                <SelectItem value="debit">Debit</SelectItem>
                <SelectItem value="goal">Goals</SelectItem>
                <SelectItem value="locked">Locked</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            {filteredTransactions.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <History className="w-12 h-12 mx-auto mb-2 opacity-30" />
                <p>No transactions found</p>
              </div>
            ) : (
              filteredTransactions.map((txn) => (
                <div
                  key={txn.id}
                  className="flex items-center gap-3 p-3 rounded-lg border hover:bg-gray-50 transition-colors"
                >
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                    {getIcon(txn.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="truncate">{txn.description}</p>
                    <p className="text-sm text-gray-600">{txn.date}</p>
                  </div>
                  <div className="text-right">
                    <p className={getAmountColor(txn.type)}>
                      {txn.type === "credit" ? "+" : "-"}₹
                      {txn.amount.toLocaleString("en-IN")}
                    </p>
                    <p className="text-sm text-gray-600 capitalize">{txn.status}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
