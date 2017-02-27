package com.app.patient;

import android.content.Context;
import android.content.SharedPreferences;
import android.util.Log;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

/**
 * Created by root on 7/4/16.
 */
public class CalendarPlugin  extends CordovaPlugin{
    public static final String ACTION_ADD_CALENDAR_ENTRY = "addCalendarEntry";

    private  String pref_name="patient";
    private String token="";


    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        try {

            SharedPreferences pref = cordova.getActivity().getSharedPreferences(pref_name,
                    Context.MODE_PRIVATE);
            token=pref.getString("device_type","");
            System.err.println("device_type:");
            System.err.println(token);
            Log.e("tokensss",token);

            if (ACTION_ADD_CALENDAR_ENTRY.equals(action)) {
                JSONObject arg_object = args.getJSONObject(0);

                callbackContext.success(token);
                return true;
            }
            callbackContext.error("Invalid action");
            return false;
        } catch (Exception e) {
            System.err.println("Exception: " + e.getMessage());
            callbackContext.error(e.getMessage());
            return false;
        }
    }
}
