'use client';

import { Button } from '@/components/ui/button';

const plans = [
  {
    name: 'Starter',
    price: '$29',
    description: 'Perfect for solo creators',
    features: [
      '100 AI generations/month',
      '3 Social Platforms',
      'Content Calendar',
      'Basic Analytics',
    ],
  },
  {
    name: 'Professional',
    price: '$99',
    popular: true,
    description: 'Best for growing businesses',
    features: [
      'Unlimited AI Content',
      'All Social Platforms',
      'Auto Publishing',
      'Advanced Analytics',
      'Priority Support',
    ],
  },
  {
    name: 'Enterprise',
    price: '$299',
    description: 'Built for agencies and teams',
    features: [
      'Everything in Professional',
      'Unlimited Clients',
      'Team Collaboration',
      'White Label',
      'Dedicated Support',
    ],
  },
];

export default function BillingPage() {
  return (
    <div className="relative p-8 text-white">

      {/* Background Effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <div className="absolute left-0 top-0 h-[450px] w-[450px] rounded-full bg-blue-600/10 blur-[140px]" />

        <div className="absolute right-0 top-0 h-[450px] w-[450px] rounded-full bg-violet-600/10 blur-[140px]" />

        <div className="absolute bottom-0 left-1/2 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-fuchsia-600/5 blur-[140px]" />

      </div>

      <div className="relative z-10">

        {/* Header */}
        <div className="mb-10">

          <div className="inline-flex rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1 text-sm text-emerald-400">
            Active Subscription
          </div>

          <h1 className="mt-4 text-5xl font-bold tracking-tight">
            Billing & Plans
          </h1>

          <p className="mt-3 max-w-2xl text-lg text-zinc-400">
            Manage your subscription, payment methods,
            and unlock premium AI automation features.
          </p>

        </div>

        {/* Current Plan */}
        <section className="mb-10 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">

          <div className="grid gap-8 md:grid-cols-4">

            <div>
              <p className="text-sm text-zinc-500">
                Current Plan
              </p>

              <h3 className="mt-2 text-3xl font-bold">
                Free
              </h3>
            </div>

            <div>
              <p className="text-sm text-zinc-500">
                Monthly Cost
              </p>

              <h3 className="mt-2 text-3xl font-bold">
                $0
              </h3>
            </div>

            <div>
              <p className="text-sm text-zinc-500">
                Status
              </p>

              <h3 className="mt-2 font-semibold text-emerald-400">
                Active
              </h3>
            </div>

            <div className="flex items-center justify-end">
              <Button className="rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-6">
                Upgrade Now
              </Button>
            </div>

          </div>

        </section>

        {/* Pricing Plans */}
        <section className="grid gap-8 lg:grid-cols-3">

          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`group relative overflow-hidden rounded-3xl border p-[1px] transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl
                ${
                  plan.popular
                    ? 'border-violet-500/40'
                    : 'border-white/10'
                }`}
            >

              <div
                className={`h-full rounded-3xl backdrop-blur-xl
                ${
                  plan.popular
                    ? 'bg-gradient-to-b from-violet-500/15 to-black/40'
                    : 'bg-white/5'
                }`}
              >

                {plan.popular && (
                  <div className="absolute right-4 top-4 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 px-3 py-1 text-xs font-semibold text-white">
                    MOST POPULAR
                  </div>
                )}

                <div className="p-8">

                  <h3 className="text-2xl font-bold">
                    {plan.name}
                  </h3>

                  <p className="mt-2 text-zinc-400">
                    {plan.description}
                  </p>

                  <div className="mt-8 flex items-end gap-2">
                    <span className="text-5xl font-bold">
                      {plan.price}
                    </span>

                    <span className="pb-2 text-zinc-500">
                      /month
                    </span>
                  </div>

                  <div className="my-8 h-px bg-white/10" />

                  <ul className="space-y-4">

                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-3 text-zinc-300"
                      >
                        <span className="text-emerald-400">
                          ✓
                        </span>

                        {feature}
                      </li>
                    ))}

                  </ul>

                  <Button
                    className={`mt-10 w-full rounded-xl
                    ${
                      plan.popular
                        ? 'bg-gradient-to-r from-blue-600 to-violet-600'
                        : 'bg-white/10 hover:bg-white/20'
                    }`}
                  >
                    Choose Plan
                  </Button>

                </div>

              </div>

            </div>
          ))}

        </section>

        {/* Invoice History */}
        <section className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">

          <h2 className="text-2xl font-bold">
            Invoice History
          </h2>

          <p className="mt-3 text-zinc-400">
            No invoices available yet.
          </p>

        </section>

      </div>
    </div>
  );
}