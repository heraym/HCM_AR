var World = {
	loaded: false,

	init: function initFn() {
		this.createOverlays();
	},
         
	createOverlays: function createOverlaysFn() {
		/*
			First an AR.ImageTracker needs to be created in order to start the recognition engine. It is initialized with a AR.TargetCollectionResource specific to the target collection that should be used. Optional parameters are passed as object in the last argument. In this case a callback function for the onTargetsLoaded trigger is set. Once the tracker loaded all its target images, the function worldLoaded() is called.

			Important: If you replace the tracker file with your own, make sure to change the target name accordingly.
			Use a specific target name to respond only to a certain target or use a wildcard to respond to any or a certain group of targets.
		*/
        this.targetCollectionResource = new AR.TargetCollectionResource("assets/hcm.wtc", {
        });

        this.tracker = new AR.ImageTracker(this.targetCollectionResource, {
            onTargetsLoaded: this.worldLoaded
        });

         	/*
			The next step is to create the augmentation. In this example an image resource is created and passed to the AR.ImageDrawable. A drawable is a visual component that can be connected to an IR target (AR.ImageTrackable) or a geolocated object (AR.GeoObject). The AR.ImageDrawable is initialized by the image and its size. Optional parameters allow for position it relative to the recognized target.
		*/
        this.imgButton = new AR.ImageResource("assets/comprar.png");

       this.imgTransp = new AR.ImageResource("assets/Pikachu.gif");

        var infoMartin = new AR.HtmlDrawable({
       //   html:"<div>Ver info del producto</div>",
   		  uri: "https://corehcm-gse00014117.uscom-east-1.oraclecloud.com/empleado/3153"
		}, 0.8, {
		    viewportWidth: 1000,
		    viewportHeight: 500, 
		    backgroundColor: "#000000",
		    opacity: 0.5,
		    offsetX: 0.1,
		    offsetY: 0.5,
		    horizontalAnchor: AR.CONST.HORIZONTAL_ANCHOR.RIGHT,
		    verticalAnchor: AR.CONST.VERTICAL_ANCHOR.TOP,
		    clickThroughEnabled: true,
		    allowDocumentLocationChanges: false,
		    onDocumentLocationChanged: function onDocumentLocationChangedFn(uri) {
		        AR.context.openInBrowser(uri);
    		}
          });  

		
		var infoRobert = new AR.HtmlDrawable({
       //   html:"<div>Ver info del producto</div>",
   		  uri: "https://corehcm-gse00014117.uscom-east-1.oraclecloud.com/empleado/541"
		}, 0.8, {
		    viewportWidth: 1000,
		    viewportHeight: 500, 
		    backgroundColor: "#000000",
		    opacity: 0.5,
		    offsetX: 0.1,
		    offsetY: 0.5,
		    horizontalAnchor: AR.CONST.HORIZONTAL_ANCHOR.RIGHT,
		    verticalAnchor: AR.CONST.VERTICAL_ANCHOR.TOP,
		    clickThroughEnabled: true,
		    allowDocumentLocationChanges: false,
		    onDocumentLocationChanged: function onDocumentLocationChangedFn(uri) {
		        AR.context.openInBrowser(uri);
    		}
          });  

		
		var infoBrian = new AR.HtmlDrawable({
       //   html:"<div>Ver info del producto</div>",
   		  uri: "https://corehcm-gse00014117.uscom-east-1.oraclecloud.com/empleado/100"
		}, 0.8, {
		    viewportWidth: 1000,
		    viewportHeight: 500, 
		    backgroundColor: "#000000",
		    opacity: 0.5,
		    offsetX: 0.1,
		    offsetY: 0.5,
		    horizontalAnchor: AR.CONST.HORIZONTAL_ANCHOR.RIGHT,
		    verticalAnchor: AR.CONST.VERTICAL_ANCHOR.TOP,
		    clickThroughEnabled: true,
		    allowDocumentLocationChanges: false,
		    onDocumentLocationChanged: function onDocumentLocationChangedFn(uri) {
		        AR.context.openInBrowser(uri);
    		}
          });  

		/*
			The last line combines everything by creating an AR.ImageTrackable with the previously created tracker, the name of the image target and the drawable that should augment the recognized image.
			Please note that in this case the target name is a wildcard. Wildcards can be used to respond to any target defined in the target collection. If you want to respond to a certain target only for a particular AR.ImageTrackable simply provide the target name as specified in the target collection.
		*/
        var pageOne = new AR.ImageTrackable(this.tracker, "brian", {
			drawables: {
				cam: [infoBrian]
			}
		});
			
		var pageTwo = new AR.ImageTrackable(this.tracker, "robert", {
			drawables: {
				cam: [infoRobert]
			}
		});
		
		var pageThree = new AR.ImageTrackable(this.tracker, "martin", {
			drawables: {
				cam: [infoMartin]
			}
		});		
		 
		var pageFour = new AR.ImageTrackable(this.tracker, "martin2", {
			drawables: {
				cam: [infoMartin]
			}
		});		
		
	},
   
        
	worldLoaded: function worldLoadedFn() {
		/*var cssDivLeft = " style='display: table-cell;vertical-align: middle; text-align: right; width: 50%; padding-right: 15px;'";
		var cssDivRight = " style='display: table-cell;vertical-align: middle; text-align: left;'";
		document.getElementById('loadingMessage').innerHTML =
			"<div" + cssDivLeft + ">Scan Target &#35;1 (surfer):</div>" +
			"<div" + cssDivRight + "><img src='assets/surfer.png'></img></div>";

		// Remove Scan target message after 10 sec.
		setTimeout(function() {
			var e = document.getElementById('loadingMessage');
			e.parentElement.removeChild(e);
		}, 10000); */
	}
};

World.init();