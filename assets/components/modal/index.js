window.j77electionModalTemplates = [];
window.j77electionModalTemplates.wrapper = '<div class="modal ${additionalClasses}" data-modal-id="${modalId}"><div class="modal--header"><div class="modal--header--content"><h1>${title}</h1></div></div><div class="modal--content">${content}</div></div>'
window.j77electionModalTemplates.template = '<p>${text}</p>${additionalContent}';
window.j77electionModalTemplates.contentElementTemplate =  window.j77electionModalTemplates.template +'<div class="content-element-placeholder"></div>';
window.j77electionModalTemplates.confirmTemplate = window.j77electionModalTemplates.template + '<div class="row footer-buttons"><button class="btn btn-secondary col-12 offset-md-6 col-md-3 col-lg-2 close" type="button">' + gettext('Close') + '</button><a class="btn btn-primary offset-md-1 col-12 col-md-3 col-lg-2 btn-modal-confirm" href="${url}">' + gettext('Confirm') + '</a></div></div>';
window.j77electionModalTemplates.chooseTemplate = window.j77electionModalTemplates.template + '<div class="row footer-buttons"><a class="btn btn-secondary col-12 col-md-3 col-lg-2 btn-modal-confirm" href="${btnUrl1}">${btnLabel1}</a><a class="btn btn-primary col-12 col-md-3 col-lg-2 btn-modal-confirm" href="${btnUrl2}">${btnLabel2}</a></div></div>';
window.j77electionModalTemplates.iframeTemplate = '<iframe src="${url}" scrolling="auto"></iframe>';
window.j77electionModalTemplates.classesSelectors = ".election_auto_small, .election_auto_middle, .election_auto_large, .fb_auto_small, .fb_auto_middle, .fb_auto_big, .fb_auto_large, .fb_auto_confirm, .fb_auto_choose, .fb_auto_full, .election_auto_full"

jQuery( document ).ready(function() {

    // fixed submit button 
    if(jQuery('.election_layout_popup').length > 0) {
        if(jQuery('button[type="submit"]').length < 0) return

        jQuery('button[type="submit"]:not(.no-fixation)').closest('.form-group').addClass('buttons-fixed-bottom');
    }

});

