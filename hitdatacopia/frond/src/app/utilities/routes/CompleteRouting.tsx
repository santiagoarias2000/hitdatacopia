import { lazy, useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { MainBoard } from "../../containers/MainBoard";
import { Welcome } from "../../containers/Welcome";
import { Login } from "../../views/public/Login";

import { NotFound } from "../../views/shared/NotFound";

const LazyLogin = lazy(() => import("../../views/public/Login").then(() => ({ default: Login })));
const LazyNotFound = lazy(() => import("../../views/shared/NotFound").then(() => ({ default: NotFound })));
const LazyMainBoard = lazy(() => import("../../containers/MainBoard").then(() => ({ default: MainBoard })));

export const CompleteRouting = () => {
  const [status, setStatus] = useState(localStorage.getItem("tokenHitData") || "");

  useEffect(() => {
    localStorage.setItem("tokenHitData", status);
  }, [status]);
  return (
    <Routes>
      {status ? <Route path="/home/*" element={<LazyMainBoard />} /> : <Route path="/" element={<LazyLogin />} />}
      <Route path="/" element={<LazyLogin />} />
      <Route path="/home/*" element={<LazyMainBoard />} />
      <Route path="/*" element={<Navigate to="/" replace />} />
      <Route path="*" element={<LazyNotFound />} />
    </Routes>);
};
