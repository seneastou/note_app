'use client';
import React, { useState } from 'react';

type CategorySelectorProps = {
  categories: string[];
  onSelect: (category: string) => void;
  onCreate: (newCategory: string) => void;
};

export default function CategorySelector({ categories, onSelect, onCreate }: CategorySelectorProps) {
  const [newCategory, setNewCategory] = useState('');

  const handleAddCategory = () => {
    if (newCategory.trim() === '') return;
    onCreate(newCategory.trim()); // Ajoute une nouvelle catégorie
    setNewCategory(''); // Réinitialise le champ de catégorie
  };

  return (
    <div className="space-y-2">
      <select
        onChange={(e) => onSelect(e.target.value)} // Gère la sélection de la catégorie
        className="block w-full px-3 py-2 border text-gray-700 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      >
        <option value="">Toutes les catégories</option>
        {/* Vérification que categories est un tableau avant d'utiliser map */}
        {Array.isArray(categories) &&
          categories.length > 0 &&
          categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
        ))}
      </select>

      <div className="flex space-x-2">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="block w-full px-3 py-2 border border-gray-300 text-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Nouvelle catégorie"
        />
        <button
          type="button"
          onClick={handleAddCategory}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Ajouter
        </button>
      </div>
    </div>
  );
}
