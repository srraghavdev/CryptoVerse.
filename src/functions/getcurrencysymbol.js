// list of currencies with each object as a currnecy with name,code and symbol
const currencies = [
  { code: "usd", name: "US Dollar", symbol: "$" },
  { code: "idr", name: "Indonesian Rupiah", symbol: "Rp" },
  { code: "twd", name: "New Taiwan Dollar", symbol: "NT$" },
  { code: "eur", name: "Euro", symbol: "€" },
  { code: "krw", name: "South Korean Won", symbol: "₩" },
  { code: "jpy", name: "Japanese Yen", symbol: "¥" },
  { code: "rub", name: "Russian Ruble", symbol: "₽" },
  { code: "cny", name: "Chinese Yuan", symbol: "¥" },
  { code: "aed", name: "United Arab Emirates Dirham", symbol: "د.إ" },
  { code: "ars", name: "Argentine Peso", symbol: "$" },
  { code: "aud", name: "Australian Dollar", symbol: "$" },
  { code: "bdt", name: "Bangladeshi Taka", symbol: "৳" },
  { code: "bhd", name: "Bahraini Dinar", symbol: "BD" },
  { code: "bmd", name: "Bermudian Dollar", symbol: "$" },
  { code: "brl", name: "Brazil Real", symbol: "R$" },
  { code: "cad", name: "Canadian Dollar", symbol: "$" },
  { code: "chf", name: "Swiss Franc", symbol: "Fr" },
  { code: "clp", name: "Chilean Peso", symbol: "$" },
  { code: "czk", name: "Czech Koruna", symbol: "Kč" },
  { code: "dkk", name: "Danish Krone", symbol: "kr" },
  { code: "gbp", name: "British Pound Sterling", symbol: "£" },
  { code: "hkd", name: "Hong Kong Dollar", symbol: "HK$" },
  { code: "huf", name: "Hungarian Forint", symbol: "Ft" },
  { code: "ils", name: "Israeli New Shekel", symbol: "₪" },
  { code: "inr", name: "Indian Rupee", symbol: "₹" },
  { code: "kwd", name: "Kuwaiti Dinar", symbol: "KD" },
  { code: "lkr", name: "Sri Lankan Rupee", symbol: "රු" },
  { code: "mmk", name: "Burmese Kyat", symbol: "K" },
  { code: "mxn", name: "Mexican Peso", symbol: "$" },
  { code: "myr", name: "Malaysian Ringgit", symbol: "RM" },
  { code: "ngn", name: "Nigerian Naira", symbol: "₦" },
  { code: "nok", name: "Norwegian Krone", symbol: "kr" },
  { code: "nzd", name: "New Zealand Dollar", symbol: "$" },
  { code: "php", name: "Philippine Peso", symbol: "₱" },
  { code: "pkr", name: "Pakistani Rupee", symbol: "₨" },
  { code: "pln", name: "Polish Zloty", symbol: "zł" },
  { code: "sar", name: "Saudi Riyal", symbol: "ر.س" },
  { code: "sek", name: "Swedish Krona", symbol: "kr" },
  { code: "sgd", name: "Singapore Dollar", symbol: "$" },
  { code: "thb", name: "Thai Baht", symbol: "฿" },
  { code: "try", name: "Turkish Lira", symbol: "₺" },
  { code: "uah", name: "Ukrainian hryvnia", symbol: "₴" },
  { code: "vef", name: "Venezuelan bolívar fuerte", symbol: "Bs" },
  { code: "vnd", name: "Vietnamese đồng", symbol: "₫" },
  { code: "zar", name: "South African Rand", symbol: "R" },
  { code: "xdr", name: "IMF Special Drawing Rights", symbol: "XDR" },
];
export default function getcurrencysymbol(currency) {
  // will get the currency symbol for being used for ticks and any number for the current currency
  for (let i = 0; i < currencies.length; i++) {
    if (currencies[i].code == currency) {
      return currencies[i].symbol;
    }
  }
}
