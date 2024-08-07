import "bootstrap/dist/css/bootstrap.css";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import { GlobalContextProvider } from "../context/Store";
import BootstrapClient from "../components/BootstrapClient";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Tiro_Bangla, Roboto } from "next/font/google";
import localFont from "next/font/local";
const dejaVuBold = localFont({
  src: [
    {
      path: "../../public/assets/fonts/DejaVuSerifCondensed-Bold.ttf",
    },
  ],
  variable: "--font-dejaVuBold",
});
const dejaVuCondensed = localFont({
  src: [
    {
      path: "../../public/assets/fonts/DejaVuSerifCondensed.ttf",
    },
  ],
  variable: "--font-dejaVuCondensed",
});
const tiro_bangla = Tiro_Bangla({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  preload: true,
  variable: "--font-tiro",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  preload: true,
  variable: "--font-roboto",
});

export const metadata = {
  title: "WBTPTA AMTA WEST",
  description:
    "Welcome To WBTPTA Amta West Circle's Website. Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`container-fluid text-center ${tiro_bangla.variable} ${roboto.variable} ${dejaVuBold.variable} ${dejaVuCondensed.variable}`}
      >
        <div
          className="alert alert-success alert-dismissible fade show noprint"
          role="alert"
        >
          <strong>To download Our Android App Click</strong>{" "}
          <a
            className="d-inline-block text-decoration-none fw-bold"
            href="https://drive.google.com/drive/folders/1QQzBMJjI_MXTKxP3_ayTo7QflGD0vbVP?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
          >
            Here
          </a>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
        <GlobalContextProvider>
          <Navbar />
          {children}
          <Footer />
          <BootstrapClient />
        </GlobalContextProvider>
      </body>
    </html>
  );
}
