# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).


## 0.7.0

### Changed
- Updated to TerraiOS 1.9.2, from 1.7.5. This is a larger native iOS jump than usual; the
  notes below cover everything in between. The Samsung Android SDK is unchanged.

### Added
- Health observation data type — raw HealthKit sample push.

### Fixed
- Daily totals for samples that span midnight. A step, distance or floor sample that began
  before midnight and ended after it was split across both days, so neither day reported it
  in full. It is now counted whole in the day it started. **Daily totals for affected days
  will increase.**
- Days where another app writes a whole-day summary. A single HealthKit sample covering the
  entire day suppressed the individual samples recorded around it — a day of detail could
  arrive as one entry whose value exceeded the day's own total. Detailed samples are now
  kept and the roll-up discarded. **`floors_climbed_samples` detail changes as a result.**
- A single change in HealthKit could produce many identical payloads. Repeats are now
  suppressed.
- SDK initialisation no longer stalls if a HealthKit callback is dropped, successful
  initialisation callbacks are no longer lost, and HealthKit authorisation failures are
  returned to the caller instead of being swallowed.
- HealthKit is no longer read while the device is locked.
- Workouts: per-lap event type and measurement system, stricter swim bounds, and lap end
  timestamps are now included.
- Background activity pushes no longer include sources the user has excluded.
- A crash in HealthKit unit conversion that could not be caught by the host app.
- Corrected iOS 14.0 availability for six symptom types.
- Relaxed the wrist-temperature query so readings are no longer missed.

### Upgrade note
- **Planned workout backend sync is now enabled by default.** If you do not use planned
  workouts, no action is needed; if you were relying on it being off, set it explicitly.

## 0.6.6

### Fixed
- Bump Android SDK (Samsung-direct) to 0.0.13 — fixes Samsung-direct background sync silently stopping on devices where the Samsung Health bind is slow to warm up (the schedulers no longer abort the sync on a slow bind). Supersedes 0.6.5 (Android SDK 0.0.12).

## 0.6.3

### Changed
- Bump iOS SDK to 1.7.5

## 0.6.2

### Changed
- Bump iOS SDK to 1.7.4

## 0.6.1

### Changed
- Bump iOS SDK to 1.7.1
- Bump Android SDK to 0.0.10

## 0.6.0

### Changed
- Bump iOS SDK to 1.7.0
  - Uses Swift 6
  - Includes meals for nutritional data

## 0.5.6

### Changed
- Bump iOS SDK to 1.6.32
- Bump Android SDK to 0.0.9

## 0.5.5

### Changed
- Bump Android SDK to 0.0.7


## 0.5.3

### Changed
- Bump Android SDK to 0.0.4
- Bump iOS SDK to 1.6.29


## 0.5.2

### Changed
- Bump Android SDK to 0.0.2
  - Improves memory management for Health Connect integrations

## 0.5.1

### Changed
- Remove Info.plist fields from iOS Config on expo
- Remove intent filters from android manifest expo config 
  - Users may now directly add these under their expo app config


## 0.5.0

### Changed
- Bump Android Branch to use Android SDK (Samsung Data SDK) 0.0.1

## 0.4.5

### Changed
- Bump Android SDK to 0.2.17-beta
- Bump iOS SDK to 1.6.28
- Add missing Android Custom Permissions
- Improve Health Connect requests on memory

## 0.4.4

### Changed
- Update typings to use primatives instead of Object types
- Add return type to `checkAuth` function
- Add Expo support

## 0.4.3

### Changed
- Bump Android SDK to 0.2.16-beta
- Add Health Connect as a resource

## 0.4.2

### Changed
- Bump Android SDK to 0.2.15-beta
- Bump TerraiOS SDK to 1.6.27 (https://github.com/tryterra/TerraiOS/wiki/Change-Log)
- Resolve customPermissions crashing on Android due to invalid Permission passed

## 0.4.1

### Changed
- Update Android to use CompileSDK 34
- Bump Android SDK to 0.2.14-beta
- Bump TerraiOS SDK to 1.6.24 (https://github.com/tryterra/TerraiOS/wiki/Change-Log)
