import "bootstrap/dist/css/bootstrap.css";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import { GlobalContextProvider } from "../context/Store";
import BootstrapClient from "../components/BootstrapClient";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Tiro_Bangla, Roboto } from "next/font/google";

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
        class={`container-fluid text-center ${tiro_bangla.variable} ${roboto.variable}`}
      >
        <div
          class="alert alert-success alert-dismissible fade show"
          role="alert"
        >
          <strong>To download Our Android App Click</strong>{" "}
          <a
            class="d-inline-block text-decoration-none fw-bold"
            href="https://drive.google.com/drive/folders/1QQzBMJjI_MXTKxP3_ayTo7QflGD0vbVP?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
          >
            Here
          </a>
          <button
            type="button"
            class="btn-close"
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
