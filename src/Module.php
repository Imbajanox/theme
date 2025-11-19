<?php
namespace WirklichDigital\ElectionTheme;

use Laminas\ModuleManager\Feature\ConfigProviderInterface;

class Module implements ConfigProviderInterface
{
    const CONFIG_KEY = 'election-theme';

    public function getConfig()
    {
        return include __DIR__ . '/../config/module.config.php';
    }
}
