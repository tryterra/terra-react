//
//  Created by Jaafar Rammal on 06/06/2022.
//

import Foundation
import TerraiOS
import HealthKit

@objc(TerraReact)
class TerraReact: NSObject {

    //  require init on main
    @objc
    static func requiresMainQueueSetup() -> Bool {
        return true
    }

    private func isoDate(from iso: String?) -> Date? {
        guard let iso else { return nil }
        let fmt = ISO8601DateFormatter()
        fmt.formatOptions = [.withInternetDateTime, .withFractionalSeconds]
        return fmt.date(from: iso)
    }

    private func jsonString(from value: Any) -> String {
        guard JSONSerialization.isValidJSONObject(value),
            let data = try? JSONSerialization.data(withJSONObject: value, options: []),
            let s = String(data: data, encoding: .utf8) else {
        return "[]"
        }
        return s
    }


    private func errorMessage(_ err: TerraError) -> String{
        switch(err){
            case .HealthKitUnavailable: return "Health Kit Unavailable"
            case .ServiceUnavailable: return "Service Unavailable"
            case .Unauthenticated: return "Unauthenticated"
            case .InvalidUserID: return "Invalid User ID"
            case .InvalidDevID: return "Invalid Dev ID"
            case .Forbidden: return "Forbidden"
            case .BadRequest: return "Bad Request"
            case .UnknownOpcode: return "Unknown Op Code"
            case .UnexpectedError: return "Unexpected Error"
            case .NFCError: return "NFC Error"
            case .SensorExpired: return "Sensor Expired"
            case .SensorReadingFailed: return "Sensor Reading Failed"
            case .NoInternet: return "No Internet"
            case .UserLimitsReached: return "User Limit Reached"
            case .IncorrectDevId: return "Incorrect Dev ID"
            case .InvalidToken: return "Invalid Token"
            case .HealthKitAuthorizationError: return "Health Kit Authorization Error"
            case .UnsupportedResource: return "Unsupported Resource"
            case .InvalidDateFormat: return "Invalid Date Format"
            case .PlannedWorkoutNotSupportedOnDevice: return "Planned workout not supported on device"
            case .PermissionsDenied: return "Permission denied"
            case .InvalidPostWorkoutFormat: return "Invalid Post workout format"
            case .PlannedWorkoutNotFound: return "PlannedWorkout Not Found"
            case .StartTimeCannotBeNil: return "Start time cannot be nil"
            case .EndTimeCannotBeNil: return "End time cannot be nil"
            case .SamplesDateOutOfRange: return "Sample contains time outside of range"
            case .InvalidDevice: return "Device data must contain at least one of: name, hardware_version, software_version, serial_number, and manufacturer"
            case .StartDateMustPrecedeEndDate: return "Start date must be before end date"
            default: "Unknown Error Type. Please contact dev@tryterra.co"
        }
        return ""
    }

    // terra instance managed
    private var terra: TerraManager?
    private var requestedReadPermissionKeys = TerraReact.allReadPermissionKeys
    private var requestedWritePermissionKeys = TerraReact.allWritePermissionKeys

    // connection type translate
    private func connectionParse(connection: String) -> Connections? {
        switch connection {
            case "APPLE_HEALTH":
                return Connections.APPLE_HEALTH
            case "FREESTYLE_LIBRE":
                return Connections.FREESTYLE_LIBRE
            default:
                print("Passed invalid connection")
        }
      return nil
    }

    private func customPermissionParse(cPermission: String) -> CustomPermissions? {
        switch cPermission {
            case "WORKOUT_TYPES":
                return CustomPermissions.WORKOUT_TYPE;
            case "ACTIVITY_SUMMARY":
                return CustomPermissions.ACTIVITY_SUMMARY;
            case "LOCATION":
                return CustomPermissions.LOCATION;
            case "CALORIES":
                return CustomPermissions.CALORIES;
            case "STEPS":
                return CustomPermissions.STEPS;
            case "HEART_RATE":
                return CustomPermissions.HEART_RATE;
            case "HEART_RATE_VARIABILITY":
                return CustomPermissions.HEART_RATE_VARIABILITY;
            case "VO2MAX":
                return CustomPermissions.VO2MAX;
            case "HEIGHT":
                return CustomPermissions.HEIGHT;
            case "ACTIVE_DURATIONS":
                return CustomPermissions.ACTIVE_DURATIONS;
            case "WEIGHT":
                return CustomPermissions.WEIGHT;
            case "FLIGHTS_CLIMBED":
                return CustomPermissions.FLIGHTS_CLIMBED;
            case "BMI":
                return CustomPermissions.BMI;
            case "BODY_FAT":
                return CustomPermissions.BODY_FAT;
            case "EXERCISE_DISTANCE":
                return CustomPermissions.EXERCISE_DISTANCE;
            case "GENDER":
                return CustomPermissions.GENDER;
            case "DATE_OF_BIRTH":
                return CustomPermissions.DATE_OF_BIRTH;
            case "BASAL_ENERGY_BURNED":
                return CustomPermissions.BASAL_ENERGY_BURNED;
            case "SWIMMING_SUMMARY":
                return CustomPermissions.SWIMMING_SUMMARY;
            case "RESTING_HEART_RATE":
                return CustomPermissions.RESTING_HEART_RATE;
            case "BLOOD_PRESSURE":
                return CustomPermissions.BLOOD_PRESSURE;
            case "BLOOD_GLUCOSE":
                return CustomPermissions.BLOOD_GLUCOSE;
            case "BODY_TEMPERATURE":
                return CustomPermissions.BODY_TEMPERATURE;
            case "MINDFULNESS":
                return CustomPermissions.MINDFULNESS;
            case "LEAN_BODY_MASS":
                return CustomPermissions.LEAN_BODY_MASS;
            case "OXYGEN_SATURATION":
                return CustomPermissions.OXYGEN_SATURATION;
            case "SLEEP_ANALYSIS":
                return CustomPermissions.SLEEP_ANALYSIS;
            case "RESPIRATORY_RATE":
                return CustomPermissions.RESPIRATORY_RATE;
            case "NUTRITION_SODIUM":
                return CustomPermissions.NUTRITION_SODIUM;
            case "NUTRITION_PROTEIN":
                return CustomPermissions.NUTRITION_PROTEIN;
            case "NUTRITION_CARBOHYDRATES":
                return CustomPermissions.NUTRITION_CARBOHYDRATES;
            case "NUTRITION_FIBRE":
                return CustomPermissions.NUTRITION_FIBRE;
            case "NUTRITION_FAT_TOTAL":
                return CustomPermissions.NUTRITION_FAT_TOTAL;
            case "NUTRITION_SUGAR":
                return CustomPermissions.NUTRITION_SUGAR;
            case "NUTRITION_VITAMIN_C":
                return CustomPermissions.NUTRITION_VITAMIN_C;
            case "NUTRITION_VITAMIN_A":
                return CustomPermissions.NUTRITION_VITAMIN_A;
            case "NUTRITION_CALORIES":
                return CustomPermissions.NUTRITION_CALORIES;
            case "NUTRITION_WATER":
                return CustomPermissions.NUTRITION_WATER;
            case "NUTRITION_CHOLESTEROL":
                return CustomPermissions.NUTRITION_CHOLESTEROL;
            case "MENSTRUATION":
                return CustomPermissions.MENSTRUATION;
            case "INTERBEAT":
                return CustomPermissions.INTERBEAT;
            case "SPEED":
                return CustomPermissions.SPEED;
            case "POWER":
                return CustomPermissions.POWER;
            default:
                return nil
        }
        return nil
    }

