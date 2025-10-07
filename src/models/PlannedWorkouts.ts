import { ActivityType } from 'src/enums/ActivityTypes';

// ===== Enums (numeric) =====

export enum PlannedWorkoutStepDurationType {
  TIME = 0,
  POWERGREATERTHAN = 1,
  POWERLESSTHAN = 2,
  FIXEDREST = 3,
  CALORIES = 4,
  HRGREATERTHAN = 5,
  REPS = 6,
  HRLESSTHAN = 7,
  DISTANCEMETERS = 8,
  STEPS = 9,
}

export enum PlannedWorkoutStepTargetType {
  CADENCE = 0,
  HEARTRATE = 1,
  POWER = 2,
  SPEED = 3,
  PACE = 4,
  TSS = 5,
  IF = 6,
  REPETITION = 7,
  SWIMSTROKE = 8,
}

// ===== Base contracts =====

export interface Jsonable<T = any> {
  toJson(): T;
}

export interface PlannedWorkoutSteps extends Jsonable {}

export interface PlannedWorkoutStepDuration extends Jsonable {
  duration_type: number;
}

export interface PlannedWorkoutStepTarget extends Jsonable {
  target_type: number;
}

// ===== Duration Variants =====

export class TimePlannedWorkoutStepDuration
  implements PlannedWorkoutStepDuration
{
  duration_type: number;
  seconds?: number | null;

  constructor(
    args:
      | {
          durationType?: PlannedWorkoutStepDurationType;
          seconds?: number | null;
        }
      | { duration_type: number; seconds?: number | null }
  ) {
    if ('duration_type' in args) {
      this.duration_type = args.duration_type;
      this.seconds = args.seconds ?? null;
    } else {
      this.duration_type =
        args.durationType ?? PlannedWorkoutStepDurationType.TIME;
      this.seconds = args.seconds ?? null;
    }
  }

  static fromJson(json: any): TimePlannedWorkoutStepDuration {
    return new TimePlannedWorkoutStepDuration({
      duration_type: json['duration_type'],
      seconds: json['seconds'] ?? null,
    });
  }

  toJson() {
    return {
      duration_type: this.duration_type,
      seconds: this.seconds ?? null,
    };
  }
}

export class PowerAbovePlannedWorkoutStepDuration
  implements PlannedWorkoutStepDuration
{
  duration_type: number;
  power_above_watts?: number | null;

  constructor(
    args:
      | {
          durationType?: PlannedWorkoutStepDurationType;
          powerAboveWatts?: number | null;
        }
      | { duration_type: number; power_above_watts?: number | null }
  ) {
    if ('duration_type' in args) {
      this.duration_type = args.duration_type;
      this.power_above_watts = args.power_above_watts ?? null;
    } else {
      this.duration_type =
        args.durationType ?? PlannedWorkoutStepDurationType.POWERGREATERTHAN;
      this.power_above_watts = args.powerAboveWatts ?? null;
    }
  }

  static fromJson(json: any): PowerAbovePlannedWorkoutStepDuration {
    return new PowerAbovePlannedWorkoutStepDuration({
      duration_type: json['duration_type'],
      power_above_watts: json['power_above_watts'] ?? null,
    });
  }

  toJson() {
    return {
      duration_type: this.duration_type,
      power_above_watts: this.power_above_watts ?? null,
    };
  }
}

export class PowerBelowPlannedWorkoutStepDuration
  implements PlannedWorkoutStepDuration
{
  duration_type: number;
  power_below_watts?: number | null;

  constructor(
    args:
      | {
          durationType?: PlannedWorkoutStepDurationType;
          powerBelowWatts?: number | null;
        }
      | { duration_type: number; power_below_watts?: number | null }
  ) {
    if ('duration_type' in args) {
      this.duration_type = args.duration_type;
      this.power_below_watts = args.power_below_watts ?? null;
    } else {
      this.duration_type =
        args.durationType ?? PlannedWorkoutStepDurationType.POWERLESSTHAN;
      this.power_below_watts = args.powerBelowWatts ?? null;
    }
  }

  static fromJson(json: any): PowerBelowPlannedWorkoutStepDuration {
    return new PowerBelowPlannedWorkoutStepDuration({
      duration_type: json['duration_type'],
      power_below_watts: json['power_below_watts'] ?? null,
    });
  }

  toJson() {
    return {
      duration_type: this.duration_type,
      power_below_watts: this.power_below_watts ?? null,
    };
  }
}

export class FixedRestPlannedWorkoutStepDuration
  implements PlannedWorkoutStepDuration
{
  duration_type: number;
  rest_seconds?: number | null;

  constructor(
    args:
      | {
          durationType?: PlannedWorkoutStepDurationType;
          restSeconds?: number | null;
        }
      | { duration_type: number; rest_seconds?: number | null }
  ) {
    if ('duration_type' in args) {
      this.duration_type = args.duration_type;
      this.rest_seconds = args.rest_seconds ?? null;
    } else {
      this.duration_type =
        args.durationType ?? PlannedWorkoutStepDurationType.FIXEDREST;
      this.rest_seconds = args.restSeconds ?? null;
    }
  }

  static fromJson(json: any): FixedRestPlannedWorkoutStepDuration {
    return new FixedRestPlannedWorkoutStepDuration({
      duration_type: json['duration_type'],
      rest_seconds: json['rest_seconds'] ?? null,
    });
  }

  toJson() {
    return {
      duration_type: this.duration_type,
      rest_seconds: this.rest_seconds ?? null,
    };
  }
}

