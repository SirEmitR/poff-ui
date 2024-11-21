import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/layout/header";
import { NotificationProvider } from "@/components/context/notification-context";
import NotificationStack from "@/components/experience/notification-stack";
import { UsuarioProvider } from "@/components/context/usuario-context";
import { SendingProvider } from "@/components/context/sending-context";
import Footer from "@/components/layout/footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Liga POFF",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es-MX">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-[100dvh] flex flex-col`}
      >
        <UsuarioProvider>
          <SendingProvider>
            <NotificationProvider>
              <NotificationStack />
              <Header />
              {children}
            </NotificationProvider>
          </SendingProvider>
        </UsuarioProvider>
        <Footer />
      </body>
    </html>
  );
}
