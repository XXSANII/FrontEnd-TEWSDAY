import { MemberHeader } from "@/components/MemberHeader";
import { Footer } from "@/components/Footer";
export default function TutorLayout({ children }: { children: React.ReactNode }) {
  return (<><MemberHeader mode="tutor" />{children}<Footer /></>);
}
