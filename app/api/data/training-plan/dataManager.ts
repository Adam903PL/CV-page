import { TrainingPlan, trainingPlans } from './trainingPlan';
import { v4 as uuidv4 } from 'uuid';

export class DataManager {

  static getAllTrainingPlans(): TrainingPlan[] {
    return [...trainingPlans];
  }


  static getTrainingPlanById(id: string): TrainingPlan | undefined {
    return trainingPlans.find(plan => plan.id === id);
  }


  static addTrainingPlan(planData: Omit<TrainingPlan, 'id' | 'createdAt' | 'updatedAt'>): TrainingPlan {
    const newPlan: TrainingPlan = {
      ...planData,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    trainingPlans.push(newPlan);
    return newPlan;
  }


  static updateTrainingPlan(id: string, planData: Partial<TrainingPlan>): TrainingPlan | null {
    const index = trainingPlans.findIndex(plan => plan.id === id);
    if (index === -1) return null;
    
    const updatedPlan = {
      ...trainingPlans[index],
      ...planData,
      updatedAt: new Date().toISOString()
    };
    
    trainingPlans[index] = updatedPlan;
    return updatedPlan;
  }

  static deleteTrainingPlan(id: string): boolean {
    const initialLength = trainingPlans.length;
    const index = trainingPlans.findIndex(plan => plan.id === id);
    if (index === -1) return false;
    
    trainingPlans.splice(index, 1);
    return trainingPlans.length < initialLength;
  }

  // 
  static patchTrainingPlan(id: string, planData: Partial<TrainingPlan>): TrainingPlan | null {
    const index = trainingPlans.findIndex(plan => plan.id === id);
    if (index === -1) return null;
    
    const updatedPlan = {
      ...trainingPlans[index],
      ...planData,
      updatedAt: new Date().toISOString()
    };
    
    trainingPlans[index] = updatedPlan;
    return updatedPlan;
  }
}