export class CaloriesPlannedWorkoutStepDuration
  implements PlannedWorkoutStepDuration
{
  duration_type: number;
  calories?: number | null;

  constructor(
    args:
      | {
          durationType?: PlannedWorkoutStepDurationType;
          calories?: number | null;
        }
      | { duration_type: number; calories?: number | null }
  ) {
    if ('duration_type' in args) {
      this.duration_type = args.duration_type;
      this.calories = args.calories ?? null;
    } else {
      this.duration_type =
        args.durationType ?? PlannedWorkoutStepDurationType.CALORIES;
      this.calories = args.calories ?? null;
    }
  }

  static fromJson(json: any): CaloriesPlannedWorkoutStepDuration {
    return new CaloriesPlannedWorkoutStepDuration({
      duration_type: json['duration_type'],
      calories: json['calories'] ?? null,
    });
  }

  toJson() {
    return {
      duration_type: this.duration_type,
      calories: this.calories ?? null,
    };
  }
}

export class HRAbovePlannedWorkoutStepDuration
  implements PlannedWorkoutStepDuration
{
  duration_type: number;
  hr_above_bpm?: number | null;

  constructor(
    args:
      | {
          durationType?: PlannedWorkoutStepDurationType;
          hrAboveBpm?: number | null;
        }
      | { duration_type: number; hr_above_bpm?: number | null }
  ) {
    if ('duration_type' in args) {
      this.duration_type = args.duration_type;
      this.hr_above_bpm = args.hr_above_bpm ?? null;
    } else {
      this.duration_type =
        args.durationType ?? PlannedWorkoutStepDurationType.HRGREATERTHAN;
      this.hr_above_bpm = args.hrAboveBpm ?? null;
    }
  }

  static fromJson(json: any): HRAbovePlannedWorkoutStepDuration {
    return new HRAbovePlannedWorkoutStepDuration({
      duration_type: json['duration_type'],
      hr_above_bpm: json['hr_above_bpm'] ?? null,
    });
  }

  toJson() {
    return {
      duration_type: this.duration_type,
      hr_above_bpm: this.hr_above_bpm ?? null,
    };
  }
}

export class HRBelowPlannedWorkoutStepDuration
  implements PlannedWorkoutStepDuration
{
  duration_type: number;
  hr_below_bpm?: number | null;

  constructor(
    args:
      | {
          durationType?: PlannedWorkoutStepDurationType;
          hrBelowBpm?: number | null;
        }
      | { duration_type: number; hr_below_bpm?: number | null }
  ) {
    if ('duration_type' in args) {
      this.duration_type = args.duration_type;
      this.hr_below_bpm = args.hr_below_bpm ?? null;
    } else {
      this.duration_type =
        args.durationType ?? PlannedWorkoutStepDurationType.HRLESSTHAN;
      this.hr_below_bpm = args.hrBelowBpm ?? null;
    }
  }

  static fromJson(json: any): HRBelowPlannedWorkoutStepDuration {
    return new HRBelowPlannedWorkoutStepDuration({
      duration_type: json['duration_type'],
      hr_below_bpm: json['hr_below_bpm'] ?? null,
    });
  }

  toJson() {
    return {
      duration_type: this.duration_type,
      hr_below_bpm: this.hr_below_bpm ?? null,
    };
  }
}

export class DistancePlannedWorkoutStepDuration
  implements PlannedWorkoutStepDuration
{
  duration_type: number;
  distance_meters?: number | null;

  constructor(
    args:
      | {
          durationType?: PlannedWorkoutStepDurationType;
          distanceMeters?: number | null;
        }
      | { duration_type: number; distance_meters?: number | null }
  ) {
    if ('duration_type' in args) {
      this.duration_type = args.duration_type;
      this.distance_meters = args.distance_meters ?? null;
    } else {
      this.duration_type =
        args.durationType ?? PlannedWorkoutStepDurationType.DISTANCEMETERS;
      this.distance_meters = args.distanceMeters ?? null;
    }
  }

  static fromJson(json: any): DistancePlannedWorkoutStepDuration {
    return new DistancePlannedWorkoutStepDuration({
      duration_type: json['duration_type'],
      distance_meters: json['distance_meters'] ?? null,
    });
  }

  toJson() {
    return {
      duration_type: this.duration_type,
      distance_meters: this.distance_meters ?? null,
    };
  }
}

