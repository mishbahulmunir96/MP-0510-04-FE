import { useEffect } from "react";
import { useRouter } from "next/navigation";

const useAuth = () => {
  const router = useRouter();

  // Memeriksa apakah user sudah login
  useEffect(() => {
    const userData = localStorage.getItem("user-storage");
    if (userData) {
      // Jika user sudah login, redirect ke home
      router.replace("/");
    }
  }, [router]);
};

export default useAuth;
