//
//  Created by Jaafar Rammal on 06/06/2022.
//

import Foundation
import TerraiOS

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
            out.insert(customPermissionParse(cPermission: permission)!)
        }

        return out
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
    func initConnection(_ connection: String, token: String, schedulerOn: Bool, customPermissions: [String], startIntent: String, resolve: @escaping RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock){
        if let connection = connectionParse(connection: connection){
            terra?.initConnection(type: connection, token: token, customReadTypes: customPermissionsSet(customPermissions: customPermissions), schedulerOn: schedulerOn, completion: {success, error in
                    if let error = error{
                        resolve(["success": success, "error": self.errorMessage(error)])
                    }
                    else{
                        resolve(["success": success])
                    }
                }
            )
        }
        else {
            resolve(["success", false, "error", "Invalid Connection Type"])
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
        guard let connection = connectionParse(connection: connection) else {
            resolve(["success": false, "data": nil, "error": "Invalid Connection Type"])
            return
        }
        
        guard let activityPayload = convertToTerraActivityPayload(payload) else {
            resolve(["success": false, "data": nil, "error": "Invalid intput payload"])
            return
        }
        
        if #available(iOS 14, *) {
            terra?.postActivity(type: connection, payload: activityPayload){
                (success, err) in
                if let err = err {
                    resolve(["success": false, "error": self.errorMessage(err)])
                }
                else{
                    resolve(["success": success, "error": nil])
                }
            }
        } else {
            resolve(["success": false, "error": "postActivity is only available for iOS 14 and above"])
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
}