export class StepsPlannedWorkoutStepDuration
  implements PlannedWorkoutStepDuration
{
  duration_type: number;
  steps?: number | null;

  constructor(
    args:
      | { durationType?: PlannedWorkoutStepDurationType; steps?: number | null }
      | { duration_type: number; steps?: number | null }
  ) {
    if ('duration_type' in args) {
      this.duration_type = args.duration_type;
      this.steps = args.steps ?? null;
    } else {
      this.duration_type =
        args.durationType ?? PlannedWorkoutStepDurationType.STEPS;
      this.steps = args.steps ?? null;
    }
  }

  static fromJson(json: any): StepsPlannedWorkoutStepDuration {
    return new StepsPlannedWorkoutStepDuration({
      duration_type: json['duration_type'],
      steps: json['steps'] ?? null,
    });
  }

  toJson() {
    return {
      duration_type: this.duration_type,
      steps: this.steps ?? null,
    };
  }
}

export class RepsPlannedWorkoutStepDuration
  implements PlannedWorkoutStepDuration
{
  duration_type: number;
  reps?: number | null;

  constructor(
    args:
      | { durationType?: PlannedWorkoutStepDurationType; reps?: number | null }
      | { duration_type: number; reps?: number | null }
  ) {
    if ('duration_type' in args) {
      this.duration_type = args.duration_type;
      this.reps = args.reps ?? null;
    } else {
      this.duration_type =
        args.durationType ?? PlannedWorkoutStepDurationType.REPS;
      this.reps = args.reps ?? null;
    }
  }

  static fromJson(json: any): RepsPlannedWorkoutStepDuration {
    return new RepsPlannedWorkoutStepDuration({
      duration_type: json['duration_type'],
      reps: json['reps'] ?? null,
    });
  }

  toJson() {
    return {
      duration_type: this.duration_type,
      reps: this.reps ?? null,
    };
  }
}

// ===== Duration Union & Parser =====

export type PlannedWorkoutStepDurationUnion =
  | TimePlannedWorkoutStepDuration
  | PowerAbovePlannedWorkoutStepDuration
  | PowerBelowPlannedWorkoutStepDuration
  | FixedRestPlannedWorkoutStepDuration
  | CaloriesPlannedWorkoutStepDuration
  | HRAbovePlannedWorkoutStepDuration
  | HRBelowPlannedWorkoutStepDuration
  | DistancePlannedWorkoutStepDuration
  | StepsPlannedWorkoutStepDuration
  | RepsPlannedWorkoutStepDuration;

export function parseDuration(json: any): PlannedWorkoutStepDurationUnion {
  switch (json?.duration_type) {
    case PlannedWorkoutStepDurationType.TIME:
      return TimePlannedWorkoutStepDuration.fromJson(json);
    case PlannedWorkoutStepDurationType.POWERGREATERTHAN:
      return PowerAbovePlannedWorkoutStepDuration.fromJson(json);
    case PlannedWorkoutStepDurationType.POWERLESSTHAN:
      return PowerBelowPlannedWorkoutStepDuration.fromJson(json);
    case PlannedWorkoutStepDurationType.FIXEDREST:
      return FixedRestPlannedWorkoutStepDuration.fromJson(json);
    case PlannedWorkoutStepDurationType.CALORIES:
      return CaloriesPlannedWorkoutStepDuration.fromJson(json);
    case PlannedWorkoutStepDurationType.HRGREATERTHAN:
      return HRAbovePlannedWorkoutStepDuration.fromJson(json);
    case PlannedWorkoutStepDurationType.HRLESSTHAN:
      return HRBelowPlannedWorkoutStepDuration.fromJson(json);
    case PlannedWorkoutStepDurationType.DISTANCEMETERS:
      return DistancePlannedWorkoutStepDuration.fromJson(json);
    case PlannedWorkoutStepDurationType.STEPS:
      return StepsPlannedWorkoutStepDuration.fromJson(json);
    case PlannedWorkoutStepDurationType.REPS:
      return RepsPlannedWorkoutStepDuration.fromJson(json);
    default:
      return TimePlannedWorkoutStepDuration.fromJson(json);
  }
}

export class CadencePlannedWorkoutStepTarget
  implements PlannedWorkoutStepTarget
{
  target_type: number;
  cadence_high?: number | null;
  cadence_low?: number | null;
  cadence?: number | null;

  constructor(
    args:
      | {
          targetType?: PlannedWorkoutStepTargetType;
          cadenceHigh?: number | null;
          cadenceLow?: number | null;
          cadence?: number | null;
        }
      | {
          target_type: number;
          cadence_high?: number | null;
          cadence_low?: number | null;
          cadence?: number | null;
        }
  ) {
    if ('target_type' in args) {
      this.target_type = args.target_type;
      this.cadence_high = args.cadence_high ?? null;
      this.cadence_low = args.cadence_low ?? null;
      this.cadence = args.cadence ?? null;
    } else {
      this.target_type =
        args.targetType ?? PlannedWorkoutStepTargetType.CADENCE;
      this.cadence_high = args.cadenceHigh ?? null;
      this.cadence_low = args.cadenceLow ?? null;
      this.cadence = args.cadence ?? null;
    }
  }

  static fromJson(json: any): CadencePlannedWorkoutStepTarget {
    return new CadencePlannedWorkoutStepTarget({
      target_type: json['target_type'],
      cadence_high: json['cadence_high'] ?? null,
      cadence_low: json['cadence_low'] ?? null,
      cadence: json['cadence'] ?? null,
    });
  }

  toJson() {
    return {
      target_type: this.target_type,
      cadence_high: this.cadence_high ?? null,
      cadence_low: this.cadence_low ?? null,
      cadence: this.cadence ?? null,
    };
  }
}

