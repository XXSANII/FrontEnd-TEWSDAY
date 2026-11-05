import { PublicHeader } from "@/components/PublicHeader";
import { Footer } from "@/components/Footer";
export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (<><PublicHeader />{children}<Footer /></>);
}
