import { useEffect } from "react";
import { useRouter } from "next/navigation";

const useAuth = () => {
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem("user-storage");
    if (userData) {
      router.replace("/");
    }
  }, [router]);
};

export default useAuth;
