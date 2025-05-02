"use client";

import { useState } from "react";
import { signUpAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function Signup({ searchParams }: { searchParams: Promise<Message> }) {
  const [role, setRole] = useState("tester");

  return (
    <div className="flex w-full h-screen justify-center items-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <h1 className="text-2xl font-medium">Sign up</h1>
          <p className="text-sm text-foreground">
            Already have an account?{" "}
            <Link className="text-primary font-medium underline" href="/sign-in">
              Sign in
            </Link>
          </p>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4" action={signUpAction}>
            {/* Email & Password */}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input type="email" name="email" placeholder="you@example.com" required />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input type="password" name="password" placeholder="Your password" minLength={6} required />
            </div>

            {/* Role Selection */}
            <div>
              <Label htmlFor="role">Role</Label>
              <select
                name="role"
                onChange={(e) => setRole(e.target.value)}
                className="border p-2 rounded w-full"
              >
                <option value="tester">Tester</option>
                <option value="company">Company</option>
              </select>
            </div>

            {/* Company Fields */}
            {role === "company" && (
              <>
                <div>
                  <Label htmlFor="name">Company Name</Label>
                  <Input name="name" placeholder="Acme Inc." required />
                </div>
                <div>
                  <Label htmlFor="sector">Sector</Label>
                  <Input name="sector" placeholder="Healthcare, Education..." required />
                </div>
                <div>
                  <Label htmlFor="url">Company Test URL</Label>
                  <Input type="url" name="url" placeholder="https://yourdomain.com" required />
                </div>
              </>
            )}

            {/* Tester Fields */}
            {role === "tester" && (
              <>
                <div>
                  <Label htmlFor="profession">Profession</Label>
                  <select name="profession" className="border p-2 rounded w-full" required>
                    <option value="">Select Profession</option>
                    <option value="UX Researcher">UX Researcher</option>
                    <option value="QA Engineer">QA Engineer</option>
                    <option value="Accessibility Tester">Accessibility Tester</option>
                    <option value="Voice Assistant Tester">Voice Assistant Tester</option>
                    <option value="Speech Data Analyst">Speech Data Analyst</option>
                    <option value="Transcription Specialist">Transcription Specialist</option>
                    <option value="Localization Expert">Localization Expert</option>
                    <option value="Student">Student</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="languages">Languages</Label>
                  <select
                    name="languages"
                    multiple
                    className="border p-2 rounded w-full h-32"
                    required
                  >
                    <option value="English">English</option>
                    <option value="Hindi">Hindi</option>
                    <option value="Tamil">Tamil</option>
                    <option value="Bengali">Bengali</option>
                    <option value="Telugu">Telugu</option>
                    <option value="Kannada">Kannada</option>
                    <option value="Malayalam">Malayalam</option>
                    <option value="Gujarati">Gujarati</option>
                    <option value="Punjabi">Punjabi</option>
                    <option value="Marathi">Marathi</option>
                  </select>
                  <p className="text-xs text-muted-foreground">
                    Hold Ctrl (Windows) or Command (Mac) to select multiple.
                  </p>
                </div>

                <div>
                  <Label htmlFor="linkedin_url">LinkedIn Profile URL</Label>
                <Input
                  name="linkedin_url"
                  type="url"
                  placeholder="https://linkedin.com/in/your-profile"
                  required
                />

                </div>

                <div>
                  <Label htmlFor="gender">Gender</Label>
                  <select name="gender" className="border p-2 rounded w-full" required>
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="nonbinary">Non-binary</option>
                    <option value="prefer_not_to_say">Prefer not to say</option>
                  </select>
                </div>
              </>
            )}

            {/* Submit */}
            <SubmitButton pendingText="Signing up...">Sign up</SubmitButton>
            <FormMessage message={searchParams} />
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
