import React from "react";

import {
  Html,
  Body,
  Container,
  Heading,
  Text,
  Button,
  Img,
  Tailwind,
  Section,
  Row,
  Column,
  Link,
} from "@react-email/components";
import {} from "react-icons/io";

const Email = ({ order }) => (
  <Html lang="en">
    <Tailwind>
      <Body
        style={{
          fontFamily: "Arial, sans-serif",
          padding: "8px",
        }}
      >
        <Section className="">
          <Row className="">
            <Column className="">
              <Text className="">FASHION</Text>
            </Column>
            <Column className="w-[170px]" align="">
              <Row>
                <Column align="left">
                  <Link
                    className="text-gray-600  text-sm [text-decoration:none]"
                    href="#"
                  >
                    Track Package
                  </Link>
                </Column>
                <Column align="right" className="">
                  <Link
                    className="text-gray-600 text-sm [text-decoration:none]"
                    href="#"
                  >
                    Contact Us
                  </Link>
                </Column>
              </Row>
            </Column>
          </Row>
        </Section>
        <Section className=" bg-[#ECE9E9] p-4 py-6 rounded-md">
          <Img
            alt="Braun Collection"
            className="w-full object-contain"
            height={80}
            src="https://cdn-icons-png.flaticon.com/512/9584/9584862.png"
          />
          <Section className=" text-center">
            <Heading
              as="h1"
              className="text-[20px]  font-semibold text-gray-900"
            >
              Thanks for the Order
            </Heading>
            <Text className=" text-[14px]  text-gray-500">
              Great news! Your order is all set to hit the road. We're packing
              it up with care and it'll be on its way to you in no time.
            </Text>

            <Button
              className=" text-[16px] rounded-full bg-indigo-600 px-[1.5em] py-[0.5em]  text-white"
              href="https://react.email"
            >
              Setup Notification
            </Button>
          </Section>
        </Section>
        <Section className=" my-4">
          <Row>
            <Column className=" relative">x</Column>
            <Column align=" center" className="">
              x
            </Column>
            <Column align="right" className="">
              c
            </Column>
          </Row>
        </Section>
        <Section>
          <Container className=" bg-[#ECE9E9] rounded-md p-4 ">
            <Text className=" text-center text-[16px]  font-bold">
              Your item in this order
            </Text>
            <Text className=" mt-1 mb-4 text-[14px] text-center  text-gray-500">
              Order Details: <span className=" font-bold">#{order?.id}</span>
            </Text>
            <Container>
              <Container className=" bg-white  p-2 rounded-md">
                {order?.items.map((items) => (
                  <Row key={items.id} className=" mb-4">
                    <Column className="pr-2 w-14 h-14">
                      <Img
                        className=" w-full h-full  object-cover rounded-md"
                        alt={items.product.product_name}
                        src={items.product.product_image[0]}
                      />
                    </Column>
                    <Column className="">
                      <Row>
                        <Column>
                          <Text className=" text-[16px] m-0  font-semibold">
                            {items.product.product_name}
                          </Text>
                          <Text className=" text-[14px] m-0  text-gray-500">
                            Qty: {items.quantity}
                          </Text>
                        </Column>
                        <Column align="right">
                          <Text className=" text-[16px] m-0  text-gray-500">
                            ${items.price}
                          </Text>
                        </Column>
                      </Row>
                    </Column>
                  </Row>
                ))}
              </Container>
            </Container>
            <Container className=" mt-2 bg-white text-[16px]  p-2 rounded-md">
              <Row className="mb-4">
                <Column className="">Subtotal</Column>
                <Column className="text-right ">
                  $25
                </Column>
              </Row>
              <Row>
                <Column className="">Delivery Fee</Column>
                <Column className="text-right">
                  $123
                </Column>
              </Row>
            </Container>
            <Container className=" mt-2 bg-white text-[16px]  p-2 rounded-md">
              <Row>
                <Column className="font-bold">Total</Column>
                <Column className="text-right font-bold">
                  ${order?.totalAmount}
                </Column>
              </Row>
            </Container>
          </Container>
        </Section>

        <Section className="text-center">
          <table className="w-full">
            <tr className="w-full">
              <td align="center">
                <Img
                  alt="React Email logo"
                  height="42"
                  src="https://react.email/static/logo-without-background.png"
                />
              </td>
            </tr>
            <tr className="w-full">
              <td align="center">
                <Text className="my-[8px] text-[16px] font-semibold leading-[24px] text-gray-900">
                  Acme corporation
                </Text>
                <Text className="mb-0 mt-[4px] text-[16px] leading-[24px] text-gray-500">
                  Think different
                </Text>
              </td>
            </tr>
            <tr>
              <td align="center">
                <Row className="table-cell h-[44px] w-[56px] align-bottom">
                  <Column className="pr-[8px]">
                    <Link href="#">
                      <Img
                        alt="Facebook"
                        height="36"
                        src="https://react.email/static/facebook-logo.png"
                        width="36"
                      />
                    </Link>
                  </Column>
                  <Column className="pr-[8px]">
                    <Link href="#">
                      <Img
                        alt="X"
                        height="36"
                        src="https://react.email/static/x-logo.png"
                        width="36"
                      />
                    </Link>
                  </Column>
                  <Column>
                    <Link href="#">
                      <Img
                        alt="Instagram"
                        height="36"
                        src="https://react.email/static/instagram-logo.png"
                        width="36"
                      />
                    </Link>
                  </Column>
                </Row>
              </td>
            </tr>
            <tr>
              <td align="center">
                <Text className="my-[8px] text-[16px] font-semibold leading-[24px] text-gray-500">
                  123 Main Street Anytown, CA 12345
                </Text>
                <Text className="mb-0 mt-[4px] text-[16px] font-semibold leading-[24px] text-gray-500">
                  mail@example.com +123456789
                </Text>
              </td>
            </tr>
          </table>
        </Section>
      </Body>
    </Tailwind>
  </Html>
);

export default Email;