export class HRPlannedWorkoutStepTarget implements PlannedWorkoutStepTarget {
  target_type: number;
  hr_bpm_high?: number | null;
  hr_bpm_low?: number | null;
  hr_percentage?: number | null;
  hr_percentage_low?: number | null;
  hr_percentage_high?: number | null;

  constructor(
    args:
      | {
          targetType?: PlannedWorkoutStepTargetType;
          hrBpmHigh?: number | null;
          hrBpmLow?: number | null;
          hrPercentage?: number | null;
          hrPercentageLow?: number | null;
          hrPercentageHigh?: number | null;
        }
      | {
          target_type: number;
          hr_bpm_high?: number | null;
          hr_bpm_low?: number | null;
          hr_percentage?: number | null;
          hr_percentage_low?: number | null;
          hr_percentage_high?: number | null;
        }
  ) {
    if ('target_type' in args) {
      this.target_type = args.target_type;
      this.hr_bpm_high = args.hr_bpm_high ?? null;
      this.hr_bpm_low = args.hr_bpm_low ?? null;
      this.hr_percentage = args.hr_percentage ?? null;
      this.hr_percentage_low = args.hr_percentage_low ?? null;
      this.hr_percentage_high = args.hr_percentage_high ?? null;
    } else {
      this.target_type =
        args.targetType ?? PlannedWorkoutStepTargetType.HEARTRATE;
      this.hr_bpm_high = args.hrBpmHigh ?? null;
      this.hr_bpm_low = args.hrBpmLow ?? null;
      this.hr_percentage = args.hrPercentage ?? null;
      this.hr_percentage_low = args.hrPercentageLow ?? null;
      this.hr_percentage_high = args.hrPercentageHigh ?? null;
    }
  }

  static fromJson(json: any): HRPlannedWorkoutStepTarget {
    return new HRPlannedWorkoutStepTarget({
      target_type: json['target_type'],
      hr_bpm_high: json['hr_bpm_high'] ?? null,
      hr_bpm_low: json['hr_bpm_low'] ?? null,
      hr_percentage: json['hr_percentage'] ?? null,
      hr_percentage_low: json['hr_percentage_low'] ?? null,
      hr_percentage_high: json['hr_percentage_high'] ?? null,
    });
  }

  toJson() {
    return {
      target_type: this.target_type,
      hr_bpm_high: this.hr_bpm_high ?? null,
      hr_bpm_low: this.hr_bpm_low ?? null,
      hr_percentage: this.hr_percentage ?? null,
      hr_percentage_low: this.hr_percentage_low ?? null,
      hr_percentage_high: this.hr_percentage_high ?? null,
    };
  }
}

export class PowerPlannedWorkoutStepTarget implements PlannedWorkoutStepTarget {
  target_type: number;
  power_watt_high?: number | null;
  power_watt_low?: number | null;
  power_watt?: number | null;
  power_percentage?: number | null;
  power_percentage_low?: number | null;
  power_percentage_high?: number | null;

  constructor(
    args:
      | {
          targetType?: PlannedWorkoutStepTargetType;
          powerWattHigh?: number | null;
          powerWattLow?: number | null;
          powerWatt?: number | null;
          powerPercentage?: number | null;
          powerPercentageLow?: number | null;
          powerPercentageHigh?: number | null;
        }
      | {
          target_type: number;
          power_watt_high?: number | null;
          power_watt_low?: number | null;
          power_watt?: number | null;
          power_percentage?: number | null;
          power_percentage_low?: number | null;
          power_percentage_high?: number | null;
        }
  ) {
    if ('target_type' in args) {
      this.target_type = args.target_type;
      this.power_watt_high = args.power_watt_high ?? null;
      this.power_watt_low = args.power_watt_low ?? null;
      this.power_watt = args.power_watt ?? null;
      this.power_percentage = args.power_percentage ?? null;
      this.power_percentage_low = args.power_percentage_low ?? null;
      this.power_percentage_high = args.power_percentage_high ?? null;
    } else {
      this.target_type = args.targetType ?? PlannedWorkoutStepTargetType.POWER;
      this.power_watt_high = args.powerWattHigh ?? null;
      this.power_watt_low = args.powerWattLow ?? null;
      this.power_watt = args.powerWatt ?? null;
      this.power_percentage = args.powerPercentage ?? null;
      this.power_percentage_low = args.powerPercentageLow ?? null;
      this.power_percentage_high = args.powerPercentageHigh ?? null;
    }
  }