let AbstractElectionModal = function() {
    let that = this;

    this.getTemplate = function($target) {
        if (($target.attr('class')).includes('fb_auto_confirm')) {
            return window.j77electionModalTemplates.confirmTemplate;
        } else if (($target.attr('class')).includes('fb_auto_choose')) {
        return window.j77electionModalTemplates.chooseTemplate;
        } else if(($target.is('a') || that.getUrlFromTarget($target)) && ! $target.attr('class').includes("election_auto_prevent_url")) {
            return window.j77electionModalTemplates.iframeTemplate;
        } else if((target.attr("data-content-element-selector"))) {
            return window.j77electionModalTemplates.contentElementTemplate;
        }
    
        return window.j77electionModalTemplates.template;
    
    }
    
    this.getAdditionalClasses = function($target) {
        classes = "";
        if(($target.is('a') || that.getUrlFromTarget($target)) && ! ($target.attr('class').includes("election_auto_prevent_url") || $target.attr('class').includes('fb_auto_confirm') || $target.attr('class').includes('fb_auto_choose'))) {
            classes += 'iframe-modal ';
        }

        if ($target.attr("data-modal-additional-classes")) {
            classes += $target.attr("data-modal-additional-classes") + " ";
        }
    
        return classes;
    }
    
    this.getSize = function(className) {
        if (className.includes('fb_auto_confirm')) {
            return 'modal-auto-confirm';
        } else if (className.includes('fb_auto_choose')) {
            return 'modal-auto-choose';
        } else if(className.includes('fb_auto_small') || className.includes('election_auto_small')) {
            return 'modal-size-small';
        } else if(className.includes('fb_auto_middle') || className.includes('election_auto_middle')) {
            return 'modal-size-medium';
        } else if(className.includes('fb_auto_big') || className.includes('election_auto_large') || className.includes('fb_auto_large')) {
            return 'modal-size-large';
        } else if(className.includes('fb_auto_full ') || className.includes('election_auto_full')) {
            return 'modal-size-full';
        }
    
        return 'modal-size-medium';
    }
    
    this.buildModalContentFromTarget = function($target, template, additionalClasses = "") {
        let title = $target.attr("data-title");
        let text = $target.attr("data-text");
        let additionalContent = $target.attr("additionalContent") ?? '';
        let url = $target.attr('class').includes("election_auto_prevent_url") ? null : that.getUrlFromTarget($target);
        additionalClasses += this.getSize($target.attr("class"));
        let contentElementSelector = $target.attr("data-content-element-selector");
        let id = $target.attr("data-modal-id");

        if($target.attr('class').includes('fb_auto_choose')) {
            let btnUrl1 = $target.attr('data-btn-url-1');
            let btnUrl2 = $target.attr('data-btn-url-2');
            let btnLabel1 = $target.attr('data-btn-label-1');
            let btnLabel2 = $target.attr('data-btn-label-2');
            url = {
                btnUrl1: btnUrl1,
                btnUrl2: btnUrl2,
                btnLabel1: btnLabel1,
                btnLabel2: btnLabel2
            };
        }

        return this.buildModalContent(id, title, text, additionalContent, url, template, additionalClasses, contentElementSelector)
    }
    
    this.buildModalContent = function(id="",title="", text="", additionalContent="", url, template, additionalClasses = "", contentElementSelector = null) {
        var content = template
            .replace('${text}', text)
            .replace('${additionalContent}', additionalContent);

        // if url is string
        if (typeof url === 'string') {
            content = content.replace('${url}', url);
        }
        else if (typeof url === 'object' && url !== null) {
            if(url.btnUrl1) content = content.replace('${btnUrl1}', url.btnUrl1);
            if(url.btnUrl2) content = content.replace('${btnUrl2}', url.btnUrl2);
            if(url.btnLabel1) content = content.replace('${btnLabel1}', url.btnLabel1);
            if(url.btnLabel2) content = content.replace('${btnLabel2}', url.btnLabel2);
        }

        let wrapper = window.j77electionModalTemplates.wrapper;    
        let modal = jQuery((wrapper).replace('${modalId}', id).replace('${content}', content).replace('${additionalClasses}', additionalClasses).replace('${title}', title));
        
        if (! contentElementSelector) {
            return modal;
        }

        modal.find('.content-element-placeholder').append(jQuery(contentElementSelector).clone())
        return modal;
    }
    
    this.init = function(){
    
        $(document).on("click", window.j77electionModalTemplates.classesSelectors, function(e){
            e.preventDefault();
    
            var $target = jQuery(e.target).is(window.j77electionModalTemplates.classesSelectors) ? jQuery(e.target) : jQuery($(e.target).parentsUntil(":has(" + window.j77electionModalTemplates.classesSelectors + ")").filter(window.j77electionModalTemplates.classesSelectors).first());
            if (! $target) {
                return;
            }
    
            let id = null;
            if ($target.attr('data-modal-id')) {
                id = $target.attr('data-modal-id');
            }
    
            window.j77electionModal.create({
                target: $target,
                id: id
            });
    
            return;
            
    
        });
    
        jQuery(document).bind("keydown", function(e){
            if(e.which == 75 && e.ctrlKey){
                e.preventDefault();
                jQuery('button[data-modal="search"]').click();
            }
        });
    
    }
    
    this.closeModal = function(modal, create, callback = null, callbackArgs = null, result = false) {
        jQuery(modal).trigger('j77election_modal:close');
        if (create) {
            jQuery(modal).detach();
        } else {
            jQuery(modal).removeClass('active');
        }
        if (callback) {
            if (callbackArgs == null) {
                callbackArgs = [];
            }
            callback.apply(this, [result, ...callbackArgs]);
        }
    }

    this.create = function(opts = {}) {
        url = opts.url ??  null;
        callback = opts.callback ?? null;
        callbackArgs = opts.callbackArgs ?? null;
        id = opts.id ?? "";
        title = opts.title ?? "";
        text = opts.text ?? "";
        template = opts.template ?? null;
        additionalContent = opts.additionalContent ?? "";
        additionalClasses = opts.additionalClasses ?? null;
        contentElementSelector = opts.contentElementSelector ?? null;
        target = opts.target ?? null;
        allowFullscreen = opts.allowFullscreen ?? false;

        if (url == null && callback != null) {
            url = "javascript:void(0);";
        }
    
        if (! template && contentElementSelector) {
            template = window.j77electionModalTemplates.contentElementTemplate;
        }
        
        let modal = id ? jQuery('#' + id) : null;
        let create = true;

        if (modal && modal.length > 0) {
            // Use existing modal in DOM
            create = false;
        } else if(target) {
            // Create modal from an a tag (link), e.g. with fb_auto_small class
            let template = this.getTemplate(target);
            let additionalClasses = this.getAdditionalClasses(target);
            modal = this.buildModalContentFromTarget(target, template, additionalClasses);
            if (! callback && target.attr('data-election_modal_reload_after_close') !== undefined) {
                callback = function(result) {
                    window.location.reload();
                }
            }
            allowFullscreen = target.attr('allowfullscreen');
        } else {
            // Create modal from parameters (use title, text and template at minimum)
            modal = this.buildModalContent(id, title, text, additionalContent, url, template, additionalClasses, contentElementSelector);
        }
        
        if (allowFullscreen) {
            let fullscreen = modal.find('button.fullscreen');
            if(!fullscreen.length){
                modal.find('.modal--header').append('<button type="button" class="fullscreen"><i class="fas fa-expand"></i></button>');
            }
            jQuery(modal).find('.fullscreen' ).on('click', function(){
                jQuery(modal).find('.modal--content, .modal--header').toggleClass('fullscreen');
                jQuery(this).find('i').toggleClass('fa-expand').toggleClass('fa-compress');
            });

            if (allowFullscreen == "initial") {
                jQuery(modal).find('.modal--content, .modal--header').addClass('fullscreen');
                jQuery(modal).find('.fullscreen').find('i').removeClass('fa-expand').addClass('fa-compress');
            }
        }

        let close = modal.find('button.close');
        if(!close.length){
            modal.find('.modal--header').append('<button type="button" class="close"><i class="fas fa-times"></i></button>');
        }
    
        jQuery('input').first().focus().select();
        if (create) {
            jQuery('html body').prepend(modal);
        }
        let $this = this;
        jQuery(modal).find('.close' ).on('click', function(){
            $this.closeModal(modal, create, callback, callbackArgs);
        });
        jQuery(modal).on('closePopupPage', function(){
            $this.closeModal(modal, false, callback, callbackArgs);
        });
    
        jQuery('html body').on('keyup', function(e){
            if(e.keyCode == 27){
                $this.closeModal(modal, create, callback, callbackArgs);
            }
        });

        if (callback) {
            jQuery(modal).find('.btn-modal-confirm').on('click', function() {
                $this.closeModal(modal, create, callback, callbackArgs, true);
            });
        }
       
        jQuery(modal).trigger('j77election_modal:open');
        modal.addClass('active');
        return modal;
    }

    this.getUrlFromTarget = function($target) {
        return $target.attr("href") ?? $target.attr("data-url") ?? $target.attr("data-href") ?? false;
    }
}
