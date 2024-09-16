import SidebarWapper from "@/components/shared/sidebar/SidebarWapper";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <SidebarWapper>{children}</SidebarWapper>;
}
