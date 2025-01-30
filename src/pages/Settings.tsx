import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const signupSchema = loginSchema.extend({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
});

const Settings = () => {
  const { user, profile, signIn, signUp, signOut } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const { toast } = useToast();

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signupForm = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    },
  });

  const handleLogin = async (values: z.infer<typeof loginSchema>) => {
    try {
      await signIn(values.email, values.password);
      toast({
        title: "Success",
        description: "Successfully logged in",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to login. Please check your credentials.",
        variant: "destructive",
      });
    }
  };

  const handleSignUp = async (values: z.infer<typeof signupSchema>) => {
    try {
      await signUp(values.email, values.password, values.firstName, values.lastName);
      toast({
        title: "Success",
        description: "Account created successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create account. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Success",
        description: "Successfully logged out",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to log out",
        variant: "destructive",
      });
    }
  };

  if (user && profile) {
    return (
      <div className="animate-fade-in">
        <h1 className="text-3xl font-bold mb-6">Settings</h1>
        <Card className="p-6">
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
              <div className="space-y-2">
                <p><span className="font-medium">Email:</span> {profile.email}</p>
                <p><span className="font-medium">Name:</span> {profile.first_name} {profile.last_name}</p>
                <p><span className="font-medium">Role:</span> {profile.role}</p>
              </div>
            </div>
            <Button onClick={handleSignOut} variant="destructive">
              Sign Out
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl font-bold mb-6">
        {isSignUp ? "Create Account" : "Login"}
      </h1>
      <Card className="p-6">
        {isSignUp ? (
          <Form {...signupForm}>
            <form onSubmit={signupForm.handleSubmit(handleSignUp)} className="space-y-4">
              <FormField
                control={signupForm.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={signupForm.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={signupForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={signupForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="space-y-2">
                <Button type="submit" className="w-full">
                  Create Account
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  className="w-full"
                  onClick={() => setIsSignUp(false)}
                >
                  Already have an account? Login
                </Button>
              </div>
            </form>
          </Form>
        ) : (
          <Form {...loginForm}>
            <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
              <FormField
                control={loginForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={loginForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="space-y-2">
                <Button type="submit" className="w-full">
                  Login
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  className="w-full"
                  onClick={() => setIsSignUp(true)}
                >
                  Need an account? Sign Up
                </Button>
              </div>
            </form>
          </Form>
        )}
      </Card>
    </div>
  );
};

export default Settings;