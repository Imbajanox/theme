jQuery( document ).ready(function() {
    
    // Listening for draw callbacks
    jQuery(document).on('draw.dt', function(e, dtO) {
        let table = jQuery(e.target);
        let tableApi = jQuery(table).dataTable().api();

        // Iterate over last cell in each row and alter dt-col-link
        var foundDtColLink = false;
        table.find('> tbody > tr > td:last-child .dt-col-link').each(function() {
            let icon = jQuery(this).find('i');
            foundDtColLink = true;

            if(icon.length == 0) return true;

            let text = jQuery(this).text();
            let span = jQuery('<span></span>').html(text);

            jQuery(this).attr('title', text);

            jQuery(this).html(icon);
            jQuery(this).append(span);

            jQuery(span).hide();
        });

        if(foundDtColLink) {
            table.find('> tbody > tr > td:last-child, > thead > tr > th:last-child').addClass('dt-col-link-col');
        }

        if(!jQuery(table).hasClass('noContextMenu')) {
            dtActionsToContextMenu(table);
        }

        tableApi.columns.adjust()
    });
    
    jQuery(document).on('xhr.dt', function(e, settings) {
        jQuery(e.target).closest('.dataTables_wrapper').removeClass('dt-loading');
        globalLoader.loadingFinished(jQuery(e.target).attr('id')+'.xhr');
    });

    jQuery(document).on('preXhr.dt', function(e, settings) {
        jQuery(e.target).closest('.dataTables_wrapper').addClass('dt-loading');

        let dataTableName = dtGetTableName(e.target) + ' (' + gettext('Dynamic data') + ')';
        globalLoader.loading(jQuery(e.target).attr('id')+'.xhr', dataTableName);
    });
});

// Using plain js 
function dtGetTableName(table) {
    let dataTableName = table.getAttribute('data-loader-name');

    // if table has a parent with class widget-container
    // and that parent has a section with a h4
    // use that h4 as the table name
    let widgetContainer = table.closest('.widget-container');
    if(widgetContainer) {
        let section = widgetContainer.querySelector('section');
        if(section) {
            let h4 = section.querySelector('h4');
            if(h4) {
                dataTableName = gettext('Table for %s').replace('%s',h4.innerText.trim());
            }
        }
    }
    
    if(!dataTableName) dataTableName = gettext('Table');   
    return dataTableName;    
}

function initialTableLoader() {

    if (!document.body) {
        window.requestAnimationFrame(this.initialTableLoader);
        return;
    }

    // Find all tables with class dataTable using plain JS
    var tables = document.getElementsByClassName('dataTable');
    for (var i = 0; i < tables.length; i++) {
        let table = tables[i];

        let id = table.getAttribute('id');
        if(!id) { 
            id = table.getAttribute('data-config-key');
            if(!id) {
                if(window.wirklichDigitalDataTableCurrentConfig && window.wirklichDigitalDataTableCurrentConfig.ajax) {
                    let currentUrl = window.location.href;
                    let ajaxUrl = window.wirklichDigitalDataTableCurrentConfig.ajax;
                    id = currentUrl + '|' + ajaxUrl;
                    
                    // Hash the id
                    id = id.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);
                }

                if(!id)
                    id = "dt-"+Math.floor(Math.random() * 10000);
            }
            table.setAttribute('id', id);
        }

        let isTableInitialized = function(table) {
            // if table has a parent with class datatables_wrapper, we are done
            let wrapper = jQuery(table).closest('.dataTables_wrapper');
            if(wrapper) {
                return true;
            }
            return false;
        }

        let isTableVisible = function(table) {
            return jQuery(table).is(':visible');
        }

        if(!isTableInitialized(table) && isTableVisible(table)) {
            let dataTableName = dtGetTableName(table);
            globalLoader.loading(id, dataTableName);

            let myInterval = null;
            myInterval = setInterval(function() {
                
                if(document.body.contains(table) || !isTableVisible(table) || isTableInitialized(table)) {
                    clearInterval(myInterval);
                    globalLoader.loadingFinished(id);
                    return;
                }

            },100);
        }

        if(!isTableInitialized(table) && !isTableVisible(table)) {
            jQuery(table).parents('.j77-accordion').on('j77ElectionAccordeonVisible', function() {
                initialTableLoader();
            });
        }
    }
}
initialTableLoader();



function dtActionsToContextMenu(table) {
    
    table.find('thead .dt-col-link-col').each(function() {
        jQuery(this).html("");
    });

    table.find('tbody .dt-col-link-col').each(function() {
        let cell = jQuery(this);
        
        if(cell.hasClass('dropdown')) return true;
        
        cell.addClass('dropdown');
        let menu = jQuery('<ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1"></ul>');

        cell.find('a').each(function() {
            let link = jQuery(this);
            let li = jQuery('<li></li>');
            link.removeClass('dt-col-link');
            li.append(link);
            menu.append(li);
            jQuery(link).find('span').show();
        });

        let toggleBtn = jQuery('<a class="dropdownToggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i class="icon fas fa-ellipsis-v"></i></a>');
        cell.append(toggleBtn);
        cell.append(menu);
        
        new bootstrap.Dropdown(toggleBtn);

        // Open dropdown on ctrl click
        cell.parent().on('click', function(e) {
            if(!e.ctrlKey) return true;

            target = jQuery(e.target);
            if(target.parents('.dropdown').length) return true;
            if(target.hasClass('dropdown').length) return true;
            if(target.parents('a').length) return true;
            if(target[0].tagName == 'A') return true;

            e.preventDefault();

            // Open dropdown
            if (toggleBtn.parent().find('.dropdown-menu').is(":hidden")){    
                setTimeout(function() {
                    toggleBtn.dropdown('toggle');
                        
                    setTimeout(function() {
                        let leftOffsetMenu = menu.offset().left;
                        let topOffsetMenu = menu.offset().top;
                        let mouseX = e.pageX;
                        let mouseY = e.pageY;
                        let distanceX = mouseX - leftOffsetMenu;
                        let distanceY = mouseY - topOffsetMenu;

                        var pull_x = parseInt(menu.css('transform').split(',')[4]);
                        var pull_y = parseInt(menu.css('transform').split(',')[5]);

                        menu.css({ 'transform': 'translate(' + (pull_x + distanceX)  + 'px, ' + (pull_y + distanceY) + 'px)' });
                    },1);
                },1);
            }
        });
    });

}