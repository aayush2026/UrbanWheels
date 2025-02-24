import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from '@/context/AuthContext';
import { PaymentProvider } from '@/context/PaymentContext';
import { RideProvider } from '@/context/RideContext';
import SidebarLayout from '@/components/layout/Sidebar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from '@/context/ThemeContext';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Urban Wheels",
  description: "Urban Wheels is a ride-sharing platform that allows you to find and book rides in your area.",
  icons: {
    icon: '/urban-wheels-logo.ico', // file in public directory
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white text-gray-900 dark:bg-gray-900 dark:text-white`}>
        <AuthProvider>
          <RideProvider>
            <PaymentProvider>
              <ThemeProvider>
                <SidebarLayout>
                  {children}
                </SidebarLayout>
              </ThemeProvider>
            </PaymentProvider>
          </RideProvider>
        </AuthProvider>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
        />
      </body>
    </html>
  );
}
