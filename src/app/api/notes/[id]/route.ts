import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const notesFilePath = path.join(process.cwd(), 'src', 'data', 'notes.json');

async function readNotesFromFile() {
  try {
    const data = await fs.readFile(notesFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Erreur de lecture des notes:', error);
    return [];
  }
}

async function writeNotesToFile(notes: any) {
  try {
    await fs.writeFile(notesFilePath, JSON.stringify(notes, null, 2), 'utf8');
  } catch (error) {
    console.error('Erreur d\'écriture des notes:', error);
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const { title, content, category } = await req.json();
    const id = Number(params.id);

    if (!title || !content || !category) {
      return NextResponse.json({ message: 'Le titre, le contenu et la catégorie sont requis' }, { status: 400 });
    }

    const notes = await readNotesFromFile();
    const noteIndex = notes.findIndex((note: any) => note.id === id);

    if (noteIndex === -1) {
      return NextResponse.json({ message: 'Note introuvable' }, { status: 404 });
    }

    notes[noteIndex] = { id, title, content, category };
    await writeNotesToFile(notes);

    return NextResponse.json(notes[noteIndex]);
  } catch (error) {
    return NextResponse.json({ message: 'Erreur lors de la mise à jour de la note' }, { status: 500 });
  }
}

// Route pour supprimer une note (DELETE)

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id);

    const notes = await readNotesFromFile();
    const filteredNotes = notes.filter((note: any) => note.id !== id);

    if (notes.length === filteredNotes.length) {
      return NextResponse.json({ message: 'Note introuvable' }, { status: 404 });
    }

    await writeNotesToFile(filteredNotes);

    return NextResponse.json({ message: 'Note supprimée avec succès' });
  } catch (error) {
    return NextResponse.json({ message: 'Erreur lors de la suppression de la note' }, { status: 500 });
  }
}