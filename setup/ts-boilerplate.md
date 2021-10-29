# Setup a Node.js project with Typescript, ESLint, Prettier, Husky
![1_D8Wwwce8wS3auLAiM3BQKA](https://user-images.githubusercontent.com/11991333/72227393-f67be200-3593-11ea-8510-7bec5d98afc6.jpeg)

> Starting a personal node project could be easy; starting a team node project could be challenging. 

I am a developer currently working in SEEK Australia.

In my experience, common mistakes developer make when starting a projects are:

* No Linting
* Lack of compile-time type checking (not really mistake but less desirable in my preference)
* Inconsistent code styling
* Linter breaking the build

In this article, I am going to not only to share how to address these above problems, but also some of the best practices we implement in our team at SEEK.

**The article assumes the reader knows the basics about nodes and typescripts**

## Typescript

We can start off by a simple node project consisting only the package.json file

```shell
yarn add typescript --dev
```

After adding the dev dependency, create a `ts.config.json` file under the root of the node project

```json
{
  "compilerOptions":
    {
      "target": "es2018",
      "module": "commonjs",
      "outDir": "dist",
      "sourceMap": true,
    },
  "include": ["src/**/*.ts"],
  "exclude": ["node_modules"],
}

```

The above are the minimal settings of typescript compiler `tsc`. 

It tells the compiler to 

* use `es2018` syntax when generating the distributable
* use the `commonjs` module format.
* generate *.js to `/dist` folder
* generate source map
* include all *.ts file inside `/src` folder
* exclude all files inside `/node_modules` folder

**Fancy configuration of `ts.config.json` is beyond the scope of this article**

Adding the following line to package.json

```json
{
  "scripts":{
    "build": "tsc"
  }
}
```

To build, run the following in shell

```shell
yarn build
```

## ESLint

We have a handful choices of linting tools for node development, but the de-factor standard these days for typescript is `ESLint`. Partnering with prettier it really improves consistency and productivity of a development team.

Again we are starting off by adding the dev dependencies

```shell
yarn add eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser --dev
```

ESLint does not support typescript out of the box. Fortunately we are able to add the typescript support by these two packages `@typescript-eslint/eslint-plugin` `@typescript-eslint/parser` thanks to the ESLint team's modular design.

The next thing is to create a `.eslintrc` file. It does not have a file extension but the default is `JSON` format:

```json
{
  "parser": "@typescript-eslint/parser",
  "extends": ["plugin:@typescript-eslint/recommended"],
  "parserOptions": { "ecmaVersion": 2018, "sourceType": "module" },
  "rules": {}
}
```

It tells the ESLint linter to:

* use Typescript parser
* use `Recommended Typescript preset` for linting
* use `ES2018` and  `module` sourceType to match ts.config settings

Add the following lines in `package.json`:

```json
{
  "scripts": {
    "lint": "eslint src/**/*.ts",
    "format": "eslint src/**/*.ts --fix"
  }
}
```

To lint, run the following in shell

```shell
yarn lint
```

To format the code to comply with linting rules, run the following in shell

```
yarn format
```

## Prettier

Prettier drastically improves team consistency by automatically formatting the code. To enable prettier, we first install it by running:

```shell
yarn add prettier --dev
```

Configure prettier by adding a `.prettierrc` to the root of the project with the following content

```json
{
    "semi": true,
    "trailingComma": "all",
    "singleQuote": true,
    "printWidth": 120,
    "tabWidth": 2
}
```

The setting let Prettier to

* Ensure semi colon at the end of each statement
* Ensure trailing comma at the end of each statement
* Convert all double quotes to single quotes where applicable
* Break into new lines for all lines greater than 120 characters wide
* Ensure tab width is 2 characters

In Visual Studio Code, `Ctrl (CMD) + P` then select `Format Code`, or enable `Format on Save` in settings for best result.

## Husky

No matter how careful I am, I always endup with situations where I changed and committed the code to Github without linting, and that can lead to failure CI builds. 

A good pratcice is to lint before commit. `Husky` is a very popular plugin to achieve so.

Install Husky by

```
yarn add husky --save-dev
```

Husky does not have its own configuration files. Instead we will add its config into package.json:

```json
{
  "husky": {
    "hooks": {
      "pre-commit": "yarn lint"
    }
  }
}
```

Next time you commit, husky would exit the `git commit` when the code does not pass linting.

## The End

There are so many more things you could do to your project to ensure productivity, consistency and coding styles, but I think this is a good start. This article will be subject to improvements to the latest changes and practices.

If you find this article useful please let me know.
