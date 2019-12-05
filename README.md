# Webpack PO Loader

[![Greenkeeper badge](https://badges.greenkeeper.io/Atomic-Reactor/webpack-po-loader.svg)](https://greenkeeper.io/)

This webpack loader facilitates locating Gettext Portable Object (PO) translation files, adding them to your javascript bundle so that it can be used for Javascript translations in the browser. The `.po` or `.pot` module will be a JSON stringified [JED](https://www.npmjs.com/package/jed) format named export `strings`.

This loader works well when used with [gettext-extract](https://www.npmjs.com/package/gettext-extract), which can look for string literals wrapped
in functions like `gettext` and `ngettext` (or aliased functions like `__` and `_n`), and automatically create the Portable Object Template (template.pot) for you from your codebase. This file can be used with a tool like [Poedit](https://poedit.net/download/) by a non-technical user (such as a translation company) to produce production Gettext Portable `.po` assets for desired locales.

## Install

```
npm install --save-dev @atomic-reactor/webpack-po-loader
```

## Use Example

```
import Jed from 'jed';

export default (locale = 'en_US') => {
    const { strings } = require('babel-loader!@atomic-reactor/webpack-po-loader!src/translations/' + locale + '.po');
    const jed = new Jed(JSON.parse(strings));

    return {
        // wrap string literals in your code with these helpers to get automatically translated
        // text in your software
        __: jed.gettext,
        _n: jed.ngettext,
    };
};
```

## Webpack Config Example

```
'use strict';

const webpack = require('webpack');
const env = process.env.NODE_ENV || 'development';
module.exports = {
    target: 'web',
    entry: ['index.js'],
    mode: env,
    output: {
        filename: '[name].js',
    },
    module: {
        rules: [
            {
                test: [/\.pot?$/],
                use: [
                    {
                        loader: '@atomic-reactor/webpack-po-loader',
                    },
                ],
            },
            {
                test: [/\.jsx|js($|\?)/],
                exclude: [/node_modules/],
                use: [
                    {
                        loader: 'babel-loader',
                    },
                ],
            },
            },
        ],
    },
};

```
