import { MemberHeader } from "@/components/MemberHeader";
import { Footer } from "@/components/Footer";
export default function StudentLayout({ children }: { children: React.ReactNode }) {
  return (<><MemberHeader mode="student" />{children}<Footer /></>);
}
