# currency-converter

A web application which converts currencies using the daily rate.


## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn run serve
```

### Compiles and minifies for production

```
yarn run build
```

### Run your tests

```
yarn run test
```

### Lints and fixes files

```
yarn run lint
```

### Run your unit tests

```
yarn run test:unit
```

- Allow the user to select a base currency
- Allow the user to enter the amount to be converted
- Allow the user to select a currency to convert the amount to
- Display the converted amount, fixed to 2 decimal places
- Each conversion should be saved to a ‘history’. Do not worry about actually persisting the data,
  you may use localStorage for this.
- Construct an additional page, preferably using a routing tool that displays the conversion history in
  a table.
- The user should be able to sort the table by source currency, target currency, amount to be
  converted and the converted amount.
- The user should be able to delete a conversion from the history.
- Allow the user to toggle between the pages.
