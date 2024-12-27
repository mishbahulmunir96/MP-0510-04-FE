"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import React, { FC, PropsWithChildren, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { fromUnixTime, isAfter } from "date-fns";
import { logoutAction } from "@/redux/slices/userSlices";

const TokenProvider: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.user);

  useEffect(() => {
    const checkTokenValidity = () => {
      if (token) {
        try {
          const decodeToken = jwtDecode(token);
          const tokenExpiry = fromUnixTime(decodeToken.exp!);

          if (isAfter(new Date(), tokenExpiry)) {
            localStorage.removeItem("user-storage");
            dispatch(logoutAction());
          }
        } catch (error) {
          localStorage.removeItem("user-storage");
          dispatch(logoutAction());
        }
      }
    };
    const interval = setInterval(checkTokenValidity, 1500);

    return () => clearInterval(interval);
  }, [token, dispatch]);

  return <>{children}</>;
};

export default TokenProvider;
