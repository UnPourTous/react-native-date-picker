package com.reactnativedatepicker;

import com.facebook.react.ReactActivity;
import android.webkit.WebView;
import android.os.Bundle;

public class MainActivity extends ReactActivity {
    @Override
    public void onCreate(Bundle var1) {
        super.onCreate(var1);
        WebView.setWebContentsDebuggingEnabled(true);
    }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "ReactNativeDatepicker";
    }
}
