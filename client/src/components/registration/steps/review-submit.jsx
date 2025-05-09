import { useFormContext } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, FileText } from "lucide-react";

export function ReviewSubmit({ onSubmit }) {
  const form = useFormContext();
  const { getValues } = form;
  const values = getValues();

  const handleSubmit = () => {
    console.log("triggered");
    onSubmit(values);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Review Your Information</h2>
        <p className="text-muted-foreground mt-2">
          Please review your information before submitting
        </p>
      </div>

      <div className="space-y-4">
        <Card>
          <CardContent className="pt-6">
            <h3 className="mb-4 text-lg font-semibold">Account Information</h3>
            <dl className="grid grid-cols-1 gap-x-6 gap-y-3 md:grid-cols-2">
              <div>
                <dt className="text-muted-foreground text-sm font-medium">
                  Account Type
                </dt>
                <dd className="mt-1 text-sm">
                  {values.role === "vendor"
                    ? "Vendor (Service Provider)"
                    : "Customer (Service Buyer)"}
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground text-sm font-medium">
                  Sign-up Method
                </dt>
                <dd className="mt-1 text-sm">
                  {values.authMethod === "google"
                    ? "Google Account"
                    : "Email and Password"}
                </dd>
              </div>
              {values.authMethod === "email" && (
                <div>
                  <dt className="text-muted-foreground text-sm font-medium">
                    Email
                  </dt>
                  <dd className="mt-1 text-sm">{values.email}</dd>
                </div>
              )}
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h3 className="mb-4 text-lg font-semibold">Personal Information</h3>
            <dl className="grid grid-cols-1 gap-x-6 gap-y-3 md:grid-cols-2">
              <div>
                <dt className="text-muted-foreground text-sm font-medium">
                  Full Name
                </dt>
                <dd className="mt-1 text-sm">{values.name}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground text-sm font-medium">
                  Phone Number
                </dt>
                <dd className="mt-1 text-sm">{values.phone}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground text-sm font-medium">
                  City
                </dt>
                <dd className="mt-1 text-sm">{values.location.city}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground text-sm font-medium">
                  Country
                </dt>
                <dd className="mt-1 text-sm">{values.location.country}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        {values.role === "vendor" && (
          <Card>
            <CardContent className="pt-6">
              <h3 className="mb-4 text-lg font-semibold">
                Business Information
              </h3>
              <dl className="grid grid-cols-1 gap-x-6 gap-y-3 md:grid-cols-2">
                <div>
                  <dt className="text-muted-foreground text-sm font-medium">
                    Business Name
                  </dt>
                  <dd className="mt-1 text-sm">{values.businessName}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground text-sm font-medium">
                    Business Category
                  </dt>
                  <dd className="mt-1 text-sm">{values.businessType}</dd>
                </div>
                <div className="md:col-span-2">
                  <dt className="text-muted-foreground text-sm font-medium">
                    Business Address
                  </dt>
                  <dd className="mt-1 text-sm">{values.businessAddress}</dd>
                </div>
                <div className="md:col-span-2">
                  <dt className="text-muted-foreground text-sm font-medium">
                    Service Description
                  </dt>
                  <dd className="mt-1 text-sm">{values.serviceDescription}</dd>
                </div>
                {values.website && (
                  <div>
                    <dt className="text-muted-foreground text-sm font-medium">
                      Website
                    </dt>
                    <dd className="mt-1 text-sm">{values.website}</dd>
                  </div>
                )}
                {values.socialMedia && (
                  <div>
                    <dt className="text-muted-foreground text-sm font-medium">
                      Social Media
                    </dt>
                    <dd className="mt-1 text-sm">{values.socialMedia}</dd>
                  </div>
                )}
              </dl>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardContent className="pt-6">
            <h3 className="mb-4 text-lg font-semibold">Uploaded Documents</h3>
            <dl className="space-y-3">
              <div>
                <dt className="text-muted-foreground text-sm font-medium">
                  Personal Identification
                </dt>
                <dd className="mt-1 text-sm">
                  {values.identification ? (
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-blue-500" />
                      <span>Document uploaded</span>
                      <Check className="h-4 w-4 text-green-500" />
                    </div>
                  ) : (
                    <span className="text-red-500">No document uploaded</span>
                  )}
                </dd>
              </div>

              {values.role === "vendor" && (
                <div>
                  <dt className="text-muted-foreground text-sm font-medium">
                    Business Documents
                  </dt>
                  <dd className="mt-1 text-sm">
                    {values.businessDocuments &&
                    Array.isArray(values.businessDocuments) &&
                    values.businessDocuments.length > 0 ? (
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-blue-500" />
                        <span>
                          {values.businessDocuments.length} document(s) uploaded
                        </span>
                        <Check className="h-4 w-4 text-green-500" />
                      </div>
                    ) : (
                      <span className="text-red-500">
                        No documents uploaded
                      </span>
                    )}
                  </dd>
                </div>
              )}
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h3 className="mb-4 text-lg font-semibold">Terms and Conditions</h3>
            <div className="flex items-center gap-2">
              <Check className="h-5 w-5 text-green-500" />
              <span>You have agreed to the terms and conditions</span>
            </div>
          </CardContent>
        </Card>
        <div className="mt-6 flex justify-center">
          <Button
            type="button"
            className="bg-success-600 hover:bg-success-700 px-8"
            onClick={handleSubmit}
          >
            Complete Registration
          </Button>
        </div>
      </div>
    </div>
  );
}
