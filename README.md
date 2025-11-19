# Election Theme

To see a demo page, check the [`wirklich-digital/election-theme-demo` module](https://git.jar.media/composer-modules/core/election-theme-demo)

## global loader
The global loader can be used in two modes. First one is in blockingUI mode. The user can't do anything in the ui while the elements are loaded. The second mode is without blocking the ui. The updates are shown in the right bottom corner and the rest of the ui can be used as usual.
You can set this mode globa via php config 
```PHP
<?php

return [
    'wirklich-digital' => [
        'election-theme' => [
            'global-loader' => [
                'blockUI' => false,
            ],
        ],
    ],
];
```

If you use the NOT blocking ui mode you have the possibility to block the ui for single requests by setting the parameter at the set loading method call in javascript.

```JS
window.globalLoader.loading("loadblog", $gettext('Loading Blog'), null, true); // (key, text, timeout, blockUI)

```