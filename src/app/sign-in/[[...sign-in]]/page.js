import { SignIn } from "@clerk/nextjs";
import { isClerkEnabled } from "@/hooks/use-auth";
import { ClerkSetupRequired } from "@/components/auth/clerk-setup-required";

export default function SignInPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#020617] px-4 py-16">
      {/* Ambient background effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-gradient-to-b from-blue-500/15 via-violet-500/8 to-transparent blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-[350px] w-[350px] rounded-full bg-violet-600/8 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-md flex justify-center">
        {isClerkEnabled ? (
          <SignIn
            afterSignInUrl="/dashboard"
            signUpUrl="/sign-up"
          />
        ) : (
          <ClerkSetupRequired />
        )}
      </div>
    </div>
  );
}
