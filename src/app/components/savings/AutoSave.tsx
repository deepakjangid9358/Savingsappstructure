import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { PiggyBank, Zap } from "lucide-react";
import { toast } from "sonner";

export function AutoSave() {
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(false);
  const [dailyAmount, setDailyAmount] = useState("50");
  const [roundUpEnabled, setRoundUpEnabled] = useState(false);

  const handleSave = () => {
    toast.success("Auto-save settings updated!");
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Auto-Save Settings
          </CardTitle>
          <CardDescription>Automate your savings effortlessly</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="space-y-1">
              <Label htmlFor="auto-save">Daily Auto-Save</Label>
              <p className="text-sm text-gray-600">
                Save a fixed amount every day
              </p>
            </div>
            <Switch
              id="auto-save"
              checked={autoSaveEnabled}
              onCheckedChange={setAutoSaveEnabled}
            />
          </div>

          {autoSaveEnabled && (
            <div className="space-y-2 pl-4">
              <Label htmlFor="daily-amount">Daily Amount</Label>
              <Input
                id="daily-amount"
                type="number"
                placeholder="₹ 0"
                value={dailyAmount}
                onChange={(e) => setDailyAmount(e.target.value)}
              />
              <p className="text-sm text-gray-600">
                Monthly savings: ₹{(parseFloat(dailyAmount || "0") * 30).toLocaleString("en-IN")}
              </p>
            </div>
          )}

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="space-y-1">
              <Label htmlFor="round-up">Round-Up Savings</Label>
              <p className="text-sm text-gray-600">
                Round up every transaction to nearest ₹10
              </p>
            </div>
            <Switch
              id="round-up"
              checked={roundUpEnabled}
              onCheckedChange={setRoundUpEnabled}
            />
          </div>

          <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
            <div className="flex items-start gap-3">
              <PiggyBank className="w-6 h-6 text-purple-600 flex-shrink-0" />
              <div>
                <p className="text-sm">
                  {autoSaveEnabled && roundUpEnabled
                    ? "Both features active! You're saving smartly 🎉"
                    : autoSaveEnabled
                    ? "Daily auto-save is active"
                    : roundUpEnabled
                    ? "Round-up savings active"
                    : "Enable at least one feature to start saving automatically"}
                </p>
              </div>
            </div>
          </div>

          <Button onClick={handleSave} className="w-full">
            Save Settings
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
