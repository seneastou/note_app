import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

// Chemin vers le fichier JSON contenant les catégories
const categoriesFilePath = path.join(process.cwd(),'src', 'data', 'categories.json');
console.log(categoriesFilePath);

// Fonction pour lire les catégories depuis le fichier JSON
async function readCategoriesFromFile() {
  try {
    const data = await fs.readFile(categoriesFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Erreur de lecture des catégories:', error);
    return [];
  }
}

// Fonction pour écrire les catégories dans le fichier JSON
async function writeCategoriesToFile(categories: any) {
  try {
    await fs.writeFile(categoriesFilePath, JSON.stringify(categories, null, 2), 'utf8');
  } catch (error) {
    console.error('Erreur d\'écriture des catégories:', error);
  }
}

// Route pour gérer les POST (ajouter une nouvelle catégorie)
export async function POST(req: Request) {
  try {
    const { category } = await req.json();
    if (!category) {
      return NextResponse.json({ message: 'La catégorie est requise' }, { status: 400 });
    }

    const categories = await readCategoriesFromFile();

    if (categories.includes(category)) {
      return NextResponse.json({ message: 'Cette catégorie existe déjà' }, { status: 400 });
    }

    categories.push(category);
    await writeCategoriesToFile(categories);

    return NextResponse.json({ category }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Erreur lors de l\'ajout de la catégorie' }, { status: 500 });
  }
}

// Route pour récupérer toutes les catégories (GET)
export async function GET() {
  try {
    const categories = await readCategoriesFromFile();
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json({ message: 'Erreur lors de la récupération des catégories' }, { status: 500 });
  }
}



