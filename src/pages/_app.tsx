import "@app/styles/globals.scss";
import type { AppProps } from "next/app";
import Layout from "@app/components/Layout";
import { Inter } from "next/font/google";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import FileUploadContextProvider from "@app/components/FileUpload";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
      <FileUploadContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </FileUploadContextProvider>
    </>
  );
}
