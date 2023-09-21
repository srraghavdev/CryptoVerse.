import { useState } from "react";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { global } from "../../../context/globalContext";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

// for more info/comments please refere to index.js in  the folder since almost functionality is the same as desktop view , this is for mobile view. The different thinsg have been mentioned.
// functions have the same names

export default function TemporaryDrawer() {
  // simple useState  boolean variable to keep track of display of drawer
  const [open, Setopen] = useState(false);
  // opem useState for showing the drawer
  let [darkmode, Setdarkmode] = useState(
    JSON.parse(localStorage.getItem("theme"))
  );
  // anchor is the direction from whcch my drawer will open from
  // open props will take a boolean value if true it displays the drawer and vice versa
  // Setting open to true on Click of the button and false on closing of the drawer
  let { user, currency, Setcurrency } = useContext(global);

  var r = document.querySelector(":root");
  const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    "& .MuiSwitch-switchBase": {
      margin: 1,
      padding: 0,
      transform: "translateX(6px)",
      "&.Mui-checked": {
        color: "#fff",
        transform: "translateX(22px)",
        "& .MuiSwitch-thumb:before": {
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
            "#fff"
          )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
        },
        "& + .MuiSwitch-track": {
          opacity: 1,
          backgroundColor:
            theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
        },
      },
    },
    "& .MuiSwitch-thumb": {
      backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
      width: 32,
      height: 32,
      "&:before": {
        content: "''",
        position: "absolute",
        width: "100%",
        height: "100%",
        left: 0,
        top: 0,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
      },
    },
    "& .MuiSwitch-track": {
      opacity: 1,
      backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      borderRadius: 20 / 2,
    },
  }));
  function changethemefn() {
    if (darkmode) {
      // to convert theme to light mode
      r.style.setProperty("--white", "#111");
      r.style.setProperty("--black", "#fff");
      r.style.setProperty("--grey", "#888");
      r.style.setProperty("--darkgrey", "#f3f3f3");
      Setdarkmode(false);
    } else {
      // to convert theme to dark mode
      r.style.setProperty("--white", "#ffffff");
      r.style.setProperty("--black", "#111");
      r.style.setProperty("--grey", "#888");
      r.style.setProperty("--darkgrey", "#1b1b1b");
      Setdarkmode(true);
    }
  }
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

  return (
    <div>
      <IconButton>
        <Button onClick={() => Setopen(true)}>
          {/* hamburger icon on click will show the drawer */}
          <MenuRoundedIcon className="link mobile"></MenuRoundedIcon>
        </Button>
      </IconButton>
      {/* onClose will set the visibility to false and open is open, open when true shows the drawer and doesn't when open prop is false */}
      <Drawer anchor={"right"} open={open} onClose={() => Setopen(false)}>
        <div className="drawer">
          <Link to="/">
            <p className="link">Home</p>
          </Link>
          <Link to="/compare">
            <p className="link">Compare</p>
          </Link>
          <Link to="/favourites">
            <p className="link">Favourites</p>
          </Link>
          <Link to="/news">
            <p className="link">News</p>
          </Link>
          <Link to="/glossary">
            <p className="link">Glossary</p>
          </Link>
          <Link to="/dashboard">
            <p className="link">Dashboard</p>
          </Link>
          <p className="link">
            <Select
              sx={{
                height: "2rem",
                width: "5.5rem",
                color: "var(--white)",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "var(--white)",
                },
                "& .MuiSvgIcon-root": {
                  color: "var(--white)",
                },
                "&:hover": {
                  "&& fieldset": {
                    borderColor: "#3a80e9",
                  },
                },
              }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={currency}
              label="Days"
              onChange={(event) => Setcurrency(event.target.value)}
            >
              {currencies.map((element) => (
                <MenuItem value={element.code}>
                  {element.name + " (" + element.symbol + ")"}
                </MenuItem>
              ))}
            </Select>
          </p>
          {!user && (
            <Link to="/login">
              <p className="link">Login</p>
            </Link>
          )}
          {user ? (
            <Link to="/logout">
              <p className="link">Logout</p>
            </Link>
          ) : (
            <Link to="/signup">
              <p className="link">Signup</p>
            </Link>
          )}
          <p className="link">
            <MaterialUISwitch
              sx={{ m: 1 }}
              checked={darkmode}
              onChange={changethemefn}
            ></MaterialUISwitch>
          </p>
        </div>
      </Drawer>
    </div>
  );
}
