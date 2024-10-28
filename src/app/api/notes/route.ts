import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

// Chemin vers le fichier JSON contenant les notes
const notesFilePath = path.join(process.cwd(),'src', 'data', 'notes.json');

// Fonction pour lire les notes depuis le fichier JSON
async function readNotesFromFile() {
  try {
    const data = await fs.readFile(notesFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Erreur de lecture des notes:', error);
    return [];
  }
}

// Fonction pour écrire les notes dans le fichier JSON
async function writeNotesToFile(notes: any) {
  try {
    await fs.writeFile(notesFilePath, JSON.stringify(notes, null, 2), 'utf8');
  } catch (error) {
    console.error('Erreur d\'écriture des notes:', error);
  }
}

// Route pour gérer les POST (ajouter une nouvelle note)
export async function POST(req: Request) {
  try {
    const { title, content, category } = await req.json();
    if (!title || !content || !category) {
      return NextResponse.json({ message: 'Le titre, le contenu et la catégorie sont requis' }, { status: 400 });
    }

    const notes = await readNotesFromFile();
    const newNote = {
      id: notes.length ? notes[notes.length - 1].id + 1 : 1,
      title,
      content,
      category,
    };

    notes.push(newNote);
    await writeNotesToFile(notes);

    return NextResponse.json(newNote, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Erreur lors de l\'ajout de la note' }, { status: 500 });
  }
}

// Route pour récupérer toutes les notes (GET)
export async function GET() {
  try {
    const notes = await readNotesFromFile();
    return NextResponse.json(notes);
  } catch (error) {
    return NextResponse.json({ message: 'Erreur lors de la récupération des notes' }, { status: 500 });
  }
}

