"use client";
import React, { useState } from 'react';

const ProfilePage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    language: '',
    country: '',
    profession: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Data:', formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-white mb-6 text-center">Profile</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { label: 'Name', name: 'name', type: 'text' },
            { label: 'Age', name: 'age', type: 'number' },
            { label: 'Language', name: 'language', type: 'text' },
            { label: 'Country', name: 'country', type: 'text' },
            { label: 'Profession', name: 'profession', type: 'text' }
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-gray-300 mb-1">{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                value={(formData as any)[field.name]}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
