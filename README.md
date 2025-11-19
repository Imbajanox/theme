# Election Theme

**Enterprise-grade theme for Laminas applications with modern design and dark mode support.**

To see a demo page, check the [`wirklich-digital/election-theme-demo` module](https://git.jar.media/composer-modules/core/election-theme-demo)

## Features

### Modern Design System
- **Enterprise Color Palette**: Professional blue-based color scheme (#0052CC primary)
- **Typography**: Inter/Roboto font stack with defined weight hierarchy
- **Spacing System**: Consistent 8px grid system with tokens (@gap-xs through @gap-xxl)
- **Elevation**: 5-level shadow system for depth and hierarchy
- **Border Radius**: Modern rounded corners (4px, 6px, 8px)
- **Transitions**: Smooth 200-300ms animations throughout

### Components
- **Navigation**: Clean header and collapsible sidebar with hover states
- **Forms**: Modern inputs with focus rings and validation states
- **Buttons**: Multiple sizes and states with proper accessibility
- **Cards & Modals**: Backdrop blur effects and elevation
- **Datatables**: Clean, readable tables with modern pagination
- **Alerts**: Left-border accent with elevation
- **Dashboard**: Cards with gradients and hover effects
- **Login Page**: Modern, responsive design

### Dark Mode
The theme includes comprehensive dark mode support with optimized colors for both light and dark themes.

## Global Loader

The global loader can be used in two modes. First one is in blockingUI mode. The user can't do anything in the ui while the elements are loaded. The second mode is without blocking the ui. The updates are shown in the right bottom corner and the rest of the ui can be used as usual.

You can set this mode globally via php config: 
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