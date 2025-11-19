<?php
namespace WirklichDigital\ElectionTheme;

use Assetic\Filter\LessFilter;
use Laminas\Router\Http\Literal;
use Laminas\Router\Http\Placeholder;

return  [

    'translator' => [
        'translation_file_patterns' => [
            [
                'type'     => 'gettext',
                'base_dir' => __DIR__ .  '/../language',
                'pattern'  => '%s.mo',
            ],
        ],
    ],

    'doctrine' => [
        'driver' => [
            'orm_default' => [
                'drivers' => [
                    __NAMESPACE__ . '\\Entity' => 'WirklichDigital\DynamicEntityModule_driver',
                ],
            ],
        ],
    ],

    'service_manager' => [
        'invokables' => [
            Listener\ChildViewModelListener\HeaderSearchListener::class,
            Listener\ChildViewModelListener\HeaderLanguageSwitcherListener::class,
            Listener\ChildViewModelListener\LoginLanguageSwitcherListener::class,
            Listener\ChildViewModelListener\HeaderLogoListener::class,
            Listener\ChildViewModelListener\TopMenuListener::class,
            Listener\ChildViewModelListener\SideMenuListener::class,
            Listener\ChildViewModelListener\ProfileMenuListener::class,
            Listener\ChildViewModelListener\AutoReopeningPopupListener::class,
            Listener\JsInjectorListener::class,
        ],
    ],

    'listeners' => [
        Listener\JsInjectorListener::class,
    ],

    'view_helpers'    => [
    ],

    'controllers' => [
        'factories' => [
        ],
    ],

    'asset_manager' => [
        'resolver_configs' => [
            'aliases' => [
                'assets/election-theme/' => __DIR__ . '/../assets/',
            ],
            'concat_files' => [
                'assets/election-theme/style/less-compile.less' => [
                    'assets/election-theme/style/config.less',
                    'assets/election-theme/style/normalize.less',
                    'assets/election-theme/style/main.less',
                    'assets/election-theme/style/mixins.less',
                    'assets/election-theme/style/_fontFaces.less',
                    'assets/election-theme/style/_bs-overwrite.less',
                    'assets/election-theme/components/buttons/buttons.less',
                    'assets/election-theme/components/alerts/alerts.less',
                    'assets/election-theme/components/callout/callout.less',
                    'assets/election-theme/components/colors/colors.less',
                    'assets/election-theme/components/fonts/index.less',
                    'assets/election-theme/components/header/index.less',
                    'assets/election-theme/components/search/index.less',
                    'assets/election-theme/components/base/index.less',
                    'assets/election-theme/components/menu/index.less',
                    'assets/election-theme/components/global-loader/index.less',
                    'assets/election-theme/components/dashboard/index.less',
                    'assets/election-theme/components/login/index.less',
                    'assets/election-theme/components/modal/index.less',
                    'assets/election-theme/components/badge/index.less',
                    'assets/election-theme/components/datatables/index.less',
                    'assets/election-theme/components/inputs/index.less',
                    'assets/election-theme/components/accordion/index.less',
                    'assets/election-theme/components/context/index.less',
                    'assets/election-theme/components/product-list/index.less',
                    'assets/election-theme/components/innermenu/index.less',
                    'assets/election-theme/components/wizard/index.less',
                    'assets/election-theme/components/medien-lightbox/index.less',
                    'assets/election-theme/components/jquery-ui/index.less'
                ],
                'assets/election-theme/style/less-compile-dark.less' => [
                    'assets/election-theme/style/config.less',
                    'assets/election-theme/components/darkmode/config.less',
                    'assets/election-theme/style/normalize.less',
                    'assets/election-theme/style/main.less',
                    'assets/election-theme/style/mixins.less',
                    'assets/election-theme/style/_fontFaces.less',
                    'assets/election-theme/style/_bs-overwrite.less',
                    'assets/election-theme/components/buttons/buttons.less',
                    'assets/election-theme/components/alerts/alerts.less',
                    'assets/election-theme/components/callout/callout.less',
                    'assets/election-theme/components/colors/colors.less',
                    'assets/election-theme/components/fonts/index.less',
                    'assets/election-theme/components/header/index.less',
                    'assets/election-theme/components/search/index.less',
                    'assets/election-theme/components/base/index.less',
                    'assets/election-theme/components/menu/index.less',
                    'assets/election-theme/components/global-loader/index.less',
                    'assets/election-theme/components/dashboard/index.less',
                    'assets/election-theme/components/login/index.less',
                    'assets/election-theme/components/modal/index.less',
                    'assets/election-theme/components/badge/index.less',
                    'assets/election-theme/components/datatables/index.less',
                    'assets/election-theme/components/inputs/index.less',
                    'assets/election-theme/components/accordion/index.less',
                    'assets/election-theme/components/context/index.less',
                    'assets/election-theme/components/product-list/index.less',
                    'assets/election-theme/components/innermenu/index.less',
                    'assets/election-theme/components/wizard/index.less',
                    'assets/election-theme/components/medien-lightbox/index.less',
                    'assets/election-theme/components/jquery-ui/index.less',
                    'assets/election-theme/components/darkmode/overrides.less',
                ],
            ],
            'collections' => [
                'assets/election-main.css' => [
                    'assets/jquery-ui/jquery-ui.min.css',
                    'assets/bootstrap5/css/bootstrap.min.css', // To be added later
                    'assets/fontawesome/less/fontawesome.css',
                    'assets/election-theme/style/less-compile.less',
                    'assets/select2/select2.min.css',
                    'assets/flag-icon-css/standalone.css',
                    'assets/spectrum/spectrum.css',
                    'assets/fontawesome-icon-picker-form-element/less/icon-picker.less',
                    'assets/auto-popup/css/auto_popup.css'
                ],
                'assets/election-main-dark.css' => [
                    'assets/jquery-ui/jquery-ui.min.css',
                    'assets/bootstrap5/css/bootstrap.min.css', // To be added later
                    'assets/fontawesome/less/fontawesome.css',
                    'assets/election-theme/style/less-compile-dark.less',
                    'assets/select2/select2.min.css',
                    'assets/flag-icon-css/standalone.css',
                    'assets/spectrum/spectrum.css',
                    'assets/fontawesome-icon-picker-form-element/less/icon-picker.less',
                    'assets/auto-popup/css/auto_popup.css'
                ],
                'assets/election-head.js' => [
                    'assets/bootstrap5/js/bootstrap.bundle.min.js', // To be added later
                    'assets/jquery/jquery.min.js',
                    'assets/jquery-ui/jquery-ui.min.js',
                    'assets/select2/select2.min.js',
                    'assets/popper/js/popper.min.js',
                    'assets/tippy/js/tippy-bundle.umd.min.js',
                    'assets/system-translation-js/gettext_function.js',
                    'assets/election-theme/components/global-loader/index.js',
                    'assets/election-theme/components/datatables/index.js',
                    'assets/election-theme/components/modal/index-head.js',
                ],
                'assets/election-main.js' => [
                    'assets/mustache/mustache.min.js',
                    'assets/data-tables/datatables.js',
                    'assets/spectrum/spectrum.js',
                    'assets/admin-base-assets/js/formcollection.js',
                    'assets/hotkeys/hotkeys.min.js',
                    'assets/election-theme/components/base/index.js',
                    'assets/election-theme/components/header/index.js',
                    'assets/election-theme/components/search/index.js',
                    'assets/election-theme/components/accordion/index.js',
                    'assets/election-theme/components/inputs/index.js',
                    'assets/election-theme/components/modal/index.js',
                    'assets/election-theme/components/menu/index.js',
                    'assets/election-theme/components/context/index.js',
                    'assets/election-theme/components/login/index.js',
                    'assets/election-theme/components/dashboard-entries/index.js',
                    'assets/election-theme/components/wizard/index.js',
                    'assets/fontawesome-icon-picker-form-element/js/icon-picker.js',
                    'assets/auto-popup/js/wirklich-digital.AutoReopeningPopup.js',
                    'assets/js-cookie/js.cookie.min.js'
                ],
            ],
        ],
        'filters' => [
            'assets/election-theme/style/less-compile.less' => [
                [ 'service' => LessFilter::class ],
            ],
            'assets/election-theme/style/less-compile-dark.less' => [
                [ 'service' => LessFilter::class ],
            ],
        ],
    ],

    'view_manager' => [
        'template_path_stack' => [
            __DIR__ . '/../view',
        ],
    ],

    'wirklich-digital' => [
        'election-theme' => [
            'menus' => [
                'side-menu' => [
                    'collapsible' => true,
                    'hideLogoOnMenuCollapse' => true,
                    'saveCollapseState' => true
                ]
            ]
        ],
        'admin' => [
            'page-layout' => [
                'layouts' => [
                    [
                        'prefix' => "authentication/login",
                        'priority' => 1000,
                        'template' => "layout/election/login"
                    ],
                    [
                        'prefix' => "authentication-mail-forgot-password",
                        'priority' => 1000,
                        'template' => "layout/election/login"
                    ],
                    [
                        'prefix' => "",
                        'priority' => 1000,
                        'template' => "layout/election/layout"
                    ],
                    [
                        'prefix' => "close-popup",
                        'priority' => 2000,
                        'template' => "layout/election/empty"
                    ],
                ]
            ],
            'listeners' => [
                Listener\ChildViewModelListener\HeaderLanguageSwitcherListener::class => [
                    'listener' => Listener\ChildViewModelListener\HeaderLanguageSwitcherListener::class,
                    'method'   => 'onDispatch',
                    'event'    => \Laminas\Mvc\MvcEvent::EVENT_DISPATCH,
                    'priority' => 1100,
                ],
                Listener\ChildViewModelListener\LoginLanguageSwitcherListener::class => [
                    'listener' => Listener\ChildViewModelListener\LoginLanguageSwitcherListener::class,
                    'method'   => 'onDispatch',
                    'event'    => \Laminas\Mvc\MvcEvent::EVENT_DISPATCH,
                    'priority' => 1100,
                ],
                Listener\ChildViewModelListener\HeaderSearchListener::class => [
                    'listener' => Listener\ChildViewModelListener\HeaderSearchListener::class,
                    'method'   => 'onDispatch',
                    'event'    => \Laminas\Mvc\MvcEvent::EVENT_DISPATCH,
                    'priority' => 1100,
                ],
                Listener\ChildViewModelListener\AutoReopeningPopupListener::class => [
                    'listener' => Listener\ChildViewModelListener\AutoReopeningPopupListener::class,
                    'method'   => 'onDispatch',
                    'event'    => \Laminas\Mvc\MvcEvent::EVENT_DISPATCH,
                    'priority' => 1200,
                ],
                Listener\ChildViewModelListener\HeaderLogoListener::class => [
                    'listener' => Listener\ChildViewModelListener\HeaderLogoListener::class,
                    'method'   => 'onDispatch',
                    'event'    => \Laminas\Mvc\MvcEvent::EVENT_DISPATCH,
                    'priority' => 1100,
                ],
                Listener\ChildViewModelListener\TopMenuListener::class => [
                    'listener' => Listener\ChildViewModelListener\TopMenuListener::class,
                    'method'   => 'onDispatch',
                    'event'    => \Laminas\Mvc\MvcEvent::EVENT_DISPATCH,
                    'priority' => 1130,
                ],
                Listener\ChildViewModelListener\SideMenuListener::class => [
                    'listener' => Listener\ChildViewModelListener\SideMenuListener::class,
                    'method'   => 'onDispatch',
                    'event'    => \Laminas\Mvc\MvcEvent::EVENT_DISPATCH,
                    'priority' => 1120,
                ],
                Listener\ChildViewModelListener\ProfileMenuListener::class => [
                    'listener' => Listener\ChildViewModelListener\ProfileMenuListener::class,
                    'method'   => 'onDispatch',
                    'event'    => \Laminas\Mvc\MvcEvent::EVENT_DISPATCH,
                    'priority' => 1110,
                ],
            ]
        ],
        'data-tables' => [
            'options' => [
                'linkColumn' => [
                    'separator' => ' '
                ]
            ]
        ]
    ],

    'router' => [
        'routes' => [
            'election-theme' => [
                'type' => Placeholder::class,
            ],
        ],
    ],

    'console' => [
        'router' => [
            'routes' => [
            ],
        ],
    ],
];
