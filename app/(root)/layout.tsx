import SidebarWapper from "@/components/shared/sidebar/SidebarWapper";

type Props = React.PropsWithChildren<{}>;

export default function Layout({ children }: Props) {
  return <SidebarWapper>{children}</SidebarWapper>;
}
