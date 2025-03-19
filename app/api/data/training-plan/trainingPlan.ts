export interface Exercise {
    id: string;
    name: string;
    sets: number;
    reps: number;
    weight?: number;
    duration?: number;
    notes?: string;
  }
  
  export interface TrainingDay {
    id: string;
    name: string;
    dayOfWeek: number;
    exercises: Exercise[];
  }
  
  export interface TrainingPlan {
    id: string;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    days: TrainingDay[];
    authorId: string;
    isPublic: boolean;
  }
  
  // Przykładowe dane
  const trainingPlans: TrainingPlan[] = [
    {
      id: "1",
      name: "Plan Full Body",
      description: "Pełny trening ciała 3 razy w tygodniu",
      createdAt: "2025-03-15T12:00:00Z",
      updatedAt: "2025-03-15T12:00:00Z",
      authorId: "user1",
      isPublic: true,
      days: [
        {
          id: "day1",
          name: "Dzień 1 - Poniedziałek",
          dayOfWeek: 1,
          exercises: [
            {
              id: "ex1",
              name: "Przysiad",
              sets: 4,
              reps: 8,
              weight: 100,
              notes: "Pełny zakres ruchu"
            },
            {
              id: "ex2",
              name: "Wyciskanie ławki",
              sets: 4,
              reps: 8,
              weight: 80,
              notes: "Średni chwyt"
            }
          ]
        },
        {
          id: "day2",
          name: "Dzień 2 - Środa",
          dayOfWeek: 3,
          exercises: [
            {
              id: "ex3",
              name: "Martwy ciąg",
              sets: 4,
              reps: 6,
              weight: 120,
              notes: "Prawidłowa technika"
            },
            {
              id: "ex4",
              name: "Podciąganie",
              sets: 3,
              reps: 8,
              notes: "Szeroki chwyt"
            }
          ]
        }
      ]
    }
  ];
  
  export { trainingPlans };
  