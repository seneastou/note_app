import React from 'react';
import Link from 'next/link';

type NoteCardProps = {
  id: number; // Ajout de l'ID
  title: string;
  content: string;
};

export default function NoteCard({ id, title, content }: NoteCardProps) {
  return (
    
    <Link href={`/notes/${id}`}>
      <div className="bg-white shadow-md rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="text-gray-700 mt-2">{content.substring(0, 100)}...</p>
      </div>
    </Link>
   
    
  );
}







