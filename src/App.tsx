import loadable from "@loadable/component";
import { Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { AppConfig } from "./AppConfig";
import GlobalLoading from "./components/global-loading/GlobalLoading";
import AuthGuard from "./guard/AuthGuard";
import GuestGuard from "./guard/GuestGuard";
import DashBoardLayout from "./layout/Dashboard";
import NotAuthorized from "./pages/401";
import NotFound from "./pages/404";

const Dashboard = loadable(() => import("./pages/dashboard"));
const CategoryBlog = loadable(() => import("./pages/category-blog"));
const CategoryProduct = loadable(() => import("./pages/category-product"));
const Account = loadable(() => import("./pages/account"));
const Product = loadable(() => import("./pages/product"));
const Feedback = loadable(() => import("./pages/feedback"));
const Contact = loadable(() => import("./pages/contact"));
const Banner = loadable(() => import("./pages/banner"));
const Blog = loadable(() => import("./pages/blog"));
const Login = loadable(() => import("./pages/login"));
const Register = loadable(()=>import("./pages/register"));
const Order = loadable(() => import("./pages/order"));

function App() {
  return (
    <div className="App">
      <BrowserRouter basename={AppConfig.routerBase}>
        <Suspense fallback={<GlobalLoading />}>
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/layout-guard-roles" element={<NotAuthorized />} />

            <Route path="/" element={<Navigate replace to="/dashboard" />} />

            <Route
              path="/dashboard"
              element={
                <AuthGuard>
                  <DashBoardLayout>
                    <Dashboard />
                  </DashBoardLayout>
                </AuthGuard>
              }
            />
            <Route
              path="/account"
              element={
                <AuthGuard>
                  <DashBoardLayout>
                    <Account />
                  </DashBoardLayout>
                </AuthGuard>
              }
            />
            <Route
              path="/product"
              element={
                <AuthGuard>
                  <DashBoardLayout>
                    <Product />
                  </DashBoardLayout>
                </AuthGuard>
              }
            />
            <Route
              path="/feedback"
              element={
                <AuthGuard>
                  <DashBoardLayout>
                    <Feedback />
                  </DashBoardLayout>
                </AuthGuard>
              }
            />
            <Route
              path="/order"
              element={
                <AuthGuard>
                  <DashBoardLayout>
                    <Order />
                  </DashBoardLayout>
                </AuthGuard>
              }
            />
            <Route
              path="/category-blog"
              element={
                <AuthGuard>
                  <DashBoardLayout>
                    <CategoryBlog />
                  </DashBoardLayout>
                </AuthGuard>
              }
            />
            <Route
              path="/category-product"
              element={
                <AuthGuard>
                  <DashBoardLayout>
                    <CategoryProduct />
                  </DashBoardLayout>
                </AuthGuard>
              }
            />
            <Route
              path="/contact"
              element={
                <AuthGuard>
                  <DashBoardLayout>
                    <Contact />
                  </DashBoardLayout>
                </AuthGuard>
              }
            />
            <Route
              path="/banner"
              element={
                <AuthGuard>
                  <DashBoardLayout>
                    <Banner />
                  </DashBoardLayout>
                </AuthGuard>
              }
            />
            <Route
              path="/blog"
              element={
                <AuthGuard>
                  <DashBoardLayout>
                    <Blog />
                  </DashBoardLayout>
                </AuthGuard>
              }
            />
            <Route
              path="/login"
              element={
                <GuestGuard>
                  <Login />
                </GuestGuard>
              }
            />
            <Route
              path="/register"
              element={
                <GuestGuard>
                  <Register />
                </GuestGuard>
              }
            />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
