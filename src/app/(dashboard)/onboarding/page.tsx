/**
 * Onboarding Page
 * 
 * Step-by-step wizard to guide new users through setup:
 * 1. Organization setup
 * 2. Profile completion
 * 3. Billing setup
 * 4. Team invitation
 * 5. Onboarding complete
 */

'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function OnboardingPage() {
  const [step, setStep] = useState(1);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Welcome to AutoContent AI</h1>
        <p className="text-slate-600 mt-2">Let's get your account set up (Step {step} of 5)</p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="w-full bg-slate-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all"
            style={{ width: `${(step / 5) * 100}%` }}
          />
        </div>
      </div>

      {/* Step Content */}
      <Card className="p-8 mb-6">
        {step === 1 && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Organization Setup</h2>
            <p className="text-slate-600 mb-6">Create your organization</p>
            {/* Form fields here */}
          </div>
        )}
        {step === 2 && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Complete Your Profile</h2>
            <p className="text-slate-600 mb-6">Add your profile information</p>
            {/* Form fields here */}
          </div>
        )}
        {step === 3 && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Billing Setup</h2>
            <p className="text-slate-600 mb-6">Choose your subscription plan</p>
            {/* Pricing cards here */}
          </div>
        )}
        {step === 4 && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Invite Team Members</h2>
            <p className="text-slate-600 mb-6">Add your team</p>
            {/* Team invite form here */}
          </div>
        )}
        {step === 5 && (
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">You're All Set! 🎉</h2>
            <p className="text-slate-600 mb-6">Your account is ready to use</p>
            <Button size="lg">Go to Dashboard</Button>
          </div>
        )}
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => setStep(Math.max(1, step - 1))}
          disabled={step === 1}
        >
          Back
        </Button>
        <Button
          onClick={() => setStep(Math.min(5, step + 1))}
          disabled={step === 5}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
