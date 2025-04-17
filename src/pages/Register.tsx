
import { RegisterForm } from "@/components/auth/RegisterForm";
import { Navbar } from "@/components/layout/navbar";

export default function Register() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <RegisterForm />
        </div>
      </main>
      <footer className="border-t py-6 md:py-8">
        <div className="container flex flex-col items-center justify-center gap-4 text-center md:flex-row md:gap-6">
          <p className="text-sm text-muted-foreground">
            © 2025 LearnVerse Quest. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
