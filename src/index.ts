import { httpGet } from './httpRequest';
import cheerio from 'cheerio';
import products from './product.json';

const CHAT_ID = process.env.CHAT_ID;
const BOT_ID = process.env.BOT_ID;

const scrapeAllPrices = (result: string) => {
    const $ = cheerio.load(result);
    const itemsSelector = '.a-offscreen';
    const prices: number[] = [];
    $(itemsSelector).each((_, item) => {
        const text = $(item).text();
        const regExp = text.match(/(￥\s+)([0-9|,])+/) || [];
        const [matched = ''] = regExp;

        const amount = parseInt(matched
            .replace(/\s/g, '')
            .replace(/￥/, '')
            .replace(/,/g, '')
            , 10);

        prices.push(amount);
    });
    return prices;
}

const notifyFairPrice = (prices: number[], threshold: number, url: string, name: string) => {
    const fairPrices = prices.filter((p) => { return p <= threshold });
    console.log(`all prices [${prices}], threshold: ${threshold}, fair prices: [${fairPrices}]`);
    if (fairPrices.length > 0) {
        const notification = encodeURI(`fair prices are found in ￥: [${fairPrices}], \nurl: ${url}`);
        const tgChannelUrl = `https://api.telegram.org/bot${BOT_ID}/sendMessage?chat_id=${CHAT_ID}&text=${notification}`

        httpGet(tgChannelUrl)
            .then(_ => console.log(`notification of '${name}' sent!`));
    }
};

exports.handler = () => {
    products.map((product) => {
        const { name, url, threshold } = product;
        console.log(`checking product '${name}'`)
        httpGet(url)
            .then(scrapeAllPrices)
            .then((prices) => notifyFairPrice(prices, threshold, url, name))
            .catch(e => {});
    });
    return 'done';
};
