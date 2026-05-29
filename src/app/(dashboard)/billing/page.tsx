/**
 * Billing Page
 * 
 * Subscription and billing management:
 * - Current subscription status
 * - Plan selection/upgrade
 * - Invoice history
 * - Payment method management
 */

'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function BillingPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Billing</h1>
        <p className="text-slate-600">Manage your subscription and billing settings</p>
      </div>

      <Tabs defaultValue="subscription" className="w-full">
        <TabsList>
          <TabsTrigger value="subscription">Subscription</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="payment">Payment Method</TabsTrigger>
        </TabsList>

        <TabsContent value="subscription" className="space-y-4">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Current Plan</h2>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div>
                <p className="text-sm text-slate-600">Plan</p>
                <p className="text-lg font-semibold">Free</p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Price</p>
                <p className="text-lg font-semibold">$0/month</p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Status</p>
                <p className="text-lg font-semibold text-green-600">Active</p>
              </div>
            </div>
            <Button>Upgrade Plan</Button>
          </Card>

          {/* Pricing Tiers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            {['Starter', 'Professional', 'Enterprise'].map((plan) => (
              <Card key={plan} className="p-6 border-2">
                <h3 className="text-lg font-semibold mb-2">{plan}</h3>
                <p className="text-2xl font-bold mb-4">$99/month</p>
                <ul className="space-y-2 mb-6 text-sm">
                  <li>✓ Feature 1</li>
                  <li>✓ Feature 2</li>
                  <li>✓ Feature 3</li>
                </ul>
                <Button variant="outline" className="w-full">Select Plan</Button>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="invoices">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Invoice History</h2>
            <p className="text-slate-600">No invoices yet</p>
          </Card>
        </TabsContent>

        <TabsContent value="payment">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
            <p className="text-slate-600 mb-4">No payment method saved</p>
            <Button>Add Payment Method</Button>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
