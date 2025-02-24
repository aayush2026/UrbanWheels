"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from '@/context/ThemeContext';
import { Car, CreditCard, History, LayoutDashboard, LogOut, UserPlus, LogIn, Settings, Menu, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function SidebarLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Detect screen size and toggle mobile mode
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024); // Set breakpoint (e.g., 1024px)
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        {/* Show sidebar on large screens */}
        {!isMobile && (
          <Sidebar>
            <SidebarHeader>
              <Link href="/" className="flex items-center gap-2 dark:bg-white bg-[#111111] rounded-lg">
                <Image 
                  src={isDarkMode ? "/images/urban-wheels-transparent-b.png" : "/images/urban-wheels-transparent-w.png"}
                  alt="Urban Wheels Logo" 
                  width={154} 
                  height={32}
                  className="object-cover object-center px-3 py-4"
                />
              </Link>
            </SidebarHeader>

            <SidebarContent>
              <SidebarMenu>
                {user ? (
                  <>
                    <SidebarMenuItem>
                      <h2 className="text-2xl font-medium text-gray-900 p-2 dark:text-white">
                        Welcome back,
                        <br /> 
                        <span className="text-4xl font-bold">
                          {user?.firstName}!
                        </span>
                      </h2>     
                    </SidebarMenuItem>
                    <Link href="/dashboard">
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                          <LayoutDashboard className="h-4 w-4" />
                          <span>Dashboard</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </Link>
                    <Link href="/book?type=solo">
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                          <Car className="h-4 w-4" />
                          <span>Book a Ride</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </Link>
                    <Link href="/rides">
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                          <History className="h-4 w-4" />
                          <span>My Rides</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </Link>
                    <Link href="/payment/history">
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                          <CreditCard className="h-4 w-4" />
                          <span>Payment History</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link href="/auth/login">
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                          <LogIn className="h-4 w-4" />
                          <span>Login</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </Link>
                    <Link href="/auth/register">
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                          <UserPlus className="h-4 w-4" />
                          <span>Register</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </Link>
                  </>
                )}
              </SidebarMenu>
            </SidebarContent>

            {user && (
              <SidebarFooter>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton onClick={handleLogout}>
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <Link href="/profile/settings">
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Settings className="h-4 w-4" />
                        <span>Profile</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </Link>
                </SidebarMenu>
              </SidebarFooter>
            )}

            {/* Dark Mode Toggle */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <label className="flex items-center cursor-pointer">
                <input type="checkbox" checked={isDarkMode} onChange={toggleDarkMode} className="hidden" />
                <div className="relative">
                  <div className={`block w-10 h-6 rounded-full ${isDarkMode ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                  <div className={`dot absolute left-1 top-1 w-4 h-4 rounded-full transition ${isDarkMode ? 'translate-x-full bg-white' : 'bg-white'}`}></div>
                </div>
                <span className="ml-2 text-gray-900 dark:text-white">Toggle Dark Mode</span>
              </label>
            </div>
          </Sidebar>
        )}

        {/* Mobile Navbar with Hamburger Menu */}
        {isMobile && (
          <div className="fixed top-0 left-0 w-full dark:bg-gray-200 bg-[#111111] shadow-md z-50 p-4 flex justify-between items-center">
            <Image src={isDarkMode ? "/images/urban-wheels-transparent-b.png" : "/images/urban-wheels-transparent-w.png"}
              alt="Logo" width={120} height={30} />
            <div className="flex items-center gap-4">
              {/* Dark Mode Toggle in Mobile View */}
              <label className="flex items-center cursor-pointer">
                <input type="checkbox" checked={isDarkMode} onChange={toggleDarkMode} className="hidden" />
                <div className="relative">
                  <div className={`block w-10 h-6 rounded-full ${isDarkMode ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                  <div className={`dot absolute left-1 top-1 w-4 h-4 rounded-full transition ${isDarkMode ? 'translate-x-full bg-white' : 'bg-white'}`}></div>
                </div>
              </label>
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none">
                {isMenuOpen ? <X className="w-6 h-6 dark:text-black text-white" /> : <Menu className="w-6 h-6 dark:text-black text-white" />}
              </button>
            </div>
          </div>
        )}

        {/* Mobile Navbar Dropdown */}
        {isMobile && isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 30 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute left-0 w-full mt-10 bg-white dark:bg-gray-800 shadow-md p-4 z-1"
          >
            <div className="absolute left-0 w-full bg-white dark:bg-gray-800 shadow-md p-4">
              <ul className="space-y-2">
                {user ? (
                  <>
                    <li>
                      <Link href="/dashboard" className="flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
                        <LayoutDashboard className="h-4 w-4 text-gray-900 dark:text-gray-200" />
                        <span className="text-gray-900 dark:text-gray-200">Dashboard</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/book?type=solo" className="flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
                        <Car className="h-4 w-4 text-gray-900 dark:text-gray-200" />
                        <span className="text-gray-900 dark:text-gray-200">Book a Ride</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/rides" className="flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
                        <History className="h-4 w-4 text-gray-900 dark:text-gray-200" />
                        <span className="text-gray-900 dark:text-gray-200">My Rides</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/payment/history" className="flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
                        <CreditCard className="h-4 w-4 text-gray-900 dark:text-gray-200" />
                        <span className="text-gray-900 dark:text-gray-200">Payment History</span>
                      </Link>
                    </li>
                    <li>
                      <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="flex items-center gap-2 text-red-500 dark:text-red-400">
                        <LogOut className="h-4 w-4" />
                        <span className="text-gray-900 dark:text-gray-200">Logout</span>
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link href="/auth/login" className="flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
                        <LogIn className="h-4 w-4 text-gray-900 dark:text-gray-200" />
                        <span className="text-gray-900 dark:text-gray-200">Login</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/auth/register" className="flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
                        <UserPlus className="h-4 w-4 text-gray-900 dark:text-gray-200" />
                        <span className="text-gray-900 dark:text-gray-200">Register</span>
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </motion.div>
        )}

        <main className={`flex-1 overflow-auto bg-gray-50 dark:bg-gray-900 transition-all duration-300 ${isMobile ? "pt-[64px]" : ""}`}>
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
