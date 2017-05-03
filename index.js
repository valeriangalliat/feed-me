const cheerio = require('cheerio')
const request = require('request-promise')
const srcset = require('srcset')
const url = require('url')

const baseUrl = `https://www.metro.ca/en/online-grocery`

const parseImage = el => {
  const sets = srcset.parse(el.attr('srcset') || el.data('default'))

  return {
    small: url.resolve(baseUrl, sets[0].url),
    large: url.resolve(baseUrl, sets[1].url)
  }
}

const extractResults = $ =>
  $('.product-tile').map((i, el) => ({
    brand: $('.pt--brand', el).text(),
    name: $('.pt--title', el).text(),
    weight: $('.pt--weight', el).text(),
    price: Number($('.pi--prices--first-line', el).data('main-price')),
    image: parseImage($('.defaultable-picture source[media="(min-width: 730px)"]', el)),
    link: url.resolve(baseUrl, $('.product-details-link', el).attr('href'))
  })).get()
  .map(item => Object.assign(item, { category: item.link.split('/').slice(6, -3).join('/') }))

exports.buildOpts = ({ page = 1, category, filter }) =>
  category
    ? { url: `${baseUrl}/aisles/${category}-page-${page}`, qs: { filter } }
    : { url: `${baseUrl}/search-page-${page}`, qs: { filter } }

exports.getPage = opts =>
  request(exports.buildOpts(opts))

exports.getResults = opts =>
  exports.getPage(opts)
    .then(cheerio.load)
    .then(extractResults)

exports.getAllResults = (opts, allResults = []) =>
  exports.getResults(opts)
    .then(results => {
      if (!results.length) return allResults

      return exports.getAllResults(
        Object.assign({}, opts, { page: (opts.page || 1) + 1 }),
        allResults.concat(results))
    })
