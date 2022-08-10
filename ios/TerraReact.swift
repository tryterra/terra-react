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

    // terra instance managed
    private var terra: Terra?
    
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
    // permission type translate
    private func permissionParse(permission: String) -> Permissions {
        switch permission {
            case "ACTIVITY":
                return Permissions.ACTIVITY
            case "ATHLETE":
                return Permissions.ATHLETE
            case "BODY":
                return Permissions.BODY
            case "DAILY":
                return Permissions.DAILY
            case "NUTRITION":
                return Permissions.NUTRITION
            case "SLEEP":
                return Permissions.SLEEP
            default:
                print("Passed invalid permission")
        }
        return Permissions.ACTIVITY
    }

    private func customPermissionParse(cPermission: String) -> Set<HKObjectType> {
        switch cPermission {
            case "WORKOUT_TYPES":
                return Set([HKObjectType.workoutType()])
            case "ACTIVITY_SUMMARY":
                return Set([HKObjectType.activitySummaryType()])
            case "LOCATION":
                return Set([HKSeriesType.workoutRoute()])
            case "CALORIES":
                return Set([HKObjectType.quantityType(forIdentifier:.activeEnergyBurned)!])
            case "STEPS":
                return Set([HKQuantityType.quantityType(forIdentifier: .stepCount)!])
            case "HEART_RATE":
                return Set([HKObjectType.quantityType(forIdentifier: .heartRate)!])
            case "HEART_RATE_VARIABILITY":
                return Set([HKObjectType.quantityType(forIdentifier: .heartRateVariabilitySDNN)!])
            case "VO2MAX":
                return Set([HKObjectType.quantityType(forIdentifier: .vo2Max)!])
            case "HEIGHT":
                return Set([HKObjectType.quantityType(forIdentifier: .height)!])
            case "ACTIVE_DURATIONS":
                return Set([HKObjectType.quantityType(forIdentifier: .appleExerciseTime)!])
            case "WEIGHT":
                return Set([HKObjectType.quantityType(forIdentifier: .bodyMass)!])
            case "FLIGHTS_CLIMBED":
                return Set([HKObjectType.quantityType(forIdentifier: .flightsClimbed)!])
            case "BMI":
                return Set([HKObjectType.quantityType(forIdentifier: .bodyMassIndex)!])
            case "BODY_FAT":
                return Set([HKObjectType.quantityType(forIdentifier: .bodyFatPercentage)!])
            case "EXERCISE_DISTANCE":
                return Set([HKObjectType.quantityType(forIdentifier: .distanceSwimming)!, HKObjectType.quantityType(forIdentifier: .distanceCycling)!, HKObjectType.quantityType(forIdentifier: .distanceWalkingRunning)!])
            case "GENDER":
                return Set([HKObjectType.characteristicType(forIdentifier: .biologicalSex)!])
            case "DATE_OF_BIRTH":
                return Set([HKObjectType.characteristicType(forIdentifier: .dateOfBirth)!])
            case "BASAL_ENERGY_BURNED":
                return Set([HKObjectType.quantityType(forIdentifier: .basalEnergyBurned)!])
            case "SWIMMING_SUMMARY":
                return Set([HKObjectType.quantityType(forIdentifier: .swimmingStrokeCount)!])
            case "RESTING_HEART_RATE":
                return Set([HKObjectType.quantityType(forIdentifier: .restingHeartRate)!])
            case "BLOOD_PRESSURE":
                return Set([HKObjectType.quantityType(forIdentifier: .bloodPressureDiastolic)!, HKObjectType.quantityType(forIdentifier: .bloodPressureSystolic)!])
            case "BLOOD_GLUCOSE":
                return Set([HKObjectType.quantityType(forIdentifier: .bloodGlucose)!])
            case "BODY_TEMPERATURE":
                return Set([HKObjectType.quantityType(forIdentifier: .bodyTemperature)!])
            case "LEAN_BODY_MASS":
                return Set([HKObjectType.quantityType(forIdentifier: .leanBodyMass)!])
            case "OXYGEN_SATURATION":
                return Set([HKObjectType.quantityType(forIdentifier: .oxygenSaturation)!])
            case "SLEEP_ANALYSIS":
                return Set([HKObjectType.categoryType(forIdentifier: .sleepAnalysis)!])
            case "RESPIRATORY_RATE":
                return Set([HKObjectType.quantityType(forIdentifier: .respiratoryRate)!])
            case "NUTRITION_SODIUM":
                return Set([HKObjectType.quantityType(forIdentifier: .dietarySodium)!])
            case "NUTRITION_PROTEIN":
                return Set([HKObjectType.quantityType(forIdentifier: .dietaryProtein)!])
            case "NUTRITION_CARBOHYDRATES":
                return Set([HKObjectType.quantityType(forIdentifier: .dietaryCarbohydrates)!])
            case "NUTRITION_FIBRE":
                return Set([HKObjectType.quantityType(forIdentifier: .dietaryFiber)!])
            case "NUTRITION_FAT_TOTAL":
                return Set([HKObjectType.quantityType(forIdentifier: .dietaryFatTotal)!])
            case "NUTRITION_SUGAR":
                return Set([HKObjectType.quantityType(forIdentifier: .dietarySugar)!])
            case "NUTRITION_VITAMIN_C":
                return Set([HKObjectType.quantityType(forIdentifier: .dietaryVitaminC)!])
            case "NUTRITION_VITAMIN_A":
                return Set([HKObjectType.quantityType(forIdentifier: .dietaryVitaminA)!])
            case "NUTRITION_CALORIES":
                return Set([HKObjectType.quantityType(forIdentifier: .dietaryEnergyConsumed)!])
            case "NUTRITION_WATER":
                return Set([HKObjectType.quantityType(forIdentifier: .dietaryWater)!])
            case "NUTRITION_CHOLESTEROL":
                return Set([HKObjectType.quantityType(forIdentifier: .dietaryCholesterol)!])
            default:
                return Set([])
        }
        return Set([])
    }
    

    // permissions array to permissions set
    private func permissionsSet(permissions: [String]) -> Set<Permissions> {
        var out: Set<Permissions> = Set([])
        for permission in permissions {
            out.insert(permissionParse(permission: permission))
        }
        return out
    }

    private func customPermissionsSet(customPermissions: [String]) -> Set<HKObjectType> {
        var out: Set<HKObjectType> = Set([])

        for permission in customPermissions {
            out.formUnion(customPermissionParse(cPermission: permission))
        }

        return out
    }

    // initialize
    @objc
    func initTerra(_ devID: String, referenceId: String, sleepTimerMinutes: Int, dailyTimerMinutes: Int, bodyTimerMinutes: Int, activityTimerMinutes: Int, nutritionTimerMinutes: Int, resolve: @escaping RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock){
        terra = Terra(
            devId: devID,
            referenceId: referenceId,
            bodyTimer: Double(bodyTimerMinutes * 60),
            dailyTimer: Double(dailyTimerMinutes * 60),
            nutritionTimer: Double(nutritionTimerMinutes * 60), 
            sleepTimer: Double(sleepTimerMinutes * 60)
        )
        resolve(true)
    }
    
    @objc
    func initConnection(_ connection: String, token: String, schedulerOn: Bool, permissions: [String], customPermissions: [String], startIntent: String, resolve: @escaping RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock){
        if let connection = connectionParse(connection: connection){
            terra?.initConnection(type: connection, token: token, permissions: permissionsSet(permissions: permissions), customReadTypes: customPermissionsSet(customPermissions: customPermissions), schedulerOn: schedulerOn, completion: {success in resolve(["success": success])})
        }
        else {
            resolve(["success": false])
        }
    }

    @objc
    func getUserId(_ connection: String, resolve: @escaping RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock){
        if let connection = connectionParse(connection: connection){
            resolve(terra?.getUserid(type: connection))
        }
    }
  
    // check connection
    @objc
    func checkAuth(_ connection: String, resolve: @escaping RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) {
        if let connection = connectionParse(connection: connection){
            resolve(["authed": terra?.checkAuthentication(connection: connection)])
        }
    }
    
    // getters
    @objc
    func getBody(_ connection: String, startDate: Date, endDate: Date, resolve: @escaping RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock){
        if let connection = connectionParse(connection: connection){
            terra?.getBody(type: connection, startDate: startDate, endDate: endDate){(success: Bool, data: [TerraBodyData]?) in resolve(["success": success, "data": data])}
        }
    }
    @objc
    func getActivity(_ connection: String, startDate: Date, endDate: Date, resolve: @escaping RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock){
        if let connection = connectionParse(connection: connection){
            terra?.getActivity(type: connection, startDate: startDate, endDate: endDate){(success: Bool, data: [TerraActivityData]?) in resolve(["success": success, "data": data])}
        }
    }
    @objc
    func getAthlete(_ connection: String, resolve: @escaping RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock){
        if let connection = connectionParse(connection: connection){
            terra?.getAthlete(type: connection){(success: Bool, data: TerraAthleteData?) in resolve(["success": success, "data": data])}
        }
    }
    @objc
    func getDaily(_ connection: String, startDate: Date, endDate: Date, resolve: @escaping RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock){
        if let connection = connectionParse(connection: connection){
            terra?.getDaily(type: connection, startDate: startDate, endDate: endDate){(success: Bool, data: [TerraDailyData]?) in resolve(["success": success, "data": data])}
        }
    }
    @objc
    func getSleep(_ connection: String, startDate: Date, endDate: Date, resolve: @escaping RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock){
        if let connection = connectionParse(connection: connection){
            terra?.getSleep(type: connection, startDate: startDate, endDate: endDate){(success: Bool, data: [TerraSleepData]?) in resolve(["success": success, "data": data])}
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
                print(error) //Should never execute
            }
        }
    }

    @objc
    func activateSensor(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock){
        do {
            try terra?.activateSensor()
            resolve([])
        }
        catch {
            reject("Init", "Error activating sensor", nil)
        }
    }
    
}
