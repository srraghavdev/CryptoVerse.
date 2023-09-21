import React from "react";
import { useState } from "react";
import "./styles.css";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { createTheme, ThemeProvider } from "@mui/material";
import Grid from "../Grid";
import List from "../List";
import Button from "../../common/Button";
import { v4 as uuidv4 } from "uuid";
function Tabcomponent({ coins, set }) {
  const [value, setValue] = useState("grid");

  const handleChange = (event, newValue) => {
    // changing value to new value to trigger re render
    setValue(newValue);
  };

  // setting a theme for mui components globally
  const theme = createTheme({
    palette: {
      primary: {
        main: "#3a80e9",
      },
    },
  });

  // giving inline styles as object for mui components to sx(prop in mui components to pass custom styles as an object)
  const style = {
    color: "var(--white)",
    width: "50vw",
    fontSize: "1.2rem",
    fontWeight: 600,
    fontFamily: "Inter",
    textTransform: "capitalize",
  };
  return (
    // wrapping code with provider to apply theme
    <ThemeProvider theme={theme}>
      <div>
        {/* TabContext has access to the value variable by porps , so its children components like Tab and TabPanel can access value and render accordingly */}
        <TabContext value={value}>
          {/* we can give full width to out mui tab component by using variant as fullWidth */}
          <TabList onChange={handleChange} variant="fullWidth">
            <Tab label="Grid" value="grid" sx={style} />
            <Tab label="List" value="list" sx={style} />
          </TabList>
          <TabPanel value="grid">
            {coins.length != 0 ? (
              <div className="grid-flex">
                {coins.map((coin) => {
                  // key is generated using uuidv4
                  return <Grid coin={coin} key={uuidv4()}></Grid>;
                })}
              </div>
            ) : (
              // when array has 0 length we show this
              <div className="no-result">
                <p className="no-resultp">No matching cryptocurrencies</p>
                <Button text={"Clear Search"} onClick={() => set("")}></Button>
              </div>
            )}
          </TabPanel>
          <TabPanel value="list">
            {coins.length != 0 ? (
              <table className="list-table">
                {coins.map((coin) => {
                  // key is generated using uuidv4
                  return <List coin={coin} key={uuidv4()}></List>;
                })}
              </table>
            ) : (
              // when array has 0 length we show this
              <div className="no-result">
                <p className="no-resultp">No matching cryptocurrencies</p>
                <Button text={"Clear Search"} onClick={() => set("")}></Button>
              </div>
            )}
          </TabPanel>
        </TabContext>
      </div>
    </ThemeProvider>
  );
}

export default Tabcomponent;
