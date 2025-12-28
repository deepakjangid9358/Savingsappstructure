import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { ShieldCheck } from "lucide-react";

interface OtpActivityProps {
  phone: string;
  onVerify: () => void;
  onBack: () => void;
}

export function OtpActivity({ phone, onVerify, onBack }: OtpActivityProps) {
  const [otp, setOtp] = useState("");
  const [resendTimer, setResendTimer] = useState(30);

  const handleVerify = () => {
    if (otp.length === 6) {
      onVerify();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full flex items-center justify-center">
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>
          <CardTitle>Verify OTP</CardTitle>
          <CardDescription>
            Enter the 6-digit code sent to +91 {phone}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center">
            <InputOTP maxLength={6} value={otp} onChange={setOtp}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
          <Button onClick={handleVerify} className="w-full" disabled={otp.length !== 6}>
            Verify OTP
          </Button>
          <div className="text-center space-y-2">
            <p className="text-sm text-gray-600">
              {resendTimer > 0 ? (
                <>Resend OTP in {resendTimer}s</>
              ) : (
                <button className="text-blue-600 hover:underline">
                  Resend OTP
                </button>
              )}
            </p>
            <button onClick={onBack} className="text-sm text-gray-600 hover:underline">
              Change number
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