  static fromJson(json: any): PowerPlannedWorkoutStepTarget {
    return new PowerPlannedWorkoutStepTarget({
      target_type: json['target_type'],
      power_watt_high: json['power_watt_high'] ?? null,
      power_watt_low: json['power_watt_low'] ?? null,
      power_watt: json['power_watt'] ?? null,
      power_percentage: json['power_percentage'] ?? null,
      power_percentage_low: json['power_percentage_low'] ?? null,
      power_percentage_high: json['power_percentage_high'] ?? null,
    });
  }

  toJson() {
    return {
      target_type: this.target_type,
      power_watt_high: this.power_watt_high ?? null,
      power_watt_low: this.power_watt_low ?? null,
      power_watt: this.power_watt ?? null,
      power_percentage: this.power_percentage ?? null,
      power_percentage_low: this.power_percentage_low ?? null,
      power_percentage_high: this.power_percentage_high ?? null,
    };
  }
}

export class SpeedPlannedWorkoutStepTarget implements PlannedWorkoutStepTarget {
  target_type: number;
  speed_meters_per_second?: number | null;
  speed_percentage?: number | null;
  speed_percentage_low?: number | null;
  speed_percentage_high?: number | null;

  constructor(
    args:
      | {
          targetType?: PlannedWorkoutStepTargetType;
          speedMetersPerSecond?: number | null;
          speedPercentage?: number | null;
          speedPercentageLow?: number | null;
          speedPercentageHigh?: number | null;
        }
      | {
          target_type: number;
          speed_meters_per_second?: number | null;
          speed_percentage?: number | null;
          speed_percentage_low?: number | null;
          speed_percentage_high?: number | null;
        }
  ) {
    if ('target_type' in args) {
      this.target_type = args.target_type;
      this.speed_meters_per_second = args.speed_meters_per_second ?? null;
      this.speed_percentage = args.speed_percentage ?? null;
      this.speed_percentage_low = args.speed_percentage_low ?? null;
      this.speed_percentage_high = args.speed_percentage_high ?? null;
    } else {
      this.target_type = args.targetType ?? PlannedWorkoutStepTargetType.SPEED;
      this.speed_meters_per_second = args.speedMetersPerSecond ?? null;
      this.speed_percentage = args.speedPercentage ?? null;
      this.speed_percentage_low = args.speedPercentageLow ?? null;
      this.speed_percentage_high = args.speedPercentageHigh ?? null;
    }
  }

  static fromJson(json: any): SpeedPlannedWorkoutStepTarget {
    return new SpeedPlannedWorkoutStepTarget({
      target_type: json['target_type'],
      speed_meters_per_second: json['speed_meters_per_second'] ?? null,
      speed_percentage: json['speed_percentage'] ?? null,
      speed_percentage_low: json['speed_percentage_low'] ?? null,
      speed_percentage_high: json['speed_percentage_high'] ?? null,
    });
  }

  toJson() {
    return {
      target_type: this.target_type,
      speed_meters_per_second: this.speed_meters_per_second ?? null,
      speed_percentage: this.speed_percentage ?? null,
      speed_percentage_low: this.speed_percentage_low ?? null,
      speed_percentage_high: this.speed_percentage_high ?? null,
    };
  }
}

export class PacePlannedWorkoutStepTarget implements PlannedWorkoutStepTarget {
  target_type: number;
  pace_minutes_per_kilometer?: number | null;

  constructor(
    args:
      | {
          targetType?: PlannedWorkoutStepTargetType;
          paceMinutesPerKilometer?: number | null;
        }
      | { target_type: number; pace_minutes_per_kilometer?: number | null }
  ) {
    if ('target_type' in args) {
      this.target_type = args.target_type;
      this.pace_minutes_per_kilometer = args.pace_minutes_per_kilometer ?? null;
    } else {
      this.target_type = args.targetType ?? PlannedWorkoutStepTargetType.PACE;
      this.pace_minutes_per_kilometer = args.paceMinutesPerKilometer ?? null;
    }
  }

  static fromJson(json: any): PacePlannedWorkoutStepTarget {
    return new PacePlannedWorkoutStepTarget({
      target_type: json['target_type'],
      pace_minutes_per_kilometer: json['pace_minutes_per_kilometer'] ?? null,
    });
  }

  toJson() {
    return {
      target_type: this.target_type,
      pace_minutes_per_kilometer: this.pace_minutes_per_kilometer ?? null,
    };
  }
}

export class TSSPlannedWorkoutStepTarget implements PlannedWorkoutStepTarget {
  target_type: number;
  tss?: number | null;

  constructor(
    args:
      | { targetType?: PlannedWorkoutStepTargetType; tss?: number | null }
      | { target_type: number; tss?: number | null }
  ) {
    if ('target_type' in args) {
      this.target_type = args.target_type;
      this.tss = args.tss ?? null;
    } else {
      this.target_type = args.targetType ?? PlannedWorkoutStepTargetType.TSS;
      this.tss = args.tss ?? null;
    }
  }

  static fromJson(json: any): TSSPlannedWorkoutStepTarget {
    return new TSSPlannedWorkoutStepTarget({
      target_type: json['target_type'],
      tss: json['tss'] ?? null,
    });
  }

  toJson() {
    return {
      target_type: this.target_type,
      tss: this.tss ?? null,
    };
  }
}

