import Foundation
import TerraiOS


// At the moment we will only write rudimentary fields to HealthKit
// Namely: distance, calories, start time, end time, workout type and device
func convertToTerraActivityPayload(_ data: NSDictionary) -> TerraActivityData? {
    guard let metadata = data["metadata"] as? NSDictionary else {
        return nil
    }
    
    guard let deviceData = data["device_data"] as? NSDictionary else {
        return nil
    }
    
    guard let distanceData = data["distance_data"] as? NSDictionary else {
        return nil
    }
    
    guard let caloriesData = data["calories_data"] as? NSDictionary else {
        return nil
    }

    var distanceMeters: Double? = nil 
    if let summary = distanceData["summary"] as? NSDictionary {
        distanceMeters = summary["distance_meters"] as? Double
    }
    
    return TerraActivityData(
        metadata: .init(
            type: metadata["type"] as? Int,
            end_time: metadata["end_time"] as? String,
            start_time: metadata["start_time"] as? String),
        device_data: .init(
            software_version: deviceData["software_version"] as? String,
            manufacturer: deviceData["manufacturer"] as? String,
            serial_number: deviceData["serial_number"] as? String,
            name: deviceData["name"] as? String,
            hardware_version: deviceData["hardware_version"] as? String
        ),
        distance_data: .init(summary: .init(distance_meters: distanceMeters)),
        calories_data: .init(TerraCaloriesData(net_activity_calories: caloriesData["net_activity_calories"] as? Double))
    )
}


