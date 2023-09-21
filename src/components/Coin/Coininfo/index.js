import React from "react";
import "./styles.css";
import { useState } from "react";
function Coininfo({ heading, desc }) {
  let [isclicked, Setisclicked] = useState(true);
  // setting useState for Read more and less, making short and long desc and conditonally rendering desc
  const short_desc =
    desc.slice(0, 400) + "<p style=color:var(--grey)> Read More....</p>";
    // short description with Read more (with styles)
  const long_desc = desc + "<p style=color:var(--grey)> Read Less....</p>";
  // long description with Read less (with styles)
  return (
    <div className="wrapper" style={{ padding: "0rem 1rem" }}>
      <h2 className="coin-info-heading">{heading}</h2>
      {desc.length > 400 ? (
        // when description length is greater than 400 chars
        <p
          className="coin-info-desc"
          dangerouslySetInnerHTML={{
            __html: isclicked ? short_desc : long_desc,
          }}
          onClick={() => Setisclicked(!isclicked)}
          // onClikc to set to read more/less
        ></p>
      ) : (
        // when the description itslef is smaller than 400 chars , we don't need Read more/less functionality
        <p
          className="coin-info-desc"
          dangerouslySetInnerHTML={{ __html: desc }}
        ></p>
      )}

      {/* we are using dangerouslySetInnerHTML to set the innerHTML of componenet directly without using.innerHTML from DOM. The synatx has to ALWAYS contain _html key in the object. It is dangerous because this makes your web app vulnerable to  cross site scritping XSS attacks. */}
    </div>
  );
}

export default Coininfo;
