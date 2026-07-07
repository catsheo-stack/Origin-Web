import React from 'react';

/**
 * Origin Property Address Input (plain text, no autocomplete)
 *
 * Google Places removed for now to guarantee the lead form never blocks.
 * User can type freely; the typed value is saved as a manual address entry.
 */
export default function AddressAutocomplete({
  label = 'Your property address for Rental Appraisal',
  value = '',
  onChange,
  placeholder = 'Enter property address or suburb',
}) {
  const handleChange = (e) => {
    const val = e.target.value;
    onChange({
      property_address: val,
      formatted_address: val,
      suburb: '',
      postcode: '',
      state: '',
      country: 'Australia',
      latitude: null,
      longitude: null,
      google_place_id: '',
      manual_address_entry: true,
    });
  };

  return (
    <div>
      <label className="block text-sm font-medium text-midnight mb-1.5">{label}</label>
      <input
        type="text"
        value={value || ''}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full border border-stone rounded-lg px-4 py-3 text-sm font-body text-midnight bg-parchment/50 focus:outline-none focus:border-accent-navy"
      />
      <p className="mt-1.5 text-xs text-midnight/40">
        Optional — full address or suburb is fine.
      </p>
    </div>
  );
}