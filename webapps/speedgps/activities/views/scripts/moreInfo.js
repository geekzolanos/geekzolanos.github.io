"use strict";var moreInfo=function(){this.load=function(e){this.setEvs(e.domNode),this.setDataReceiver(e)},this.setEvs=function(e){e.querySelector('section[role="region"] > header > button:first-child').addEventListener("click",function(){am.startActivity(am.catalog.get("views","main"),{animation:["left-current","current-right"]}).then(function(){app.gauge.show()})})},this.setDataReceiver=function(e){am.events.suscribe(e,"newdata"),e.domNode.addEventListener("newdata",this.printData)},this.printData=function(e){var t=this.querySelector("#lastReceived"),i=this.querySelector("#latitude .value"),a=this.querySelector("#longitude .value"),n=this.querySelector("#altitude .value"),r=this.querySelector("#accuracy .value"),o=this.querySelector("#alt-accuracy .value"),s=this.querySelector("#speed .value"),c=e.detail.coords,u=new Date(e.detail.timestamp);t.innerHTML="Últimos datos recibidos el: "+u,i.innerHTML=(c.latitude||0).toFixed(5),a.innerHTML=(c.longitude||0).toFixed(5),r.innerHTML=(c.accuracy||0).toFixed(2)+" Mts",s.innerHTML=(c.speed||0).toFixed()+" m/s",n.innerHTML=(c.altitude||0).toFixed()+" Mts",o.innerHTML=(c.altitudeAccuracy||0).toFixed()+" Mts"},this.unload=function(e){e.domNode.removeEventListener("newdata",this.printData)}};am.constructors.moreInfo=moreInfo;