# feed-me [![npm version](http://img.shields.io/npm/v/feed-me.svg?style=flat-square)](https://www.npmjs.org/package/feed-me)

> Scraper for [metro online grocery][metro].

[metro]: https://www.metro.ca/en/online-grocery/

Usage
-----

Get all IPAs from the beer & cider category:

```js
const metro = require('feed-me')

metro.getAllResults({ category: 'beverages/beer-cider', filter: 'IPA' })
  .then(beers => console.log(beers))
```

This will return an array of objects like this:

```json
{
  "brand": "Brasserie Dieu du Ciel!",
  "name": "Disco Soleil kumquats IPA strong beer",
  "weight": "341 ml - bottle",
  "price": 2.39,
  "image": {
    "small": "https://product-images.metro.ca/images/h0b/h4c/8883933675550.jpg",
    "large": "https://product-images.metro.ca/images/h41/h2e/8883934593054.jpg"
  },
  "link": "https://www.metro.ca/en/online-grocery/aisles/beverages/beer-cider/artisanal-beer-microbrewery/disco-soleil-kumquats-ipa-strong-beer/p/696859060489"
}
```
