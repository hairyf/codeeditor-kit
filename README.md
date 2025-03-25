# codeeditor-kit

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![JSDocs][jsdocs-src]][jsdocs-href]
[![License][license-src]][license-href]

Used for quickly launching popular code editors:

- [StackBlitz](https://stackblitz.com/)
- [CodeSandbox](https://codesandbox.io/)
- [JSFiddle](https://jsfiddle.net/)
- [CodePen](https://codepen.io/)

## Install

```bash
npm i codeeditor-kit
```

## Usage

```ts
import { Codeeditor } from 'codeeditor-kit'

const codeeditor = new Codeeditor({
  globals: {
    package: {
      dependencies: {
        // your dependencies
      },
      devDependencies: {
        // your devDependencies
      },
    },
    files: {
      // your files
    }
  },
  resolve(params) {
    return {
      package: {
        scripts: {
          start: `node -e "console.log(\'${params.message}\')"`,
        },
      },
      // any other options
    }
  }
})

codeeditor.open('stackblitz', { message: 'Hello, Stack' })
// or
codeeditor.open('codesandbox', { message: 'Hello, CodeSandbox' })
```

## HTML

If you use JSFiddle and CodePen, You can use the `html`, `css`, and `js` properties to specify the content of each file.

```ts
const codeeditor = new Codeeditor({
  globals: {
    externals: {
      js: [/* your external js url */],
      css: [/* your external css url */],
    }
  },
  resolve(params) {
    return {
      html: `<span>${params.message}</span>`,
      css: `span { color: red; }`,
      js: ``,
    }
  }
})

codeeditor.open('jsfiddle', { message: 'Hello, JSFiddle' })
```

## License

[MIT](./LICENSE) License © [Hairyf](https://github.com/hairyf)

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/codeeditor-kit?style=flat&colorA=080f12&colorB=1fa669
[npm-version-href]: https://npmjs.com/package/codeeditor-kit
[npm-downloads-src]: https://img.shields.io/npm/dm/codeeditor-kit?style=flat&colorA=080f12&colorB=1fa669
[npm-downloads-href]: https://npmjs.com/package/codeeditor-kit
[bundle-src]: https://img.shields.io/bundlephobia/minzip/codeeditor-kit?style=flat&colorA=080f12&colorB=1fa669&label=minzip
[bundle-href]: https://bundlephobia.com/result?p=codeeditor-kit
[license-src]: https://img.shields.io/github/license/hairyf/codeeditor-kit.svg?style=flat&colorA=080f12&colorB=1fa669
[license-href]: https://github.com/hairyf/codeeditor-kit/blob/main/LICENSE
[jsdocs-src]: https://img.shields.io/badge/jsdocs-reference-080f12?style=flat&colorA=080f12&colorB=1fa669
[jsdocs-href]: https://www.jsdocs.io/package/codeeditor-kit
