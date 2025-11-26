import "./globals.sass";
export const metadata = {
  title: "Chronos App",
  description: "Time Matrix & Productivity App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
