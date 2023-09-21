export const coinObject = (setState, data, currency) => {
  setState({
    id: data.id,
    name: data.name,
    symbol: data.symbol,
    image: data.image.large,
    desc: data.description.en,
    price_change_percentage_24h: data.market_data.price_change_percentage_24h,
    total_volume: data.market_data.total_volume[currency],
    current_price: data.market_data.current_price[currency],
    market_cap: data.market_data.market_cap[currency],
  });
};
// Setting coindata , the fetched data has a lot of key value pairs , we only need the above one's with respect to the current currency
