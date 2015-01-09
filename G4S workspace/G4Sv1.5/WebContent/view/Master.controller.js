jQuery.sap.require("sap.ui.demo.myFiori.util.Formatter");
sap.ui.controller("sap.ui.demo.myFiori.view.Master", {

	onBeforeRendering: function(){
		sap.ui.getCore().getModel().setDefaultCountMode("none");
		window.globalMaster = this;
		this.getView().addDelegate({ onAfterShow: function(evt) {
			sap.ui.getCore().getModel().updateBindings(true);
			sap.ui.getCore().getModel().forceNoCache(true);
        	// $("#signature").jSignature();
			var leadas = 0;
			var lezartLeadas = 0;
			var lezartFelvetel = 0;
			var felvetel = 0;
			var bevet = 0;
			var aktualis = 0;
			var depo = 0;
			globalMaster.getView().getModel().read("/Address", null, {
			}, true, function(response) {	
				for(var i = 0; i < response.results.length; i++){
						if(response.results[i].PicType == 'D' && (response.results[i].DelStatus == '999' || response.results[i].DelStatus == '555' || response.results[i].DelStatus == '111')){
							leadas++;
						}
						if(response.results[i].PicType == 'D' && !(response.results[i].DelStatus == '999' || response.results[i].DelStatus == '555' || response.results[i].DelStatus == '111')){
							lezartLeadas++;
						}
						if(response.results[i].PicType == 'U' && (response.results[i].DelStatus == '999' || response.results[i].DelStatus == '555' || response.results[i].DelStatus == '111')){
							felvetel++;
						}
						if(response.results[i].PicType == 'U' && !(response.results[i].DelStatus == '999' || response.results[i].DelStatus == '555' || response.results[i].DelStatus == '111')){
							lezartFelvetel++;
						}
						if(response.results[i].DelStatus == '999' ){
							aktualis++;
						}
				}
				globalMaster.getView().byId("leadTile").setNumber(leadas);
				globalMaster.getView().byId("leadLezartTile").setNumber(lezartLeadas);
				globalMaster.getView().byId("felvetTile").setNumber(felvetel);
				globalMaster.getView().byId("felvetLezartTile").setNumber(lezartFelvetel);
				globalMaster.getView().byId("aktualisTile").setNumber(aktualis);
			});			
			globalMaster.getView().getModel().read("/Item", null, {
			}, true, function(response) {	
				for(var i = 0; i < response.results.length; i++){
						if(response.results[i].PickupStatus == 'M'){
							bevet++;
						}
					
				}
				globalMaster.getView().byId("bevetTile").setNumber(bevet);
				
				var lengthOfAddresses = 0;
				sap.ui.getCore().getModel().read("/Address", null, {
				}, true, function(response) {
					lengthOfAddresses = response.results.length;
					for(var i = 1; i <= lengthOfAddresses; i++){
						sap.ui.getCore().getModel().read("/Address(" + i + ")" , null, {
							"$expand" : "Items"
						}, true, function(response) {
							if(response.DelStatus != "222"){
								for(var i = 0; i < response.Items.results.length; i++){
									depo++;
									globalMaster.getView().byId("depoTile").setNumber(depo);
								}		
							}
						});
						
				}
					
					
				});
			
				
			});
			
        }});
	
	},
	
	handleBevetelezesPress : function (evt) {
		var context = evt.getSource().getBindingContext();
		if(globalMaster.getView().byId("bevetTile").getNumber() >= 1){
			this.nav.to("bevetMaster", context);
		}
	},
	
	handleFelvetelPress : function (evt) {
		var context = evt.getSource().getBindingContext();
		if(globalMaster.getView().byId("felvetTile").getNumber() >= 1){
			this.nav.to("felvetelMaster", context);
		}
	},
	
	handleAktualisPress : function (evt) {
		var context = evt.getSource().getBindingContext();
		if(globalMaster.getView().byId("aktualisTile").getNumber() >= 1){
			this.nav.to("aktualisMaster", context);
		}
	},
	
	handleLeadasPress : function (evt) {
		var context = evt.getSource().getBindingContext();
		if(globalMaster.getView().byId("leadTile").getNumber() >= 1){
			this.nav.to("leadasMaster", context);
		}
	},
	
	handleUtanvetPress : function (evt) {
		var context = evt.getSource().getBindingContext();
		this.nav.to("utanvet", context);
	},
	
	handleLezartFelvetelPress: function(evt){
		var context = evt.getSource().getBindingContext();
		if(globalMaster.getView().byId("felvetLezartTile").getNumber() >= 1){
			this.nav.to("lezartFelvetelMaster", context);
		}
	},
	
	handleLezartLeadasPress: function(evt){
		var context = evt.getSource().getBindingContext();
		if(globalMaster.getView().byId("leadLezartTile").getNumber() >= 1){
			this.nav.to("lezartLeadasMaster", context);
		}
	},
	
	handleDepoPress: function(evt){
		var context = evt.getSource().getBindingContext();
		if(globalMaster.getView().byId("depoTile").getNumber() >= 1){
			this.nav.to("depoMaster", context);
		}
	},
	 	    

	    
	      getlocation: function(){
	        alert("getLocation");
	      
	          var locOptions = {
	            timeout : 5000,
	            enableHighAccuracy : true
	          };
	          //get the current location
	          navigator.geolocation.getCurrentPosition(this.onLocationSuccess(),locOptions);
	          //Clear the current location while we wait for a reading

	       
	      },

	      onLocationSuccess: function(loc) {
	        alert("onLocationSuccess");
	        //We received something from the API, so first get the
	        // timestamp in a date object so we can work with it
	      
	        //Then replace the page's content with the current
	        // location retrieved from the API
	        alert(loc.coords.latitude);
	      }

});