jQuery( document ).ready(function() {
    
    let menu = jQuery('.context-menu');
    
    jQuery(menu).on('click', 'button', function(){
        menu.removeClass('active');
        jQuery(this).closest('.context-menu').addClass('active');
    });

    jQuery('.close-context').on('click',function(e){
        e.preventDefault();
        menu.removeClass('active');
    });
});