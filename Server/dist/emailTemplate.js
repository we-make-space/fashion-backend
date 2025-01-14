import React from "react";
import { Html, Body, Container, Heading, Text, Button, Img, Tailwind, Section, Row, Column, Link } from "@react-email/components";
import "react-icons/io";
const Email = ({
  order
}) => /*#__PURE__*/React.createElement(Html, {
  lang: "en"
}, /*#__PURE__*/React.createElement(Tailwind, null, /*#__PURE__*/React.createElement(Body, {
  style: {
    fontFamily: "Arial, sans-serif",
    padding: "8px"
  }
}, /*#__PURE__*/React.createElement(Section, {
  className: ""
}, /*#__PURE__*/React.createElement(Row, {
  className: ""
}, /*#__PURE__*/React.createElement(Column, {
  className: ""
}, /*#__PURE__*/React.createElement(Text, {
  className: ""
}, "FASHION")), /*#__PURE__*/React.createElement(Column, {
  className: "w-[170px]",
  align: ""
}, /*#__PURE__*/React.createElement(Row, null, /*#__PURE__*/React.createElement(Column, {
  align: "left"
}, /*#__PURE__*/React.createElement(Link, {
  className: "text-gray-600  text-sm [text-decoration:none]",
  href: "#"
}, "Track Package")), /*#__PURE__*/React.createElement(Column, {
  align: "right",
  className: ""
}, /*#__PURE__*/React.createElement(Link, {
  className: "text-gray-600 text-sm [text-decoration:none]",
  href: "#"
}, "Contact Us")))))), /*#__PURE__*/React.createElement(Section, {
  className: " bg-[#ECE9E9] p-4 py-6 rounded-md"
}, /*#__PURE__*/React.createElement(Img, {
  alt: "Braun Collection",
  className: "w-full object-contain",
  height: 80,
  src: "https://cdn-icons-png.flaticon.com/512/9584/9584862.png"
}), /*#__PURE__*/React.createElement(Section, {
  className: " text-center"
}, /*#__PURE__*/React.createElement(Heading, {
  as: "h1",
  className: "text-[20px]  font-semibold text-gray-900"
}, "Thanks for the Order"), /*#__PURE__*/React.createElement(Text, {
  className: " text-[14px]  text-gray-500"
}, "Great news! Your order is all set to hit the road. We're packing it up with care and it'll be on its way to you in no time."), /*#__PURE__*/React.createElement(Button, {
  className: " text-[16px] rounded-full bg-indigo-600 px-[1.5em] py-[0.5em]  text-white",
  href: "https://react.email"
}, "Setup Notification"))), /*#__PURE__*/React.createElement(Section, {
  className: " my-4"
}, /*#__PURE__*/React.createElement(Row, null, /*#__PURE__*/React.createElement(Column, {
  className: " relative"
}, "x"), /*#__PURE__*/React.createElement(Column, {
  align: " center",
  className: ""
}, "x"), /*#__PURE__*/React.createElement(Column, {
  align: "right",
  className: ""
}, "c"))), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(Container, {
  className: " bg-[#ECE9E9] rounded-md p-4 "
}, /*#__PURE__*/React.createElement(Text, {
  className: " text-center text-[16px]  font-bold"
}, "Your item in this order"), /*#__PURE__*/React.createElement(Text, {
  className: " mt-1 mb-4 text-[14px] text-center  text-gray-500"
}, "Order Details: ", /*#__PURE__*/React.createElement("span", {
  className: " font-bold"
}, "#", order?.id)), /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement(Container, {
  className: " bg-white  p-2 rounded-md"
}, order?.items.map(items => /*#__PURE__*/React.createElement(Row, {
  key: items.id,
  className: " mb-4"
}, /*#__PURE__*/React.createElement(Column, {
  className: "pr-2 w-14 h-14"
}, /*#__PURE__*/React.createElement(Img, {
  className: " w-full h-full  object-cover rounded-md",
  alt: items.product.product_name,
  src: items.product.product_image[0]
})), /*#__PURE__*/React.createElement(Column, {
  className: ""
}, /*#__PURE__*/React.createElement(Row, null, /*#__PURE__*/React.createElement(Column, null, /*#__PURE__*/React.createElement(Text, {
  className: " text-[16px] m-0  font-semibold"
}, items.product.product_name), /*#__PURE__*/React.createElement(Text, {
  className: " text-[14px] m-0  text-gray-500"
}, "Qty: ", items.quantity)), /*#__PURE__*/React.createElement(Column, {
  align: "right"
}, /*#__PURE__*/React.createElement(Text, {
  className: " text-[16px] m-0  text-gray-500"
}, "$", items.price)))))))), /*#__PURE__*/React.createElement(Container, {
  className: " mt-2 bg-white text-[16px]  p-2 rounded-md"
}, /*#__PURE__*/React.createElement(Row, {
  className: "mb-4"
}, /*#__PURE__*/React.createElement(Column, {
  className: ""
}, "Subtotal"), /*#__PURE__*/React.createElement(Column, {
  className: "text-right "
}, "$25")), /*#__PURE__*/React.createElement(Row, null, /*#__PURE__*/React.createElement(Column, {
  className: ""
}, "Delivery Fee"), /*#__PURE__*/React.createElement(Column, {
  className: "text-right"
}, "$123"))), /*#__PURE__*/React.createElement(Container, {
  className: " mt-2 bg-white text-[16px]  p-2 rounded-md"
}, /*#__PURE__*/React.createElement(Row, null, /*#__PURE__*/React.createElement(Column, {
  className: "font-bold"
}, "Total"), /*#__PURE__*/React.createElement(Column, {
  className: "text-right font-bold"
}, "$", order?.totalAmount))))), /*#__PURE__*/React.createElement(Section, {
  className: "text-center"
}, /*#__PURE__*/React.createElement("table", {
  className: "w-full"
}, /*#__PURE__*/React.createElement("tr", {
  className: "w-full"
}, /*#__PURE__*/React.createElement("td", {
  align: "center"
}, /*#__PURE__*/React.createElement(Img, {
  alt: "React Email logo",
  height: "42",
  src: "https://react.email/static/logo-without-background.png"
}))), /*#__PURE__*/React.createElement("tr", {
  className: "w-full"
}, /*#__PURE__*/React.createElement("td", {
  align: "center"
}, /*#__PURE__*/React.createElement(Text, {
  className: "my-[8px] text-[16px] font-semibold leading-[24px] text-gray-900"
}, "Acme corporation"), /*#__PURE__*/React.createElement(Text, {
  className: "mb-0 mt-[4px] text-[16px] leading-[24px] text-gray-500"
}, "Think different"))), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
  align: "center"
}, /*#__PURE__*/React.createElement(Row, {
  className: "table-cell h-[44px] w-[56px] align-bottom"
}, /*#__PURE__*/React.createElement(Column, {
  className: "pr-[8px]"
}, /*#__PURE__*/React.createElement(Link, {
  href: "#"
}, /*#__PURE__*/React.createElement(Img, {
  alt: "Facebook",
  height: "36",
  src: "https://react.email/static/facebook-logo.png",
  width: "36"
}))), /*#__PURE__*/React.createElement(Column, {
  className: "pr-[8px]"
}, /*#__PURE__*/React.createElement(Link, {
  href: "#"
}, /*#__PURE__*/React.createElement(Img, {
  alt: "X",
  height: "36",
  src: "https://react.email/static/x-logo.png",
  width: "36"
}))), /*#__PURE__*/React.createElement(Column, null, /*#__PURE__*/React.createElement(Link, {
  href: "#"
}, /*#__PURE__*/React.createElement(Img, {
  alt: "Instagram",
  height: "36",
  src: "https://react.email/static/instagram-logo.png",
  width: "36"
})))))), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
  align: "center"
}, /*#__PURE__*/React.createElement(Text, {
  className: "my-[8px] text-[16px] font-semibold leading-[24px] text-gray-500"
}, "123 Main Street Anytown, CA 12345"), /*#__PURE__*/React.createElement(Text, {
  className: "mb-0 mt-[4px] text-[16px] font-semibold leading-[24px] text-gray-500"
}, "mail@example.com +123456789"))))))));
export default Email;