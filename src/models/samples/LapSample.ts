import { StrokeType } from '../../enums/StrokeType';
import { Option } from '../../helpers';

export interface LapSample {
  start_time: string;
  distance_meters: Option<number>;
  calories: Option<number>;
  total_strokes: Option<number>;
  stroke_type: Option<StrokeType>;
  avg_speed_meters_per_second: Option<number>;
}
