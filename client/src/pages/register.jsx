import { RegistrationForm } from "@/components/registration/registration-form";
import logo from "@/assets/logo.svg";

function RegisterPage() {
  return (
    <main className="wrapper">
      <section className="px-4 py-10">
        <div className="mb-8 flex justify-center">
          <img src={logo} alt="Solar wise logo" />
        </div>
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">Create Your Account</h1>
          <p className="text-muted-foreground mt-2">
            Join our platform to connect with service providers and customers
          </p>
        </div>
        <RegistrationForm />
      </section>
    </main>
  );
}

export default RegisterPage;
