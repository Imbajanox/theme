<?php
namespace WirklichDigital\ElectionTheme\Listener\ChildViewModelListener;

use WirklichDigital\AdminBase\Listener\ChildViewModelListener\AbstractChildViewModelListener;
use WirklichDigital\AdminBase\Service\Factory\AdminConstructedNavigationFactory;
use Laminas\Authentication\AuthenticationService;
use Laminas\View\Model\ViewModel;
use Laminas\Mvc\MvcEvent;
use Laminas\View\Helper\HeadScript;
use WirklichDigital\Events\Module as EventsModule;
use WirklichDigital\AdminBase\Event\NavigationConfigEvent;

class SideMenuListener extends AbstractChildViewModelListener
{
    public function onDispatch(MvcEvent $e)
    {
        $application = $e->getApplication();
        $container   = $application->getServiceManager();
        $config      = $container->get('config');

        /** @var HeadScript $headScript */
        $helperManager = $container->get('ViewHelperManager');
        $headScript = $helperManager->get('headScript');
        $themeSideMenuConfig = $config['wirklich-digital']['election-theme']['menus']['side-menu'] ?? [];
        $headScript->appendScript('window.WirklichDigital = window.WirklichDigital || {}; window.WirklichDigital.themeSideMenuConfig = '.json_encode($themeSideMenuConfig).';');

        /** @var AuthenticationService */
        $authenticationService = $container->get(AuthenticationService::class);
        if(!$authenticationService->hasIdentity())
            return;

        $navigationConf = $config['wirklich-digital']['admin']['navigation'] ?? [];
        $navigationConfigEvent = new NavigationConfigEvent();
        $navigationConfigEvent->setNavigationConfig($navigationConf);

        $eventManager = $container->get(EventsModule::EVENT_MANAGER);
        $eventManager->triggerEvent($navigationConfigEvent);

        $navigationConf = $navigationConfigEvent->getNavigationConfig();

        // create navigation container from config array
        $navigationFactory = new AdminConstructedNavigationFactory($navigationConf);
        $navigation = $navigationFactory->createService($container);
        $activeFirstLevelPage = $this->getActiveFirstLevelPage($navigation);

        $sidebarViewModel = new ViewModel([
            'activeFirstLevelPage' => $activeFirstLevelPage
        ]);

        $template = $this->getModelTemplate($e, 'layout/election/partials/aside/menu_side');
        $sidebarViewModel->setTemplate($template);
        $this->appendChildView($e, $sidebarViewModel, 'election_aside', true);
    }
    
    /**
     * Remove all navigation pages that are not in the active branch
     */
    protected function getActiveFirstLevelPage($navigation)
    {
        foreach ($navigation->getPages() as $page) {
            if ($page->isActive(true)) {
                return $page;
            }
        }
        return null;
    }

    
}
