<?php

namespace WirklichDigital\ElectionTheme\Listener\ChildViewModelListener;

use Laminas\EventManager\EventManagerInterface;

use WirklichDigital\AdminBase\Listener\ChildViewModelListener\AbstractChildViewModelListener;
use Laminas\View\Model\ViewModel;
use Laminas\Mvc\MvcEvent;
use WirklichDigital\AutoPopup\Listener\ChildViewModelListener\AutoReopeningPopupListener as AutoReopeningPopupSourceListener;

class AutoReopeningPopupListener extends AbstractChildViewModelListener
{
    public const REMINDER_POPUP_EVENT_NAME = 'reminder_popup';

    protected $eventManager;

    protected function setEventManager(EventManagerInterface $eventManager)
    {
        $eventManager->addIdentifiers([
            __CLASS__,
            get_called_class(),
            AutoReopeningPopupSourceListener::class,
        ]);
        $this->eventManager = $eventManager;
    }

    public function onDispatch(MvcEvent $e)
    {
        if (! $this->eventManager) {
            $application = $e->getApplication();
            $container   = $application->getServiceManager();
            /** @var EventManagerInterface */
            $eventManager = $container->get(EventManagerInterface::class);
            $this->setEventManager($eventManager);
        }

        $childViewModel = new ViewModel([]);
        $template = $this->getModelTemplate($e, 'layout/election/partials/header/auto_reopening_popup');
        $childViewModel->setTemplate($template);
        $params = ['childViewModel' => $childViewModel];
        $this->eventManager->trigger(self::REMINDER_POPUP_EVENT_NAME, null, $params);
        if ($childViewModel->hasChildren()) {
            $this->appendChildView($e, $childViewModel, 'election_header_options', true);
        }
    }
}
