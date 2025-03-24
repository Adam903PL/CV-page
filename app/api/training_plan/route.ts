import { NextRequest, NextResponse } from 'next/server';
import { DataManager } from '../data/training-plan/dataManager';

export async function GET(request: NextRequest) {
  // 
  const url = new URL(request.url);
  const id = url.searchParams.get('id');
  
  if (id) {
    // Pobieranie konkretnego planu treningowego
    const plan = DataManager.getTrainingPlanById(id);
    
    if (!plan) {
      return NextResponse.json(
        { error: 'Plan treningowy nie został znaleziony' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(plan);
  } else {
    // Pobieranie wszystkich planów treningowych
    const plans = DataManager.getAllTrainingPlans();
    return NextResponse.json(plans);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Walidacja danych
    if (!body.name || !body.authorId) {
      return NextResponse.json(
        { error: 'Brakuje wymaganych pól' },
        { status: 400 }
      );
    }
    
    const newPlan = DataManager.addTrainingPlan(body);
    return NextResponse.json(newPlan, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Nieprawidłowe dane' },
      { status: 400 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'Brak ID planu treningowego' },
        { status: 400 }
      );
    }
    
    const body = await request.json();
    
    // Walidacja danych
    if (!body.name || !body.authorId) {
      return NextResponse.json(
        { error: 'Brakuje wymaganych pól' },
        { status: 400 }
      );
    }
    
    const updatedPlan = DataManager.updateTrainingPlan(id, body);
    
    if (!updatedPlan) {
      return NextResponse.json(
        { error: 'Plan treningowy nie został znaleziony' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(updatedPlan);
  } catch (error) {
    return NextResponse.json(
      { error: 'Nieprawidłowe dane' },
      { status: 400 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'Brak ID planu treningowego' },
        { status: 400 }
      );
    }
    
    const body = await request.json();
    const patchedPlan = DataManager.patchTrainingPlan(id, body);
    
    if (!patchedPlan) {
      return NextResponse.json(
        { error: 'Plan treningowy nie został znaleziony' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(patchedPlan);
  } catch (error) {
    return NextResponse.json(
      { error: 'Nieprawidłowe dane' },
      { status: 400 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const url = new URL(request.url);
  const id = url.searchParams.get('id');
  
  if (!id) {
    return NextResponse.json(
      { error: 'Brak ID planu treningowego' },
      { status: 400 }
    );
  }
  
  const isDeleted = DataManager.deleteTrainingPlan(id);
  
  if (!isDeleted) {
    return NextResponse.json(
      { error: 'Plan treningowy nie został znaleziony' },
      { status: 404 }
    );
  }
  
  return NextResponse.json({ success: true });
}