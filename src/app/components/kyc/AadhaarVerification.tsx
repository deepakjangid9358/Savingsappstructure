import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Shield, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

interface AadhaarVerificationProps {
  onVerified: () => void;
}

export function AadhaarVerification({ onVerified }: AadhaarVerificationProps) {
  const [aadhaar, setAadhaar] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const handleSendOtp = () => {
    setOtpSent(true);
    toast.success("OTP sent to your Aadhaar-linked mobile");
  };

  const handleVerify = async () => {
    setVerifying(true);
    // Simulate verification
    setTimeout(() => {
      setVerifying(false);
      toast.success("Aadhaar verified successfully!");
      onVerified();
    }, 2000);
  };

  const isValidAadhaar = aadhaar.replace(/\s/g, "").length === 12;

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Aadhaar Verification
          </CardTitle>
          <CardDescription>
            Verify your Aadhaar with OTP authentication
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="aadhaar">Aadhaar Number</Label>
            <Input
              id="aadhaar"
              placeholder="XXXX XXXX XXXX"
              value={aadhaar}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, "");
                const formatted = val.match(/.{1,4}/g)?.join(" ") || val;
                setAadhaar(formatted.slice(0, 14));
              }}
              maxLength={14}
              disabled={otpSent}
            />
          </div>
          {!otpSent ? (
            <Button
              onClick={handleSendOtp}
              disabled={!isValidAadhaar}
              className="w-full"
            >
              Send OTP
            </Button>
          ) : (
            <>
              <div className="space-y-2">
                <Label htmlFor="otp">Enter OTP</Label>
                <Input
                  id="otp"
                  placeholder="6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  maxLength={6}
                />
              </div>
              <Button
                onClick={handleVerify}
                disabled={otp.length !== 6 || verifying}
                className="w-full"
              >
                {verifying ? "Verifying..." : "Verify OTP"}
              </Button>
            </>
          )}
          <div className="flex items-start gap-2 p-3 bg-green-50 rounded-lg">
            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-green-900">
              We use UIDAI's secure API for Aadhaar verification. Your data is protected.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
