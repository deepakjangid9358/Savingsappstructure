import { useState } from "react";
import { Toaster } from "./components/ui/sonner";
import { LoginActivity } from "./components/auth/LoginActivity";
import { OtpActivity } from "./components/auth/OtpActivity";
import { PanVerification } from "./components/kyc/PanVerification";
import { AadhaarVerification } from "./components/kyc/AadhaarVerification";
import { WalletDashboard } from "./components/wallet/WalletDashboard";
import { AddMoney } from "./components/wallet/AddMoney";
import { Withdraw } from "./components/wallet/Withdraw";
import { CreateGoal, SavingsGoal } from "./components/savings/CreateGoal";
import { AutoSave } from "./components/savings/AutoSave";
import { LockSavings } from "./components/savings/LockSavings";
import { TransactionList } from "./components/history/TransactionList";
import { UserProfile } from "./components/profile/UserProfile";
import { BankDetails } from "./components/profile/BankDetails";
import { HelpCenter } from "./components/support/HelpCenter";
import { Progress } from "./components/ui/progress";
import {
  House,
  Wallet,
  Target,
  History,
  User,
  Settings,
  LogOut,
  Bell,
  ArrowLeft,
  Plus,
} from "lucide-react";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card";

type Screen =
  | "login"
  | "otp"
  | "kyc-pan"
  | "kyc-aadhaar"
  | "dashboard"
  | "add-money"
  | "withdraw"
  | "create-goal"
  | "auto-save"
  | "lock-savings"
  | "transactions"
  | "profile"
  | "bank-details"
  | "help";

