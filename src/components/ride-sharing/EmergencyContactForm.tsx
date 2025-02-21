'use client';

import { useState } from 'react';

interface EmergencyContact {
  name: string;
  phone: string;
  relationship: string;
}

export default function EmergencyContactForm() {
  const [contact, setContact] = useState<EmergencyContact>({
    name: '',
    phone: '',
    relationship: ''
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSaving(false);
    // Show success toast
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Contact Name *
        </label>
        <input
          type="text"
          id="name"
          required
          value={contact.name}
          onChange={(e) => setContact({ ...contact, name: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          Phone Number *
        </label>
        <input
          type="tel"
          id="phone"
          required
          value={contact.phone}
          onChange={(e) => setContact({ ...contact, phone: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="relationship" className="block text-sm font-medium text-gray-700">
          Relationship *
        </label>
        <input
          type="text"
          id="relationship"
          required
          value={contact.relationship}
          onChange={(e) => setContact({ ...contact, relationship: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <button
        type="submit"
        disabled={saving}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
      >
        {saving ? 'Saving...' : 'Save Emergency Contact'}
      </button>
    </form>
  );
} 