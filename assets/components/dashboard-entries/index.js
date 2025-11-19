jQuery(function(){
    if(jQuery('.dashboard--entries--settings').length) {
        var elm = jQuery('.dashboard--entries--settings').first();
        elm.html('<i class="fas fa-grip-horizontal"></i>');
        var wrapper = jQuery('<div class="dashboard-entries"></div>').append(elm);
        jQuery('header .options').prepend(wrapper);
    }
});