import {
  TerraPlannedWorkout,
  PlannedWorkoutMetaData,
  PlannedWorkoutStep,
  PlannedWorkoutRepeatStep,
  PlannedWorkoutStepsUnion,
  PlannedWorkoutStepDurationUnion,
  RepsPlannedWorkoutStepDuration,
  HRPlannedWorkoutStepTarget,
  PlannedWorkoutStepDurationType,
  PlannedWorkoutStepTargetType,
} from 'terra-react';

// If your TerraActivityType enum is defined, import and use it.
// For this sample, we assume RUNNING = 1. Adjust to your actual values.
const RUNNING = 1;

export function generateSamplePlannedWorkout(): TerraPlannedWorkout {
  const metadata = new PlannedWorkoutMetaData({
    id: 'ceef601a-23e4-4393-8483-a9f6d37b0407',
    name: 'My Workout',
    description: 'This is a sample workout',
    type: RUNNING, // TerraActivityType.RUNNING
    planned_date: '2024-01-31T15:00:00+00:00',
    created_date: '2024-01-31T15:00:00+00:00',
  });

  return new TerraPlannedWorkout({
    steps: generatePlannedWorkoutSteps(),
    metadata,
  });
}

export function generatePlannedWorkoutStepDurations(): PlannedWorkoutStepDurationUnion[] {
  const durations: PlannedWorkoutStepDurationUnion[] = [];
  // mimic Dart's Random().nextInt(10) + 1
  const reps = Math.floor(Math.random() * 10) + 1;
  durations.push(
    new RepsPlannedWorkoutStepDuration({
      durationType: PlannedWorkoutStepDurationType.REPS,
      reps,
    })
  );
  return durations;
}

export function generatePlannedWorkoutStep(order: number): PlannedWorkoutStep {
  return new PlannedWorkoutStep({
    type: 0, // simple step
    order,
    durations: generatePlannedWorkoutStepDurations(),
    targets: [
      new HRPlannedWorkoutStepTarget({
        targetType: PlannedWorkoutStepTargetType.HEARTRATE,
        hrBpmHigh: 170,
      }),
    ],
  });
}

export function generatePlannedWorkoutRepeatStep(): PlannedWorkoutRepeatStep {
  return new PlannedWorkoutRepeatStep({
    type: 1, // repeat step
    order: 0,
    durations: generatePlannedWorkoutStepDurations(),
    targets: [
      new HRPlannedWorkoutStepTarget({
        targetType: PlannedWorkoutStepTargetType.HEARTRATE,
        hrBpmHigh: 170,
      }),
    ],
    steps: [generatePlannedWorkoutStep(1)],
  });
}

export function generatePlannedWorkoutSteps(): PlannedWorkoutStepsUnion[] {
  const steps: PlannedWorkoutStepsUnion[] = [];
  for (let i = 0; i < 1; i++) {
    steps.push(generatePlannedWorkoutStep(i));
  }
  steps.push(generatePlannedWorkoutRepeatStep());
  return steps;
}
