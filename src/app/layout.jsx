import Header from "@/components/layout/Header";
import "./globals.css";
import { NotificationContextProvider } from "@/store/notification";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NotificationContextProvider>
          <Header />
          <main>{children}</main>
        </NotificationContextProvider>
      </body>
    </html>
  );
}
