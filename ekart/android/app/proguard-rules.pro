# --- GPay Wallet API Classes ---
-keep class com.google.android.apps.nbu.paisa.inapp.client.api.** { *; }

# --- Razorpay SDK ---
-keep class com.razorpay.** { *; }
-dontwarn com.razorpay.**

# --- Google Logging (VR) ---
-keep class com.google.common.logging.** { *; }

# --- Protobuf (nano + lite) ---
-keep class com.google.protobuf.** { *; }
-keep class com.google.protobuf.nano.** { *; }

# --- Enum & Generated Proto Wrappers ---
-keepclassmembers enum * {
    public static **[] values();
    public static ** valueOf(java.lang.String);
}

# --- ProGuard annotations used by SDKs ---
-keep class proguard.annotation.** { *; }

# --- Fix GPay internal class references if any used via reflection ---
-dontwarn com.google.android.apps.nbu.paisa.inapp.client.**
