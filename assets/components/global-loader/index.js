var abstractGlobalLoader = function() {

    var self = {};

    self.loadingElements = {};
    self.loadingElementsTimeout = {};
    self.loaderElement = null;
    self.loadingElementsForceBlockUI = {};

    self.blockUI = function() { 

        if (self.loadingElementsForceBlockUI && Object.keys(self.loadingElementsForceBlockUI).length > 0) {
            return true;
        }

        if (window.globalLoaderConfig?.blockUI !== undefined) {
            return window.globalLoaderConfig.blockUI;
        }
            
        return true;
    }

    self.loading = function(id, humanReadableText, timeout = null, blockUI = false){
        let that = this;
        
        if(self.isDebugEnabled()) console.log("GlobalLoader | Loading", id, humanReadableText);

        if(id == "" || id == null) {
            console.warn('GlobalLoader | Warning: Registering load with empty id has been omitted!', id, humanReadableText);
            return;
        }

        if(self.loadingElements[id]) {
            console.warn('GlobalLoader | Warning: Registering load for already registered id!', id, humanReadableText);
        }
        
        // Add key id to loadingElements
        self.loadingElements[id] = humanReadableText;
        if (blockUI) {
            self.loadingElementsForceBlockUI[id] = blockUI;
        }
        
        if(self.loaderElement)
            self.updateLoaderElement();
        else
            self.createLoaderElement();

        if(timeout) {
            self.loadingElementsTimeout[id] = setTimeout(function(){
                if(self.isDebugEnabled()) console.log("GlobalLoader | Loading timeout reached. Finishing.", id);
                that.loadingFinished(id);
            },timeout);
        }

    }
    
    self.loadingFinished = function(id){

        if(self.isDebugEnabled()) console.log("GlobalLoader | Loading finished", id);

        if(id == "" || id == null) {
            console.warn('GlobalLoader | Warning: Finishing load with empty id has been omitted!', id);
            return;
        }

        if(!self.loadingElements[id]) {
            console.warn('GlobalLoader | Warning: Trying to finish a load that has not yet been registered before. Aborting!', id);
            return;
        }

        // Remove timeout
        if(self.loadingElementsTimeout[id]) {
            clearTimeout(self.loadingElementsTimeout[id]);
            delete self.loadingElementsTimeout[id];
        }
        
        if (self.loadingElementsForceBlockUI[id]) {
            delete self.loadingElementsForceBlockUI[id];
        }

        // Remove key id from loadingElements
        delete self.loadingElements[id];
        
        self.updateLoaderElement();
    }

    self.createLoaderElement = function(){
        if (!document.body) {
            window.requestAnimationFrame(self.createLoaderElement);
            return;
        }

        if(self.loaderElement) {
            if(self.isDebugEnabled()) console.log('GlobalLoader | Loader element already exists. Not creating a new one!');
            return;
        }

        // Create loader element
        if(self.isDebugEnabled()) console.log('Creating a new loader element');
        self.loaderElement = document.createElement('div');
        self.loaderElement.id = 'global-loader';
        if(self.blockUI()) self.loaderElement.classList.add('block-ui');
        
        self.loaderElement.innerHTML = '<div class="loader"></div>';
        document.body.appendChild(self.loaderElement);

        self.updateLoaderElement();
    }

    self.updateLoaderElement = function(){
        if (!document.body) {
            window.requestAnimationFrame(self.updateLoaderElement);
            return;
        }

        // If loadingElements is empty, hide the loader
        if(self.isDebugEnabled()) console.log('GlobalLoader | Elements', Object.keys(self.loadingElements).length, Object.keys(self.loadingElements));
        if(Object.keys(self.loadingElements).length == 0){
            self.hideLoaderElement();
            return;
        }

        // Update loader element
        if(self.blockUI() && !self.loaderElement.classList.contains('block-ui')) self.loaderElement.classList.add('block-ui');
        if(!self.blockUI() && self.loaderElement.classList.contains('block-ui')) self.loaderElement.classList.remove('block-ui');

        self.loaderElement.innerHTML = '<div class="loader--content"><div class="loader--spinner"><i class="fas fa-circle-notch fa-spin"></i></div><div class="loader--list"></div></div>';

        var descriptionText = document.createElement('p');
        descriptionText.classList.add('loader--description');
        descriptionText.innerHTML = gettext('Currently, we are loading these elements:');
        self.loaderElement.getElementsByClassName('loader--list')[0].appendChild(descriptionText);

        // Add a list of all loadingElements to the loader element
        var loadingElementsList = document.createElement('ul');
        let alreadyAdded = [];
        for(var id in self.loadingElements){
            let text = self.loadingElements[id];

            if(alreadyAdded.includes(text)) continue;
            alreadyAdded.push(text);

            var loadingElement = document.createElement('li');
            loadingElement.innerHTML = '<i class="fas fa-circle-notch fa-spin inline--spinner"></i> ' + self.loadingElements[id];
            loadingElementsList.appendChild(loadingElement);
        }
        // Find "loader" element and append "loadingElementsList
        var loaderListWrapper = self.loaderElement.getElementsByClassName('loader--list')[0];
        loaderListWrapper.appendChild(loadingElementsList);
    }

    self.hideLoaderElement = function(){
        if(!self.loaderElement) {
            if(self.isDebugEnabled()) console.log('GlobalLoader | Wanted to hide, but loaderElement is null!');
            return;
        }

        // remove using plain JS
        if(self.isDebugEnabled()) console.log('Removing loaderElement', self.loaderElement);
        self.loaderElement.parentNode.removeChild(self.loaderElement);
        self.loaderElement = null;
    }

    self.getStatus = function(){
        console.log("GlobalLoader | Debug enabled?", self.isDebugEnabled());
        console.log("GlobalLoader | Loading Elements", self.loadingElements);
        console.log("GlobalLoader | Loading Elements Timeouts", self.loadingElementsTimeout);
        console.log("GlobalLoader | Loader Element", self.loaderElement);
    }

    self.setDebug = function(enabled){
        console.log('j77GlobalLoader.debug');
        if(enabled)
            localStorage.setItem('j77GlobalLoader.debug',"true");
        else
            localStorage.setItem('j77GlobalLoader.debug',"false");
    }

    self.isDebugEnabled = function(){
        return localStorage.getItem('j77GlobalLoader.debug') === "true";
    }

    return self;
}

if(!window.globalLoader) {
    window.globalLoader = abstractGlobalLoader();

    globalLoader.loading('__page', gettext('Immediate page content'));
    jQuery(function(){
        globalLoader.loadingFinished('__page');
    });
}