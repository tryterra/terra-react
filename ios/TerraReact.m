//
//  Created by Jaafar Rammal on 06/06/2022.
//

#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(TerraReact, NSObject)

// init
RCT_EXTERN_METHOD(
    initTerra: (NSString *)devID
    referenceId: (NSString *)referenceId
    resolve: (RCTPromiseResolveBlock)resolve
    rejecter: (RCTPromiseRejectBlock)reject
)

// initConnection
RCT_EXTERN_METHOD(
    initConnection: (NSString *)connection
    token: (NSString *)token
    schedulerOn: (BOOL)schedulerOn
    customPermissions: (NSArray *)customPermissions
    startIntent: (NSString *)startIntent
    resolve: (RCTPromiseResolveBlock)resolve
    rejecter: (RCTPromiseRejectBlock)reject
)

// check connection
RCT_EXTERN_METHOD(
    checkAuth: (NSString *)connection
    devID: (NSString *)devID
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
    toWebhook: (BOOL)toWebhook
    resolve: (RCTPromiseResolveBlock)resolve
    rejecter: (RCTPromiseRejectBlock)reject
)
RCT_EXTERN_METHOD(
    getBody: (NSString *)connection
    startDate: (NSDate *)startDate
    endDate: (NSDate *)endDate
    latestReading: (BOOL) latestReading
    toWebhook: (BOOL)toWebhook
    resolve: (RCTPromiseResolveBlock)resolve
    rejecter: (RCTPromiseRejectBlock)reject
)
RCT_EXTERN_METHOD(
    getDaily:  (NSString *)connection
    startDate: (NSDate *)startDate
    endDate:(NSDate *)endDate
    toWebhook: (BOOL)toWebhook
    resolve: (RCTPromiseResolveBlock)resolve
    rejecter: (RCTPromiseRejectBlock)reject
)
RCT_EXTERN_METHOD(
    getSleep:  (NSString *)connection
    startDate: (NSDate *)startDate
    endDate:(NSDate *)endDate
    toWebhook: (BOOL)toWebhook
    resolve: (RCTPromiseResolveBlock)resolve
    rejecter: (RCTPromiseRejectBlock)reject
)
RCT_EXTERN_METHOD(
    getActivity:  (NSString *)connection
    startDate: (NSDate *)startDate
    endDate:(NSDate *)endDate
    toWebhook: (BOOL)toWebhook
    resolve: (RCTPromiseResolveBlock)resolve
    rejecter: (RCTPromiseRejectBlock)reject
)
RCT_EXTERN_METHOD(
    getMenstruation: (NSString *)connection
    startDate: (NSDate *)startDate
    endDate:(NSDate *)endDate
    toWebhook: (BOOL)toWebhook
    resolve: (RCTPromiseResolveBlock)resolve
    rejecter: (RCTPromiseRejectBlock)reject
)
RCT_EXTERN_METHOD(
    getNutrition:  (NSString *)connection
    startDate: (NSDate *)startDate
    endDate:(NSDate *)endDate
    toWebhook: (BOOL)toWebhook
    resolve: (RCTPromiseResolveBlock)resolve
    rejecter: (RCTPromiseRejectBlock)reject
)

RCT_EXTERN_METHOD(
    postActivity: (NSString *)connection
    payload: (NSDictionary *)payload
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

RCT_EXTERN_METHOD(
    isHealthConnectAvailable:(RCTPromiseResolveBlock)resolve
    rejecter: (RCTPromiseRejectBlock)reject
)

RCT_EXTERN_METHOD(
    openHealthConnect:(RCTPromiseResolveBlock)resolve
    rejecter: (RCTPromiseRejectBlock)reject
)

RCT_EXTERN_METHOD(
    grantedPermissions:(RCTPromiseResolveBlock)resolve
    rejecter: (RCTPromiseRejectBlock)reject
)

RCT_EXTERN_METHOD(
    setIgnoredSources:(NSArray *)ignoredSources
    resolve: (RCTPromiseResolveBlock)resolve
    rejecter: (RCTPromiseRejectBlock)reject
)

@end
