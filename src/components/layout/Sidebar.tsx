"use client"

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
import { Car, CreditCard, History, LayoutDashboard, LogOut, User, UserPlus, LogIn, User2, ChevronUp } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Settings } from "lucide-react";

export default function SidebarLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full ">
        <Sidebar>
          <SidebarHeader>
            <SidebarMenu>
                <Link href="/" className="flex items-center gap-2 bg-[#111111] rounded-lg">
                  <Image 
                    src="/images/urban-wheels.png" 
                    alt="Urban Wheels Logo" 
                    width={124} 
                    height={24}
                    className="object-cover object-center rounded-full"
                    />
                </Link>
            </SidebarMenu>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {user ? (
                <>
                  <SidebarMenuItem>
                    <h2 className=" text-2xl font-medium text-gray-900 p-2">
                        Welcome back,
                        <br /> 
                        <span className="text-4xl font-bold">
                            {user?.firstName}!
                        </span>
                    </h2>     
                  </SidebarMenuItem>
                  <Link href="/dashboard" className="flex items-center gap-2 rounded-lg hover:bg-gray-100">
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <LayoutDashboard className="h-4 w-4" />
                            <span>Dashboard</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                  </Link>
                <Link href="/book?type=solo" className="flex items-center gap-2 rounded-lg hover:bg-gray-100">
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                        <Car className="h-4 w-4" />
                        <span>Book a Ride</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </Link>
                < Link href="/rides" className="flex items-center gap-2 rounded-lg hover:bg-gray-100">
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                        <History className="h-4 w-4" />
                        <span>My Rides</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </Link>
                <Link href="/payment/history" className="flex items-center gap-2 rounded-lg hover:bg-gray-100">
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
                <Link href="/auth/login" className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100">
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                        <LogIn className="h-4 w-4" />
                        <span>Login</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </Link>
                <Link href="/auth/register" className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100">
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
                  <SidebarMenuButton asChild className="flex items-center">
                      <img src={user.image} alt={`${user.firstName} ${user.lastName}`} 
                            className="h-12 w-12 rounded-full mr-2" />
                        <Settings className="h-4 w-4" />
                      <span>Profile</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                </Link>
              </SidebarMenu>
            </SidebarFooter>
          //   __________________________
          //   <SidebarFooter>
          //   <SidebarMenu>
          //     <SidebarMenuItem>
          //       <DropdownMenu> 
          //         <DropdownMenuTrigger asChild>
          //           <SidebarMenuButton>
          //             <img src={user.image} alt={`${user.firstName} ${user.lastName}`} 
          //                   className="h-12 w-12 rounded-full mr-2" />
          //               <Settings className="h-4 w-4" />
          //             <span>Profile</span>
          //             <ChevronUp className="ml-auto" />
          //           </SidebarMenuButton>
          //         </DropdownMenuTrigger>
          //         <DropdownMenuContent
          //           side="top"
          //           className="w-[--radix-popper-anchor-width]"
          //         >
          //           <DropdownMenuItem>
          //             <span>Settings</span>
          //           </DropdownMenuItem>
          //           <DropdownMenuItem  onClick={handleLogout}>
          //             <LogOut className="h-4 w-4" />
          //           <span>Logout</span>
          //           </DropdownMenuItem>
          //         </DropdownMenuContent>
          //       </DropdownMenu>
          //     </SidebarMenuItem>
          //   </SidebarMenu>
          // </SidebarFooter>
          )}
        </Sidebar>
        <main className="flex-1 overflow-auto bg-gray-50">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
} 