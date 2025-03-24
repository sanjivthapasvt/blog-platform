export const metadata = {
  title: "Blog",
  description: "Created by sanjiv thapa using django, drf, postgres, nextjs, etc for learning",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}