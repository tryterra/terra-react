import { HeartRateZone } from '../../enums/HeartRateZone';
import { Option } from '../../helpers';

export interface HeartRateZoneData {
  zone: HeartRateZone;
  start_percentage: Option<number>;
  end_percentage: Option<number>;
  name: Option<string>;
  duration_seconds: Option<number>;
}
