package com.terrareact;

import android.os.Build;
import android.app.Activity;

import androidx.annotation.NonNull;
import androidx.annotation.RequiresApi;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.bridge.ReadableArray;


import java.util.Date;
import java.util.Objects;
import java.time.Instant;
import java.util.HashSet;

import com.google.gson.Gson;


import co.tryterra.terra.Terra;
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
    public Terra terra;
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
        try{
            this.terra = new Terra(
                devID,
                Objects.requireNonNull(this.getCurrentActivity()),
                referenceId,
                (success) -> {
                    promise.resolve(success);
                    return Unit.INSTANCE;
                });
        }
        catch(Exception e){
            promise.resolve(false);
        }
    }

    @ReactMethod
    public void initConnection(String connection, String token, Boolean schedulerOn, ReadableArray customPermissions, String startIntent, Promise promise){
        if (parseConnection(connection) == null){
            promise.resolve(false);
            return;
        }

        Activity activity = this.getCurrentActivity();

        if (activity == null){
            promise.resolve(false);
            return;
        }

        HashSet<CustomPermissions> cPermissions = new HashSet<>();
        for (Object customPermission: customPermissions.toArrayList()){
            if (customPermission == null){
                continue;
            }
            cPermissions.add(parseCustomPermission((String) customPermission));
        }

        try {
            this.terra.initConnection(Objects.requireNonNull(parseConnection(connection)), token, Objects.requireNonNull(this.getCurrentActivity()), cPermissions, schedulerOn, startIntent,
                (success)-> {promise.resolve(success);
                return Unit.INSTANCE;
            });
        } catch (Exception e){
            e.printStackTrace();
        }
    }

    @ReactMethod
    public void getUserId(String connection, Promise promise){
        promise.resolve(this.terra.getUserId(Objects.requireNonNull(parseConnection(connection))));
    }

    @ReactMethod
    public void getAthlete(String connection, Promise promise){
      this.terra.getAthlete(Objects.requireNonNull(parseConnection(connection)), (success) ->{
            promise.resolve(success);
            return Unit.INSTANCE;
        });
    }

    @ReactMethod
    public void getBody(String connection, String startDate, String endDate, Promise promise){
        this.terra.getBody(
          Objects.requireNonNull(parseConnection(connection)),
          Date.from(Instant.parse(startDate)),
          Date.from(Instant.parse(endDate)),
          (success) -> {
            promise.resolve(success);
            return Unit.INSTANCE;
        });
    }

    @ReactMethod
    public void getActivity(String connection, String startDate, String endDate, Promise promise){
        this.terra.getActivity(
          Objects.requireNonNull(parseConnection(connection)),
          Date.from(Instant.parse(startDate)),
          Date.from(Instant.parse(endDate)),
          (success) ->{
            promise.resolve(success);
            return Unit.INSTANCE;
        });
    }

    @ReactMethod
    public void getDaily(String connection, String startDate, String endDate, Promise promise){
        this.terra.getDaily(
          Objects.requireNonNull(parseConnection(connection)),
          Date.from(Instant.parse(startDate)),
          Date.from(Instant.parse(endDate)),
          (success) ->{
            promise.resolve(success);
            return Unit.INSTANCE;
        });
    }

    @ReactMethod
    public void getNutrition(String connection, String startDate, String endDate, Promise promise){
        this.terra.getNutrition(
          Objects.requireNonNull(parseConnection(connection)),
          Date.from(Instant.parse(startDate)),
          Date.from(Instant.parse(endDate)),
          (success) ->{
            promise.resolve(success);
            return Unit.INSTANCE;
        });
    }

    @ReactMethod
    public void getSleep(String connection, String startDate, String endDate, Promise promise){
        this.terra.getSleep(
          Objects.requireNonNull(parseConnection(connection)),
          Date.from(Instant.parse(startDate)),
          Date.from(Instant.parse(endDate)),
          (success) ->{
            promise.resolve(success);
            return Unit.INSTANCE;
        });
    }

    @ReactMethod
    public void getMenstruation(String connection, String startDate, String endDate, Promise promise){
        promise.reject("Unimplemented function for Android");
    }
    
    @ReactMethod
    public void checkAuth(String connection, Promise promise){
        promise.reject("Unimplemented function for Android");
    }

    @ReactMethod
    public void readGlucoseData(Promise promise){
        this.terra.readGlucoseData((details) -> {
            promise.resolve(gson.toJson(details));
            return Unit.INSTANCE;
        });
    }

    @ReactMethod
    public void activateSensor(Promise promise){
        promise.resolve("success");
    }

    @ReactMethod
    public void setUpBackgroundDelivery(){
        return;
    }
}
