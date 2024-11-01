import { Option } from '../../helpers';

export interface TSSSample {
  planned: number;
  actual: number;
  method: string;
  intensity_factor_planned: Option<number>;
  intensity_factor_actual: Option<number>;
  normalized_power_watts: Option<number>;
}
