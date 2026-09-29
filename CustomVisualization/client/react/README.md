# Custom Visualizations with Reveal SDK and React

Reveal SDK custom visualization sample for React 19, built with [Vite](https://vite.dev), `reveal-sdk` 2.2.1 and Ignite UI for React 19.9.

The app hosts a `RevealView` at `/` and registers two custom visualizations that Reveal loads in an iframe:

- `/table` - a plain HTML table
- `/pivot-grid` - an Ignite UI for React pivot grid

## Prerequisites

- Node.js `^22.22.0` or later (required by React Router 8 and Vite 8)

## Available Scripts

In the project directory, run `npm install` first, then:

### `npm run dev` (or `npm start`)

Runs the app in development mode. Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

### `npm run build`

Type-checks the project and builds it for production to the `dist` folder.

### `npm run preview`

Serves the production build locally.
