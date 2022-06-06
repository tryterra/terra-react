package com.terrareact;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.module.annotations.ReactModule;

import co.tryterra.terra.*;

@ReactModule(name = TerraReactModule.NAME)
public class TerraReactModule extends ReactContextBaseJavaModule {
    public static final String NAME = "TerraReact";

    public TerraReactModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    @NonNull
    public String getName() {
        return NAME;
    }

    private Connections parseConnection(Connections connection){
        switch (connection){
            case "SAMSUNG":
                return Connections.SAMSUNG;
            case "GOOGLE":
                return Connections.GOOGLE_FIT;
            case "FREESTYLE_LIBRE":
                return Connections.FREESTYLE_LIBRE;
            default:
                return Connections.SAMSUNG;
        }
        return Connections.SAMSUNG;
    }

    @RequiresApi(api = Build.VERSION_CODES.M)
    @ReactMethod
    public void initTerra(String devID, String apiKey, String referenceId, int intervalMinutes, String[] connectionsStr, String[] permissionsStr, Promise promise) {
        this.terra = Terra(
                devID,
                apiKey,
                this,
                intervalMinutes * 60 * 1000,
                intervalMinutes * 60 * 1000,
                intervalMinutes * 60 * 1000,
                intervalMinutes * 60 * 1000,
                intervalMinutes * 60 * 1000,
                referenceId
                );
        for (String connection : connectionsStr) {
            switch (connection) {
                case "SAMSUNG":
                    terra.initConnection(
                        Connections.SAMSUNG,
                        this,
                        setOf(SamsungHealthpermissions.ACTIVITY, SamsungHealthpermissions.ATHLETE, SamsungHealthpermissions.BODY, SamsungHealthpermissions.DAILY, SamsungHealthpermissions.NUTRITION, SamsungHealthpermissions.SLEEP),
                        setOf()
                    );
                    break;
                case "GOOGLE":
                    terra.initConnection(
                        Connections.GOOGLE_FIT,
                        this,
                        setOf(),
                        setOf(GoogleFitPermissions.ACTIVITY, GoogleFitPermissions.ATHLETE, GoogleFitPermissions.BODY, GoogleFitPermissions.DAILY, GoogleFitPermissions.NUTRITION, GoogleFitPermissions.SLEEP)
                    );
                    break;
                case "FREESTYLE_LIBRE":
                    terra.initConnection(
                        Connections.FREESTYLE_LIBRE,
                        this,
                        setOf(),
                        setOf()
                    );
                    break;
                default:
                    break;
            }
        }
        promise.resolve("success");
    }

    @RequiresApi(api = Build.VERSION_CODES.M)
    @ReactMethod
    public void getAthlete(String connection, Promise promise){
        this.terra.getAthlete(parseConnection(connection), (success, payload) ->{
            promise.resolve("success");
        });
    }

    @RequiresApi(api = Build.VERSION_CODES.M)
    @ReactMethod
    public void getBody(String connection, Date startDate, Date endDate, Promise promise){
        this.terra.getBody(parseConnection(connection), startDate, endDate, (success, payload) ->{
            promise.resolve("success");
        });
    }

    @RequiresApi(api = Build.VERSION_CODES.M)
    @ReactMethod
    public void getActivity(String connection, Date startDate, Date endDate, Promise promise){
        this.terra.getActivity(parseConnection(connection), startDate, endDate, (success, payload) ->{
            promise.resolve("success");
        });
    }

    @RequiresApi(api = Build.VERSION_CODES.M)
    @ReactMethod
    public void getDaily(String connection, Date startDate, Date endDate, Promise promise){
        this.terra.getDaily(parseConnection(connection), startDate, endDate, (success, payload) ->{
            promise.resolve("success");
        });
    }

    @RequiresApi(api = Build.VERSION_CODES.M)
    @ReactMethod
    public void getNutrition(String connection, Date startDate, Date endDate, Promise promise){
        this.terra.getNutrition(parseConnection(connection), startDate, endDate, (success, payload) ->{
            promise.resolve("success");
        });
    }

    @RequiresApi(api = Build.VERSION_CODES.M)
    @ReactMethod
    public void getSleep(String connection, Date startDate, Date endDate, Promise promise){
        this.terra.getSleep(parseConnection(connection), startDate, endDate, (success, payload) ->{
            promise.resolve("success");
        });
    }

    @RequiresApi(api = Build.VERSION_CODES.M)
    @ReactMethod
    public void checkAuth(String connection, Promise promise){
        promise.reject("`Unimplemented function for Android");
    }

    @RequiresApi(api = Build.VERSION_CODES.M)
    @ReactMethod
    public void readGlucoseData(String connection, Promise promise){
        promise.reject("`Unimplemented function for Android");
    }

    @RequiresApi(api = Build.VERSION_CODES.M)
    @ReactMethod
    public void deauth(String connection){
        this.terra.disconnect(parseConnection(connection));
    }
}
