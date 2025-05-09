import { z } from "zod";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Progress } from "../ui/progress";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Toaster } from "../ui/sonner";
import { Form } from "../ui/form";

import { RoleSelection } from "./steps/role-selection";
import { AuthMethod } from "./steps/auth-method";
import { BasicInfo } from "./steps/basic-info";
import { VendorInfo } from "./steps/vendor-info";
import { DocumentUpload } from "./steps/document-upload";
import { TermsAndConditions } from "./steps/terms-and-condition";
import { ReviewSubmit } from "./steps/review-submit";

const mySchema = z
  .object({
    role: z.enum(["vendor", "customer"]),
    authMethod: z.enum(["google", "email"]),
    email: z.string().email().optional(),
    password: z
      .string()
      .min(8)
      .optional()
      .refine(
        (password) => {
          if (!password) return true; // Skip validation if password is empty
          return password.length >= 8;
        },
        { message: "Password must be at least 8 characters long" }
      )
      .refine(
        (password) => {
          if (!password) return true;
          return /[A-Z]/.test(password);
        },
        { message: "Password must contain at least one uppercase letter" }
      )
      .refine(
        (password) => {
          if (!password) return true;
          return /[0-9]/.test(password);
        },
        { message: "Password must contain at least one number" }
      )
      .refine(
        (password) => {
          if (!password) return true;
          return /[^A-Za-z0-9]/.test(password);
        },
        { message: "Password must contain at least one special character" }
      ),
    name: z.string(2).max(50),
    phone: z.string().min(10),
    location: z.object({
      city: z.string().min(2),
      country: z.string().min(2),
    }),
    identification: z.any().optional(),
    businessName: z.string().min(2).max(100).optional(),
    businessType: z.string().min(2).optional(),
    serviceDescription: z.string().min(10).optional(),
    businessAddress: z.string().min(5).optional(),
    businessDocuments: z.any().optional(),
    website: z.string().url().optional().or(z.literal("")),
    socialMedia: z.string().optional(),
    agreeToTerms: z.boolean().refine((val) => val === true, {
      message: "You must agree to the terms and conditions",
    }),
  })
  .superRefine((data, ctx) => {
    // Make email and password required when authMethod is "email"
    if (data.authMethod === "email") {
      if (!data.email) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Email is required when using email authentication",
          path: ["email"],
        });
      }
      if (!data.password) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Password is required when using email authentication",
          path: ["password"],
        });
      }
    }
  });

export function RegistrationForm() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const totalSteps = 7;

  // Initialize form with default values
  const form = useForm({
    resolver: zodResolver(mySchema),
    defaultValues: {
      role: undefined,
      authMethod: undefined,
      email: "",
      password: "",
      name: "",
      phone: "",
      location: {
        city: "",
        country: "",
      },
      businessName: "",
      businessType: "",
      serviceDescription: "",
      businessAddress: "",
      website: "",
      socialMedia: "",
      agreeToTerms: false,
    },
  });

  const { watch } = form;
  const role = watch("role");
  const authMethod = watch("authMethod");

  const progress = Math.round((step / totalSteps) * 100);

  const handleNextStep = async () => {
    // Validate current step before proceeding
    let isValid = false;

    switch (step) {
      case 1: // Role section
        isValid = !!role;
        break;
      case 2: // Auth method
        isValid = !!authMethod;
        if (authMethod === "email") {
          isValid = await form.trigger(["email", "password"]);
        }
        break;
      case 3: // Basic info
        isValid = await form.trigger([
          "name",
          "phone",
          "location.city",
          "location.country",
        ]);
        break;
      case 4: // Vendor info (if vendor)
        if (role === "customer") {
          isValid = true; // Skip vendor for customers
        } else {
          isValid = await form.trigger([
            "businessName",
            "businessType",
            "serviceDescription",
            "businessAddress",
          ]);
        }
        break;
      case 5: // Documents
        isValid = true; // Assume documents are optional for now
        break;
      case 6: // Terms and conditions
        isValid = await form.trigger(["agreeToTerms"]);
        break;
      default:
        isValid = true;
    }

    if (isValid) {
      // Skip vendor info if customer
      if (step < totalSteps) {
        if (step === 3 && role === "customer") {
          setStep(5);
        } else {
          setStep(step + 1);
        }
      } else {
        toast.error("Validation Error");
      }
    }
  };

  const handlePreviousStep = () => {
    if (step > 1) {
      // Skip vendor info step for customers when going back
      if (step === 5 && role === "customer") {
        setStep(3);
      } else {
        setStep(step - 1);
      }
    }
  };

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      // Send the data to your backend
      console.log("Form submitted:", data);

      // Show success message
      toast.success("Registration Successful");

      // Redirect to login or dashboard
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      toast.error("Registration Failed");
      console.log("Registration error:", error);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <Card className="p-6">
        <div className="mb-6">
          <div className="mb-2 flex justify-between text-sm">
            <span>
              Step {step} of {totalSteps}
            </span>
            <span>{progress}% Complete</span>
          </div>
          <Progress value={progress} />
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {/* Step 1: Role Selection */}
            {step === 1 && <RoleSelection />}

            {/* Step 2: Authentication Method */}
            {step === 2 && <AuthMethod />}

            {/* Step 3: Basic Information */}
            {step === 3 && <BasicInfo />}

            {/* Step 4: Vendor Information (only for vendors) */}
            {step === 4 && role === "vendor" && <VendorInfo />}

            {/* Step 5: Document Upload */}
            {step === 5 && <DocumentUpload role={role} />}

            {/* Step 6: Terms and Conditions */}
            {step === 6 && <TermsAndConditions />}

            {/* Step 7: Review and Submit */}
            {step === 7 && <ReviewSubmit onSubmit={onSubmit} />}

            {/* Navigation Buttons */}
            <div className="mt-8 flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={handlePreviousStep}
                disabled={step === 1}
                className="cursor-pointer"
              >
                Previous
              </Button>
              {step < totalSteps ? (
                <Button
                  type="button"
                  onClick={handleNextStep}
                  className="bg-primary-500 hover:bg-primary-400 cursor-pointer font-semibold text-white"
                >
                  Next
                </Button>
              ) : (
                ""
              )}
            </div>
          </form>
        </Form>
      </Card>
      <Toaster />
    </div>
  );
}
