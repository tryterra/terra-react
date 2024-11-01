import { Option } from '../../helpers';

export interface CalorieSample {
  timestamp: string;
  calories: number;
  timer_duration_seconds: Option<number>;
}
