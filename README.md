# Trouble ignoring babel file

It seems like Next.js doesn't respect the `ignore` babel directive when transforming them.

The `babel.config.js` contains a preset `babel-preset-expo` which causes issues when transforming \_middleware functions into compatible edge functions (no Eval, no new Function, etc…).

When trying to ignore the `_middleware` files inside the configuration, they are still transformed using `@babel/runtime`.

The `test-babel` script inside this repository uses the babel configuration in the root to transform the files inside of the `pages/` directory into `babel-test/`.

When ran with the `TRANSFORM_ALL` constant set to `true`, the `_middleware` file is also transformed. When set to false, it is not. This is in line with how the `ignore` option is supposed to work with Babel.

However, when running `npm run build`, the same file is _still_ transformed by Babel. This is highlighted after the build fails.

Even stranger, with the ignore options present with `TRANSFORM_ALL` set to `true`, the contents of the middleware are not even included in `_middleware.js` and yet it fails.

```sh
Failed to compile.

./node_modules/next/node_modules/@babel/runtime/helpers/construct.js
Dynamic Code Evaluation (e. g. 'eval', 'new Function') not allowed in Middleware pages/api/_middleware

Import trace for requested module:
./node_modules/next/node_modules/@babel/runtime/helpers/wrapNativeSuper.js
./node_modules/next/dist/shared/lib/utils.js
./node_modules/next/dist/shared/lib/router/utils/parse-relative-url.js
./node_modules/next/dist/shared/lib/router/utils/parse-url.js
./node_modules/next/dist/shared/lib/router/utils/prepare-destination.js
./node_modules/next/dist/server/router.js
./node_modules/next/dist/server/web/next-url.js
./node_modules/next/dist/server/web/spec-extension/response.js
./node_modules/next/dist/server/web/adapter.js

./node_modules/next/node_modules/@babel/runtime/helpers/isNativeFunction.js
Dynamic Code Evaluation (e. g. 'eval', 'new Function') not allowed in Middleware pages/api/_middleware

Import trace for requested module:
./node_modules/next/node_modules/@babel/runtime/helpers/wrapNativeSuper.js
./node_modules/next/dist/shared/lib/utils.js
./node_modules/next/dist/shared/lib/router/utils/parse-relative-url.js
./node_modules/next/dist/shared/lib/router/utils/parse-url.js
./node_modules/next/dist/shared/lib/router/utils/prepare-destination.js
./node_modules/next/dist/server/router.js
./node_modules/next/dist/server/web/next-url.js
./node_modules/next/dist/server/web/spec-extension/response.js
./node_modules/next/dist/server/web/adapter.js


> Build failed because of webpack errors
```
