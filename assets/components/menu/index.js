jQuery( document ).ready(function() {
    
    let menu = function(){

        window.WirklichDigital = window.WirklichDigital || {};

        let themeSideMenuConfig = window.WirklichDigital.themeSideMenuConfig || {
            collapsible: true,
            hideLogoOnMenuCollapse: true,
            saveCollapseState: true
        };
        
        let classOpen    = 'not-collapsed';
        let classClosed  = 'collapsed';
        let classAciveMenuItem = 'active-menu-item';
        let lsKey   = 'election-theme.sidemenu';

        let currentlyOpen = true;
        if(themeSideMenuConfig.collapsible && themeSideMenuConfig.saveCollapseState && localStorage.getItem(lsKey) == classClosed) {
            currentlyOpen = false;
        }

        if(themeSideMenuConfig.hideLogoOnMenuCollapse) {
            jQuery('body').addClass('hide-logo-on-menu-collapse');
        }
        
        let updateMenuState = function() {

            if(currentlyOpen) {
                if(themeSideMenuConfig.saveCollapseState) localStorage.setItem(lsKey, classOpen);
                jQuery('aside').removeClass(classClosed).addClass(classOpen);
                jQuery('body').removeClass('sidemenu-'+classClosed).addClass('sidemenu-'+classOpen);

                jQuery('aside .applications li').removeClass(classClosed).addClass(classOpen);
                jQuery('aside .applications-menu li'+'.'+classAciveMenuItem).removeClass(classClosed).addClass(classOpen);
            }
            else {
                if(themeSideMenuConfig.saveCollapseState) localStorage.setItem(lsKey, classClosed);
                jQuery('aside').removeClass(classOpen).addClass(classClosed);
                jQuery('body').removeClass('sidemenu-'+classOpen).addClass('sidemenu-'+classClosed);

                jQuery('aside .applications li').removeClass(classOpen).addClass(classClosed);
                jQuery('aside .applications-menu li'+'.'+classOpen).removeClass(classOpen).addClass(classClosed);
            }
        }

        let resizeHandler = function() {
            if(jQuery(window).width() > 768) {
                currentlyOpen = true;
                if(themeSideMenuConfig.collapsible && themeSideMenuConfig.saveCollapseState && localStorage.getItem(lsKey) == classClosed) {
                    currentlyOpen = false;
                }
            }
            else {
                currentlyOpen = false;
            }
            updateMenuState();
        }
        
        jQuery('aside .applications-menu').on('click', '> li span', function(){
            jQuery('aside .applications-menu li'+'.'+classOpen).removeClass(classOpen).addClass(classClosed);
            jQuery(this).closest('li').removeClass(classClosed).addClass(classOpen);
        });
        
        jQuery('body').on('click', 'aside #hideMenu, header #mobileMenuToggle', function(){
            currentlyOpen = !currentlyOpen;
            updateMenuState();
        });

        // Menu toggle for mobile menu (Close icon)
        jQuery('header').append('<div id="mobileMenuToggle"><i class="openIcon fas fa-bars"></i><i class="closeIcon fas fa-times"></i></div>');

        jQuery(window).on('resize', resizeHandler);
        resizeHandler();
    }

    menu();

});