export class IFPlannedWorkoutStepTarget implements PlannedWorkoutStepTarget {
  target_type: number;
  if_high?: number | null;
  if_low?: number | null;

  constructor(
    args:
      | {
          targetType?: PlannedWorkoutStepTargetType;
          ifHigh?: number | null;
          ifLow?: number | null;
        }
      | { target_type: number; if_high?: number | null; if_low?: number | null }
  ) {
    if ('target_type' in args) {
      this.target_type = args.target_type;
      this.if_high = args.if_high ?? null;
      this.if_low = args.if_low ?? null;
    } else {
      this.target_type = args.targetType ?? PlannedWorkoutStepTargetType.IF;
      this.if_high = args.ifHigh ?? null;
      this.if_low = args.ifLow ?? null;
    }
  }

  static fromJson(json: any): IFPlannedWorkoutStepTarget {
    return new IFPlannedWorkoutStepTarget({
      target_type: json['target_type'],
      if_high: json['if_high'] ?? null,
      if_low: json['if_low'] ?? null,
    });
  }

  toJson() {
    return {
      target_type: this.target_type,
      if_high: this.if_high ?? null,
      if_low: this.if_low ?? null,
    };
  }
}

export class RepetitionPlannedWorkoutStepTarget
  implements PlannedWorkoutStepTarget
{
  target_type: number;
  repititions?: number | null;

  constructor(
    args:
      | {
          targetType?: PlannedWorkoutStepTargetType;
          repititions?: number | null;
        }
      | { target_type: number; repititions?: number | null }
  ) {
    if ('target_type' in args) {
      this.target_type = args.target_type;
      this.repititions = args.repititions ?? null;
    } else {
      this.target_type =
        args.targetType ?? PlannedWorkoutStepTargetType.REPETITION;
      this.repititions = args.repititions ?? null;
    }
  }

  static fromJson(json: any): RepetitionPlannedWorkoutStepTarget {
    return new RepetitionPlannedWorkoutStepTarget({
      target_type: json['target_type'],
      repititions: json['repititions'] ?? null,
    });
  }

  toJson() {
    return {
      target_type: this.target_type,
      repititions: this.repititions ?? null,
    };
  }
}

export class SwimStrokePlannedWorkoutStepTarget
  implements PlannedWorkoutStepTarget
{
  target_type: number;
  swim_strokes?: number | null;

  constructor(
    args:
      | {
          targetType?: PlannedWorkoutStepTargetType;
          swimStrokes?: number | null;
        }
      | { target_type: number; swim_strokes?: number | null }
  ) {
    if ('target_type' in args) {
      this.target_type = args.target_type;
      this.swim_strokes = args.swim_strokes ?? null;
    } else {
      this.target_type =
        args.targetType ?? PlannedWorkoutStepTargetType.SWIMSTROKE;
      this.swim_strokes = args.swimStrokes ?? null;
    }
  }

  static fromJson(json: any): SwimStrokePlannedWorkoutStepTarget {
    return new SwimStrokePlannedWorkoutStepTarget({
      target_type: json['target_type'],
      swim_strokes: json['swim_strokes'] ?? null,
    });
  }

  toJson() {
    return {
      target_type: this.target_type,
      swim_strokes: this.swim_strokes ?? null,
    };
  }
}

// Discriminated union for Targets
export type PlannedWorkoutStepTargetUnion =
  | CadencePlannedWorkoutStepTarget
  | HRPlannedWorkoutStepTarget
  | PowerPlannedWorkoutStepTarget
  | SpeedPlannedWorkoutStepTarget
  | PacePlannedWorkoutStepTarget
  | TSSPlannedWorkoutStepTarget
  | IFPlannedWorkoutStepTarget
  | RepetitionPlannedWorkoutStepTarget
  | SwimStrokePlannedWorkoutStepTarget;

export function parseTarget(json: any): PlannedWorkoutStepTargetUnion {
  switch (json?.target_type) {
    case PlannedWorkoutStepTargetType.CADENCE:
      return CadencePlannedWorkoutStepTarget.fromJson(json);
    case PlannedWorkoutStepTargetType.HEARTRATE:
      return HRPlannedWorkoutStepTarget.fromJson(json);
    case PlannedWorkoutStepTargetType.POWER:
      return PowerPlannedWorkoutStepTarget.fromJson(json);
    case PlannedWorkoutStepTargetType.SPEED:
      return SpeedPlannedWorkoutStepTarget.fromJson(json);
    case PlannedWorkoutStepTargetType.PACE:
      return PacePlannedWorkoutStepTarget.fromJson(json);
    case PlannedWorkoutStepTargetType.TSS:
      return TSSPlannedWorkoutStepTarget.fromJson(json);
    case PlannedWorkoutStepTargetType.IF:
      return IFPlannedWorkoutStepTarget.fromJson(json);
    case PlannedWorkoutStepTargetType.REPETITION:
      return RepetitionPlannedWorkoutStepTarget.fromJson(json);
    case PlannedWorkoutStepTargetType.SWIMSTROKE:
      return SwimStrokePlannedWorkoutStepTarget.fromJson(json);
    default:
      return CadencePlannedWorkoutStepTarget.fromJson(json);
  }
}

