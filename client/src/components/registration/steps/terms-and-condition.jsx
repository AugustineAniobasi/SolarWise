import { useFormContext } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";

export function TermsAndConditions() {
  const form = useFormContext();

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Terms and Conditions</h2>
        <p className="text-muted-foreground mt-2">
          Please review and accept our terms and conditions
        </p>
      </div>

      <ScrollArea className="h-[300px] rounded-md border p-4">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Terms of Service</h3>

          <p>
            Welcome to SolarWise. By registering for an account, you agree to be
            bound by the following terms and conditions.
          </p>

          <h4 className="mt-4 font-semibold">1. Account Registration</h4>
          <p>
            1.1. You must provide accurate, current, and complete information
            during the registration process.
          </p>
          <p>
            1.2. You are responsible for maintaining the confidentiality of your
            account credentials.
          </p>
          <p>
            1.3. You are responsible for all activities that occur under your
            account.
          </p>

          <h4 className="mt-4 font-semibold">2. User Conduct</h4>
          <p>
            2.1. You agree not to use the service for any illegal or
            unauthorized purpose.
          </p>
          <p>2.2. You agree not to violate any laws in your jurisdiction.</p>

          <h4 className="mt-4 font-semibold">3. Vendor-Specific Terms</h4>
          <p>
            3.1. Vendors must provide accurate information about their services
            and qualifications.
          </p>
          <p>
            3.2. Vendors are responsible for the quality of services provided
            through our platform.
          </p>
          <p>
            3.3. Vendors must maintain appropriate licenses and insurance as
            required by local regulations.
          </p>

          <h4 className="mt-4 font-semibold">4. Customer-Specific Terms</h4>
          <p>
            4.1. Customers are responsible for providing accurate requirements
            when seeking services.
          </p>
          <p>
            4.2. Customers agree to pay for services rendered according to the
            agreed terms.
          </p>

          <h4 className="mt-4 font-semibold">5. Privacy Policy</h4>
          <p>
            5.1. We collect and process personal data as described in our
            Privacy Policy.
          </p>
          <p>
            5.2. By accepting these terms, you also consent to our Privacy
            Policy.
          </p>

          <h4 className="mt-4 font-semibold">6. Termination</h4>
          <p>
            6.1. We reserve the right to terminate or suspend your account at
            our sole discretion.
          </p>
          <p>
            6.2. You may terminate your account at any time by contacting our
            support team.
          </p>

          <h4 className="mt-4 font-semibold">7. Changes to Terms</h4>
          <p>7.1. We reserve the right to modify these terms at any time.</p>
          <p>
            7.2. Continued use of the service after changes constitutes
            acceptance of the new terms.
          </p>

          <h4 className="mt-4 font-semibold">8. Limitation of Liability</h4>
          <p>
            8.1. Our service is provided "as is" without warranties of any kind.
          </p>
          <p>
            8.2. We shall not be liable for any indirect, incidental, special,
            consequential, or punitive damages.
          </p>

          <h4 className="mt-4 font-semibold">9. Governing Law</h4>
          <p>
            9.1. These terms shall be governed by and construed in accordance
            with the laws of the jurisdiction in which we operate.
          </p>

          <p className="mt-6">
            By checking the box below, you acknowledge that you have read,
            understood, and agree to be bound by these terms and conditions.
          </p>
        </div>
      </ScrollArea>

      <FormField
        control={form.control}
        name="agreeToTerms"
        render={({ field }) => (
          <FormItem className="mt-4 flex flex-row items-start space-y-0 space-x-3">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>
                I agree to the terms and conditions, privacy policy, and data
                processing agreement
              </FormLabel>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />
    </div>
  );
}
