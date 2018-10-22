# UnHidden Figures - Server

<!-- [![NPM Version][npm-image]][npm-url] -->
<!-- [![Build Status][travis-image]][travis-url] -->
<!-- [![Downloads Stats][npm-downloads]][npm-url] -->

## [Live App](https://un-hidden-figures-app-client.herokuapp.com/)

## More Information
### See: [Client GitHub Repo](https://github.com/thinkful-ei23/rose-clinton-spaced-rep-client)

## Main Project Structure

```
spaced-rep-server/
├── models/ (Mongoose)
├── node_modules/ (see "Development Setup")
├── passport/ (Auth strategies)
├── routes/ (Express Routers)
├── test/
├── config.js
├── index.js (Express App)
├── package.json (NPM dependencies)
└── README.md
```

## Development setup

To clone the repo to your local development environment, execute the following commands (requires [Node](https://nodejs.org)).

```sh
# Clone the repo
git clone https://github.com/thinkful-ei23/rose-clinton-spaced-rep-server.git

# Move into the project directory
cd rose-clinton-spaced-rep-server

# Install dependencies (in /node_modules/)
npm i

# Run the app:
npm start
```

## Contributing

1. Fork it (<https://github.com/yourname/yourproject/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request

<!-- ## Release History

* 0.2.1
    * CHANGE: Update docs (module code remains unchanged)
* 0.2.0
    * CHANGE: Remove `setDefaultXYZ()`
    * ADD: Add `init()`
* 0.1.1
    * FIX: Crash when calling `baz()` (Thanks @GenerousContributorName!)
* 0.1.0
    * The first proper release
    * CHANGE: Rename `foo()` to `bar()`
* 0.0.1
    * Work in progress -->

## Authors

* Clinton Owen – clint@clintonowen.com │ [https://github.com/clintonowen](https://github.com/clintonowen) │ [@CoderClint](https://twitter.com/CoderClint)
* Rose Sorfa – rsorfa@gmail.com │ [https://github.com/Slinkys](https://github.com/Slinkys)

<!-- Markdown link & img dfn's -->
[npm-image]: https://img.shields.io/npm/v/datadog-metrics.svg?style=flat-square
[npm-url]: https://npmjs.org/package/datadog-metrics
[npm-downloads]: https://img.shields.io/npm/dm/datadog-metrics.svg?style=flat-square
[travis-image]: https://img.shields.io/travis/dbader/node-datadog-metrics/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/dbader/node-datadog-metrics
[wiki]: https://github.com/yourname/yourproject/wiki