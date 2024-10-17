import React from 'react';
import NoteCard from './NoteCard';

type Note = {
  id: number;
  title: string;
  content: string;
  category: string;
};

type NoteListProps = {
  notes: Note[]; // Liste des notes
};

export default function NoteList({ notes }: NoteListProps) {
  if (!Array.isArray(notes) || notes.length === 0) {
    return <p className="text-gray-500 text-center">Aucune note disponible. Commencez par en créer une !</p>;
  }

  if (notes.length === 0) {
    return <p className="text-gray-500 text-center">Aucune note disponible. Commencez par en créer une !</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {notes.map((note) => (
        <NoteCard key={note.id} id={note.id} title={note.title} content={note.content} />
      ))}
    </div>
  );
}



