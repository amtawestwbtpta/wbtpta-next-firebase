import "bootstrap/dist/css/bootstrap.css";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify";
import "./globals.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "react-image-crop/dist/ReactCrop.css";
import { GlobalContextProvider } from "../context/Store";
import BootstrapClient from "../components/BootstrapClient";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AppLink from "../components/AppLink";
import localFont from "next/font/local";
import { Bounce, ToastContainer } from "react-toastify";
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

const timesNewRoman = localFont({
  src: [
    {
      path: "../../public/assets/fonts/times.ttf",
    },
  ],
  variable: "--font-timesNewRoman",
});
const kalpurush = localFont({
  src: [
    {
      path: "../../public/assets/fonts/kalpurush.ttf",
    },
  ],
  variable: "--font-kalpurush",
});
const algerian = localFont({
  src: [
    {
      path: "../../public/assets/fonts/Algerian.ttf",
    },
  ],
  variable: "--font-algerian",
});

<meta
  name="google-site-verification"
  content="M--8o-fyJCgXlWNQerj9_BpuLxnspuo7gOkTSCzDCU0"
/>;
<meta name="viewport" content="width=device-width, initial-scale=1" />;
// app/layout.tsx
export const metadata = {
  title: "Amta West Circle | WBTPTA",
  description:
    "Official site of West Bengal Trinamool Primary Teachers' Association - Amta West Circle.",
  keywords: [
    "WBTPTA",
    "Amta West",
    "Primary Teachers",
    "West Bengal",
    "Trinamool",
  ],
  authors: [{ name: "WBTPTA Amta West Circle" }],
  creator: "WBTPTA Amta West Circle",
  openGraph: {
    title: "Amta West Circle | WBTPTA",
    description: "Updates and information from WBTPTA Amta West Circle.",
    url: "https://awwbtpta.vercel.app",
    siteName: "awwbtpta.vercel.app",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://awwbtpta.vercel.app",
  },
  other: {
    "google-site-verification": "M--8o-fyJCgXlWNQerj9_BpuLxnspuo7gOkTSCzDCU0",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body
        className={`container-fluid text-center ${kalpurush.variable} ${timesNewRoman.variable} ${dejaVuBold.variable} ${dejaVuCondensed.variable} ${algerian.variable}`}
        suppressHydrationWarning={true}
      >
        <AppLink />
        <GlobalContextProvider>
          <Navbar />
          <div className="my-3">{children}</div>
          <Footer />
          <ToastContainer
            position="top-right"
            autoClose={1500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover={false}
            theme="light"
            transition={Bounce}
          />
          <BootstrapClient />
        </GlobalContextProvider>
      </body>
    </html>
  );
}
