jQuery( document ).ready(function() {

    jQuery('.j77-accordion > section > h4').each(function(){
        let accordion = jQuery(this).parent().parent();
        let content = accordion.children('div').first();

        jQuery(this).find('i').remove();
        if(content.is(':visible')) {
            jQuery(this).prepend(jQuery('<i class="fas fa-chevron-down"></i>'));
        }
        else {
            jQuery(this).prepend(jQuery('<i class="fas fa-chevron-right"></i>'));
        }
    });

    jQuery('.widget-container[data-widget-name] > .j77-accordion').each(function(){
        let widgetName = jQuery(this).parent().attr("data-widget-name");
        let state = localStorage.getItem('j77ElectionAccordeonState-'+widgetName);

        if(state == 'HIDDEN') {
            let content = jQuery(this).children('div').first();
            content.hide();
            jQuery(this).trigger('j77ElectionAccordeonHide', {widgetName: widgetName});
        }
    });
    
    jQuery('.j77-accordion > section > h4').on('click', function(){
        let accordion = jQuery(this).parent().parent();
        let content = accordion.children('div').first();

        let widgetName = jQuery(this).parents('.widget-container[data-widget-name]').attr("data-widget-name");
        
        jQuery(this).find('i').remove();
        if(content.is(':visible')) {
            if(widgetName) localStorage.setItem('j77ElectionAccordeonState-'+widgetName,'HIDDEN');
            content.slideUp();
            jQuery(this).prepend(jQuery('<i class="fas fa-chevron-right"></i>'));
            jQuery(this).parents('.j77-accordion').trigger('j77ElectionAccordeonHide', {widgetName: widgetName});
        }
        else {
            if(widgetName) localStorage.setItem('j77ElectionAccordeonState-'+widgetName,'VISIBLE');
            content.slideDown();
            jQuery(this).prepend(jQuery('<i class="fas fa-chevron-down"></i>'));
            jQuery(this).parents('.j77-accordion').trigger('j77ElectionAccordeonVisible', {widgetName: widgetName});
            jQuery(this).parents('.j77-accordion').trigger('accordionactivate', {widgetName: widgetName});
        }
    });

    jQuery('.widget-container').each(function(){
        let container = jQuery(this);
        let menuContainer = container.find('.widget-container-inline-menu-dropdown');

        if(menuContainer.length == 0) return true;
        
        // Remove wrapper, if it is there. Makes it compatible to old markup.
        let wrapper = menuContainer.find('.widget-container-inline-menu-dropdown-list-wrapper');
        if(wrapper.length) {
            wrapper.find('ul').appendTo(wrapper.parent());
            wrapper.remove();
        }

        menuContainer.find('ul').addClass('dropdown-menu');

        let toggleIcon = menuContainer.children('i');
        let toggleBtn = null;
        if(toggleIcon.length) {
            toggleBtn = jQuery('<button></button>').append(toggleIcon);
            menuContainer.prepend(toggleBtn);
        }
        else
            toggleBtn = menuContainer.children('button');
        
        toggleBtn.attr('data-bs-toggle','dropdown');
        new bootstrap.Dropdown(toggleBtn);
    });

});