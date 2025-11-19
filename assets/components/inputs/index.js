$(document).ready(function() {

    /****** SPAN AFTER INPUT ******/
    if($('.election_layout_login').length > 0) {
        $('input:visible:not(:checkbox):not(:radio):not(.select2-search__field)').after('<span></span>')
    }

    /****** COLLECTION TOGGLE ******/
    jQuery('body').on('click tap', '.collection-fieldset-item', function(e){
        if(!jQuery(e.target).hasClass('collection-fieldset-item') || e.target != this)
            return; // Accept only direct clicks...

        if(e.offsetY > 25)
            return; // Accept only clicks on header

        jQuery(e.target).toggleClass('collection-fieldset-item-collapsed');       
    });

    /****** FORM TABLE ******/
    function updateFormTablesIfExist() {
        // Whole repeater entry
        let formTableBasicElement = jQuery('form fieldset.form-table');
        jQuery(formTableBasicElement).each(function(){
            // Put last two form controls ("inheritance-id" and "empty value") in one container to show them underneath each other.
            let inheritanceFormGroup = jQuery(this).find('> .form-group:not(.btn-remove-element) input[name*="inheritanceId"]').parents('.form-group');
            let emptyValueFormGroup = jQuery(this).find('> .form-group:not(.btn-remove-element) input[name*="isEmpty"]').parents('.form-group');

            if(inheritanceFormGroup && emptyValueFormGroup) {
                let inheritanceFormGroupLabel = jQuery(inheritanceFormGroup).find('label').hide();
                inheritanceFormGroup.prepend(jQuery('<legend/>').html(jQuery(inheritanceFormGroupLabel).text()));
                emptyValueFormGroup.addClass('attribute-value-empty-form-group');

                let formGroupContainer = jQuery('<div class="form-group-table-container"></div>');
                inheritanceFormGroup.detach().appendTo(formGroupContainer);
                formGroupContainer.appendTo(this);
            }

            // Should only be one fieldset with the attribute fields...
            let fieldsets =  jQuery(this).find('> fieldset');
            jQuery(fieldsets).each(function(){
                let maxLegendHeight = 26;
                col_count = jQuery(this).find('> fieldset').length;
                jQuery(this).find('> fieldset').each(function(){
                    maxLegendHeight = Math.max(maxLegendHeight, jQuery(this).find('> legend').height());
                    jQuery(this).css('width',(100/col_count)+'%');

                    // Hide descriptions behind question icon
                    jQuery(this).find('> .attribute-description:not(.handled)').each(function(){
                        jQuery(this).addClass('handled');
                        let tooltipTriggerIcon = jQuery('<i class="fas fa-question-circle"></i>');
                        let content = jQuery(this).find('> div');
                        jQuery(this).parent().find('> legend').append(tooltipTriggerIcon);
                        tippy(tooltipTriggerIcon[0], {
                            content: content[0],
                            allowHTML: true,
                            interactive: true,
                            placement: 'bottom'
                        });
                        jQuery(this).parent().find('.form-group:not(.attribute-description)').css('clear','both');
                        jQuery(this).hide();
                    });
                });
                jQuery(this).find('> fieldset').each(function(){
                    jQuery(this).find('> legend').css('height',(maxLegendHeight+5)+'px');
                });
                jQuery(this).parent().find('> .form-group-table-container > div > legend').css('height',(maxLegendHeight+5)+'px');
            });
        });
        
    }
    updateFormTablesIfExist();

    /****** SELECT2 ******/
    function initSelect2IfExist() {
        jQuery('form select[multiple], .select2').each(function(){
            if( 
                !jQuery(this).is(".no-select2")
                && !jQuery(this).is(".no-auto-init")
                && !jQuery(this).is("[data-sortable-attributes]")
                && !jQuery(this).is("[data-sortable-outputrules]")
                && !jQuery(this).is("[data-select2-id]")
                && !jQuery(this).is(".productSelector")
            ) {
                jQuery(this).select2();
            }
        });
        jQuery('form select').each(function(){
            if( 
                !jQuery(this).is(".no-select2")
                && !jQuery(this).is(".no-auto-init")
                && !jQuery(this).is("[data-sortable-attributes]")
                && !jQuery(this).is("[data-sortable-outputrules]")
                && !jQuery(this).is("[data-select2-id]")
                && !jQuery(this).is(".productSelector")
            ) {
                if(jQuery(this).find('option').length > 0 && !jQuery(this).is("[data-select2-id]")) 
                {
                    jQuery(this).select2();
                }
            }
        });
    }
    initSelect2IfExist();

    /****** CollectionBtnClasses ******/
    function initCollectionBtnClasses() {
        jQuery('.collection-fieldset .btn-add-element .btn').addClass('btn-sm btn-primary');
        jQuery('.collection-fieldset .btn-remove-element .btn').addClass('btn-sm btn-primary');
    }
    initCollectionBtnClasses();

    /****** ON MUTATIONS (e.g. dynamically loaded subforms) ******/
    MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
    var observer = new MutationObserver(function(mutations, observer) {
        let hasNewFieldsets = false;
        let collectionTemplates = [];
        jQuery(mutations).each(function(i,v){
            // if v.addedNodes contains a fieldset or has a child that contains a fieldset
            jQuery(v.addedNodes).each(function(j,addedNode){
                if(jQuery(addedNode).find('fieldset').length)
                    hasNewFieldsets = true;
                // If self is a fieldset
                if(jQuery(addedNode).is('fieldset'))
                    hasNewFieldsets = true;
            });
            
            if(jQuery(v.addedNodes).find("span[data-template]")) {
                jQuery(v.addedNodes).find("span[data-template]").each(function(j,templateNode){
                    collectionTemplates.push(templateNode);
                })
            }
        });

        if(!hasNewFieldsets) return;

        updateFormTablesIfExist();
        initSelect2IfExist();
        initCollectionBtnClasses();

    });

    let observedParents = [];
    jQuery('form').each(function(){
        let parent = jQuery(this).parent()[0];
        if(!observedParents.includes(parent)) {
            observedParents.push(parent);
            observer.observe(parent, {
                subtree: true,
                childList: true
            });
        }
    });

    
    /****** Textareas: Auto-Resize ******/
    jQuery('textarea.autoResize').each(function(){
        if(jQuery(this).parent().hasClass('autoResize-wrap'))
            return; // Already wrapped or managed by another script

        // Wrap with div to allow for resizing
        jQuery(this).wrap('<div class="autoResize-wrap"></div>');
        jQuery(this).on('input', function(){
            jQuery(this)[0].parentNode.dataset.replicatedValue = jQuery(this)[0].value;
        });
    });
    
});

