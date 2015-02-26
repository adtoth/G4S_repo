jQuery.sap.declare("sap.ui.netlife.G4S.Component");
sap.ui.core.UIComponent.extend("sap.ui.netlife.G4S.Component", {


	
	createContent : function() {
		// create root view
		var oView = sap.ui.view({
			id : "app",
			viewName : "sap.ui.netlife.G4S.view.App",
			type : "JS",
			viewData : { component : this }
		});
		  
		// set i18n model
		var i18nModel = new sap.ui.model.resource.ResourceModel({
			bundleUrl : "i18n/messageBundle.properties"
		});
		oView.setModel(i18nModel, "i18n");
		

		
//		// Using OData model to connect against a real service
//		var url = "/proxy/http/<server>:<port>/sap/opu/odata/sap/ZGWSAMPLE_SRV/";
		var url = "http://office.netlife.hu:8181/futarfioriodataprovider/courierdata.svc/";
		var oModel = new sap.ui.model.odata.ODataModel(url, true);
		//oView.setModel(oModel);
		
		// Using a local model for offline development
		//var oModel = new sap.ui.model.json.JSONModel("model/mock.json");
		oView.setModel(oModel);
		sap.ui.getCore().setModel(oModel);
		// set device model
		var deviceModel = new sap.ui.model.json.JSONModel({
			isPhone : jQuery.device.is.phone,
			listMode : (jQuery.device.is.phone) ? "None" : "SingleSelectMaster",
			listItemType : (jQuery.device.is.phone) ? "Active" : "Inactive"
		});
		deviceModel.setDefaultBindingMode("OneWay");
		oView.setModel(deviceModel, "device");

		// done
		return oView;
	},
	
	 fnClose:function(oResult){
		
	        if (oResult) {
	            jQuery.sap.log.info("ConfirmDialog - isConfirmed: " + oResult.isConfirmed);
	            if (oResult.sNote) {
	                jQuery.sap.log.info("ConfirmDialog - note: " + oResult.sNote);
	            }
	        }
	        globalpw = oResult.sNote;
	        alert(oResult.sNote);
	    }
});

/*
jQuery.sap.declare("sap.ui.netlife.G4S.Component");

sap.ui.core.UIComponent.extend("sap.ui.netlife.G4S.Component", {

	createContent : function() {

		// create root view
		var oView = sap.ui.view({
			id : "app",
			viewName : "sap.ui.netlife.G4S.view.App",
			type : "JS",
			viewData : { component : this }
		});

		// set i18n model
		var i18nModel = new sap.ui.model.resource.ResourceModel({
			bundleUrl : "i18n/messageBundle.properties"
		});
		oView.setModel(i18nModel, "i18n");

//		// Using OData model to connect against a real service
//		var url = "/proxy/http/<server>:<port>/sap/opu/odata/sap/ZGWSAMPLE_SRV/";
//		var oModel = new sap.ui.model.odata.ODataModel(url, true, "<user>", "<password>");
//		oView.setModel(oModel);

		// Using a local model for offline development
		var oModel = new sap.ui.model.json.JSONModel("model/mock.json");
		oView.setModel(oModel);

		// set device model
		var deviceModel = new sap.ui.model.json.JSONModel({
			isPhone : jQuery.device.is.phone,
			listMode : (jQuery.device.is.phone) ? "None" : "SingleSelectMaster",
			listItemType : (jQuery.device.is.phone) ? "Active" : "Inactive"
		});
		deviceModel.setDefaultBindingMode("OneWay");
		oView.setModel(deviceModel, "device");

		// done
		return oView;
	}
});
*/