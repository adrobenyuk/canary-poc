import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

import Spinner from "../Spinner";
import LoginPage from "../../pages/Login";
const PricingPage = lazy(() => import("../../pages/Pricing"));
const EnterprisePage = lazy(() => import("../../pages/Enterprise"));
const SupportPage = lazy(() => import("../../pages/Support"));
const FeaturesPage = lazy(() => import("../../pages/Features"));

const Router = () => (
  <Routes>
    <Route
      path="/"
      element={
        <Suspense fallback={<Spinner />}>
          <PricingPage />
        </Suspense>
      }
    />
    <Route
      path="/enterprise"
      element={
        <Suspense fallback={<Spinner />}>
          <EnterprisePage />
        </Suspense>
      }
    />
    <Route
      path="/support"
      element={
        <Suspense fallback={<Spinner />}>
          <SupportPage />
        </Suspense>
      }
    />
    <Route
      path="/features"
      element={
        <Suspense fallback={<Spinner />}>
          <FeaturesPage />
        </Suspense>
      }
    />
    <Route path="/login" element={<LoginPage />} />
  </Routes>
);

export default Router;
