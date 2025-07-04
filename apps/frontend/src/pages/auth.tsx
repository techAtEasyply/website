import { SignIn, SignUp } from '@clerk/clerk-react';

export function AuthPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32 }}>
      <h1>Sign In</h1>
      <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
      <h1>Sign Up</h1>
      <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
    </div>
  );
} 