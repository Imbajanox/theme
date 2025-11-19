<?php
namespace WirklichDigital\ElectionTheme\Listener\ChildViewModelListener;

use WirklichDigital\AdminBase\Listener\ChildViewModelListener\AbstractChildViewModelListener;
use WirklichDigital\EntityTranslation\Service\EntityLocaleService;
use Laminas\Authentication\AuthenticationService;
use Laminas\View\Model\ViewModel;
use Laminas\Mvc\MvcEvent;

class HeaderLanguageSwitcherListener extends AbstractChildViewModelListener
{
    public function onDispatch(MvcEvent $e)
    {
        $application = $e->getApplication();
        $container   = $application->getServiceManager();
        $localeService = $container->get(EntityLocaleService::class);

        /** @var AuthenticationService */
        $authenticationService = $container->get(AuthenticationService::class);
        if(!$authenticationService->hasIdentity()) {
            return;
        }

        $languages = $localeService->getLocaleObjects();
        $currentLocale = $localeService->getCurrentLocale();

        $childViewModel = new ViewModel([
            'languages' => $languages,
            'currentLanguage' => $currentLocale,
        ]);

        $template = $this->getModelTemplate($e, 'layout/election/partials/header/languageSwitcher');
        $childViewModel->setTemplate($template);
        $this->appendChildView($e, $childViewModel, 'election_header_options', true);
    }
}
