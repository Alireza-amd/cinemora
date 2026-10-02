import {
  createContext,
  useCallback,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { SignInSchema, SignUpSchema, User } from "../constants/types";
import {
  getUser,
  signIn as signInService,
  signUp as signUpService,
  logout as logoutService,
} from "../services/auth";
import { useLocation, useNavigate } from "react-router";
import { toast } from "sonner";

type AuthContextType = {
  user: User | null;
  isLoadingUser: boolean;
  signIn: (data: SignInSchema) => Promise<void>;
  signUp: (data: SignUpSchema) => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const signIn = useCallback(
    (data: SignInSchema) => {
      return signInService(data).then((newUser) => {
        setUser(newUser);
        toast.success("signed in succesfully.");
        navigate(location.state?.location ?? "/");
      });
    },
    [location, navigate],
  );
  const signUp = useCallback(
    (data: SignUpSchema) => {
      return signUpService(data).then((newUser) => {
        setUser(newUser);
        toast.success("Signed up succesfully.");
        navigate(location.state?.location ?? "/");
      });
    },
    [location, navigate],
  );
  const logout = useCallback(() => {
    return logoutService().then(() => {
      setUser(null);
      toast.success("Loged out succesfully.");
      navigate("/");
    });
  }, []);

  useEffect(() => {
    setIsLoadingUser(true);
    getUser()
      .then((data) => setUser(data))
      .catch((error) => {
        console.error("Failed to fetch user:", error);
        setUser(null);
      })
      .finally(() => {
        setIsLoadingUser(false);
      });
  }, []);

  return (
    <AuthContext value={{ user, isLoadingUser, signIn, signUp, logout }}>
      {children}
    </AuthContext>
  );
}
