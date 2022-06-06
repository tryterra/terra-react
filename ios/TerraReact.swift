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

    // terra instance managed
    private var terra: Terra?
    
    // connection type translate
    private func connectionParse(connection: String) -> Connections {
        switch connection {
            case "APPLE_HEALTH":
                return Connections.APPLE_HEALTH
            case "FREESTYLE_LIBRE":
                return Connections.FREESTYLE_LIBRE
            default:
                print("Passed invalid connection")
        }
      return Connections.APPLE_HEALTH
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
    
    // connection array to connection set
    private func connectionsSet(connections: [String]) -> Set<Connections> {
        var out: Set<Connections> = Set([])
        for connection in connections {
            out.insert(connectionParse(connection: connection))
        }
        return out
    }

    // permissions array to permissions set
    private func permissionsSet(permissions: [String]) -> Set<Permissions> {
        var out: Set<Permissions> = Set([])
        for permission in permissions {
            out.insert(permissionParse(permission: permission))
        }
        return out
    }

    // initialize
    @objc
    func initTerra(_ devID: String, apiKey: String, referenceId: String, intervalMinutes: Int, connectionsStr: [String], permissionsStr: [String], resolve: @escaping RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock){
        do {
            terra = try Terra(
                            devId: devID,
                            xAPIKey: apiKey,
                            referenceId: referenceId,
                            bodySleepDailyInterval: 60,
                            connections: connectionsSet(connections: connectionsStr),
                            permissions: permissionsSet(permissions: permissionsStr)
                            // TODO add HKTypes
                        ){(success: Bool) in resolve(["success": success])}
        } catch {
            reject("Init", "Init failed, further debug messages avaialble in Xcode", nil)
        }
    }
  
    // check connection
    @objc
    func checkAuth(_ connection: String, resolve: @escaping RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) {
        resolve(["authed": terra?.checkAuthentication(connection: connectionParse(connection: connection))])
    }
    
    // getters
    @objc
    func getBody(_ connection: String, startDate: Date, endDate: Date, resolve: @escaping RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock){
        terra?.getBody(type: connectionParse(connection: connection), startDate: startDate, endDate: endDate){(success: Bool, data: [TerraBodyData]?) in resolve(["success": success, "data": data])}
    }
    @objc
    func getActivity(_ connection: String, startDate: Date, endDate: Date, resolve: @escaping RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock){
        terra?.getActivity(type: connectionParse(connection: connection), startDate: startDate, endDate: endDate){(success: Bool, data: [TerraActivityData]?) in resolve(["success": success, "data": data])}
    }
    @objc
    func getAthlete(_ connection: String, resolve: @escaping RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock){
        terra?.getAthlete(type: connectionParse(connection: connection)){(success: Bool, data: TerraAthleteData?) in resolve(["success": success, "data": data])}
    }
    @objc
    func getDaily(_ connection: String, startDate: Date, endDate: Date, resolve: @escaping RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock){
        terra?.getDaily(type: connectionParse(connection: connection), startDate: startDate, endDate: endDate){(success: Bool, data: [TerraDailyData]?) in resolve(["success": success, "data": data])}
    }
    @objc
    func getSleep(_ connection: String, startDate: Date, endDate: Date, resolve: @escaping RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock){
        terra?.getSleep(type: connectionParse(connection: connection), startDate: startDate, endDate: endDate){(success: Bool, data: [TerraSleepData]?) in resolve(["success": success, "data": data])}
    }
    
    // Freestyle glucose init
    @objc
    func readGlucoseData(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock){
        do {
            try terra?.readGlucoseData()
            resolve([])
        } catch {
            reject("Init", "Init failed, further debug messages avaialble in Xcode", nil)
        }
    }
    
    // deauth
    @objc
    func deauth(_ connection: String){
        terra?.disconnectTerra(type: connectionParse(connection: connection))
    }
}