// ===== Steps =====

export class PlannedWorkoutStep implements PlannedWorkoutSteps {
  order?: number | null;
  type: number = 0; // simple step
  name?: string | null;
  description?: string | null;
  intensity?: number | null;
  durations?: PlannedWorkoutStepDurationUnion[] | null;
  targets?: PlannedWorkoutStepTargetUnion[] | null;

  constructor(args: {
    order?: number | null;
    type?: number;
    name?: string | null;
    description?: string | null;
    intensity?: number | null;
    durations?: PlannedWorkoutStepDurationUnion[] | null;
    targets?: PlannedWorkoutStepTargetUnion[] | null;
  }) {
    this.order = args.order ?? null;
    this.type = args.type ?? 0;
    this.name = args.name ?? null;
    this.description = args.description ?? null;
    this.intensity = args.intensity ?? null;
    this.durations = args.durations ?? null;
    this.targets = args.targets ?? null;
  }

  static fromJson(json: any): PlannedWorkoutStep {
    const durations = Array.isArray(json?.durations)
      ? json.durations.map(parseDuration)
      : null;
    const targets = Array.isArray(json?.targets)
      ? json.targets.map(parseTarget)
      : null;

    return new PlannedWorkoutStep({
      order: json['order'] ?? null,
      type: json['type'] ?? 0,
      name: json['name'] ?? null,
      description: json['description'] ?? null,
      intensity: json['intensity'] ?? null,
      durations,
      targets,
    });
  }

  toJson() {
    return {
      order: this.order ?? null,
      type: this.type,
      name: this.name ?? null,
      description: this.description ?? null,
      intensity: this.intensity ?? null,
      durations: this.durations?.map((d) => d.toJson()) ?? null,
      targets: this.targets?.map((t) => t.toJson()) ?? null,
    };
  }
}

export class PlannedWorkoutRepeatStep implements PlannedWorkoutSteps {
  order?: number | null;
  type: number = 1; // repeat step
  name?: string | null;
  description?: string | null;
  intensity?: number | null;
  durations?: PlannedWorkoutStepDurationUnion[] | null;
  targets?: PlannedWorkoutStepTargetUnion[] | null;
  steps?: PlannedWorkoutStep[] | null;

  constructor(args: {
    order?: number | null;
    type?: number;
    name?: string | null;
    description?: string | null;
    intensity?: number | null;
    durations?: PlannedWorkoutStepDurationUnion[] | null;
    targets?: PlannedWorkoutStepTargetUnion[] | null;
    steps?: PlannedWorkoutStep[] | null;
  }) {
    this.order = args.order ?? null;
    this.type = args.type ?? 1;
    this.name = args.name ?? null;
    this.description = args.description ?? null;
    this.intensity = args.intensity ?? null;
    this.durations = args.durations ?? null;
    this.targets = args.targets ?? null;
    this.steps = args.steps ?? null;
  }

  static fromJson(json: any): PlannedWorkoutRepeatStep {
    const durations = Array.isArray(json?.durations)
      ? json.durations.map(parseDuration)
      : null;
    const targets = Array.isArray(json?.targets)
      ? json.targets.map(parseTarget)
      : null;
    const steps = Array.isArray(json?.steps)
      ? json.steps.map(PlannedWorkoutStep.fromJson)
      : null;

    return new PlannedWorkoutRepeatStep({
      order: json['order'] ?? null,
      type: json['type'] ?? 1,
      name: json['name'] ?? null,
      description: json['description'] ?? null,
      intensity: json['intensity'] ?? null,
      durations,
      targets,
      steps,
    });
  }

  toJson() {
    return {
      order: this.order ?? null,
      type: this.type,
      name: this.name ?? null,
      description: this.description ?? null,
      intensity: this.intensity ?? null,
      durations: this.durations?.map((d) => d.toJson()) ?? null,
      targets: this.targets?.map((t) => t.toJson()) ?? null,
      steps: this.steps?.map((s) => s.toJson()) ?? null,
    };
  }
}

export type PlannedWorkoutStepsUnion =
  | PlannedWorkoutStep
  | PlannedWorkoutRepeatStep;

export function parseStep(json: any): PlannedWorkoutStepsUnion {
  return json?.type === 1
    ? PlannedWorkoutRepeatStep.fromJson(json)
    : PlannedWorkoutStep.fromJson(json);
}

// ===== Workout Metadata =====

export class PlannedWorkoutMetaData implements Jsonable {
  id: string;
  name: string;
  type: number;
  description: string;
  estimated_duration_seconds?: number | null;
  estimated_distance_meters?: number | null;
  estimated_calories?: number | null;
  estimated_elevation_gain_meters?: number | null;
  estimated_energy_kj?: number | null;
  estimated_tss?: number | null;
  estimated_if?: number | null;
  estimated_speed_meters_per_second?: number | null;
  estimated_tscore?: number | null;
  estimated_pace_minutes_per_kilometer?: number | null;
  provider?: string | null;
  created_date?: string | null;
  planned_date: string;
  pool_length_meters?: number | null;

