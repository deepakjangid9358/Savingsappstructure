import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { User, Mail, Phone, MapPin } from "lucide-react";
import { toast } from "sonner";

export function UserProfile() {
  const handleSave = () => {
    toast.success("Profile updated successfully!");
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Profile Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src="" />
              <AvatarFallback className="bg-blue-600 text-white text-xl">
                RK
              </AvatarFallback>
            </Avatar>
            <Button variant="outline" size="sm">
              Change Photo
            </Button>
          </div>

          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="full-name">Full Name</Label>
              <Input id="full-name" defaultValue="Rahul Kumar" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </Label>
              <Input id="email" type="email" defaultValue="rahul.kumar@example.com" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Phone Number
              </Label>
              <Input id="phone" type="tel" defaultValue="+91 9876543210" disabled />
              <p className="text-sm text-gray-600">Phone number cannot be changed</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address" className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Address
              </Label>
              <Input id="address" defaultValue="123, Main Street, Mumbai" />
            </div>
          </div>

          <Button onClick={handleSave} className="w-full">
            Save Changes
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>KYC Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <div>
              <p>PAN Verification</p>
              <p className="text-sm text-gray-600">ABCDE1234F</p>
            </div>
            <span className="text-sm text-green-600">Verified ✓</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <div>
              <p>Aadhaar Verification</p>
              <p className="text-sm text-gray-600">••••••••5678</p>
            </div>
            <span className="text-sm text-green-600">Verified ✓</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
