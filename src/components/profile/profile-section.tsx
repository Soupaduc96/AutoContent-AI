'use client';

import React, { useState } from 'react';
import { User } from '@/types/user.types';
import { Mail, User as UserIcon } from 'lucide-react';

interface ProfileSectionProps {
  user: User;
  onUpdate?: (updates: { firstName?: string; lastName?: string }) => Promise<void>;
}

export function ProfileSection({ user, onUpdate }: ProfileSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user.firstName || '',
    lastName: user.lastName || '',
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (onUpdate) {
      setIsSaving(true);
      try {
        await onUpdate({
          firstName: formData.firstName,
          lastName: formData.lastName,
        });
        setIsEditing(false);
      } finally {
        setIsSaving(false);
      }
    }
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Profile Settings</h2>
          <p className="mt-2 text-zinc-400">Manage your account information</p>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-white/10"
        >
          {isEditing ? 'Cancel' : 'Edit'}
        </button>
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-zinc-300">First Name</label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData((prev) => ({ ...prev, firstName: e.target.value }))}
                className="mt-2 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder-zinc-500 transition-all duration-300 focus:border-white/20 focus:bg-white/10 focus:outline-none"
                placeholder="Your first name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-300">Last Name</label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData((prev) => ({ ...prev, lastName: e.target.value }))}
                className="mt-2 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder-zinc-500 transition-all duration-300 focus:border-white/20 focus:bg-white/10 focus:outline-none"
                placeholder="Your last name"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={isSaving}
            className="w-full rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-black transition-all duration-300 hover:bg-white/90 disabled:opacity-50"
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      ) : (
        <div className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <p className="text-sm text-zinc-400">First Name</p>
              <p className="mt-1 text-lg font-medium text-white">{user.firstName || 'Not set'}</p>
            </div>
            <div>
              <p className="text-sm text-zinc-400">Last Name</p>
              <p className="mt-1 text-lg font-medium text-white">{user.lastName || 'Not set'}</p>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6">
            <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-4">
              <Mail className="h-5 w-5 text-zinc-400" />
              <div className="flex-1">
                <p className="text-sm text-zinc-400">Email</p>
                <p className="text-white">{user.email}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
