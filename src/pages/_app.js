import "@/styles/globals.css";
import { Toaster } from "react-hot-toast";
import { SpeedInsights } from "@vercel/speed-insights/next"

export default function App({ Component, pageProps }) {
  return(
    <>
      <Component {...pageProps} />;
      <Toaster position="bottom-right" reverseOrder={false} />
      <SpeedInsights/>
    </>
  )
}
