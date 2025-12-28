import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Building2, Plus } from "lucide-react";
import { toast } from "sonner";

export function BankDetails() {
  const handleSave = () => {
    toast.success("Bank details updated successfully!");
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Building2 className="w-5 h-5" />
              Bank Details
            </CardTitle>
            <Button variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Bank
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-4 border-2 border-blue-600 rounded-lg bg-blue-50">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p>HDFC Bank</p>
                  <p className="text-sm text-gray-600">Primary Account</p>
                </div>
              </div>
              <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded">
                Primary
              </span>
            </div>
            <div className="grid gap-3">
              <div>
                <p className="text-sm text-gray-600">Account Holder</p>
                <p>Rahul Kumar</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Account Number</p>
                <p>••••••••5678</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">IFSC Code</p>
                <p>HDFC0001234</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-sm">Add New Bank Account</p>
            <div className="space-y-2">
              <Label htmlFor="account-holder">Account Holder Name</Label>
              <Input id="account-holder" placeholder="As per bank records" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="account-number">Account Number</Label>
              <Input id="account-number" placeholder="Enter account number" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-account">Confirm Account Number</Label>
              <Input id="confirm-account" placeholder="Re-enter account number" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ifsc">IFSC Code</Label>
              <Input id="ifsc" placeholder="e.g., HDFC0001234" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bank-name">Bank Name</Label>
              <Input id="bank-name" placeholder="e.g., HDFC Bank" />
            </div>
          </div>

          <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-sm text-amber-900">
              ℹ️ Please ensure your bank details are correct. Incorrect details may delay
              withdrawals.
            </p>
          </div>

          <Button onClick={handleSave} className="w-full">
            Save Bank Details
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
