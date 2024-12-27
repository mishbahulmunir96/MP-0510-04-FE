import { useAppSelector } from "@/redux/hooks";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RoleGuard(Component: any) {
  return function IsAuth(props: any) {
    const { id, role } = useAppSelector((state) => state.user);
    const router = useRouter();

    useEffect(() => {
      if (!id || role !== "ORGANIZER") {
        router.push("/");
      }
    }, [id, role, router]);

    if (!id || role !== "ORGANIZER") {
      return <Loader2 />;
    }

    return <Component {...props} />;
  };
}
