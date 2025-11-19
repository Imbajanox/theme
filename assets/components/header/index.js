let j77ImmediateHeaderActions = function() {
    let searchHeadline = function() {
        let headline = null;
        for(i=0;i<=3;i++) {
            let hElm = jQuery('body > main > .content > h'+i+':first-of-type');
            if(hElm.length) {
                headline = hElm;
                break;
            }

            let hElmInContainer = jQuery('body > main > .content > .container:first-of-type > .row:first-of-type > h'+i+':first-of-type');
            if(hElmInContainer.length) {
                headline = hElmInContainer;
                break;
            }

            let hElmInContainerCol = jQuery('body > main > .content > .container:first-of-type > .row:first-of-type > *:first-child > h'+i+':first-of-type');
            if(hElmInContainerCol.length) {
                headline = hElmInContainerCol;
                break;
            }
        }
        return headline;
    }

    let language = function(){

        let btn = jQuery('.language .switcherBtn');
        if(!btn.length) return;

        let list = btn.siblings('ul');
        btn.on('click', function(){
            list.toggleClass('active');
        });
        list.on('mouseleave', function(){
            list.removeClass('active');
        });
    }
    language();

    let pageTitle = function(){

        if(jQuery('header .pageTitle').length == 0) return;

        let headline = searchHeadline(document);
        if(headline == null) return;
        
        let parent = headline.parent();
        let headlineText = headline.text();
        headline.remove();

        let editableContent = "";
        let isEditable = parent.hasClass('editable-title');
        if(isEditable) {
            editableContent += parent.find('i').prop('outerHTML');
            parent.find('i').remove();

            let dataUrl = parent.attr('data-url');
            jQuery('header .pageTitle').data('url', dataUrl).addClass('election_auto_small');
        }

        jQuery('header .pageTitle').html(headlineText + editableContent);
        document.title = document.title + ' | ' + headlineText;
    }
    pageTitle();

    // Add page help via help system
    let pageHelpPlainPageAnimationFrameLoaded = false;
    let pageHelpPlainPage = function(){
        if(!pageHelpPlainPageAnimationFrameLoaded && !window.helpSystem) {
            pageHelpPlainPageAnimationFrameLoaded = true;
            window.requestAnimationFrame(pageHelpPlainPage);
            return;
        }

        if(!window.helpSystem) return;

        helpSystem.attachPageHelp(jQuery('header .pageTitle'));
    };
    pageHelpPlainPage();

    // Sets the modal header, if it is detected, that this scripts runs inside an iframe inside a modal.
    let modalHeaderInIFrameModal = function(){

        // 1) Detect, whether we live in an iframe, otherwise return
        if(window.self === window.top) return;
        
        // 2) Detect, whether we have a title to set.
        let headline = searchHeadline();
        if(headline == null) return;

        // 3) Search modal and iframe in parent window.
        let modal = null;
        jQuery(window.parent.document).find('.modal').each(function(){ 
            if(jQuery(this).find('iframe').length && jQuery(this).find('iframe')[0].contentWindow === window) {
                modal = jQuery(this);
                return false;
            }
        });
        if(modal == null) return;
        
        // 4) Set title and description in modal header.
        modal.find('.modal--header--content h3, .modal--header--content p').remove();        
        let headlineClone = headline.clone();
        jQuery(headlineClone).find('br').remove();
        modal.find('.modal--header--content').append('<h3>'+headlineClone.html()+'</h3>');

        headline.remove();
    }
    modalHeaderInIFrameModal();

    // Sets the modal header, if it is detected, that this scripts runs inside an iframe inside a modal.
    let helpTextInIframeModal = function(){

        // 1) Detect, whether we live in an iframe, otherwise return
        if(window.self === window.top) return;

        // 2) Detect, whether helpSystem is available, otherwise return
        if(!window.helpSystem) return;

        // 3) Search modal and iframe in parent window.
        let modal = null;
        jQuery(window.parent.document).find('.modal').each(function(){ 
            if(jQuery(this).find('iframe').length && jQuery(this).find('iframe')[0].contentWindow === window) {
                modal = jQuery(this);
                return false;
            }
        });
        if(modal == null) return;

        modal.find('.modal--header--content').find('.help--add-entry-field, .help--plain, .help--tooltip').remove();

        helpSystem.attachPageHelp(modal.find('.modal--header--content'));
        modal.find('.modal--header--content').find('.help--add-entry-field a, .help--plain a, .help--tooltip a').on('click', function(){
            modal.find('.modal--header button.close').trigger('click');
        });
    
    }
    jQuery(helpTextInIframeModal);


}

// Should run without document ready!
j77ImmediateHeaderActions();