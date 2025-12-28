import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Target, Calendar } from "lucide-react";
import { toast } from "sonner";

interface CreateGoalProps {
  onSuccess: (goal: SavingsGoal) => void;
  onCancel: () => void;
}

export interface SavingsGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string;
  emoji: string;
}

export function CreateGoal({ onSuccess, onCancel }: CreateGoalProps) {
  const [name, setName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState("🎯");

  const emojis = ["🎯", "🏠", "🚗", "✈️", "💍", "🎓", "📱", "⌚"];

  const handleCreate = () => {
    const goal: SavingsGoal = {
      id: Date.now().toString(),
      name,
      targetAmount: parseFloat(targetAmount),
      currentAmount: 0,
      targetDate,
      emoji: selectedEmoji,
    };
    toast.success(`Goal "${name}" created successfully!`);
    onSuccess(goal);
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Create Savings Goal
          </CardTitle>
          <CardDescription>Set a goal and start saving towards it</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Choose Icon</Label>
            <div className="flex gap-2 flex-wrap">
              {emojis.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => setSelectedEmoji(emoji)}
                  className={`w-12 h-12 text-2xl rounded-lg border-2 transition-colors ${
                    selectedEmoji === emoji
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="goal-name">Goal Name</Label>
            <Input
              id="goal-name"
              placeholder="e.g., New Laptop, Vacation, Emergency Fund"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="target-amount">Target Amount</Label>
            <Input
              id="target-amount"
              type="number"
              placeholder="₹ 0"
              value={targetAmount}
              onChange={(e) => setTargetAmount(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="target-date" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Target Date
            </Label>
            <Input
              id="target-date"
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
            />
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={onCancel} className="flex-1">
              Cancel
            </Button>
            <Button
              onClick={handleCreate}
              disabled={!name || !targetAmount || !targetDate}
              className="flex-1"
            >
              Create Goal
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
