import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import CategorySelector from '@/components/category/CategorySelector';

// Validation avec Zod
const noteSchema = z.object({
  title: z.string().min(1, 'Le titre est requis'),
  content: z.string().min(1, 'Le contenu est requis'),
  category: z.string().min(1, 'La catégorie est requise'),
});

type NoteFormProps = {
  onSubmit: (data: { title: string; content: string; category: string }) => void;
  initialData?: { title: string; content: string; category: string };
  categories: string[];
  addCategory: (newCategory: string) => void;
};

export default function NoteForm({ onSubmit, initialData, categories, addCategory }: NoteFormProps) {
  const {
    register, // Ajoute l'enregistrement de "content"
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(noteSchema),
    defaultValues: initialData || { title: '', content: '', category: '' },
  });

  // Gestion de la sélection de catégorie
  const handleCategorySelect = (category: string) => {
    setValue('category', category, { shouldValidate: true });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-6 bg-white shadow rounded-md">
      {/* Champ Titre */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Titre</label>
        <input
          {...register('title')}
          className={`mt-1 block w-full px-3 py-2 border text-gray-700 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
            errors.title ? 'border-red-500' : ''
          }`}
        />
        {errors.title && <p className="mt-2 text-sm text-red-600">{errors.title.message}</p>}
      </div>

      {/* Champ Contenu */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Contenu</label>
        <textarea
          {...register('content')} // Utilisation de "register" pour gérer le champ "content"
          rows={4}
          className={`mt-1 block w-full px-3 py-2 border text-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
            errors.content ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Écris ton contenu ici..."
        />
        {errors.content && <p className="mt-2 text-sm text-red-600">{errors.content.message}</p>}
      </div>

      {/* Sélecteur de Catégorie */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Catégorie</label>
        <CategorySelector
          categories={categories}
          onSelect={handleCategorySelect}
          onCreate={addCategory}
        />
        {errors.category && <p className="mt-2 text-sm text-red-600">{errors.category.message}</p>}
      </div>

      {/* Bouton de soumission */}
      <div className="text-right">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? 'Sauvegarde en cours...' : 'Sauvegarder'}
        </button>
      </div>
    </form>
  );
}