  constructor(args: {
    id: string;
    name: string;
    type: number | ActivityType;
    description: string;
    estimated_duration_seconds?: number | null;
    estimated_distance_meters?: number | null;
    estimated_calories?: number | null;
    estimated_elevation_gain_meters?: number | null;
    estimated_energy_kj?: number | null;
    estimated_tss?: number | null;
    estimated_if?: number | null;
    estimated_speed_meters_per_second?: number | null;
    estimated_tscore?: number | null;
    estimated_pace_minutes_per_kilometer?: number | null;
    provider?: string | null;
    created_date?: string | null;
    planned_date: string;
    pool_length_meters?: number | null;
  }) {
    this.id = args.id;
    this.name = args.name;
    this.type =
      typeof args.type === 'number' ? args.type : (args.type as number);
    this.description = args.description;
    this.estimated_duration_seconds = args.estimated_duration_seconds ?? null;
    this.estimated_distance_meters = args.estimated_distance_meters ?? null;
    this.estimated_calories = args.estimated_calories ?? null;
    this.estimated_elevation_gain_meters =
      args.estimated_elevation_gain_meters ?? null;
    this.estimated_energy_kj = args.estimated_energy_kj ?? null;
    this.estimated_tss = args.estimated_tss ?? null;
    this.estimated_if = args.estimated_if ?? null;
    this.estimated_speed_meters_per_second =
      args.estimated_speed_meters_per_second ?? null;
    this.estimated_tscore = args.estimated_tscore ?? null;
    this.estimated_pace_minutes_per_kilometer =
      args.estimated_pace_minutes_per_kilometer ?? null;
    this.provider = args.provider ?? null;
    this.created_date = args.created_date ?? null;
    this.planned_date = args.planned_date;
    this.pool_length_meters = args.pool_length_meters ?? null;
  }

  static fromJson(json: any): PlannedWorkoutMetaData {
    return new PlannedWorkoutMetaData({
      id: json['id'],
      name: json['name'],
      type: json['type'],
      description: json['description'],
      estimated_duration_seconds: json['estimated_duration_seconds'] ?? null,
      estimated_distance_meters: json['estimated_distance_meters'] ?? null,
      estimated_calories: json['estimated_calories'] ?? null,
      estimated_elevation_gain_meters:
        json['estimated_elevation_gain_meters'] ?? null,
      estimated_energy_kj: json['estimated_energy_kj'] ?? null,
      estimated_tss: json['estimated_tss'] ?? null,
      estimated_if: json['estimated_if'] ?? null,
      estimated_speed_meters_per_second:
        json['estimated_speed_meters_per_second'] ?? null,
      estimated_tscore: json['estimated_tscore'] ?? null,
      estimated_pace_minutes_per_kilometer:
        json['estimated_pace_minutes_per_kilometer'] ?? null,
      provider: json['provider'] ?? null,
      created_date: json['created_date'] ?? null,
      planned_date: json['planned_date'],
      pool_length_meters: json['pool_length_meters'] ?? null,
    });
  }

  toJson() {
    return {
      id: this.id,
      name: this.name,
      type: this.type,
      description: this.description,
      estimated_duration_seconds: this.estimated_duration_seconds ?? null,
      estimated_distance_meters: this.estimated_distance_meters ?? null,
      estimated_calories: this.estimated_calories ?? null,
      estimated_elevation_gain_meters:
        this.estimated_elevation_gain_meters ?? null,
      estimated_energy_kj: this.estimated_energy_kj ?? null,
      estimated_tss: this.estimated_tss ?? null,
      estimated_if: this.estimated_if ?? null,
      estimated_speed_meters_per_second:
        this.estimated_speed_meters_per_second ?? null,
      estimated_tscore: this.estimated_tscore ?? null,
      estimated_pace_minutes_per_kilometer:
        this.estimated_pace_minutes_per_kilometer ?? null,
      provider: this.provider ?? null,
      created_date: this.created_date ?? null,
      planned_date: this.planned_date,
      pool_length_meters: this.pool_length_meters ?? null,
    };
  }
}

// ===== Top-level container =====

export class TerraPlannedWorkout implements Jsonable {
  steps?: PlannedWorkoutStepsUnion[] | null;
  metadata?: PlannedWorkoutMetaData | null;

  constructor(args: {
    steps?: PlannedWorkoutStepsUnion[] | null;
    metadata?: PlannedWorkoutMetaData | null;
  }) {
    this.steps = args.steps ?? null;
    this.metadata = args.metadata ?? null;
  }

  static fromJson(json: any): TerraPlannedWorkout {
    const steps = Array.isArray(json?.steps) ? json.steps.map(parseStep) : null;
    const metadata = json?.metadata
      ? PlannedWorkoutMetaData.fromJson(json.metadata)
      : null;
    return new TerraPlannedWorkout({ steps, metadata });
  }

  toJson() {
    return {
      steps: this.steps?.map((s) => s.toJson()) ?? null,
      metadata: this.metadata?.toJson() ?? null,
    };
  }
}
