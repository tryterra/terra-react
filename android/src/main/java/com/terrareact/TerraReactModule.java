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
import java.time.Instant;

import co.tryterra.terra.*;
import kotlin.Unit;

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

    @ReactMethod
    public void initTerra(String devID, String apiKey, String referenceId, int intervalMinutes, ReadableArray connectionsStr, ReadableArray permissionsStr, ReadableArray customPermissions, Promise promise) {
        this.terra = new Terra(
                devID,
                apiKey,
          Objects.requireNonNull(this.getCurrentActivity()),
                intervalMinutes * 60 * 1000,
                intervalMinutes * 60 * 1000,
                intervalMinutes * 60 * 1000,
                intervalMinutes * 60 * 1000,
                intervalMinutes * 60 * 1000,
                referenceId,
                null
                );
        for (Object connection : connectionsStr.toArrayList()) {
            switch ((String) connection) {
                case "SAMSUNG":
                    
                    terra.initConnection(
                      Connections.SAMSUNG,
                      this.getCurrentActivity(),
                      new HashSet<>(Arrays.asList(Permissions.ACTIVITY, Permissions.ATHLETE, Permissions.BODY, Permissions.DAILY, Permissions.NUTRITION, Permissions.SLEEP)),
                      null
                    );
                    break;
                case "GOOGLE":
                    terra.initConnection(
                        Connections.GOOGLE_FIT,
                        this.getCurrentActivity(),
                        new HashSet<>(Arrays.asList(Permissions.ACTIVITY, Permissions.ATHLETE, Permissions.BODY, Permissions.DAILY, Permissions.NUTRITION, Permissions.SLEEP)),
                      null
                    );
                    break;
                case "FREESTYLE_LIBRE":
                    terra.initConnection(
                        Connections.FREESTYLE_LIBRE,
                        this.getCurrentActivity(),
                        new HashSet<>(),
                        null
                    );
                    break;
                default:
                    break;
            }
        }
        promise.resolve("success");
    }

    @ReactMethod
    public void getAthlete(String connection, Promise promise){
      this.terra.getAthlete(Objects.requireNonNull(parseConnection(connection)), (success, payload) ->{
            promise.resolve("success");
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

    @ReactMethod
    public void deauth(String connection){
        this.terra.disconnect(Objects.requireNonNull(parseConnection(connection)));
    }
}