type Tab = "home" | "savings" | "history" | "profile";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("login");
  const [currentTab, setCurrentTab] = useState<Tab>("home");
  const [phone, setPhone] = useState("");
  const [balance, setBalance] = useState(25000);
  const [savingsGoals, setSavingsGoals] = useState<SavingsGoal[]>([
    {
      id: "1",
      name: "New Laptop",
      targetAmount: 80000,
      currentAmount: 45000,
      targetDate: "2025-03-31",
      emoji: "💻",
    },
    {
      id: "2",
      name: "Vacation",
      targetAmount: 50000,
      currentAmount: 18000,
      targetDate: "2025-06-30",
      emoji: "✈️",
    },
  ]);
  const [kycCompleted, setKycCompleted] = useState({ pan: false, aadhaar: false });

  const handleLogin = (phoneNumber: string) => {
    setPhone(phoneNumber);
    setCurrentScreen("otp");
  };

  const handleOtpVerify = () => {
    if (!kycCompleted.pan) {
      setCurrentScreen("kyc-pan");
    } else if (!kycCompleted.aadhaar) {
      setCurrentScreen("kyc-aadhaar");
    } else {
      setCurrentScreen("dashboard");
    }
  };

  const handlePanVerified = () => {
    setKycCompleted({ ...kycCompleted, pan: true });
    setCurrentScreen("kyc-aadhaar");
  };

  const handleAadhaarVerified = () => {
    setKycCompleted({ ...kycCompleted, aadhaar: true });
    setCurrentScreen("dashboard");
  };

  const handleAddMoney = (amount: number) => {
    setBalance(balance + amount);
    setCurrentScreen("dashboard");
  };

  const handleWithdraw = (amount: number) => {
    setBalance(balance - amount);
    setCurrentScreen("dashboard");
  };

  const handleCreateGoal = (goal: SavingsGoal) => {
    setSavingsGoals([...savingsGoals, goal]);
    setCurrentTab("savings");
    setCurrentScreen("dashboard");
  };

  const handleLockSavings = (amount: number) => {
    setBalance(balance - amount);
    setCurrentTab("home");
    setCurrentScreen("dashboard");
  };

  const handleLogout = () => {
    setCurrentScreen("login");
    setCurrentTab("home");
  };

  // Auth screens
  if (currentScreen === "login") {
    return (
      <>
        <LoginActivity onLogin={handleLogin} />
        <Toaster />
      </>
    );
  }

  if (currentScreen === "otp") {
    return (
      <>
        <OtpActivity
          phone={phone}
          onVerify={handleOtpVerify}
          onBack={() => setCurrentScreen("login")}
        />
        <Toaster />
      </>
    );
  }

  // KYC screens
  if (currentScreen === "kyc-pan") {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-2xl mx-auto py-8">
          <div className="mb-6">
            <h1 className="text-2xl mb-2">Complete Your KYC</h1>
            <p className="text-gray-600">Step 1 of 2: PAN Verification</p>
            <Progress value={50} className="mt-4" />
          </div>
          <PanVerification onVerified={handlePanVerified} />
        </div>
        <Toaster />
      </div>
    );
  }

  if (currentScreen === "kyc-aadhaar") {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-2xl mx-auto py-8">
          <div className="mb-6">
            <h1 className="text-2xl mb-2">Complete Your KYC</h1>
            <p className="text-gray-600">Step 2 of 2: Aadhaar Verification</p>
            <Progress value={100} className="mt-4" />
          </div>
          <AadhaarVerification onVerified={handleAadhaarVerified} />
        </div>
        <Toaster />
      </div>
    );
  }

  // Modal screens
  if (currentScreen === "add-money") {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-2xl mx-auto py-8">
          <button
            onClick={() => setCurrentScreen("dashboard")}
            className="flex items-center gap-2 mb-4 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          <AddMoney
            onSuccess={handleAddMoney}
            onCancel={() => setCurrentScreen("dashboard")}
          />
        </div>
        <Toaster />
      </div>
    );
  }

  if (currentScreen === "withdraw") {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-2xl mx-auto py-8">
          <button
            onClick={() => setCurrentScreen("dashboard")}
            className="flex items-center gap-2 mb-4 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          <Withdraw
            balance={balance}
            onSuccess={handleWithdraw}
            onCancel={() => setCurrentScreen("dashboard")}
          />
        </div>
        <Toaster />
      </div>
    );
  }

  if (currentScreen === "create-goal") {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-2xl mx-auto py-8">
          <button
            onClick={() => setCurrentScreen("dashboard")}
            className="flex items-center gap-2 mb-4 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          <CreateGoal
            onSuccess={handleCreateGoal}
            onCancel={() => setCurrentScreen("dashboard")}
          />
        </div>
        <Toaster />
      </div>
    );
  }

  if (currentScreen === "auto-save") {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-2xl mx-auto py-8">
          <button
            onClick={() => setCurrentScreen("dashboard")}
            className="flex items-center gap-2 mb-4 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          <AutoSave />
        </div>
        <Toaster />
      </div>
    );
  }

  if (currentScreen === "lock-savings") {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-2xl mx-auto py-8">
          <button
            onClick={() => setCurrentScreen("dashboard")}
            className="flex items-center gap-2 mb-4 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          <LockSavings balance={balance} onLock={handleLockSavings} />
        </div>
        <Toaster />
      </div>
    );
  }

  if (currentScreen === "bank-details") {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-2xl mx-auto py-8">
          <button
            onClick={() => {
              setCurrentScreen("dashboard");
              setCurrentTab("profile");
            }}
            className="flex items-center gap-2 mb-4 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          <BankDetails />
        </div>
        <Toaster />
      </div>
    );
  }

  // Main Dashboard
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl">SaveSmart</h1>
            <p className="text-sm text-gray-600">Welcome back, Rahul!</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-full relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button
              onClick={handleLogout}
              className="p-2 hover:bg-gray-100 rounded-full"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {currentTab === "home" && (
          <div className="space-y-6">
            <WalletDashboard
              balance={balance}
              onAddMoney={() => setCurrentScreen("add-money")}
              onWithdraw={() => setCurrentScreen("withdraw")}
            />

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <Button
                  variant="outline"
                  onClick={() => setCurrentScreen("create-goal")}
                  className="h-auto py-4 flex-col"
                >
                  <Target className="w-6 h-6 mb-2" />
                  Create Goal
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setCurrentScreen("auto-save")}
                  className="h-auto py-4 flex-col"
                >
                  <Settings className="w-6 h-6 mb-2" />
                  Auto-Save
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setCurrentScreen("lock-savings")}
                  className="h-auto py-4 flex-col"
                >
                  <Plus className="w-6 h-6 mb-2" />
                  Lock Savings
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {currentTab === "savings" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl">Savings Goals</h2>
              <Button onClick={() => setCurrentScreen("create-goal")}>
                <Plus className="w-4 h-4 mr-2" />
                New Goal
              </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {savingsGoals.map((goal) => (
                <Card key={goal.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <span className="text-2xl">{goal.emoji}</span>
                      {goal.name}
                    </CardTitle>
                    <CardDescription>
                      Target: ₹{goal.targetAmount.toLocaleString("en-IN")}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Progress</span>
                        <span className="text-sm">
                          {Math.round((goal.currentAmount / goal.targetAmount) * 100)}%
                        </span>
                      </div>
                      <Progress
                        value={(goal.currentAmount / goal.targetAmount) * 100}
                        className="h-3"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Saved</p>
                        <p className="text-xl">₹{goal.currentAmount.toLocaleString("en-IN")}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Target Date</p>
                        <p>{new Date(goal.targetDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full">
                      Add Money
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {currentTab === "history" && <TransactionList />}

        {currentTab === "profile" && currentScreen === "dashboard" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl">Profile & Settings</h2>
            </div>
            <div className="grid gap-4">
              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <button
                    onClick={() => setCurrentScreen("bank-details")}
                    className="w-full text-left"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Wallet className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p>Bank Details</p>
                          <p className="text-sm text-gray-600">Manage linked accounts</p>
                        </div>
                      </div>
                      <ArrowLeft className="w-5 h-5 rotate-180 text-gray-400" />
                    </div>
                  </button>
                </CardContent>
              </Card>
            </div>
            <UserProfile />
          </div>
        )}

        {currentScreen === "help" && <HelpCenter />}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-around h-16">
          <button
            onClick={() => {
              setCurrentTab("home");
              setCurrentScreen("dashboard");
            }}
            className={`flex flex-col items-center gap-1 ${
              currentTab === "home" ? "text-blue-600" : "text-gray-600"
            }`}
          >
            <House className="w-5 h-5" />
            <span className="text-xs">Home</span>
          </button>
          <button
            onClick={() => {
              setCurrentTab("savings");
              setCurrentScreen("dashboard");
            }}
            className={`flex flex-col items-center gap-1 ${
              currentTab === "savings" ? "text-blue-600" : "text-gray-600"
            }`}
          >
            <Target className="w-5 h-5" />
            <span className="text-xs">Goals</span>
          </button>
          <button
            onClick={() => {
              setCurrentTab("history");
              setCurrentScreen("dashboard");
            }}
            className={`flex flex-col items-center gap-1 ${
              currentTab === "history" ? "text-blue-600" : "text-gray-600"
            }`}
          >
            <History className="w-5 h-5" />
            <span className="text-xs">History</span>
          </button>
          <button
            onClick={() => {
              setCurrentTab("profile");
              setCurrentScreen("dashboard");
            }}
            className={`flex flex-col items-center gap-1 ${
              currentTab === "profile" ? "text-blue-600" : "text-gray-600"
            }`}
          >
            <User className="w-5 h-5" />
            <span className="text-xs">Profile</span>
          </button>
        </div>
      </nav>

      <Toaster />
    </div>
  );
}
