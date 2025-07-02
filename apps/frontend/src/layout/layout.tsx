import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import {
  ButtonWithPlusIcon,
  ButtonWithShareIcon,
} from "@/components/ui/button-with-icon";
import { ThemeProvider } from "@/components/theme-provider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="relative min-h-svh flex w-screen">
          <AppSidebar />
          <SidebarTrigger className="pl-2 print:hidden" />
          <main className="flex-1 relative min-h-svh flex flex-col items-center justify-center">
            <div className="flex gap-4 absolute top-4 right-4 z-10"></div>
            {children}
          </main>
        </div>
      </ThemeProvider>
    </SidebarProvider>
  );
}
