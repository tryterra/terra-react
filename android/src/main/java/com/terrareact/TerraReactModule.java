package com.terrareact;

import android.os.Build;

import androidx.annotation.NonNull;
import androidx.annotation.RequiresApi;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.bridge.ReadableArray;


import java.util.Arrays;
import java.util.Date;
import java.util.HashSet;
import java.util.Objects;
import java.util.Date;
import java.io.IOException;
import java.time.Instant;

import co.tryterra.terra.*;
import kotlin.Unit;

@RequiresApi(api = Build.VERSION_CODES.O)
@ReactModule(name = TerraReactModule.NAME)
public class TerraReactModule extends ReactContextBaseJavaModule {
    public static final String NAME = "TerraReact";

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

    private Permissions parsePermissions(String permission){
        switch (permission){
            case "ACTIVITY":
                return Permissions.ACTIVITY;
            case "ATHLETE":
                return Permissions.ATHLETE;
            case "BODY":
                return Permissions.BODY;
            case "DAILY":
                return Permissions.DAILY;
            case "NUTRITION":
                return Permissions.NUTRITION;
            case "SLEEP":
                return Permissions.SLEEP;
        }
        return null;
    }

    @ReactMethod
    public void initTerra(String devID, String referenceId, int sleepTimerMinutes, int dailyTimerMinutes, int bodyTimerMinutes, int activityTimerMinutes, int nutritionTimerMinutes, Promise promise) {
        try{
            this.terra = new Terra(
                devID,
            Objects.requireNonNull(this.getCurrentActivity()),
                bodyTimerMinutes * 60 * 1000,
                sleepTimerMinutes * 60 * 1000,
                dailyTimerMinutes * 60 * 1000,
                nutritionTimerMinutes * 60 * 1000,
                activityTimerMinutes * 60 * 1000,
                referenceId,
                null
                );
            promise.resolve(true);
        }
        catch(Exception e){
            promise.resolve(false);
        }
    }

    @ReactMethod
    public void initConnection(String connection, String token, Boolean schedulerOn, ReadableArray permissions, ReadableArray customPermissions, Promise promise){
        if (parseConnection(connection) == null){
            return;
        }

        HashSet<Permissions> perms = new HashSet<>();
        for (Object permission: permissions.toArrayList()){
            perms.add(parsePermissions((String) permission));
        }
      this.terra.initConnection(Objects.requireNonNull(parseConnection(connection)), token, Objects.requireNonNull(this.getCurrentActivity()), perms, schedulerOn, null,
          (success)-> {promise.resolve(success);
          return Unit.INSTANCE;
      });
    }

    @ReactMethod 
    public void getUserId(String connection, Promise promise){
        promise.resolve(this.terra.getUserId(Objects.requireNonNull(parseConnection(connection))));
    }

    @ReactMethod
    public void getAthlete(String connection, Promise promise){
      this.terra.getAthlete(Objects.requireNonNull(parseConnection(connection)), (success, payload) ->{
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
          (success, payload) ->{
            promise.resolve("success");
            return Unit.INSTANCE;
        });
    }

    @ReactMethod
    public void getActivity(String connection, String startDate, String endDate, Promise promise){
        this.terra.getActivity(
          Objects.requireNonNull(parseConnection(connection)),
          Date.from(Instant.parse(startDate)),
          Date.from(Instant.parse(endDate)),
          (success, payload) ->{
            promise.resolve("success");
            return Unit.INSTANCE;
        });
    }

    @ReactMethod
    public void getDaily(String connection, String startDate, String endDate, Promise promise){
        this.terra.getDaily(
          Objects.requireNonNull(parseConnection(connection)),
          Date.from(Instant.parse(startDate)),
          Date.from(Instant.parse(endDate)),
          (success, payload) ->{
            promise.resolve("success");
            return Unit.INSTANCE;
        });
    }

    @ReactMethod
    public void getNutrition(String connection, String startDate, String endDate, Promise promise){
        this.terra.getNutrition(
          Objects.requireNonNull(parseConnection(connection)),
          Date.from(Instant.parse(startDate)),
          Date.from(Instant.parse(endDate)),
          (success, payload) ->{
            promise.resolve("success");
            return Unit.INSTANCE;
        });
    }

    @ReactMethod
    public void getSleep(String connection, String startDate, String endDate, Promise promise){
        this.terra.getSleep(
          Objects.requireNonNull(parseConnection(connection)),
          Date.from(Instant.parse(startDate)),
          Date.from(Instant.parse(endDate)),
          (success, payload) ->{
            promise.resolve("success");
            return Unit.INSTANCE;
        });
    }

    @ReactMethod
    public void checkAuth(String connection, Promise promise){
        promise.reject("`Unimplemented function for Android");
    }

    @ReactMethod
    public void readGlucoseData(String connection, Promise promise){
        promise.reject("`Unimplemented function for Android");
    }
}
