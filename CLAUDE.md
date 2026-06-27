# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm start` (or `ng serve`) — dev server at `http://localhost:4200/`, with live reload.
- `npm run build` — production build to `dist/tik-talk` (default config is `production`).
- `npm run watch` — incremental development build (`--watch`, dev config).
- `npm test` (or `ng test`) — run the Karma + Jasmine unit test suite (single Chrome launch).
  - There is no built-in single-test script; target a file by temporarily narrowing with Jasmine `fdescribe`/`fit`, or scaffold a dedicated Karma config. Note: schematics generate components/services/pipes/directives **without** spec files (`skipTests: true`), so few `.spec.ts` files exist.
- `npm run lint` (or `ng lint`) — ESLint over `src/**/*.ts` and `src/**/*.html`.

## Architecture

Angular 18 standalone-component SPA (no NgModules). Bootstrapped from [src/main.ts](src/main.ts) via `bootstrapApplication(AppComponent, appConfig)`. The app is a TikTok-style profile/chat client backed by an external course API.

- **App config** ([src/app/app.config.ts](src/app/app.config.ts)) — central provider list: zone change detection with event coalescing, router, and `provideHttpClient()`. Add global providers (interceptors, etc.) here.
- **Routing** ([src/app/app.routes.ts](src/app/app.routes.ts)) — `LayoutMainComponent` is the shell (sidebar + `<router-outlet>`) wrapping the authed pages (`search`, `settings`, `profile`, `chats`); `login` sits outside the shell. There are currently no route guards even though `AuthService` exists.
- **Backend** — all data comes from the hardcoded base URL `https://icherniakov.ru/yt-course` (see [account.service.ts](src/app/core/services/account.service.ts) and [img-url.pipe.ts](src/app/pipes/img-url.pipe.ts)). There is no environment-file abstraction; the URL is duplicated, so changing the host means updating both spots.

### Directory layout (`src/app/`)

- `core/services/` — singleton (`providedIn: 'root'`) services using the `inject(HttpClient)` pattern; return raw `Observable`s.
- `core/interfaces/api/` and `core/interfaces/forms/` — `type` aliases (not interfaces — enforced by lint) for API models and form shapes.
- `components/` — shared structural components (layout shell, sidebar).
- `pages/` — routed page components, each in its own folder (`*.component.{ts,html,scss}`); page-local subcomponents nest under the page folder.
- `widgets/` — reusable presentational components.
- `pipes/` — standalone pipes.

## Conventions

These are enforced by [eslint.config.js](eslint.config.js) and the Angular schematic defaults — follow them when adding code:

- **Standalone components only**, with `changeDetection: ChangeDetectionStrategy.OnPush` and `style: scss` (schematic defaults).
- **Signals over mutable fields** for component state (`signal<T>(...)`), and `inject()` over constructor injection.
- **`type` not `interface`** (`consistent-type-definitions`), and `T[]` array syntax.
- **Explicit return types required** on all functions (`explicit-function-return-type: error`).
- **No `public` modifier** — omit it (`explicit-member-accessibility: no-public`); use `private`/`protected` explicitly.
- **Selectors**: components `app-` kebab-case (element or attribute); directives `app` camelCase attribute.
- **Templates**: use new control flow (`@if`/`@for`, not `*ngIf`/`*ngFor` — `prefer-control-flow: error`), prefer `NgOptimizedImage`/`ngSrc`, self-closing tags, and `trackBy`. Attribute ordering is alphabetical and grouped (structural → ref → attribute → input → two-way → output).
- **`max-lines: 400`** per file and `max-len: 120` are hard/soft caps; `max-classes-per-file: 1`.
- TypeScript is in `strict` mode plus `strictTemplates`, `noPropertyAccessFromIndexSignature`, and `noImplicitOverride`.
