//
//  Created by Jaafar Rammal on 06/06/2022.
//

#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(TerraReact, NSObject)

// init
RCT_EXTERN_METHOD(
    initTerra: (NSString *)devID
    referenceId: (NSString *)referenceId
    sleepTimerMinutes: (NSInteger *)sleepTimerMinutes
    dailyTimerMinutes: (NSInteger *)dailyTimerMinutes
    bodyTimerMinutes: (NSInteger *)bodyTimerMinutes
    activityTimerMinutes: (NSInteger *)activityTimerMinutes
    nutritionTimerMinutes: (NSInteger *)nutritionTimerMinutes
    resolve: (RCTPromiseResolveBlock)resolve
    rejecter: (RCTPromiseRejectBlock)reject
)


RCT_EXTERN_METHOD(
    initConnection: (NSString *)connection
    token: (NSString *)token
    schedulerOn: (BOOL)schedulerOn
    permissions: (NSArray *)permissions
    customPermissions: (NSArray *)customPermissions
    resolve: (RCTPromiseResolveBlock)resolve
    rejecter: (RCTPromiseRejectBlock)reject
)

// check connection
RCT_EXTERN_METHOD(
    checkAuth: (NSString *)connection
    resolve: (RCTPromiseResolveBlock)resolve
    rejecter: (RCTPromiseRejectBlock)reject
)

RCT_EXTERN_METHOD(
    getUserId: (NSString *)connection
    resolve: (RCTPromiseResolveBlock)resolve
    rejecter: (RCTPromiseRejectBlock)reject
)

// getters
RCT_EXTERN_METHOD(
    getAthlete: (NSString *)connection
    resolve: (RCTPromiseResolveBlock)resolve
    rejecter: (RCTPromiseRejectBlock)reject
)
RCT_EXTERN_METHOD(
    getBody: (NSString *)connection
    startDate: (NSDate *)startDate
    endDate:(NSDate *)endDate
    resolve: (RCTPromiseResolveBlock)resolve
    rejecter: (RCTPromiseRejectBlock)reject
)
RCT_EXTERN_METHOD(
    getDaily:  (NSString *)connection
    startDate: (NSDate *)startDate
    endDate:(NSDate *)endDate
    resolve: (RCTPromiseResolveBlock)resolve
    rejecter: (RCTPromiseRejectBlock)reject
)
RCT_EXTERN_METHOD(
    getSleep:  (NSString *)connection
    startDate: (NSDate *)startDate
    endDate:(NSDate *)endDate
    resolve: (RCTPromiseResolveBlock)resolve
    rejecter: (RCTPromiseRejectBlock)reject
)
RCT_EXTERN_METHOD(
    getActivity:  (NSString *)connection
    startDate: (NSDate *)startDate
    endDate:(NSDate *)endDate
    resolve: (RCTPromiseResolveBlock)resolve
    rejecter: (RCTPromiseRejectBlock)reject
)
RCT_EXTERN_METHOD(
    getNutrition:  (NSString *)connection
    startDate: (NSDate *)startDate
    endDate:(NSDate *)endDate
    resolve: (RCTPromiseResolveBlock)resolve
    rejecter: (RCTPromiseRejectBlock)reject
)

// Freestyle glucose init
RCT_EXTERN_METHOD(
    readGlucoseData:(RCTPromiseResolveBlock)resolve
    rejecter: (RCTPromiseRejectBlock)reject
)

RCT_EXTERN_METHOD(
    activateSensor:(RCTPromiseResolveBlock)resolve
    rejecter: (RCTPromiseRejectBlock)reject
)

@end
