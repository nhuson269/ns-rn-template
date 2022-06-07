import analytics, { FirebaseAnalyticsTypes } from "@react-native-firebase/analytics";
import { RouteName } from "navigators/shared/routes";

class AnalyticsService {
  anaModule: FirebaseAnalyticsTypes.Module;

  constructor() {
    this.anaModule = analytics();
  }

  setUserId(userId: number) {
    const userIdStr = userId.toString();
    this.anaModule.setUserId(userIdStr);
    this.anaModule.setUserProperty("user_id", userIdStr);
    this.anaModule.setDefaultEventParameters({ user_id: userIdStr });
  }

  removeUserId() {
    this.anaModule.setUserId(null);
    this.anaModule.setUserProperty("user_id", null);
    this.anaModule.setDefaultEventParameters({ user_id: null });
  }

  signUp() {
    this.anaModule.logEvent("sign_up");
  }

  signUpConfirm() {
    this.anaModule.logEvent("sign_up_confirm");
  }

  forgotPassword() {
    this.anaModule.logEvent("forgot_password");
  }

  forgotPasswordConfirm() {
    this.anaModule.logEvent("forgot_password_confirm");
  }

  buttonSignIn() {
    this.anaModule.logEvent("sign_in");
  }

  changePassword() {
    this.anaModule.logEvent("change_password");
  }

  buttonSignOut() {
    this.anaModule.logEvent("sign_out");
  }

  logScreenView(screenName: string, params?: any) {
    let sName: string | undefined;
    switch (screenName) {
      case RouteName.SIGN_IN:
        // sName = "Signin";
        break;
      case RouteName.SIGN_UP:
        // sName = "Signup";
        break;
      case RouteName.FORGOT_PASSWORD:
        // sName = "Forgotpassword";
        break;
      case RouteName.HOME:
        if (params?.roomId) {
          // sName = "Zoom";
        } else {
          // sName = "Home";
        }
        break;
      default:
        break;
    }
    if (sName) {
      analytics().logScreenView({ screen_class: screenName, screen_name: sName });
    }
  }
}

const analyticsService = new AnalyticsService();

export default analyticsService;
