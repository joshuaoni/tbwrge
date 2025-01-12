import { Inter, Poppins, Prata } from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const prata = Prata({
  subsets: ["latin"],
  weight: ["400"],
});

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
