
## How to Use DotEnv

[DotEnv](https://www.npmjs.com/package/dotenv)  is a lightweight npm package that automatically loads environment variables from a  `.env`  file into the  `process.env`  object.

To use DotEnv, first install it using the command:  `npm i dotenv`. Then in your app, require and configure the package like this:  `require('dotenv').config()`.

Note that some packages such as Create React App already include DotEnv, and cloud providers may have different means of setting environment variables all together. So make sure you check the documentation for any packages or providers you are using before you follow any advice in this article.

## How to Create a .env File

Once you have DotEnv installed and configured, make a file called  `.env`  at the top level of your file structure. This is where you will create all of your environment variables, written in thr  `NAME=value`  format. For example, you could set a port variable to 3000 like this:  `PORT=3000`.

You can declare multiple variables in the  `.env`  file. For example, you could set database-related environment variables like this:

```
DB_HOST=localhost
DB_USER=admin
DB_PASSWORD=password
```

There is no need to wrap strings in quotation marks. DotEnv does this automatically for you.

Once you’ve created this file, remember that you should not push it to GitHub as it can contain sensitive data like authentication keys and passwords. Add the file to .gitignore to avoid pushing it to a public repo accidentally.

## How to Access the Environment Variables

Accessing your variables is super easy! They are attached to the  `process.env`  object, so you can access them using the pattern  `process.env.KEY`.

If you ever need to change the value of any of your environment variables, you just need to alter the  `.env`  file.

## Notes

1. ignore it in your .gitignore file
2. create a template file for your variables called .env.example

## Example

http://localhost:3000/

Init a project using express.js

```bash
yarn add express
```

Create .env file in the root folder

Update .env with variables

```env
SECRET_KEY=123
DB_HOST=localhost
DB_USER=admin
DB_PASSWORD=password
```

Install dotenv package

```bash
yarn add dotenv
```

Create an index.js

```js
const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

require('dotenv').config();

app.get('/', (req, res) => {
    res.send(process.env.SECRET_KEY);
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`)
})
```
