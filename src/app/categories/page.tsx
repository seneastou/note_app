'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import NoteList from '@/components/note/NoteList';
import useNotes from '@/hooks/useNotes';

export default function CategoriesPage() {
  const { notes, filterByCategory } = useNotes();
  const [filteredNotes, setFilteredNotes] = useState(notes);
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get('category'); // Récupère la catégorie depuis l'URL

  // Filtrer les notes chaque fois que la catégorie sélectionnée change
  useEffect(() => {
    if (selectedCategory) {
      setFilteredNotes(filterByCategory(selectedCategory)); // Filtre les notes par catégorie
    } else {
      setFilteredNotes(notes); // Montre toutes les notes si aucune catégorie n'est sélectionnée
    }
  }, [selectedCategory, notes]);

  return (
    <main className="bg-[url('/image/wave.jpg')] bg-cover bg-center bg-no-repeat h-screen">
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold text-white mb-6 text-center">Notes par Catégorie</h1>

      {/* Liste des notes filtrées */}
      <div>
        <h2 className="text-2xl font-semibold text-white mb-4">Notes</h2>
        {filteredNotes.length > 0 ? (
          <NoteList notes={filteredNotes} />
        ) : (
          <p className="text-gray-500">Aucune note trouvée dans cette catégorie.</p>
        )}
      </div>
    </div>
    </main>
  );
}
