(function(){
  /*jslint node: true, browser: true */
  /*global $tw: false */
  "use strict";

  exports.startup = function() {
    $tw.rootWidget.addEventListener("tm-system-notify", function(event) {
      var paramObject = event.paramObject || {};
      var title = paramObject.title || "TiddlyWiki";
      var body = paramObject.body || "";
      if (!("Notification" in window)) return false;
      if (Notification.permission === "granted") {
        new Notification(title, {body: body});
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(function(permission) {
          if (permission === "granted") {
            new Notification(title, {body: body});
          }
        });
      }
      return false;
    });
  };
})();