"use strict";var p_main=function(){this.load=function(t){var e=t.domNode.querySelector('section[role="region"] > header > button:first-child'),n=t.domNode.querySelector("#btn-gps"),r=t.domNode.querySelector("#btn-notify"),i=t.domNode.querySelector("#btn-units");e.addEventListener("click",function(){am.startActivity(am.catalog.get("views","main"),{animation:["left-current","current-right"]}).then(function(){app.gauge.show()})}),n.addEventListener("click",function(){am.startActivity(am.catalog.get("preferences","p_gps"),{animation:["right-current","current-left"]})}),r.addEventListener("click",function(){am.startActivity(am.catalog.get("preferences","p_notify"),{animation:["right-current","current-left"]})}),i.addEventListener("click",function(){am.startActivity(am.catalog.get("preferences","p_units"),{animation:["right-current","current-left"]})})}};am.constructors.p_main=p_main;