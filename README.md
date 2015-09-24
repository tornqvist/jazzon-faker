# jazzon-faker

> Generate fake data using faker

## Usage

All methods in [faker.js](https://github.com/Marak/Faker.js) are supported using dot notaion.

```javascript
let jazzon = require('jazzon');
let faker = require('jazzon-faker');
let json = {
  "id": "@{ random.uuid }",
  "name": "@{ name.findName }",
  "bio": "@{ lorem.sentences(3) }",
  "email": "@{ internet.email }"
}

jazzon
  .use(faker())
  .compile(json)
  .then(result => console.log(result));

/* Logs:  
 {
  "id": "7abd8062-217a-4ea7-a315-569642114293",
  "name": "Gerry Ankunding",
  "bio": "Suscipit ut atque.\nCorporis dolores officia ipsum cupiditate eius labore.\nAperiam porro ipsam cupiditate officia odit assumenda.",
  "email": "Cielo_Muller76@yahoo.com"
}
*/
```

## Options

To set the locale of faker, supply the `locale` option to the plugin.

```javascript
jazzon.use(faker({ locale: 'sv' }));
