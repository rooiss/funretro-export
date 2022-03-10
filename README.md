# EasyRetro (former FunRetro) export

[![License][license-badge]][license-url]

> CLI tool to easily export [EasyRetro.io](https://funretro.io/) retrospective boards using Playwright

## Installing / Getting started

It's required to have [npm](https://www.npmjs.com/get-npm) installed locally to follow the instructions.

```shell
git clone https://github.com/rooiss/funretro-export.git
cd funretro-export
npm install
```

To run the script, do the following:

```shell
npm start -- "http://easyretro.io/board..." "../exported-file.txt" "csv"
```

The first argument is a URL to an easyretro board.
The second argument is where you want the exported file to be saved.
The third argument can either be `csv` or `markdown`.

## TODO

- More export options (PDF)

## Licensing

MIT License

[license-badge]: https://img.shields.io/github/license/robertoachar/docker-express-mongodb.svg
[license-url]: https://opensource.org/licenses/MIT
