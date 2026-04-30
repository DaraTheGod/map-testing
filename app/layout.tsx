import "leaflet/dist/leaflet.css";
import "./globals.css";
import NextAuthProvider from "@/components/providers/NextAuthProvider";

export const metadata = {
  title: "Cambodia Disaster Map",
  description: "A map visualization of disaster events in Cambodia.",
};

export default function RootLayout({ children }: any) {
  return (
    <html lang="en">
      <body>
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  );
}
