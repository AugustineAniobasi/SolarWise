import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { auth, googleProvider } from "@/lib/firebase";
import { signInWithPopup } from "firebase/auth";
import { toast } from "sonner";

export function AuthMethod() {
  const [userData, setUserData] = useState(null); // Add this state
  const form = useFormContext();
  const { watch, setValue } = form;
  const selectedAuthMethod = watch("authMethod");

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Store user data in state
      setUserData({
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      });

      // Set form values with Google user data
      setValue("email", user.email || "");
      setValue("name", user.displayName || "");
      setValue("authMethod", "google");

      toast.success(`Signed in as ${user.displayName || user.email}`);

      // You can add additional logic here like redirecting after sign-in
    } catch (error) {
      console.error("Google sign-in error:", error);
      toast.error("Failed to sign in with Google");
    }
  };

  const renderUserProfile = () => (
    <div className="mt-6 space-y-4 rounded-md border p-4 text-center">
      <div className="flex flex-col items-center">
        {userData.photoURL && (
          <img
            src={userData.photoURL}
            alt="User profile"
            className="h-16 w-16 rounded-full"
          />
        )}
        <h3 className="mt-2 text-lg font-semibold">
          {userData.name || "Google User"}
        </h3>
        <p className="text-muted-foreground text-sm">{userData.email}</p>
      </div>
      <Button
        className="w-full"
        onClick={() => {
          toast.success("Registration completed!");
        }}
      >
        Continue Registration
      </Button>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Choose Sign-Up Method</h2>
        <p className="text-muted-foreground mt-2">
          Select how you want to create your account
        </p>
      </div>

      <FormField
        control={form.control}
        name="authMethod"
        render={({ field }) => (
          <FormItem>
            <RadioGroup
              onValueChange={(value) => field.onChange(value)}
              defaultValue={field.value}
              className="grid grid-cols-1 gap-4"
            >
              <div className="relative">
                <RadioGroupItem
                  value="google"
                  id="google"
                  className="sr-only"
                />
                <Label
                  htmlFor="google"
                  className={`border-muted bg-popover hover:bg-accent hover:text-accent-foreground flex cursor-pointer items-center justify-between rounded-md border-2 p-4 ${
                    selectedAuthMethod === "google" ? "border-primary-500" : ""
                  }`}
                  onClick={handleGoogleSignIn} // Added click handler here
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                      >
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                    </div>
                    <div className="text-left">
                      <CardTitle className="text-lg">Google</CardTitle>
                      <CardDescription>
                        Sign up with your Google account
                      </CardDescription>
                    </div>
                  </div>
                </Label>
              </div>

              <div className="relative">
                <RadioGroupItem value="email" id="email" className="sr-only" />
                <Label
                  htmlFor="email"
                  className={`border-muted bg-popover hover:bg-accent hover:text-accent-foreground flex cursor-pointer items-center justify-between rounded-md border-2 p-4 ${
                    selectedAuthMethod === "email" ? "border-primary-500" : ""
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                      <Mail className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="text-left">
                      <CardTitle className="text-lg">
                        Email & Password
                      </CardTitle>
                      <CardDescription>
                        Sign up with your email address
                      </CardDescription>
                    </div>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </FormItem>
        )}
      />

      {selectedAuthMethod === "email" && (
        <div className="mt-6 space-y-4 rounded-md border p-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="your.email@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Create a secure password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      )}

      {selectedAuthMethod === "google" && (
        <div className="mt-6 text-center">
          {userData ? (
            renderUserProfile()
          ) : (
            <>
              <p className="text-muted-foreground mb-4 text-sm">
                Click the button below to sign in with Google
              </p>
              <Button
                type="button"
                variant="outline"
                className="flex w-full max-w-sm items-center justify-center gap-2"
                onClick={handleGoogleSignIn}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                >
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
