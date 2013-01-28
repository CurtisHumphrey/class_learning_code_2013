// Generated by CoffeeScript 1.3.3

/*
  @author Curtis M. Humphrey, Ph.D.
  
  This file generates and fires an event: 'app_init', after 
    everything has correctly "booted" e.g., PhoneGap, Dom, jQueryMobile
      
  Dependence (from global namespace):
    $   - jQuery
    infuser - infuser (part of ko templates)
    deviceready event - from PhoneGap
    mobile_system - from index.html file
    mobileinit event - from jQueryMobile
      
  Public API or Events:
    Fires 'app_init' event with {mobile: mobile_system}
*/


(function() {
  var Check_App_Readiness, On_DOM_Ready, On_Device_Ready, On_Mobile_Ready, device_ready, dom_ready, jqm_mobile_init;

  device_ready = false;

  jqm_mobile_init = false;

  dom_ready = false;

  Check_App_Readiness = function() {
    if (jqm_mobile_init && dom_ready && (!mobile_system || device_ready)) {
      console.log("App Initializing");
      infuser.defaults.templateUrl = "ko_templates";
      $(document).trigger('app_init', {
        mobile: mobile_system
      });
    }
  };

  On_Device_Ready = function() {
    device_ready = true;
    console.log("Device Ready");
    return Check_App_Readiness();
  };

  On_DOM_Ready = function() {
    console.log("jQuery Ready");
    dom_ready = true;
    return Check_App_Readiness();
  };

  On_Mobile_Ready = function() {
    console.log("Mobile jQuery Ready");
    $.support.cors = true;
    $.mobile.allowCrossDomainPages = true;
    jqm_mobile_init = true;
    return Check_App_Readiness();
  };

  $(document).ready(function() {
    return On_DOM_Ready();
  });

  $(document).bind("mobileinit", On_Mobile_Ready);

  document.addEventListener("deviceready", On_Device_Ready, false);

}).call(this);