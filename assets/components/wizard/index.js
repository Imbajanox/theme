jQuery(function(){
    
    let wizard = function(baseElm) {

        let currentStep = 1;
        let maxSteps = jQuery(baseElm).find('[data-wizard-navigator-step]').length;
        
        let switchToStep = function(step){
            if(step === "+1") currentStep = Math.min(maxSteps, currentStep + 1);
            else if(step === "-1") currentStep = Math.max(1, currentStep - 1);
            else 
                currentStep = Math.min(maxSteps, Math.max(1, step));

            updateStepVisibility();
            updateNavigator();
            updateSwitchButtons();
        }

        let updateSwitchButtons = function(){
            if(currentStep == maxSteps)
                jQuery(baseElm).find('[data-wizard-next]').hide();
            else
                jQuery(baseElm).find('[data-wizard-next]').show();
            if(currentStep == 1)
                jQuery(baseElm).find('[data-wizard-back]').hide();
            else
                jQuery(baseElm).find('[data-wizard-back]').show();
        }

        let updateNavigator = function(){
            jQuery(baseElm).find('[data-wizard-navigator-step]').removeClass('active');
            jQuery(baseElm).find('[data-wizard-navigator-step='+currentStep+']').addClass('active');
        }

        let updateStepVisibility = function() {
            jQuery(baseElm).find('[data-wizard-step]').each(function(){
                let elmStep = jQuery(this).attr('data-wizard-step')
                let elmForVis = null;
                if(jQuery(this).is('fieldset') || jQuery(this).is('[data-wizard-visibility-on-element=1]'))
                    elmForVis = this;
                else {
                    elmForVis = jQuery(this).parents('.form-group')
                }

                if(elmStep == currentStep)
                    jQuery(elmForVis).show();
                else
                    jQuery(elmForVis).hide();
            });
        }

        let initButtons = function(){
            jQuery(baseElm).find('[data-wizard-next]').on('click',function(e){
                e.preventDefault();
                switchToStep('+1');
            });

            jQuery(baseElm).find('[data-wizard-back]').on('click',function(e){
                e.preventDefault();
                switchToStep('-1');
            });

            if(jQuery(baseElm).find('form button[type=submit]').length) {
                let submitButton = jQuery(baseElm).find('form button[type=submit]');
                jQuery(baseElm).find('[data-wizard-next]').prependTo(submitButton.parent());
                jQuery(baseElm).find('[data-wizard-back]').prependTo(submitButton.parent());
                jQuery(baseElm).find('.wizard--buttons').remove();
                submitButton.parent().addClass('btn-group');
            }
        }

        let init = function(){
            switchToStep(1);
            jQuery(baseElm).show();
            initButtons();
        }

        init();
    }

    jQuery('.wizard').each(function(){
        wizard(this);
    })
});