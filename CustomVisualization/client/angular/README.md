# RevealDemo

Reveal SDK custom visualization sample for Angular. Built with [Angular CLI](https://github.com/angular/angular-cli) 22.2.0, `reveal-sdk` 2.2.1 and `igniteui-angular` 22.1.5.

The app hosts a `RevealView` at `/` and registers two custom visualizations that Reveal loads in an iframe:

- `/table` - a plain HTML table
- `/pivot-grid` - an Ignite UI for Angular pivot grid

## Prerequisites

- Node.js `^22.22.3` or `^24.15.0` (required by Angular 22)
- A Reveal server running on `http://localhost:5111` that serves the `Sales` dashboard (see the `server` samples)

> The public `igniteui-angular` npm package shows a trial watermark on the pivot grid. Licensed customers can switch to `@infragistics/igniteui-angular` from the Infragistics private feed.

## Development server

Run `npm install`, then `npm start` (or `ng serve`) for a dev server. Navigate to `http://localhost:4200/`. The custom visualization URLs are registered as `http://localhost:4200/...`, so keep the default port.

## Build

Run `npm run build` (or `ng build`) to build the project. The build artifacts will be stored in the `dist/` directory.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
