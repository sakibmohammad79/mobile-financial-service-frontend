import { useState, useEffect } from "react";
import { getuserInfo } from "../services/authService";

const useUserRole = (): [string | null, boolean] => {
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const user = await getuserInfo();
        setRole(user?.role || null);
      } catch (error) {
        console.error("Error fetching user role:", error);
        setRole(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, []);

  return [role, loading];
};

export default useUserRole;
