import { PropsWithChildren, createContext, useEffect, useState } from "react";
import { API } from "../configs/api";

type SignInTypes = {
  password: string;
  email: string;
};

type SignUpTypes = {
  name: string;
  password: string;
  email: string;
};

type AuthContextTypes = {
  signIn: (params: SignInTypes) => Promise<boolean | void>;
  signUp: (params: SignUpTypes) => Promise<boolean | void>;

  isLoading: boolean;
  userAuthID: string;
  signOut: () => void;
  
};

export const AuthContext = createContext<AuthContextTypes>(
  {} as AuthContextTypes
);

export function AuthProvider({ children }: PropsWithChildren) {
  const [isLoading, setIsLoading] = useState(false);
  const [userAuthID, setUserAuthID] = useState("");

  async function signIn({ email, password }: SignInTypes) {
    if (!email || !password) throw alert("Por favor informar email e senha!");

    setIsLoading(true);

    return API.post("/login", {
      email,
      password,
    })
      .then((res) => {
        console.log(res);

        setUserAuthID(res.data.id);

        localStorage.setItem(
          "@task_manager:userID",
          JSON.stringify(res.data.id)
        );

        return true;
      })
      .catch((error) => {
        if (error.response) {
          alert(error.response.data.message);
        } else {
          alert("Erro ao fazer login!");
        }

        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function signOut() {
    localStorage.removeItem("@task_manager:userID");
    setUserAuthID("");
  }

  useEffect(() => {
    const userID = localStorage.getItem("@task_manager:userID");

    if (userID) setUserAuthID(userID);
  }, []);

  async function signUp({ name, email, password }: SignUpTypes) {
    if (!name || !email || !password)
      throw alert("Por favor informar email e senha!");

    setIsLoading(true);

    return API.post("/user", {
      name,
      email,
      password,
    })
      .then((res) => {
        alert(res.data.message);

        return true;
      })
      .catch((error) => {
        if (error.response) {
          alert(error.response.data.message);
        } else {
          alert("Erro ao criar usuário!");
        }

        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <AuthContext.Provider value={{ signIn, isLoading, userAuthID, signOut, signUp }}>
      {children}
    </AuthContext.Provider>
  );
}