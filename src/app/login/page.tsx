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
import { login, register } from '@/services/auth.service';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [loginForm, setLoginForm] = useState({ email: '', password: '', emailError: '', passwordError: '' });
  const [signupForm, setSignupForm] = useState({ name: '', email: '', password: '', confirmPassword: '', role: 'USER', nameError: '', emailError: '', passwordError: '', confirmPasswordError: '' });
  const validateForm = (form:any) => {
    let isValid = true;

    for (const key in form) {
      if (form[key] === '' && !key.includes('Error')) {
        form[`${key}Error`] = `${key[0].toUpperCase() + key.slice(1)} is required`;
        isValid = false;
      } else if (key.includes('Error')) {
        form[key] = '';
      }
    }

    // Check for matching passwords in register form
    if (form.confirmPassword !== undefined && form.confirmPassword !== form.password) {
      form.confirmPasswordError = 'Passwords do not match';
      isValid = false;
    }

    // Return validation result and updated form
    return { isValid, form };
  };

// Handle submission of login and register form
const router = useRouter()

const handleLogin = async () => {
    const validation = validateForm(loginForm);
    setLoginForm(validation.form);

    if (validation.isValid) {
        const res = await login(loginForm.email, loginForm.password);
        router.push('/dashboard');
    }
};

const handleSignup = async () => {
    const validation = validateForm(signupForm);
    setSignupForm(validation.form);

    if (validation.isValid) {
        const registerResponse = await register(
            signupForm.name,
            signupForm.email,
            signupForm.password,
            signupForm.role
        );
        const loginResponse = await login(signupForm.email, signupForm.password);
        router.push('/dashboard');
    }
};

  return (
      <div className="flex justify-center p-24">
          <Tabs defaultValue="login" className="w-[400px]">
            <TabsList className="flex justify-center">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Signup</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="login-email">Email</Label>
                        <Input id="login-email" placeholder="m@example.com" type="email" value={loginForm.email} onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })} />
                        <span className="text-red-500">{loginForm.emailError}</span>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="login-password">Password</Label>
                        <Input id="login-password" type="password" value={loginForm.password} onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })} />
                        <span className="text-red-500">{loginForm.passwordError}</span>
                      </div>
                      <Button className="w-full" onClick={handleLogin}>Login</Button>
                    </div>
            </TabsContent>
            <TabsContent value="signup">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="signup-name">Name</Label>
                        <Input id="signup-name" placeholder="Enter your name" value={signupForm.name} onChange={(e) => setSignupForm({ ...signupForm, name: e.target.value })} />
                        <span className="text-red-500">{signupForm.nameError}</span>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-email">Email</Label>
                        <Input id="signup-email" placeholder="m@example.com" type="email" value={signupForm.email} onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })} />
                        <span className="text-red-500">{signupForm.emailError}</span>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-password">Password</Label>
                        <Input id="signup-password" type="password" value={signupForm.password} onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })} />
                        <span className="text-red-500">{signupForm.passwordError}</span>
                      </div>
                      <div className="space-y-2">
                          <Label htmlFor="confirm-password">Confirm Password</Label>
                          <Input id="confirm-password" type="password" value={signupForm.confirmPassword} onChange={(e) => setSignupForm({ ...signupForm, confirmPassword: e.target.value })} />
                          <span className="text-red-500">{signupForm.confirmPasswordError}</span>
                      </div>
                      <div className="space-y-2">
                          <Label htmlFor="signup-role">Role</Label>
                          <Select defaultValue="USER" value={signupForm.role} onValueChange={(value) => setSignupForm({ ...signupForm, role: value })}>
                            <SelectTrigger>
                              <SelectValue placeholder="startup" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="ADMIN">Admin</SelectItem>
                              <SelectItem value="MENTOR">Mentor</SelectItem>
                              <SelectItem value="USER">Startup</SelectItem>
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