<?php
namespace WirklichDigital\ElectionTheme\Listener\ChildViewModelListener;

use WirklichDigital\AdminBase\Listener\ChildViewModelListener\AbstractChildViewModelListener;
use WirklichDigital\AdminBase\Service\Factory\AdminConstructedNavigationFactory;
use Laminas\Authentication\AuthenticationService;
use Laminas\View\Model\ViewModel;
use Laminas\Mvc\MvcEvent;

class TopMenuListener extends AbstractChildViewModelListener
{
    public function onDispatch(MvcEvent $e)
    {
        $application = $e->getApplication();
        $container   = $application->getServiceManager();
        $config      = $container->get('config');

        /** @var AuthenticationService */
        $authenticationService = $container->get(AuthenticationService::class);
        if(!$authenticationService->hasIdentity())
            return;

        $themeSideMenuConfig = $config['wirklich-digital']['election-theme']['menus']['side-menu'] ?? [];
            
        $navigationConf = $config['wirklich-digital']['admin']['navigation'] ?? [];
        $navigationFactory = new AdminConstructedNavigationFactory($navigationConf);
        $navigation = $navigationFactory->createService($container);

        $childViewModel = new ViewModel([
            'navigationContainer' => $navigation,
            'themeSideMenuConfig' => $themeSideMenuConfig
        ]);
    
        $template = $this->getModelTemplate($e, 'layout/election/partials/aside/menu_top');
        $childViewModel->setTemplate($template);
        $this->appendChildView($e, $childViewModel, 'election_aside', true);
    }
}
