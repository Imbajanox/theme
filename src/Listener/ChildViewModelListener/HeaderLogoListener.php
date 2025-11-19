<?php
namespace WirklichDigital\ElectionTheme\Listener\ChildViewModelListener;

use WirklichDigital\AdminBase\Listener\ChildViewModelListener\AbstractChildViewModelListener;
use Laminas\View\Model\ViewModel;
use Laminas\Mvc\MvcEvent;

class HeaderLogoListener extends AbstractChildViewModelListener
{
    public function onDispatch(MvcEvent $e)
    {
        $application = $e->getApplication();
        $container   = $application->getServiceManager();
        $config      = $container->get('config');
        $config      = $config['wirklich-digital']['admin']['logo'] ?? [];

        $srcBig = $config["src-dark"] ?? "";
        $srcSmall = $config["src-small"] ?? $config["src-dark"] ?? "";
        $alt = $config["alt"] ?? "";
        $title = $config["title"] ?? "";

        if (! $srcBig) {
            return;
        }

        $childViewModel = new ViewModel([
            'srcBig' => $srcBig,
            'srcSmall' => $srcSmall,
            'alt' => $alt,
            'title' => $title,
            'config' => $config,
        ]);
        $template = $this->getModelTemplate($e, 'layout/election/partials/header/logo');
        $childViewModel->setTemplate($template);
        $this->appendChildView($e, $childViewModel, 'election_header_logo', true);
    }
}
