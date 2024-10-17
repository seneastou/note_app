'use client';
import React, { useState } from 'react';
import useNotes from '@/hooks/useNotes';
import MarkdownViewer from '@/components/markdown/MarkdownViewer';
import NoteForm from '@/components/note/NoteForm';
import { useParams } from 'next/navigation';

export default function NoteDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const { getNoteById, updateNote } = useNotes();
  const note = getNoteById(Number(id));
  const [editing, setEditing] = useState(false); // État pour basculer entre l'affichage et l'édition

  const handleNoteUpdate = (data: any) => {
    updateNote(Number(id), data);
    setEditing(false); // Sort du mode édition après la mise à jour
  };

  const handleCancelEdit = () => {
    setEditing(false); // Annule l'édition et retourne à l'affichage de la note
  };

  if (!note) return <p className="text-center text-red-500">Note introuvable</p>;

  return (
    <main  className="bg-[url('/image/wave.jpg')] bg-cover bg-center bg-no-repeat h-screen">
    <div className="flex justify-center items-center min-h-screen py-8">
      {/* Boîte centrée avec une largeur limitée */}
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8">
        {!editing ? (
          <div>
            {/* Titre de la note */}
            <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center">{note.title}</h1>

            {/* Contenu Markdown de la note */}
            <div className="text-gray-700 p-4 rounded-md mb-6">
              <MarkdownViewer content={note.content} />
            </div>

            {/* Bouton pour modifier la note */}
            <div className="flex justify-end">
              <button
                onClick={() => setEditing(true)} // Passe en mode édition
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Modifier la note
              </button>
            </div>
          </div>
        ) : (
          // Formulaire pour modifier la note avec le bouton "Annuler"
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Modifier la note</h2>
            <NoteForm
              onSubmit={handleNoteUpdate}
              initialData={note}
              categories={[]} // Passe les catégories disponibles
              addCategory={() => {}} // Option pour ajouter une catégorie (désactivée ici)
            />
            <div className="flex justify-between mt-4">
              {/* Bouton Annuler */}
              <button
                onClick={handleCancelEdit}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400"
              >
                Annuler
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
    </main>
  );
}