    private func customPermissionsSet(customPermissions: [String]) -> Set<CustomPermissions> {
        var out: Set<CustomPermissions> = Set([])

        for permission in customPermissions {
            if let parsed = customPermissionParse(cPermission: permission) {
                out.insert(parsed)
            }
        }

        return out
    }

    // MARK: - HealthKit write permission mapping

    /// Types that Apple marks as NOT available for sharing (writing).
    /// Requesting write auth for any of these causes an NSInvalidArgumentException crash.
    private static let readOnlyPermissions: Set<String> = [
        "ACTIVE_DURATIONS",       // appleExerciseTime
        "VO2MAX",                 // vo2Max
        "HEART_RATE_VARIABILITY", // heartRateVariabilitySDNN
        "RESTING_HEART_RATE",     // restingHeartRate
        "INTERBEAT",              // heartRateVariabilitySDNN (alias)
        "SPEED",                  // runningSpeed
        "POWER",                  // runningPower
    ]

    private func hkSampleType(for permission: String) -> HKSampleType? {
        switch permission {
        case "WEIGHT":
            return HKQuantityType.quantityType(forIdentifier: .bodyMass)
        case "HEIGHT":
            return HKQuantityType.quantityType(forIdentifier: .height)
        case "BODY_FAT":
            return HKQuantityType.quantityType(forIdentifier: .bodyFatPercentage)
        case "BMI":
            return HKQuantityType.quantityType(forIdentifier: .bodyMassIndex)
        case "LEAN_BODY_MASS":
            return HKQuantityType.quantityType(forIdentifier: .leanBodyMass)
        case "CALORIES":
            return HKQuantityType.quantityType(forIdentifier: .activeEnergyBurned)
        case "BASAL_ENERGY_BURNED":
            return HKQuantityType.quantityType(forIdentifier: .basalEnergyBurned)
        case "STEPS":
            return HKQuantityType.quantityType(forIdentifier: .stepCount)
        case "EXERCISE_DISTANCE":
            return HKQuantityType.quantityType(forIdentifier: .distanceWalkingRunning)
        case "FLIGHTS_CLIMBED":
            return HKQuantityType.quantityType(forIdentifier: .flightsClimbed)
        case "HEART_RATE":
            return HKQuantityType.quantityType(forIdentifier: .heartRate)
        case "RESTING_HEART_RATE":
            return HKQuantityType.quantityType(forIdentifier: .restingHeartRate)
        case "HEART_RATE_VARIABILITY":
            return HKQuantityType.quantityType(forIdentifier: .heartRateVariabilitySDNN)
        case "VO2MAX":
            return HKQuantityType.quantityType(forIdentifier: .vo2Max)
        case "BLOOD_PRESSURE":
            return HKCorrelationType.correlationType(forIdentifier: .bloodPressure)
        case "BLOOD_GLUCOSE":
            return HKQuantityType.quantityType(forIdentifier: .bloodGlucose)
        case "BODY_TEMPERATURE":
            return HKQuantityType.quantityType(forIdentifier: .bodyTemperature)
        case "OXYGEN_SATURATION":
            return HKQuantityType.quantityType(forIdentifier: .oxygenSaturation)
        case "RESPIRATORY_RATE":
            return HKQuantityType.quantityType(forIdentifier: .respiratoryRate)
        case "SLEEP_ANALYSIS":
            return HKCategoryType.categoryType(forIdentifier: .sleepAnalysis)
        case "MINDFULNESS":
            return HKCategoryType.categoryType(forIdentifier: .mindfulSession)
        case "NUTRITION_CALORIES":
            return HKQuantityType.quantityType(forIdentifier: .dietaryEnergyConsumed)
        case "NUTRITION_PROTEIN":
            return HKQuantityType.quantityType(forIdentifier: .dietaryProtein)
        case "NUTRITION_CARBOHYDRATES":
            return HKQuantityType.quantityType(forIdentifier: .dietaryCarbohydrates)
        case "NUTRITION_FAT_TOTAL":
            return HKQuantityType.quantityType(forIdentifier: .dietaryFatTotal)
        case "NUTRITION_FIBRE":
            return HKQuantityType.quantityType(forIdentifier: .dietaryFiber)
        case "NUTRITION_SUGAR":
            return HKQuantityType.quantityType(forIdentifier: .dietarySugar)
        case "NUTRITION_SODIUM":
            return HKQuantityType.quantityType(forIdentifier: .dietarySodium)
        case "NUTRITION_CHOLESTEROL":
            return HKQuantityType.quantityType(forIdentifier: .dietaryCholesterol)
        case "NUTRITION_WATER":
            return HKQuantityType.quantityType(forIdentifier: .dietaryWater)
        case "NUTRITION_VITAMIN_A":
            return HKQuantityType.quantityType(forIdentifier: .dietaryVitaminA)
        case "NUTRITION_VITAMIN_C":
            return HKQuantityType.quantityType(forIdentifier: .dietaryVitaminC)
        case "SPEED":
            if #available(iOS 16.0, *) {
                return HKQuantityType.quantityType(forIdentifier: .runningSpeed)
            }
            return nil
        case "POWER":
            if #available(iOS 16.0, *) {
                return HKQuantityType.quantityType(forIdentifier: .runningPower)
            }
            return nil
        case "WORKOUT_TYPES":
            return HKWorkoutType.workoutType()
        case "ACTIVE_DURATIONS":
            return HKQuantityType.quantityType(forIdentifier: .appleExerciseTime)
        default:
            return nil
        }
    }

    /// Maps a permission string to one or more HKObjectTypes for **read** authorization.
    /// Some keys (e.g. BLOOD_PRESSURE) expand to multiple underlying types.
    private func hkReadTypes(for permission: String) -> [HKObjectType] {
        // Handle types that need special treatment for reads
        switch permission {
        // Blood pressure is a correlation — can't be requested directly for read.
        // Request the two underlying quantity types instead.
        case "BLOOD_PRESSURE":
            return [
                HKQuantityType.quantityType(forIdentifier: .bloodPressureSystolic),
                HKQuantityType.quantityType(forIdentifier: .bloodPressureDiastolic),
            ].compactMap { $0 }
        // Non-sample types that hkSampleType can't handle
        case "GENDER":
            return [HKCharacteristicType.characteristicType(forIdentifier: .biologicalSex)].compactMap { $0 }
        case "DATE_OF_BIRTH":
            return [HKCharacteristicType.characteristicType(forIdentifier: .dateOfBirth)].compactMap { $0 }
        case "ACTIVITY_SUMMARY":
            return [HKActivitySummaryType.activitySummaryType()]
        case "MENSTRUATION":
            return [HKCategoryType.categoryType(forIdentifier: .menstrualFlow)].compactMap { $0 }
        case "INTERBEAT":
            return [HKQuantityType.quantityType(forIdentifier: .heartRateVariabilitySDNN)].compactMap { $0 }
        case "SWIMMING_SUMMARY":
            return [HKQuantityType.quantityType(forIdentifier: .swimmingStrokeCount)].compactMap { $0 }
        // Extra activity / fitness types
        case "DISTANCE_CYCLING":
            return [HKQuantityType.quantityType(forIdentifier: .distanceCycling)].compactMap { $0 }
        case "DISTANCE_SWIMMING":
            return [HKQuantityType.quantityType(forIdentifier: .distanceSwimming)].compactMap { $0 }
        case "DISTANCE_WHEELCHAIR":
            return [HKQuantityType.quantityType(forIdentifier: .distanceWheelchair)].compactMap { $0 }
        case "STAND_TIME":
            return [HKQuantityType.quantityType(forIdentifier: .appleStandTime)].compactMap { $0 }
        case "HEARTBEAT_SERIES":
            return [HKSeriesType.heartbeat()]
        case "WALKING_SPEED":
            if #available(iOS 14.0, *) {
                return [HKQuantityType.quantityType(forIdentifier: .walkingSpeed)].compactMap { $0 }
            }
            return []
        // Dietary micronutrients
        case "NUTRITION_BIOTIN":
            return [HKQuantityType.quantityType(forIdentifier: .dietaryBiotin)].compactMap { $0 }
        case "NUTRITION_CAFFEINE":
            return [HKQuantityType.quantityType(forIdentifier: .dietaryCaffeine)].compactMap { $0 }
        case "NUTRITION_CALCIUM":
            return [HKQuantityType.quantityType(forIdentifier: .dietaryCalcium)].compactMap { $0 }
        case "NUTRITION_CHLORIDE":
            return [HKQuantityType.quantityType(forIdentifier: .dietaryChloride)].compactMap { $0 }
        case "NUTRITION_CHROMIUM":
            return [HKQuantityType.quantityType(forIdentifier: .dietaryChromium)].compactMap { $0 }
        case "NUTRITION_COPPER":
            return [HKQuantityType.quantityType(forIdentifier: .dietaryCopper)].compactMap { $0 }
        case "NUTRITION_FAT_MONOUNSATURATED":
            return [HKQuantityType.quantityType(forIdentifier: .dietaryFatMonounsaturated)].compactMap { $0 }
        case "NUTRITION_FAT_POLYUNSATURATED":
            return [HKQuantityType.quantityType(forIdentifier: .dietaryFatPolyunsaturated)].compactMap { $0 }
        case "NUTRITION_FAT_SATURATED":
            return [HKQuantityType.quantityType(forIdentifier: .dietaryFatSaturated)].compactMap { $0 }
        case "NUTRITION_FOLATE":
            return [HKQuantityType.quantityType(forIdentifier: .dietaryFolate)].compactMap { $0 }
        case "NUTRITION_IODINE":
            return [HKQuantityType.quantityType(forIdentifier: .dietaryIodine)].compactMap { $0 }
        case "NUTRITION_IRON":
            return [HKQuantityType.quantityType(forIdentifier: .dietaryIron)].compactMap { $0 }
        case "NUTRITION_MAGNESIUM":
            return [HKQuantityType.quantityType(forIdentifier: .dietaryMagnesium)].compactMap { $0 }
        case "NUTRITION_MANGANESE":
            return [HKQuantityType.quantityType(forIdentifier: .dietaryManganese)].compactMap { $0 }
        case "NUTRITION_MOLYBDENUM":
            return [HKQuantityType.quantityType(forIdentifier: .dietaryMolybdenum)].compactMap { $0 }
        case "NUTRITION_NIACIN":
            return [HKQuantityType.quantityType(forIdentifier: .dietaryNiacin)].compactMap { $0 }
        case "NUTRITION_PANTOTHENIC_ACID":
            return [HKQuantityType.quantityType(forIdentifier: .dietaryPantothenicAcid)].compactMap { $0 }
        case "NUTRITION_PHOSPHORUS":
            return [HKQuantityType.quantityType(forIdentifier: .dietaryPhosphorus)].compactMap { $0 }
        case "NUTRITION_POTASSIUM":
            return [HKQuantityType.quantityType(forIdentifier: .dietaryPotassium)].compactMap { $0 }
        case "NUTRITION_RIBOFLAVIN":
            return [HKQuantityType.quantityType(forIdentifier: .dietaryRiboflavin)].compactMap { $0 }
        case "NUTRITION_SELENIUM":
            return [HKQuantityType.quantityType(forIdentifier: .dietarySelenium)].compactMap { $0 }
        case "NUTRITION_THIAMIN":
            return [HKQuantityType.quantityType(forIdentifier: .dietaryThiamin)].compactMap { $0 }
        case "NUTRITION_VITAMIN_B12":
            return [HKQuantityType.quantityType(forIdentifier: .dietaryVitaminB12)].compactMap { $0 }
        case "NUTRITION_VITAMIN_B6":
            return [HKQuantityType.quantityType(forIdentifier: .dietaryVitaminB6)].compactMap { $0 }
        case "NUTRITION_VITAMIN_D":
            return [HKQuantityType.quantityType(forIdentifier: .dietaryVitaminD)].compactMap { $0 }
        case "NUTRITION_VITAMIN_E":
            return [HKQuantityType.quantityType(forIdentifier: .dietaryVitaminE)].compactMap { $0 }
        case "NUTRITION_VITAMIN_K":
            return [HKQuantityType.quantityType(forIdentifier: .dietaryVitaminK)].compactMap { $0 }
        case "NUTRITION_ZINC":
            return [HKQuantityType.quantityType(forIdentifier: .dietaryZinc)].compactMap { $0 }
        // iOS 17+ cycling & wrist temp
        case "CYCLING_CADENCE":
            if #available(iOS 17.0, *) {
                return [HKQuantityType.quantityType(forIdentifier: .cyclingCadence)].compactMap { $0 }
            }
            return []
        case "CYCLING_POWER":
            if #available(iOS 17.0, *) {
                return [HKQuantityType.quantityType(forIdentifier: .cyclingPower)].compactMap { $0 }
            }
            return []
        case "CYCLING_SPEED":
            if #available(iOS 17.0, *) {
                return [HKQuantityType.quantityType(forIdentifier: .cyclingSpeed)].compactMap { $0 }
            }
            return []
        case "WRIST_TEMPERATURE":
            if #available(iOS 17.0, *) {
                return [HKQuantityType.quantityType(forIdentifier: .appleSleepingWristTemperature)].compactMap { $0 }
            }
            return []
        default:
            // Fall through to the sample-type mapper for everything else
            if let sampleType = hkSampleType(for: permission) {
                return [sampleType as HKObjectType]
            }
            return []
        }
    }

    private func requestHealthKitWritePermissions(_ permissions: [String], completion: @escaping (Bool) -> Void) {
        guard HKHealthStore.isHealthDataAvailable() else {
            completion(false)
            return
        }

        // Filter out read-only types that would crash
        let safePermissions = permissions.filter { !Self.readOnlyPermissions.contains($0) }

        let store = HKHealthStore()
        var writeTypes = Set<HKSampleType>()

        for permission in safePermissions {
            if let sampleType = hkSampleType(for: permission) {
                writeTypes.insert(sampleType)
            }
        }

        guard !writeTypes.isEmpty else {
            completion(true)
            return
        }

        DispatchQueue.main.async {
            store.requestAuthorization(toShare: writeTypes, read: nil) { success, error in
                if let error = error {
                    print("[TerraReact] HealthKit write authorization error: \(error.localizedDescription)")
                }
                completion(success)
            }
        }
    }

    // initialize
    @objc
    func initTerra(_ devID: String, referenceId: String, resolve: @escaping RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock){
        Terra.instance(devId: devID, referenceId: referenceId){instance, error in
            if let error = error{
                resolve(["success": false, "error": self.errorMessage(error)])
            }
            else{
                self.terra = instance
                resolve(["success": instance != nil])
            }
        }
    }

    @objc
    func initConnection(_ connection: String, token: String, schedulerOn: Bool, customPermissions: [String], startIntent: String, customWritePermissions: [String], resolve: @escaping RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock){
        if let connection = connectionParse(connection: connection){
            let readPermissionKeys = customPermissions.isEmpty
                ? Self.allReadPermissionKeys
                : customPermissions
            let writePermissionKeys = customWritePermissions.isEmpty
                ? Self.allWritePermissionKeys
                : customWritePermissions

            requestedReadPermissionKeys = readPermissionKeys
            requestedWritePermissionKeys = writePermissionKeys

            // The native SDK has no concept of write permissions, so request the
            // explicitly supplied write types directly through HealthKit.
            let safeWriteKeys = writePermissionKeys.filter { !Self.readOnlyPermissions.contains($0) }
            let writeHKTypes: Set<HKSampleType> = Set(safeWriteKeys.compactMap { hkSampleType(for: $0) })

            var readHKTypes = Set<HKObjectType>()
            for key in readPermissionKeys {
                readHKTypes.formUnion(hkReadTypes(for: key))
            }

            // Passing an explicit custom set prevents Terra from falling back to
            // every permission enabled in the developer dashboard.
            let terraReadPerms = self.customPermissionsSet(customPermissions: readPermissionKeys)

            // Do a SINGLE combined requestAuthorization for both reads AND writes
            // BEFORE Terra's initConnection. This ensures the HealthKit dialog
            // shows BOTH "Allow to read" and "Allow to write" sections in one sheet.
            if HKHealthStore.isHealthDataAvailable() {
                let store = HKHealthStore()
                DispatchQueue.main.async {
                    store.requestAuthorization(toShare: writeHKTypes, read: readHKTypes) { _, error in
                        if let error = error {
                            print("[TerraReact] HealthKit combined authorization error: \(error.localizedDescription)")
                        }
                        self.terra?.initConnection(type: connection, token: token, customReadTypes: terraReadPerms, schedulerOn: schedulerOn, completion: {success, error in
                            if let error = error{
                                resolve(["success": success, "error": self.errorMessage(error)])
                                return
                            }
                            resolve(["success": success])
                        })
                    }
                }
            } else {
                self.terra?.initConnection(type: connection, token: token, customReadTypes: terraReadPerms, schedulerOn: schedulerOn, completion: {success, error in
                    if let error = error{
                        resolve(["success": success, "error": self.errorMessage(error)])
                        return
                    }
                    resolve(["success": success])
                })
            }
        }
        else {
            resolve(["success": false, "error": "Invalid Connection Type"])
        }
    }

    @objc
    func getUserId(_ connection: String, resolve: @escaping RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock){
        if let connection = connectionParse(connection: connection){
            resolve(["success": true, "userId": terra?.getUserId(type: connection) as? String])
        }
    }

    // check connection
    @objc
    func checkAuth(_ connection: String, devID: String, resolve: @escaping RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) {
        if let connection = connectionParse(connection: connection){
            Terra.checkAuthentication(connection: connection, devId: devID, completion: {success in resolve(["success": success])})
        }
        else{
            resolve(["success": false])
        }
    }

    // getters
    @objc
    func getBody(_ connection: String, startDate: Date, endDate: Date, latestReading: Bool, toWebhook: Bool, resolve: @escaping RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock){
        if let connection = connectionParse(connection: connection){
            terra?.getBody(type: connection, startDate: startDate, endDate: endDate, toWebhook: toWebhook, latestReading: latestReading){
                (success, data, err) in
                if let err = err {
                    resolve(["success": false, "data": nil, "error": self.errorMessage(err)])
                }
                else{
                    do {
                        let jsonData = try JSONEncoder().encode(data)
                        resolve(["success": success, "data": String(data: jsonData, encoding: .utf8) ?? ""])
                    }
                    catch {
                        resolve(["success": success, "error": "Error decoding data into correct format"])}
                    }
                }
        }
        else{
            resolve(["success": false, "data": nil, "error": "Invalid Connection Type"])
        }
    }

    @objc
    func getActivity(_ connection: String, startDate: Date, endDate: Date, toWebhook: Bool, resolve: @escaping RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock){
        if let connection = connectionParse(connection: connection){
            terra?.getActivity(type: connection, startDate: startDate, endDate: endDate, toWebhook: toWebhook){
                (success, data, err) in
                if let err = err {
                    resolve(["success": false, "data": nil, "error": self.errorMessage(err)])
                }
                else{
                    do {
                        let jsonData = try JSONEncoder().encode(data)
                        resolve(["success": success, "data": String(data: jsonData, encoding: .utf8) ?? ""])
                    }
                    catch {
                        resolve(["success": success, "error": "Error decoding data into correct format"])}
                    }
                }
        }
        else{
            resolve(["success": false, "data": nil, "error": "Invalid Connection Type"])
        }
    }

    @objc
    func getMenstruation(_ connection: String, startDate: Date, endDate: Date, toWebhook: Bool, resolve: @escaping RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock){
        if let connection = connectionParse(connection: connection){
            terra?.getMenstruation(type: connection, startDate: startDate, endDate: endDate, toWebhook: toWebhook){
                (success, data, err) in
                if let err = err {
                    resolve(["success": false, "data": nil, "error": self.errorMessage(err)])
                }
                else{
                    do {
                        let jsonData = try JSONEncoder().encode(data)
                        resolve(["success": success, "data": String(data: jsonData, encoding: .utf8) ?? ""])
                    }
                    catch {
                        resolve(["success": success, "error": "Error decoding data into correct format"])}
                    }
                }
        }
        else{
            resolve(["success": false, "data": nil, "error": "Invalid Connection Type"])
        }
    }

    @objc
    func getAthlete(_ connection: String, toWebhook: Bool, resolve: @escaping RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock){
        if let connection = connectionParse(connection: connection){
            terra?.getAthlete(type: connection, toWebhook: toWebhook){
                (success, data, err) in
                if let err = err {
                    resolve(["success": false, "data": nil, "error": self.errorMessage(err)])
                }
                else{
                    do {
                        let jsonData = try JSONEncoder().encode(data)
                        resolve(["success": success, "data": String(data: jsonData, encoding: .utf8) ?? ""])
                    }
                    catch {
                        resolve(["success": success, "error": "Error decoding data into correct format"])}
                    }
                }
        }
        else{
            resolve(["success": false, "data": nil, "error": "Invalid Connection Type"])
        }
    }

    @objc
    func getDaily(_ connection: String, startDate: Date, endDate: Date, toWebhook: Bool, resolve: @escaping RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock){
        if let connection = connectionParse(connection: connection){
            terra?.getDaily(type: connection, startDate: startDate, endDate: endDate, toWebhook: toWebhook){
                (success, data, err) in
                if let err = err {
                    resolve(["success": false, "data": nil, "error": self.errorMessage(err)])
                }
                else{
                    do {
                        let jsonData = try JSONEncoder().encode(data)
                        resolve(["success": success, "data": String(data: jsonData, encoding: .utf8) ?? ""])
                    }
                    catch {
                        resolve(["success": success, "error": "Error decoding data into correct format"])}
                    }
                }
        }
        else{
            resolve(["success": false, "data": nil, "error": "Invalid Connection Type"])
        }
    }

    @objc
    func getSleep(_ connection: String, startDate: Date, endDate: Date, toWebhook: Bool, resolve: @escaping RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock){
        if let connection = connectionParse(connection: connection){
            terra?.getSleep(type: connection, startDate: startDate, endDate: endDate, toWebhook: toWebhook){
                (success, data, err) in
                if let err = err {
                    resolve(["success": false, "data": nil, "error": self.errorMessage(err)])
                }
                else{
                    do {
                        let jsonData = try JSONEncoder().encode(data)
                        resolve(["success": success, "data": String(data: jsonData, encoding: .utf8) ?? ""])
                    }
                    catch {
                        resolve(["success": success, "error": "Error decoding data into correct format"])}
                    }
                }
        }
        else{
            resolve(["success": false, "data": nil, "error": "Invalid Connection Type"])
        }
    }

    @objc
    func getNutrition(_ connection: String, startDate: Date, endDate: Date, toWebhook: Bool, resolve: @escaping RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock){
        if let connection = connectionParse(connection: connection){
            terra?.getNutrition(type: connection, startDate: startDate, endDate: endDate, toWebhook: toWebhook){
                (success, data, err) in
                if let err = err {
                    resolve(["success": false, "data": nil, "error": self.errorMessage(err)])
                }
                else{
                    do {
                        let jsonData = try JSONEncoder().encode(data)
                        resolve(["success": success, "data": String(data: jsonData, encoding: .utf8) ?? ""])
                    }
                    catch {
                        resolve(["success": success, "error": "Error decoding data into correct format"])}
                    }
                }
        }
        else{
            resolve(["success": false, "data": nil, "error": "Invalid Connection Type"])
        }
    }

    @objc
    func postActivity(_ connection: String, payload: NSDictionary, resolve: @escaping RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) {
        print("[TerraReact] postActivity called with connection=\(connection) payload=\(payload)")

        guard let connection = connectionParse(connection: connection) else {
            resolve(["success": false, "data": nil, "error": "Invalid Connection Type"])
            return
        }

        guard let activityPayload = convertToTerraActivityPayload(payload) else {
            resolve(["success": false, "data": nil, "error": "Invalid intput payload"])
            return
        }

        if let jsonData = try? JSONEncoder().encode(activityPayload),
           let jsonStr = String(data: jsonData, encoding: .utf8) {
            print("[TerraReact] postActivity TerraActivityData JSON: \(jsonStr)")
        }

        guard let terra = terra else {
            resolve(["success": false, "error": "Terra SDK not initialised"])
            return
        }

        guard HKHealthStore.isHealthDataAvailable() else {
            resolve(["success": false, "error": "HealthKit not available"])
            return
        }

        let store = HKHealthStore()
        let activityTypes: Set<HKSampleType> = Set([
            HKQuantityType.quantityType(forIdentifier: .activeEnergyBurned),
            HKQuantityType.quantityType(forIdentifier: .basalEnergyBurned),
            HKQuantityType.quantityType(forIdentifier: .stepCount),
            HKQuantityType.quantityType(forIdentifier: .distanceWalkingRunning),
            HKQuantityType.quantityType(forIdentifier: .heartRate),
            HKObjectType.workoutType(),
        ].compactMap { $0 })

        DispatchQueue.main.async {
            store.requestAuthorization(toShare: activityTypes, read: nil) { _, authError in
                if let authError = authError {
                    print("[TerraReact] postActivity HealthKit auth error: \(authError.localizedDescription)")
                }

                let workoutStatus = store.authorizationStatus(for: HKObjectType.workoutType())
                print("[TerraReact] postActivity HealthKit workout write auth: \(workoutStatus.rawValue)")

                if workoutStatus == .sharingDenied {
                    resolve(["success": false, "error": "HEALTHKIT_WRITE_DENIED"])
                    return
                }

                if #available(iOS 14, *) {
                    print("[TerraReact] postActivity calling terra.postActivity...")
                    terra.postActivity(type: connection, payload: activityPayload) { (success, err) in
                        if let err = err {
                            print("[TerraReact] postActivity SDK error: \(self.errorMessage(err))")
                            resolve(["success": false, "error": self.errorMessage(err)])
                        } else {
                            print("[TerraReact] postActivity SDK returned success=\(success)")
                            resolve(["success": success, "error": nil])
                        }
                    }
                } else {
                    resolve(["success": false, "error": "postActivity is only available for iOS 14 and above"])
                }
            }
        }
    }

    @objc
    func postNutrition(_ connection: String, payload: NSDictionary, resolve: @escaping RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) {
        print("[TerraReact] postNutrition called with connection=\(connection) payload=\(payload)")

        guard let connection = connectionParse(connection: connection) else {
            resolve(["success": false, "error": "Invalid Connection Type"])
            return
        }

        guard let nutritionPayload = convertToTerraNutritionPayload(payload) else {
            resolve(["success": false, "error": "Invalid input payload"])
            return
        }

        if let jsonData = try? JSONEncoder().encode(nutritionPayload),
           let jsonStr = String(data: jsonData, encoding: .utf8) {
            print("[TerraReact] postNutrition TerraNutritionData JSON: \(jsonStr)")
        }

        guard let terra = terra else {
            resolve(["success": false, "error": "Terra SDK not initialised"])
            return
        }

        guard HKHealthStore.isHealthDataAvailable() else {
            resolve(["success": false, "error": "HealthKit not available"])
            return
        }

        let store = HKHealthStore()
        let nutritionTypes: Set<HKSampleType> = Set([
            HKQuantityType.quantityType(forIdentifier: .dietaryEnergyConsumed),
            HKQuantityType.quantityType(forIdentifier: .dietaryProtein),
            HKQuantityType.quantityType(forIdentifier: .dietaryCarbohydrates),
            HKQuantityType.quantityType(forIdentifier: .dietaryFatTotal),
        ].compactMap { $0 })

        DispatchQueue.main.async {
            store.requestAuthorization(toShare: nutritionTypes, read: nil) { _, authError in
                if let authError = authError {
                    print("[TerraReact] postNutrition HealthKit auth error: \(authError.localizedDescription)")
                }

                if let calorieType = HKQuantityType.quantityType(forIdentifier: .dietaryEnergyConsumed) {
                    let status = store.authorizationStatus(for: calorieType)
                    print("[TerraReact] postNutrition HealthKit dietaryEnergy write auth: \(status.rawValue)")
                    if status == .sharingDenied {
                        resolve(["success": false, "error": "HEALTHKIT_WRITE_DENIED"])
                        return
                    }
                }

                print("[TerraReact] postNutrition calling terra.postNutrition...")
                terra.postNutrition(type: connection, payload: nutritionPayload) { success in
                    print("[TerraReact] postNutrition SDK returned success=\(success)")
                    resolve(["success": success, "error": success ? NSNull() : "HealthKit write failed" as Any])
                }
            }
        }
    }

    @objc
    func postBody(_ connection: String, payload: NSDictionary, resolve: @escaping RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) {
        guard let connection = connectionParse(connection: connection) else {
            resolve(["success": false, "error": "Invalid Connection Type"])
            return
        }

        guard let bodyPayload = convertToTerraBodyPayload(payload) else {
            resolve(["success": false, "error": "Invalid input payload"])
            return
        }

        guard let terra = terra else {
            resolve(["success": false, "error": "Terra SDK not initialised"])
            return
        }

        guard HKHealthStore.isHealthDataAvailable() else {
            resolve(["success": false, "error": "HealthKit not available"])
            return
        }

        let store = HKHealthStore()
        let bodyTypes: Set<HKSampleType> = Set([
            HKQuantityType.quantityType(forIdentifier: .bodyMass),
            HKQuantityType.quantityType(forIdentifier: .height),
            HKQuantityType.quantityType(forIdentifier: .bodyFatPercentage),
            HKQuantityType.quantityType(forIdentifier: .bodyMassIndex),
            HKQuantityType.quantityType(forIdentifier: .leanBodyMass),
        ].compactMap { $0 })

        // Request on main thread — iOS requires main thread to show the permission sheet
        DispatchQueue.main.async {
            store.requestAuthorization(toShare: bodyTypes, read: nil) { _, authError in
                if let authError = authError {
                    print("[TerraReact] postBody HealthKit auth error: \(authError.localizedDescription)")
                }

                // After auth request, check status.
                // Note: iOS returns .sharingDenied for both "never asked" and "user denied".
                // If requestAuthorization just showed the sheet and user granted, status flips to .sharingAuthorized.
                // If user denied or sheet wasn't shown (already denied), status stays .sharingDenied.
                if let bodyMassType = HKQuantityType.quantityType(forIdentifier: .bodyMass) {
                    let status = store.authorizationStatus(for: bodyMassType)
                    if status == .sharingDenied {
                        resolve(["success": false, "error": "HEALTHKIT_WRITE_DENIED"])
                        return
                    }
                }

                terra.postBody(type: connection, payload: bodyPayload) { success in
                    resolve(["success": success, "error": success ? NSNull() : "HealthKit write failed" as Any])
                }
            }
        }
    }

    // Freestyle glucose init
    @objc
    func readGlucoseData(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock){
        terra?.readGlucoseData{(details) in
            do {
                let jsonData = try JSONEncoder().encode(details)
                resolve(String(data: jsonData, encoding: .utf8) ?? "")
            }
            catch {
                print(error)
            }
        }
    }

    @objc
    func activateSensor(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock){
        terra?.activateSensor{(details) in
            do {
                let jsonData = try JSONEncoder().encode(details)
                resolve(String(data: jsonData, encoding: .utf8) ?? "")
            }
            catch {
                print(error) //Should never execute
            }
        }
    }

    @objc
    func getPlannedWorkouts(_ connection: String,
                            resolve: @escaping RCTPromiseResolveBlock,
                            rejecter reject: RCTPromiseRejectBlock) {

        guard let conn = connectionParse(connection: connection) else {
            resolve(["success": false, "data": nil, "error": "Invalid Connection Type"])
            return
        }
        if #available(iOS 17.0, *) {
            terra?.getPlannedWorkouts(type: conn) { (data, err) in
            if let err = err {
                resolve(["success": false, "data": nil, "error": self.errorMessage(err)])
            } else {
                do {
                    let jsonData = try JSONEncoder().encode(data)
                    let jsonString = String(data: jsonData, encoding: .utf8) ?? "[]"
                    resolve(["success": true, "data": jsonString])
                } catch {
                    resolve(["success": false, "data": nil, "error": "Error decoding data into correct format"])
                }
            }
        }
        } else {
            resolve(["success": false, "data": nil, "error": "getPlannedWorkouts is only available for iOS 17 and above"])
            return
        }
    }

    @objc
    func deletePlannedWorkout(_ connection: String,
                            workoutId: String,
                            resolve: @escaping RCTPromiseResolveBlock,
                            rejecter reject: RCTPromiseRejectBlock) {

        guard let conn = connectionParse(connection: connection) else {
            resolve(["success": false, "data": nil, "error": "Invalid Connection Type"])
            return
        }

        guard let uuid = UUID(uuidString: workoutId) else {
            resolve(["success": false, "data": nil, "error": "Please make sure the workoutId is a valid UUID"])
			return
		}

        if #available(iOS 17.0, *) {
            terra?.deletePlannedWorkout(type: conn, id: uuid) { (success, err) in
            if let err = err {
                resolve(["success": false, "error": self.errorMessage(err)])
                } else {
                resolve(["success": success, "error": NSNull()])
            }
        }
        } else {
            resolve(["success": false, "error": "deletePlannedWorkout is only available for iOS 17 and above"])
            return
        }
    }

    @objc
    func completePlannedWorkout(_ connection: String,
                                workoutId: String,
                                at atIso: String,
                                resolve: @escaping RCTPromiseResolveBlock,
                                rejecter reject: RCTPromiseRejectBlock) {

        guard let conn = connectionParse(connection: connection) else {
            resolve(["success": false, "data": nil, "error": "Invalid Connection Type"])
            return
        }


        guard let uuid = UUID(uuidString: workoutId) else {
            resolve(["success": false, "data": nil, "error": "Please make sure the workoutId is a valid UUID"])
			return
		}

        let atDate = isoDate(from: atIso) ?? Date()
        if #available(iOS 17.0, *) {
            terra?.markPlannedWorkoutComplete(type: conn, id: uuid, at: atDate) { (success, err) in
                if let err = err {
                    resolve(["success": false, "error": self.errorMessage(err)])
                } else {
                    resolve(["success": success, "error": NSNull()])
                }
            }
        } else {
            resolve(["success": false, "error": "completePlannedWorkout is only available for iOS 17 and above"])
        }
    }

    @objc
    func postPlannedWorkout(_ connection: String,
                            payload: String,
                            resolve: @escaping RCTPromiseResolveBlock,
                            rejecter reject: RCTPromiseRejectBlock) {

        guard let conn = connectionParse(connection: connection) else {
            resolve(["success": false, "data": nil, "error": "Invalid Connection Type"])
            return
        }

        if #available(iOS 17.0, *) {
			do {
				let data = try JSONDecoder().decode(TerraPlannedWorkout.self, from: payload.data(using: .utf8)!)
				terra?.postPlannedWorkout(
					type: conn,
					payload: data
				){
					(success, err) in
					if let err = err {
						resolve(["success": false, "error": self.errorMessage(err)])
					}
					else{
						resolve(["success": success])
					}
				}
			} catch {
                resolve(["success": false, "error": "Invalid input payload"])
            }
        } else {
            resolve(["success": false, "error": "completePlannedWorkout is only available for iOS 17 and above"])
        }
    }

    @objc
    func isHealthConnectAvailable(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock){
        reject("NotImplementedError", "Function does not exist on iOS", nil)
    }

    @objc
    func grantedPermissions(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock){
        reject("NotImplementedError", "Function does not exist on iOS", nil)
    }

    @objc
    func openHealthConnect(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock){
        reject("NotImplementedError", "Function does not exist on iOS", nil)
    }

    @objc
    func setIgnoredSources(_ ignoredSources: [String], resolve: @escaping RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock){
        Terra.setIgnoredSources(ignoredSources)
        resolve(["success": true])
    }

    // MARK: - HealthKit permission introspection

    /// All read types the app may request.
    private static let allReadPermissionKeys: [String] = [
        "WORKOUT_TYPES", "ACTIVITY_SUMMARY", "CALORIES", "STEPS",
        "HEART_RATE", "HEART_RATE_VARIABILITY", "VO2MAX", "HEIGHT",
        "ACTIVE_DURATIONS", "WEIGHT", "FLIGHTS_CLIMBED", "BMI",
        "BODY_FAT", "EXERCISE_DISTANCE", "GENDER", "DATE_OF_BIRTH",
        "BASAL_ENERGY_BURNED", "SWIMMING_SUMMARY", "RESTING_HEART_RATE",
        "BLOOD_PRESSURE", "BLOOD_GLUCOSE", "BODY_TEMPERATURE",
        "MINDFULNESS", "LEAN_BODY_MASS", "OXYGEN_SATURATION",
        "SLEEP_ANALYSIS", "RESPIRATORY_RATE",
        "NUTRITION_SODIUM", "NUTRITION_PROTEIN", "NUTRITION_CARBOHYDRATES",
        "NUTRITION_FIBRE", "NUTRITION_FAT_TOTAL", "NUTRITION_SUGAR",
        "NUTRITION_VITAMIN_C", "NUTRITION_VITAMIN_A", "NUTRITION_CALORIES",
        "NUTRITION_WATER", "NUTRITION_CHOLESTEROL",
        "MENSTRUATION", "INTERBEAT", "SPEED", "POWER",
        // Extra types Terra SDK reads internally
        "DISTANCE_CYCLING", "DISTANCE_SWIMMING", "DISTANCE_WHEELCHAIR",
        "STAND_TIME", "HEARTBEAT_SERIES", "WALKING_SPEED",
        // Dietary micronutrients
        "NUTRITION_BIOTIN", "NUTRITION_CAFFEINE", "NUTRITION_CALCIUM",
        "NUTRITION_CHLORIDE", "NUTRITION_CHROMIUM", "NUTRITION_COPPER",
        "NUTRITION_FAT_MONOUNSATURATED", "NUTRITION_FAT_POLYUNSATURATED",
        "NUTRITION_FAT_SATURATED", "NUTRITION_FOLATE", "NUTRITION_IODINE",
        "NUTRITION_IRON", "NUTRITION_MAGNESIUM", "NUTRITION_MANGANESE",
        "NUTRITION_MOLYBDENUM", "NUTRITION_NIACIN",
        "NUTRITION_PANTOTHENIC_ACID", "NUTRITION_PHOSPHORUS",
        "NUTRITION_POTASSIUM", "NUTRITION_RIBOFLAVIN",
        "NUTRITION_SELENIUM", "NUTRITION_THIAMIN",
        "NUTRITION_VITAMIN_B12", "NUTRITION_VITAMIN_B6",
        "NUTRITION_VITAMIN_D", "NUTRITION_VITAMIN_E",
        "NUTRITION_VITAMIN_K", "NUTRITION_ZINC",
        // iOS 17+ types
        "CYCLING_CADENCE", "CYCLING_POWER", "CYCLING_SPEED",
        "WRIST_TEMPERATURE",
    ]

    /// All write types the app may request.
    private static let allWritePermissionKeys: [String] = [
        "NUTRITION_CALORIES", "NUTRITION_PROTEIN", "NUTRITION_CARBOHYDRATES",
        "NUTRITION_FAT_TOTAL", "NUTRITION_FIBRE", "NUTRITION_SUGAR",
        "NUTRITION_SODIUM", "NUTRITION_CHOLESTEROL", "NUTRITION_WATER",
        "NUTRITION_VITAMIN_A", "NUTRITION_VITAMIN_C",
        "WEIGHT", "HEIGHT", "BODY_FAT", "BMI",
        // NOTE: ACTIVE_DURATIONS (appleExerciseTime) is read-only – do NOT request write.
        "WORKOUT_TYPES", "CALORIES", "EXERCISE_DISTANCE", "HEART_RATE",
    ]

    private func authStatusString(_ status: HKAuthorizationStatus) -> String {
        switch status {
        case .notDetermined: return "not_determined"
        case .sharingDenied:  return "denied"
        case .sharingAuthorized: return "authorized"
        @unknown default: return "unknown"
        }
    }

    @objc
    func getAllHealthKitPermissions(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) {
        guard HKHealthStore.isHealthDataAvailable() else {
            resolve(["success": false, "error": "HealthKit not available"])
            return
        }

        DispatchQueue.main.async {
            let store = HKHealthStore()

            // Write statuses (authorizationStatus works reliably for write)
            var writeDict: [String: String] = [:]
            for key in self.requestedWritePermissionKeys {
                if let sampleType = self.hkSampleType(for: key) {
                    let status = store.authorizationStatus(for: sampleType)
                    writeDict[key] = self.authStatusString(status)
                } else {
                    writeDict[key] = "unsupported"
                }
            }

            // Read statuses – Apple does not expose per-type read authorization.
            // We use getRequestStatusForAuthorization to check whether the read
            // types have been requested at all. If they have, we mark them as
            // "requested" (the best we can do); otherwise "not_determined".
            var readTypes = Set<HKObjectType>()
            for key in self.requestedReadPermissionKeys {
                readTypes.formUnion(self.hkReadTypes(for: key))
            }

            store.getRequestStatusForAuthorization(toShare: Set<HKSampleType>(), read: readTypes) { status, _ in
                // status tells us whether there are types that still need requesting
                let globalReadStatus: String
                switch status {
                case .unnecessary:
                    globalReadStatus = "authorized"   // all requested
                case .shouldRequest:
                    globalReadStatus = "not_determined" // not yet asked
                default:
                    globalReadStatus = "unknown"
                }

                var readDict: [String: String] = [:]
                for key in self.requestedReadPermissionKeys {
                    if !self.hkReadTypes(for: key).isEmpty {
                        readDict[key] = globalReadStatus
                    } else {
                        readDict[key] = "unsupported"
                    }
                }

                resolve(["success": true, "write": writeDict, "read": readDict])
            }
        }
    }

    @objc
    func requestAllHealthKitPermissions(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) {
        guard HKHealthStore.isHealthDataAvailable() else {
            resolve(["success": false, "error": "HealthKit not available"])
            return
        }

        let store = HKHealthStore()

        // Build ALL read types
        var readTypes = Set<HKObjectType>()
        for key in Self.allReadPermissionKeys {
            readTypes.formUnion(hkReadTypes(for: key))
        }

        // Build ALL write types (safe only)
        let safeWriteKeys = Self.allWritePermissionKeys.filter { !Self.readOnlyPermissions.contains($0) }
        var writeTypes = Set<HKSampleType>()
        for key in safeWriteKeys {
            if let sampleType = hkSampleType(for: key) {
                writeTypes.insert(sampleType)
            }
        }

        DispatchQueue.main.async {
            store.requestAuthorization(toShare: writeTypes, read: readTypes) { success, error in
                if let error = error {
                    print("[TerraReact] HealthKit combined authorization error: \(error.localizedDescription)")
                }
                resolve(["success": success])
            }
        }
    }
}
