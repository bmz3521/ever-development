package com.ever;
import android.content.res.Configuration;

import android.app.Application;
import android.content.Context;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.planrn.MyAppPackage;
// import com.reactnative.googlefit.GoogleFitPackage;
import com.reactnativecommunity.webview.RNCWebViewPackage;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import java.lang.reflect.InvocationTargetException;
import java.util.List;
import com.facebook.react.bridge.JSIModulePackage; // <- add
import com.swmansion.reanimated.ReanimatedJSIModulePackage; // <- add
import com.twiliorn.library.TwilioPackage;
import com.ovalmoney.fitness.RNFitnessPackage;
import com.intercom.reactnative.IntercomModule;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost =
      new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
          return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
          @SuppressWarnings("UnnecessaryLocalVariable")
          List<ReactPackage> packages = new PackageList(this).getPackages();
          packages.add(new TwilioPackage());
          packages.add(new MyAppPackage());
          return packages;
        }

        @Override
        protected String getJSMainModuleName() {
          return "index";
        }

          @Override
          protected JSIModulePackage getJSIModulePackage() {
              return new ReanimatedJSIModulePackage(); // <- add
          }
      };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, false);
    IntercomModule.initialize(this,"android_sdk-79b9eda94ab48b22d99ff20ec10fb46bd91393f8", "gp9m74me");
    initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
  }

  private static void initializeFlipper(Context context, ReactInstanceManager reactInstanceManager) {
    if (BuildConfig.DEBUG) {
      try {
        Class<?> aClass = Class.forName("com.ever.ReactNativeFlipper");
        aClass.getMethod("initializeFlipper", Context.class, ReactInstanceManager.class).invoke(null, context, reactInstanceManager);
      } catch (ClassNotFoundException e) {
        e.printStackTrace();
      } catch (NoSuchMethodException e) {
        e.printStackTrace();
      } catch (IllegalAccessException e) {
        e.printStackTrace();
      } catch (InvocationTargetException e) {
        e.printStackTrace();
      }
    }
  }

}
