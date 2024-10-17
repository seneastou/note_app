'use client';
import React from 'react';
import { useRouter } from 'next/navigation'; // Utilisé pour rediriger
import NoteForm from '@/components/note/NoteForm';
import NoteList from '@/components/note/NoteList';
import useNotes from '@/hooks/useNotes';

export default function Home() {
  const { notes, addNote, categories, addCategory } = useNotes(); // Assure-toi de récupérer addCategory
  const router = useRouter(); // Utilisation de useRouter pour rediriger

  const handleNoteSubmit = (data: any) => {
    addNote(data);
  };

  // Gestion de la redirection lorsque l'utilisateur sélectionne une catégorie
  const handleCategorySelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const category = event.target.value;
    if (category) {
      router.push(`/categories?category=${category}`); // Redirige vers la page des catégories avec le paramètre de catégorie
    }
  };

  return (
    <main  className="bg-[url('/image/wave.jpg')] bg-cover bg-center full-screen">
    <div className="container mx-auto px-4 py-8">
      {/* Formulaire pour ajouter une nouvelle note */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">My Notes App</h2>
        <NoteForm
          onSubmit={handleNoteSubmit}
          categories={categories} // Passe la liste des catégories disponibles
          addCategory={addCategory} // Utilise la fonction addCategory correctement définie
        />
      </div>

      {/* Filtrer les notes par catégorie */}
      <h2 className="text-xl font-semibold text-white mb-4">Filtrer par catégorie</h2>
      <div className="w-1/6"> {/* Définit la largeur du conteneur du champ */}
        <select
          onChange={handleCategorySelect} // Redirige l'utilisateur vers la page des catégories
          className="block w-full px-3 py-2 border text-gray-700 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="">Toutes les catégories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Liste des notes */}
      <div className='mt-3'>
        {notes.length > 0 ? (
          <NoteList notes={notes} />
        ) : (
          <p className="text-gray-500">Vous n'avez pas encore de notes. Commencez par en ajouter une !</p>
        )}
      </div>
    </div>
    </main>
  );
}
