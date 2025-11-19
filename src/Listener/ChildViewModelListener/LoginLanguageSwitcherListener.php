<?php
namespace WirklichDigital\ElectionTheme\Listener\ChildViewModelListener;

use WirklichDigital\AdminBase\Listener\ChildViewModelListener\AbstractChildViewModelListener;
use WirklichDigital\EntityTranslation\Service\EntityLocaleService;
use WirklichDigital\SystemTranslation\Options\TranslationOptions;
use Laminas\Authentication\AuthenticationService;
use Laminas\View\Model\ViewModel;
use Laminas\Mvc\MvcEvent;

class LoginLanguageSwitcherListener extends AbstractChildViewModelListener
{
    public function onDispatch(MvcEvent $e)
    {
        $application = $e->getApplication();
        $container   = $application->getServiceManager();
        $translationOptions = $container->get(TranslationOptions::class);
        $translator = $container->get('MvcTranslator');

        $languages = $translationOptions->getLocales();
        $currentLanguage = $translator->getLocale();

        $childViewModel = new ViewModel([
            'languages' => $languages,
            'currentLanguage' => $currentLanguage,
        ]);


        $template = $this->getModelTemplate($e, 'layout/election/partials/login/system_language_switcher_login');
        $childViewModel->setTemplate($template);
        $this->appendChildView($e, $childViewModel, 'election_login_bottom', true);
    }
}
