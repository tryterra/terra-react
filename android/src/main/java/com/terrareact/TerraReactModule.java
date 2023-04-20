package com.terrareact;

import android.os.Build;

import androidx.annotation.NonNull;
import androidx.annotation.RequiresApi;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.bridge.ReadableArray;


import java.util.Date;
import java.util.HashMap;
import java.util.Objects;
import java.time.Instant;
import java.util.HashSet;
import java.util.Map;

import com.google.gson.Gson;

import co.tryterra.terra.Terra;
import co.tryterra.terra.TerraManager;
import co.tryterra.terra.enums.Connections;
import co.tryterra.terra.enums.CustomPermissions;
import kotlin.Unit;

@RequiresApi(api = Build.VERSION_CODES.O)
@ReactModule(name = TerraReactModule.NAME)
public class TerraReactModule extends ReactContextBaseJavaModule {
    public static final String NAME = "TerraReact";

    private Gson gson = new Gson();

    public TerraReactModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }
    public TerraManager terra;

    @Override
    @NonNull
    public String getName() {
        return NAME;
    }

    private Connections parseConnection(String connection){
        switch (connection){
            case "SAMSUNG":
                return Connections.SAMSUNG;
            case "GOOGLE":
                return Connections.GOOGLE_FIT;
            case "FREESTYLE_LIBRE":
                return Connections.FREESTYLE_LIBRE;
        }
      return null;
    }

    private CustomPermissions parseCustomPermission(String customPermission){
        switch (customPermission){
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
            default:
                return null;
        }
    }

    @ReactMethod
    public void initTerra(String devID, String referenceId, Promise promise) {
        if (this.getCurrentActivity() == null){
            WritableMap map = new WritableNativeMap();
            map.putBoolean("success", false);
            map.putString("error", "Unable to resolve current activity");
            promise.resolve(map);
            return;
        }       

        Terra.Companion.instance(
            devID,
            referenceId,
            Objects.requireNonNull(this.getCurrentActivity()),
            (terraManager, error) ->{
                this.terra = terraManager;
                WritableMap map = new WritableNativeMap();
                map.putBoolean("success", terraManager != null);
                if (error != null){
                    map.putString("error", error.getMessage());
                }
                promise.resolve(map);
                return Unit.INSTANCE;
            });
    }

    @ReactMethod
    public void initConnection(String connection, String token, Boolean schedulerOn, ReadableArray customPermissions, String startIntent, Promise promise){
        WritableMap map = new WritableNativeMap();
        if (token == null){
            map.putBoolean("success", false);
            map.putString("error", "Please make sure you pass a valid token");
            return;
        }

        if (this.terra == null){
            map.putBoolean("success", false);
            map.putString("error", "Please make sure Terra is instantiated with initTerra");
            return;
        }

        if (parseConnection(connection) == null){
            map.putBoolean("success", false);
            map.putString("error", "Invalid Connection type passed");
            promise.resolve(map);
            return;
        }

        HashSet<CustomPermissions> cPermissions = new HashSet<>();
        for (Object customPermission: customPermissions.toArrayList()){
            if (customPermission == null){
                continue;
            }
            cPermissions.add(parseCustomPermission((String) customPermission));
        }

        this.terra.initConnection(Objects.requireNonNull(parseConnection(connection)), token, Objects.requireNonNull(this.getCurrentActivity()), cPermissions, schedulerOn, startIntent,
            (success, error)-> {
            map.putBoolean("success", success);
            if (error != null){
                map.putString("error", error.getMessage());
            }
            promise.resolve(map);
            return Unit.INSTANCE;
        });
    }

    @ReactMethod
    public void getUserId(String connection, Promise promise){
        WritableMap map = new WritableNativeMap();
        if (this.terra == null){
            map.putBoolean("success", false);
            map.putString("error", "Please make sure Terra is instantiated with initTerra");
            return;
        }

        if (parseConnection(connection) == null){
            map.putBoolean("success", false);
            map.putString("error", "Invalid Connection type passed");
            promise.resolve(map);
            return;
        }

        map.putBoolean("success", true);
        map.putString("userId", this.terra.getUserId(Objects.requireNonNull(parseConnection(connection))));
        promise.resolve(map);
    }

    @ReactMethod
    public void getAthlete(String connection, Boolean toWebhook, Promise promise){
        promise.reject("Unimplemented function for Android");
    }

    @ReactMethod
    public void getBody(String connection, String startDate, String endDate, Boolean latestReading, Boolean toWebhook, Promise promise){
        WritableMap map = new WritableNativeMap();
        if (this.terra == null){
            map.putBoolean("success", false);
            map.putString("error", "Please make sure Terra is instantiated with initTerra");
            return;
        }
        
        if (parseConnection(connection) == null){
            map.putBoolean("success", false);
            map.putString("error", "Invalid Connection type passed");
            promise.resolve(map);
            return;
        }

        this.terra.getBody(
          Objects.requireNonNull(parseConnection(connection)),
          Date.from(Instant.parse(startDate)),
          Date.from(Instant.parse(endDate)),
          toWebhook,
          (success, data, error) ->{
            map.putBoolean("success", success);
            if (data != null){
                map.putString("data", gson.toJson(data));
            }
            if (error != null){
                map.putString("error", error.getMessage());
            }
            promise.resolve(map);
            return Unit.INSTANCE;
        });
    }

    @ReactMethod
    public void getActivity(String connection, String startDate, String endDate, Boolean toWebhook, Promise promise){
        WritableMap map = new WritableNativeMap();
        if (this.terra == null){
            map.putBoolean("success", false);
            map.putString("error", "Please make sure Terra is instantiated with initTerra");
            return;
        }

        if (parseConnection(connection) == null){
            map.putBoolean("success", false);
            map.putString("error", "Invalid Connection type passed");
            promise.resolve(map);
            return;
        }

        this.terra.getActivity(
          Objects.requireNonNull(parseConnection(connection)),
          Date.from(Instant.parse(startDate)),
          Date.from(Instant.parse(endDate)),
          toWebhook,
          (success, data, error) ->{
            map.putBoolean("success", success);
            if (data != null){
                map.putString("data", gson.toJson(data));
            }            
            if (error != null){
                map.putString("error", error.getMessage());
            }
            promise.resolve(map);
            return Unit.INSTANCE;
        });
    }

    @ReactMethod
    public void getDaily(String connection, String startDate, String endDate, Boolean toWebhook, Promise promise){
        WritableMap map = new WritableNativeMap();
        if (this.terra == null){
            map.putBoolean("success", false);
            map.putString("error", "Please make sure Terra is instantiated with initTerra");
            return;
        }

        if (parseConnection(connection) == null){
            map.putBoolean("success", false);
            map.putString("error", "Invalid Connection type passed");
            promise.resolve(map);
            return;
        }

        this.terra.getDaily(
          Objects.requireNonNull(parseConnection(connection)),
          Date.from(Instant.parse(startDate)),
          Date.from(Instant.parse(endDate)),
          toWebhook,
          (success, data, error) ->{
            map.putBoolean("success", success);
            if (data != null){
                map.putString("data", gson.toJson(data));
            }
            if (error != null){
                map.putString("error", error.getMessage());
            }
            promise.resolve(map);
            return Unit.INSTANCE;
        });
    }

    @ReactMethod
    public void getNutrition(String connection, String startDate, String endDate, Boolean toWebhook, Promise promise){
        WritableMap map = new WritableNativeMap();
        if (this.terra == null){
            map.putBoolean("success", false);
            map.putString("error", "Please make sure Terra is instantiated with initTerra");
            return;
        }

        if (parseConnection(connection) == null){
            map.putBoolean("success", false);
            map.putString("error", "Invalid Connection type passed");
            promise.resolve(map);
            return;
        }

        this.terra.getNutrition(
          Objects.requireNonNull(parseConnection(connection)),
          Date.from(Instant.parse(startDate)),
          Date.from(Instant.parse(endDate)),
          toWebhook,
          (success, data, error) ->{
            map.putBoolean("success", success);
            if (data != null){
                map.putString("data", gson.toJson(data));
            }
            if (error != null){
                map.putString("error", error.getMessage());
            }
            promise.resolve(map);
            return Unit.INSTANCE;
        });
    }

    @ReactMethod
    public void getSleep(String connection, String startDate, String endDate, Boolean toWebhook, Promise promise){
        WritableMap map = new WritableNativeMap();
        if (this.terra == null){
            map.putBoolean("success", false);
            map.putString("error", "Please make sure Terra is instantiated with initTerra");
            return;
        }

        if (parseConnection(connection) == null){
            map.putBoolean("success", false);
            map.putString("error", "Invalid Connection type passed");
            promise.resolve(map);
            return;
        }

        this.terra.getSleep(
          Objects.requireNonNull(parseConnection(connection)),
          Date.from(Instant.parse(startDate)),
          Date.from(Instant.parse(endDate)),
          toWebhook,
          (success, data, error) ->{
            map.putBoolean("success", success);
            if (data != null){
                map.putString("data", gson.toJson(data));
            }
            if (error != null){
                map.putString("error", error.getMessage());
            }
            promise.resolve(map);
            return Unit.INSTANCE;
        });
    }

    @ReactMethod
    public void getMenstruation(String connection, String startDate, String endDate, Boolean toWebhook, Promise promise){
        promise.reject("Unimplemented function for Android");
    }

    @ReactMethod
    public void checkAuth(String connection, Promise promise){
        promise.reject("Unimplemented function for Android");
    }

    @ReactMethod
    public void readGlucoseData(Promise promise){
        if (this.terra == null){
            WritableMap map = new WritableNativeMap();
            map.putBoolean("success", false);
            map.putString("error", "Please make sure Terra is instantiated with initTerra");
            return;
        }

        this.terra.readGlucoseData((details) -> {
            promise.resolve(gson.toJson(details));
            return Unit.INSTANCE;
        });
    }

    @ReactMethod
    public void activateSensor(Promise promise){
        WritableMap map = new WritableNativeMap();
        map.putBoolean("success", true);
        promise.resolve(map);
    }

    @ReactMethod
    public void grantedPermissions(Promise promise){
        if (this.terra == null){
            WritableArray perms = new WritableNativeArray();
            promise.resolve(perms);
            return;
        }

        terra.allGivenPermissions((permissions) -> {
            WritableArray perms = new WritableNativeArray();
            permissions.forEach((perm) -> {
                perms.pushString(perm);
            });
            promise.resolve(perms);
            return Unit.INSTANCE;
        });
    }

    @ReactMethod
    public void openHealthConnect(Promise promise){
        if (this.getCurrentActivity() == null){
            return;
        }
        Terra.Companion.openHealthConnect(Objects.requireNonNull(this.getCurrentActivity()));
    }

    @ReactMethod
    public void isHealthConnectAvailable(Promise promise){
        if (this.getCurrentActivity() == null){
            promise.resolve(false);
            return;
        }
        promise.resolve(Terra.Companion.isHealthConnectAvailable(Objects.requireNonNull(this.getCurrentActivity())));
    }
}
