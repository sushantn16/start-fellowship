'use client'
import { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function Login(): JSX.Element {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [signupRole, setSignupRole] = useState('startup');

  // State variables for error messages
  const [loginEmailError, setLoginEmailError] = useState('');
  const [loginPasswordError, setLoginPasswordError] = useState('');
  const [signupNameError, setSignupNameError] = useState('');
  const [signupEmailError, setSignupEmailError] = useState('');
  const [signupPasswordError, setSignupPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const handleLogin = () => {
    // Validate login form
    if (!loginEmail) {
      setLoginEmailError('Email is required');
      return;
    } else {
      setLoginEmailError('');
    }
    if (!loginPassword) {
      setLoginPasswordError('Password is required');
      return;
    } else {
      setLoginPasswordError('');
    }

    console.log("Login Form Data:", { email: loginEmail, password: loginPassword });
    // Add logic here to handle login submission (e.g., send data to server)
  };

  const handleSignup = () => {
    // Validate signup form
    if (!signupName) {
      setSignupNameError('Name is required');
      return;
    } else {
      setSignupNameError('');
    }
    if (!signupEmail) {
      setSignupEmailError('Email is required');
      return;
    } else {
      setSignupEmailError('');
    }
    if (!signupPassword) {
      setSignupPasswordError('Password is required');
      return;
    } else {
      setSignupPasswordError('');
    }
    if (signupPassword !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      return;
    } else {
      setConfirmPasswordError('');
    }

    console.log("Signup Form Data:", { name: signupName, email: signupEmail, password: signupPassword, confirmPassword, role: signupRole });
    // Add logic here to handle signup submission (e.g., send data to server)
  };

  return (
    <div className="flex justify-center">
        <Tabs defaultValue="login" className="w-[400px]">
          <TabsList className="flex justify-center">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Signup</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-email">Email</Label>
                      <Input id="login-email" placeholder="m@example.com" type="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
                      <span className="text-red-500">{loginEmailError}</span>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="login-password">Password</Label>
                      <Input id="login-password" type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
                      <span className="text-red-500">{loginPasswordError}</span>
                    </div>
                    <Button className="w-full" onClick={handleLogin}>Login</Button>
                  </div>
          </TabsContent>
          <TabsContent value="signup">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-name">Name</Label>
                      <Input id="signup-name" placeholder="Enter your name" value={signupName} onChange={(e) => setSignupName(e.target.value)} />
                      <span className="text-red-500">{signupNameError}</span>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Email</Label>
                      <Input id="signup-email" placeholder="m@example.com" type="email" value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} />
                      <span className="text-red-500">{signupEmailError}</span>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Password</Label>
                      <Input id="signup-password" type="password" value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} />
                      <span className="text-red-500">{signupPasswordError}</span>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm Password</Label>
                        <Input id="confirm-password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        <span className="text-red-500">{confirmPasswordError}</span>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="signup-role">Role</Label>
                        <Select defaultValue="startup" value={signupRole} onValueChange={setSignupRole}>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="startup" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="mentor">Mentor</SelectItem>
                            <SelectItem value="startup">Startup</SelectItem>
                          </SelectContent>
                        </Select>
                    </div>
                    <Button className="w-full" onClick={handleSignup}>Sign Up</Button>
                  </div>
          </TabsContent>
        </Tabs>
    </div>
  );
}
