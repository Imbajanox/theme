<?php
namespace WirklichDigital\ElectionTheme\Listener\ChildViewModelListener;

use WirklichDigital\AdminBase\Listener\ChildViewModelListener\AbstractChildViewModelListener;
use Laminas\View\Model\ViewModel;
use Laminas\Mvc\MvcEvent;
use WirklichDigital\SystemOptions\Service\OptionsService;
use Laminas\Authentication\AuthenticationService;

class HeaderSearchListener extends AbstractChildViewModelListener
{
    public function onDispatch(MvcEvent $e)
    {
        $application = $e->getApplication();
        $container   = $application->getServiceManager();

        $optionsService = $container->get(OptionsService::class);
        
        /** @var AuthenticationService */
        $authenticationService = $container->get(AuthenticationService::class);
        if(!$authenticationService->hasIdentity()) {
            return;
        }

        $minStringLength = intval($optionsService->getOptionValue("search.minStringLength") ?? 0);

        if ($minStringLength <= 0) {
            $minStringLength = 0;
        }
       
        $childViewModel = new ViewModel([
            "minStringLength" => $minStringLength,
        ]);

        $template = $this->getModelTemplate($e, 'layout/election/partials/header/search');
        $childViewModel->setTemplate($template);
        $this->appendChildView($e, $childViewModel, 'election_header_options', true);
    }
}
