import LoadingScreen from "@/components/LoadingScreen";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RoleGuard(Component: any) {
  return function IsAuth(props: any) {
    const { id, role } = useAppSelector((state) => state.user);
    const router = useRouter();

    useEffect(() => {
      if (!id || role !== "ORGANIZER") {
        router.push("/dashboard/profile");
      }
    }, [id, role, router]);

    if (!id || role !== "ORGANIZER") {
      return <LoadingScreen />;
    }

    return <Component {...props} />;
  };
}
