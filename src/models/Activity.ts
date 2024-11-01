import { ActivityType } from '../enums/ActivityTypes';
import { UploadType } from '../enums/UploadType';
import { Option } from '../helpers';
import { ActivityLevelSample } from './samples/ActivityLevelSample';
import { CadenceSample } from './samples/CadenceSample';
import { DistanceSample } from './samples/DistanceSample';
import { ElevationSample } from './samples/ElevationSample';
import { FloorsClimbedSample } from './samples/FloorsClimbedSample';
import { HeartRateDataSample } from './samples/HeartRateDataSample';
import { HeartRateVariabilityDataSampleRMSSD } from './samples/HeartRateVariabilityDataSampleRMSSD';
import { HeartRateVariabilityDataSampleSDNN } from './samples/HeartRateVariabilityDataSampleSDNN';
import { HeartRateZoneData } from './samples/HeartRateZoneData';
import { LapSample } from './samples/LapSample';
import { METSample } from './samples/METSample';
import { OtherDeviceData } from './samples/OtherDeviceData';
import { OxygenSaturationSample } from './samples/OxygenSaturationSample';
import { PositionSample } from './samples/PositionSample';
import { PowerSample } from './samples/PowerSample';
import { StepSample } from './samples/StepSample';
import { SpeedSample } from './samples/SpeedSample';
import { TSSSample } from './samples/TSSSample';
import { Vo2MaxSample } from './samples/Vo2MaxSample';

export interface Activity {
  movement_data?: {
    normalized_speed_meters_per_second?: Option<number>;
    max_cadence_rpm?: Option<number>;
    avg_speed_meters_per_second?: Option<number>;
    avg_pace_minutes_per_kilometer?: Option<number>;
    max_velocity_meters_per_second?: Option<number>;
    max_pace_minutes_per_kilometer?: Option<number>;
    max_torque_newton_meters?: Option<number>;
    avg_cadence_rpm?: Option<number>;
    avg_velocity_meters_per_second?: Option<number>;
    avg_torque_newton_meters?: Option<number>;
    cadence_samples?: Array<CadenceSample>;
    speed_samples?: Array<SpeedSample>;
    max_speed_meters_per_second?: Option<number>;
  };
  power_data?: {
    max_watts?: Option<number>;
    avg_watts?: Option<number>;
    power_samples?: Array<PowerSample>;
  };
  position_data?: {
    position_samples?: Array<PositionSample>;
    center_pos_lat_lng_deg?: [number, number];
    start_pos_lat_lng_deg?: [number, number];
    end_pos_lat_lng_deg?: [number, number];
  };
  oxygen_data?: {
    saturation_samples?: Array<OxygenSaturationSample>;
    avg_saturation_percentage?: Option<number>;
    vo2_samples?: Array<Vo2MaxSample>;
    vo2max_ml_per_min_per_kg?: Option<number>;
  };
  metadata: {
    name?: Option<string>;
    summary_id?: Option<string>;
    country?: Option<string>;
    state?: Option<string>;
    upload_type?: UploadType;
    end_time: string;
    city?: Option<string>;
    type: Option<ActivityType>;
    start_time: string;
  };
  TSS_data?: {
    TSS_samples?: Array<TSSSample>;
  };
  device_data: {
    name?: Option<string>;
    other_devices?: Array<OtherDeviceData>;
    hardware_version?: Option<string>;
    manufacturer?: Option<string>;
    software_version?: Option<string>;
    activation_timestamp?: Option<string>;
    serial_number?: Option<string>;
  };
  distance_data?: {
    summary?: {
      swimming?: {
        num_strokes?: Option<number>;
        num_laps?: Option<number>;
        pool_length_meters?: Option<number>;
      };
      floors_climbed?: number;
      elevation?: {
        loss_actual_meters?: Option<number>;
        min_meters?: Option<number>;
        avg_meters?: Option<number>;
        gain_actual_meters?: Option<number>;
        max_meters?: Option<number>;
        gain_planned_meters?: Option<number>;
      };
      steps?: Option<number>;
      distance_meters?: Option<number>;
    };
    detailed?: {
      step_samples?: Array<StepSample>;
      distance_samples?: Array<DistanceSample>;
      elevation_samples?: Array<ElevationSample>;
      floors_climbed_samples?: Array<FloorsClimbedSample>;
    };
  };
  calories_data?: {
    net_intake_calories?: Option<number>;
    BMR_calories?: Option<number>;
    total_burned_calories?: Option<number>;
    net_activity_calories?: Option<number>;
  };
  lap_data?: {
    laps?: Array<LapSample>;
  };
  MET_data?: {
    MET_samples?: Array<METSample>;
    num_low_intensity_minutes?: Option<number>;
    num_high_intensity_minutes?: Option<number>;
    num_inactive_minutes?: Option<number>;
    num_moderate_intensity_minutes?: Option<number>;
    avg_level?: Option<number>;
  };
  heart_rate_data?: {
    summary?: {
      max_hr_bpm?: Option<number>;
      resting_hr_bpm?: Option<number>;
      avg_hrv_rmssd?: Option<number>;
      min_hr_bpm?: Option<number>;
      user_max_hr_bpm?: Option<number>;
      avg_hrv_sdnn?: Option<number>;
      avg_hr_bpm?: Option<number>;
      hr_zone_data?: Array<HeartRateZoneData>;
    };
    detailed?: {
      hr_samples?: Array<HeartRateDataSample>;
      hrv_samples_sdnn?: Array<HeartRateVariabilityDataSampleSDNN>;
      hrv_samples_rmssd?: Array<HeartRateVariabilityDataSampleRMSSD>;
    };
  };
  active_durations_data?: {
    activity_seconds?: Option<number>;
    rest_seconds?: Option<number>;
    low_intensity_seconds?: Option<number>;
    activity_levels_samples?: Array<ActivityLevelSample>;
    vigorous_intensity_seconds?: Option<number>;
    num_continuous_inactive_periods?: Option<number>;
    inactivity_seconds?: Option<number>;
    moderate_intensity_seconds?: Option<number>;
  };
  polyline_map_data?: {
    summary_polyline?: Option<string>;
  };
  strain_data?: {
    strain_level?: Option<number>;
  };
  work_data?: {
    work_kilojoules?: Option<number>;
  };
  energy_data?: {
    energy_kilojoules?: Option<number>;
    energy_planned_kilojoules?: Option<number>;
  };
}
