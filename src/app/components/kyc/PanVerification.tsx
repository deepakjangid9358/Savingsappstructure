import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { ShieldCheck, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

interface PanVerificationProps {
  onVerified: () => void;
}

export function PanVerification({ onVerified }: PanVerificationProps) {
  const [pan, setPan] = useState("");
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [verifying, setVerifying] = useState(false);

  const handleVerify = async () => {
    setVerifying(true);
    // Simulate verification
    setTimeout(() => {
      setVerifying(false);
      toast.success("PAN verified successfully!");
      onVerified();
    }, 2000);
  };

  const isValidPan = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5" />
            PAN Verification
          </CardTitle>
          <CardDescription>
            Verify your PAN card to enable all features
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="pan">PAN Number</Label>
            <Input
              id="pan"
              placeholder="ABCDE1234F"
              value={pan}
              onChange={(e) => setPan(e.target.value.toUpperCase())}
              maxLength={10}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Full Name (as per PAN)</Label>
            <Input
              id="name"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dob">Date of Birth</Label>
            <Input
              id="dob"
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>
          <Button
            onClick={handleVerify}
            disabled={!isValidPan || !name || !dob || verifying}
            className="w-full"
          >
            {verifying ? "Verifying..." : "Verify PAN"}
          </Button>
          <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
            <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-900">
              Your PAN details are securely encrypted and used only for verification purposes.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
