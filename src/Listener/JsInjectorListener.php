<?php

namespace WirklichDigital\ElectionTheme\Listener;

use Laminas\Console\Console;
use Zend\EventManager\AbstractListenerAggregate;
use Zend\EventManager\EventManagerInterface;
use Zend\Mvc\MvcEvent;

class JsInjectorListener extends AbstractListenerAggregate
{
    /**
     * Attach to an event manager
     *
     * @param  EventManagerInterface $events
     * @param  int $priority
     * @return void
     */
    public function attach(EventManagerInterface $events, $priority = 1)
    {
        $this->listeners[] = $events->attach(MvcEvent::EVENT_RENDER, [$this, 'onRender'], 1000);
    }

    /**
     * Create LazyListener for all child template injectors
     *
     **/
    public function onRender(MvcEvent $event)
    {
        if (Console::isConsole()) {
            return;
        }
        $application = $event->getApplication();
        $container = $application->getServiceManager();
        $config = $container->get('config');
        $viewHelperManager = $container->get('ViewHelperManager');
       
        $globalLoaderConfig = $config['wirklich-digital']['election-theme']['global-loader'] ?? [];
        $script = 'window.globalLoaderConfig='.json_encode($globalLoaderConfig);

        $headScript = $viewHelperManager->get('headScript');
        $headScript->prependScript($script);
    }
}
