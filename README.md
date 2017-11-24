# kenga-model-fields
Kenga bindable input widgets with **JavaScript typed** values. You can find almost all HTML5 input widgets here.
They all have data binding feature, `value` property and fire value change events.

## Install
To install `kenga-model-fields` package to your project, type the following command:
`npm install kenga-model-fields --save`

## Using
To use data binding of these widgets, you can write something like this
`const me = new ModelEmailField(); me.data = ordersData; me.field = 'currentItem.orderer.email';`.

## Architecture
These wdigets are decorated and bound field widgets.
All of these widgets are descendants of similar widdgets from `kenga-fields` package.
