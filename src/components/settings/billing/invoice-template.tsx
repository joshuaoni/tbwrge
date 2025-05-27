import Image from "next/image";
import React, { forwardRef } from "react";

// SVG Info icon
const InfoIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ marginRight: 4 }}
  >
    <circle
      cx="8"
      cy="8"
      r="7"
      stroke="#B0B7C3"
      strokeWidth="1.5"
      fill="none"
    />
    <rect x="7.25" y="7" width="1.5" height="4" rx="0.75" fill="#B0B7C3" />
    <rect x="7.25" y="4" width="1.5" height="1.5" rx="0.75" fill="#B0B7C3" />
  </svg>
);

const InvoiceTemplate = forwardRef<HTMLDivElement>((props, ref) => (
  <div
    ref={ref as any}
    style={{
      background: "#fff",
      fontFamily: "Inter, Arial, sans-serif",
      color: "#222",
      width: 794,
      minHeight: 1123,
      margin: "0 auto",
      padding: 0,
      boxSizing: "border-box",
      position: "relative",
    }}
  >
    <div
      style={{
        background: "#fff",
        borderRadius: 12,
        border: "1px solid #E5E7EB",
        padding: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxShadow: "none",
        minHeight: 1123,
      }}
    >
      <div>
        <div
          style={{
            padding: "48px 56px 48px 56px",
            borderBottom: "1px solid #E5E7EB",
            background: "#fbfbfb",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <div style={{ marginTop: 0 }}>
              <h1
                style={{
                  fontWeight: 700,
                  fontSize: 32,
                  margin: 0,
                  letterSpacing: -2,
                  color: "#181C32",
                  fontFamily: "Inter, Arial, sans-serif",
                }}
              >
                INVOICE
              </h1>
              <div style={{ marginTop: 32 }}>
                <div
                  style={{
                    fontWeight: 600,
                    fontSize: 14,
                    marginBottom: 4,
                    color: "#181C32",
                  }}
                >
                  Billed to
                </div>
                <div
                  style={{ fontSize: 12, color: "#7E8597", fontWeight: 500 }}
                >
                  Company Name
                </div>
                <div
                  style={{ fontSize: 12, color: "#7E8597", fontWeight: 500 }}
                >
                  Company address
                </div>
                <div
                  style={{ fontSize: 12, color: "#7E8597", fontWeight: 500 }}
                >
                  City, Country - 00000
                </div>
              </div>
            </div>
            <div style={{ marginTop: 0, textAlign: "right", minWidth: 200 }}>
              <div
                style={{
                  width: 56,
                  height: 30,
                  borderRadius: "50%",
                  background: "#fbfbfb",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "end",
                  marginLeft: "auto",
                }}
              >
                <div className="flex items-center justify-center rounded-[6.96px] bg-[#065844] w-[32px] h-[29.2px] md:w-10 md:h-[34px] relative">
                  <Image
                    src="/header-final.png"
                    alt=""
                    width={32}
                    height={29.2}
                    className="w-[32px] h-[29.2px] md:w-[32px] md:h-[29.2px]"
                  />
                </div>
              </div>
              <div
                style={{
                  fontWeight: 700,
                  color: "#045c44",
                  fontSize: 14,
                  marginTop: 0,
                  fontFamily: "Inter, Arial, sans-serif",
                }}
              >
                Candivet
              </div>
              <div style={{ fontSize: 12, color: "#7E8597", fontWeight: 500 }}>
                Business address
              </div>
              <div style={{ fontSize: 12, color: "#7E8597", fontWeight: 500 }}>
                City, State, IN - 000 000
              </div>
              <div style={{ fontSize: 12, color: "#7E8597", fontWeight: 500 }}>
                TAX ID 00XXXXX1234XXX
              </div>
            </div>
          </div>
        </div>
        <div
          style={{ display: "flex", marginTop: 32, padding: "0 56px 0 56px" }}
        >
          <div
            style={{
              minWidth: 160,
              fontSize: 12,
              color: "#7E8597",
              fontWeight: 500,
            }}
          >
            <div style={{ marginBottom: 40 }}>
              <div style={{ fontWeight: 600, color: "#181C32", fontSize: 12 }}>
                Invoice #
              </div>
              <div style={{ color: "#181C32", fontWeight: 500 }}>AB2324-01</div>
            </div>
            <div style={{ marginBottom: 40 }}>
              <div style={{ fontWeight: 600, color: "#181C32", fontSize: 12 }}>
                Invoice date
              </div>
              <div style={{ color: "#181C32", fontWeight: 500 }}>
                01 Aug, 2023
              </div>
            </div>
            <div style={{ marginBottom: 40 }}>
              <div style={{ fontWeight: 600, color: "#181C32", fontSize: 12 }}>
                Reference
              </div>
              <div style={{ color: "#181C32", fontWeight: 500 }}>INV-057</div>
            </div>
            <div>
              <div style={{ fontWeight: 600, color: "#181C32", fontSize: 12 }}>
                Due date
              </div>
              <div style={{ color: "#181C32", fontWeight: 500 }}>
                15 Aug, 2023
              </div>
            </div>
          </div>
          <div
            style={{
              flex: 1,
              marginLeft: 0,
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <div style={{ maxWidth: 520, width: "100%" }}>
              <table
                style={{
                  width: "100%",
                  minWidth: 520,
                  maxWidth: 620,
                  margin: "0",
                  borderCollapse: "separate",
                  borderSpacing: 0,
                  fontSize: 12,
                  background: "#fff",
                  borderRadius: 16,
                  border: "1px solid #E5E7EB",
                  overflow: "hidden",
                  boxShadow: "none",
                }}
              >
                <thead>
                  <tr
                    style={{
                      background: "#fff",
                      color: "#181C32",
                      fontWeight: 600,
                      fontSize: 12,
                      borderBottom: "1px solid #E5E7EB",
                    }}
                  >
                    <th
                      style={{
                        textAlign: "left",
                        padding: "10px 40px 10px 32px",
                        borderTopLeftRadius: 12,
                        width: 260,
                      }}
                    >
                      Services
                    </th>
                    <th style={{ textAlign: "right", padding: "10px 16px" }}>
                      Qty
                    </th>
                    <th style={{ textAlign: "right", padding: "10px 16px" }}>
                      Rate
                    </th>
                    <th
                      style={{
                        textAlign: "right",
                        padding: "10px 24px",
                        borderTopRightRadius: 12,
                      }}
                    >
                      Line total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: "1px solid #E5E7EB" }}>
                    <td
                      style={{
                        padding: "8px 40px 8px 32px",
                        color: "#181C32",
                        fontWeight: 500,
                      }}
                    >
                      Item Name
                    </td>
                    <td
                      style={{
                        textAlign: "right",
                        color: "#7E8597",
                        fontWeight: 500,
                        padding: "8px 16px",
                      }}
                    >
                      1
                    </td>
                    <td
                      style={{
                        textAlign: "right",
                        color: "#7E8597",
                        fontWeight: 500,
                        padding: "8px 16px",
                      }}
                    >
                      $3,000.00
                    </td>
                    <td
                      style={{
                        textAlign: "right",
                        color: "#7E8597",
                        fontWeight: 500,
                        padding: "8px 24px",
                      }}
                    >
                      $3,000.00
                    </td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #E5E7EB" }}>
                    <td
                      style={{
                        padding: "8px 40px 8px 32px",
                        color: "#181C32",
                        fontWeight: 500,
                      }}
                    >
                      Item Name
                    </td>
                    <td
                      style={{
                        textAlign: "right",
                        color: "#7E8597",
                        fontWeight: 500,
                        padding: "8px 16px",
                      }}
                    >
                      1
                    </td>
                    <td
                      style={{
                        textAlign: "right",
                        color: "#7E8597",
                        fontWeight: 500,
                        padding: "8px 16px",
                      }}
                    >
                      $3,000.00
                    </td>
                    <td
                      style={{
                        textAlign: "right",
                        color: "#7E8597",
                        fontWeight: 500,
                        padding: "8px 24px",
                      }}
                    >
                      $3,000.00
                    </td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #E5E7EB" }}>
                    <td
                      style={{
                        padding: "8px 40px 8px 32px",
                        color: "#181C32",
                        fontWeight: 500,
                      }}
                    >
                      Item Name
                    </td>
                    <td
                      style={{
                        textAlign: "right",
                        color: "#7E8597",
                        fontWeight: 500,
                        padding: "8px 16px",
                      }}
                    >
                      1
                    </td>
                    <td
                      style={{
                        textAlign: "right",
                        color: "#7E8597",
                        fontWeight: 500,
                        padding: "8px 16px",
                      }}
                    >
                      $1,500.00
                    </td>
                    <td
                      style={{
                        textAlign: "right",
                        color: "#7E8597",
                        fontWeight: 500,
                        padding: "8px 24px",
                      }}
                    >
                      $1,500.00
                    </td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #E5E7EB" }}>
                    <td
                      style={{
                        padding: "8px 40px 8px 32px",
                        color: "#181C32",
                        fontWeight: 500,
                      }}
                    >
                      Item Name
                    </td>
                    <td
                      style={{
                        textAlign: "right",
                        color: "#7E8597",
                        fontWeight: 500,
                        padding: "8px 16px",
                      }}
                    >
                      1
                    </td>
                    <td
                      style={{
                        textAlign: "right",
                        color: "#7E8597",
                        fontWeight: 500,
                        padding: "8px 16px",
                      }}
                    >
                      $1,500.00
                    </td>
                    <td
                      style={{
                        textAlign: "right",
                        color: "#7E8597",
                        fontWeight: 500,
                        padding: "8px 24px",
                      }}
                    >
                      $1,500.00
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "8px 40px 8px 32px",
                        color: "black",
                        fontWeight: 600,
                      }}
                    >
                      Subtotal
                    </td>
                    <td></td>
                    <td></td>
                    <td
                      style={{
                        textAlign: "right",
                        color: "black",
                        fontWeight: 600,
                        padding: "8px 24px",
                      }}
                    >
                      $9,000.00
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "10px 40px 15px 32px",
                        color: "black",
                        fontWeight: 600,
                      }}
                    >
                      Tax (10%)
                    </td>
                    <td></td>
                    <td></td>
                    <td
                      style={{
                        textAlign: "right",
                        color: "#7E8597",
                        fontWeight: 600,
                        padding: "10px 24px 15px 24px",
                      }}
                    >
                      $900.00
                    </td>
                  </tr>
                  <tr
                    style={{
                      background: "#F3F6F9",
                      borderTop: "1px solid #E5E7EB",
                    }}
                  >
                    <td
                      style={{
                        padding: "0px 40px 15px 32px",
                        color: "#045c44",
                        fontWeight: 700,
                        borderBottomLeftRadius: 12,
                        whiteSpace: "nowrap",
                      }}
                    >
                      Total due
                    </td>
                    <td></td>
                    <td></td>
                    <td
                      style={{
                        textAlign: "right",
                        color: "#045c44",
                        fontWeight: 700,
                        borderBottomRightRadius: 12,
                        padding: "0px 24px 15px 24px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      US$ 9,900.00
                    </td>
                  </tr>
                </tbody>
              </table>
              <div
                style={{
                  marginTop: 10,
                  fontSize: 12,
                  color: "#7E8597",
                  display: "flex",
                  alignItems: "center",
                  fontWeight: 500,
                  gap: 8,
                  lineHeight: 1,
                  height: 25,
                }}
              >
                <div
                  style={{
                    marginTop: 10,
                    display: "flex",
                    alignItems: "center",
                    height: 25,
                  }}
                >
                  <InfoIcon />
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", height: 25 }}
                >
                  Please pay within 15 days of receiving this invoice.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          borderTop: "1px solid #E5E7EB",
          marginTop: 56,
          padding: "20px 56px 20px 56px",
          paddingBottom: 32,
          display: "flex",
          justifyContent: "space-between",
          fontSize: 12,
          color: "black",
          fontWeight: 300,
          background: "#fbfbfb",
          borderBottomLeftRadius: 12,
          borderBottomRightRadius: 12,
        }}
      >
        <span>www.website.com</span>
        <span>+91 00000 00000</span>
        <span>hello@email.com</span>
      </div>
    </div>
  </div>
));

export default InvoiceTemplate;
