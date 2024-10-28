'use client';
import { useState, useEffect } from 'react';

interface Note {
  id: number;
  title: string;
  content: string;
  category: string;
}

export default function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fonction pour charger les notes à partir de l'API
  const fetchNotes = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/notes');
      const data = await res.json();
      setNotes(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des notes', error);
    }
  };

  // Fonction pour charger les catégories à partir de l'API
  const fetchCategories = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/categories');
      const data = await res.json();
      setCategories(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des catégories', error);
    }
  };

  // Ajouter une nouvelle note via l'API
  const addNote = async (note: Omit<Note, 'id'>) => {
    try {
      const res = await fetch('http://localhost:3000/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(note),
      });
      const newNote = await res.json();
      setNotes([...notes, newNote]); // Ajoute la note à la liste
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la note', error);
    }
  };

  // Ajouter une nouvelle catégorie via l'API
  const addCategory = async (category: string) => {
    try {
      const res = await fetch('http://localhost:3000/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ category }),
      });
      const newCategory = await res.json();
      setCategories([...categories, newCategory.category]); // Ajoute la catégorie à la liste
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la catégorie', error);
    }
  };

  // Obtenir une note par ID
  const getNoteById = (id: number) => {
    return notes.find((note) => note.id === id);
  };

  // Mettre à jour une note via l'API
  const updateNote = async (id: number, updatedNote: Partial<Note>) => {
    try {
      const res = await fetch(`http://localhost:3000/api/notes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedNote),
      });
  
      if (res.ok) {
        setNotes((prevNotes) =>
          prevNotes.map((note) => (note.id === id ? { ...note, ...updatedNote } : note))
        );
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la note", error);
    }
  };
    
  // supprimer une note via l'API

  const deleteNote = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:3000/api/notes/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        setNotes(notes.filter((note) => note.id !== id));
      }
    } catch (error) {
      console.error('Erreur lors de la suppression de la note', error);
    }
  }

  // Filtrer les notes par catégorie
  const filterByCategory = (category: string) => {
    if (!category) return notes;
    return notes.filter((note) => note.category === category);
  };

  // Charger les données lors du premier rendu
  useEffect(() => {
    const fetchData = async () => {
      await fetchNotes();
      await fetchCategories();
      setLoading(false);
    };
    fetchData();
  }, []);

  return {
    notes,
    categories,
    loading,
    addNote,
    addCategory,
    getNoteById,
    updateNote,
    filterByCategory,
    deleteNote,
  };
}
