import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
const HomeLazy = lazy(() => import("./pages/Home"));
const AdminLazy = lazy(() => import("./pages/Admin"));
const ProductAdminLazy = lazy(() => import("./components/admin/ProductAdmin"));
const CategoriesAdminLazy = lazy(() =>
  import("./components/admin/CategoriesAdmin")
);
function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <HomeLazy />
            </Suspense>
          }
        />
        <Route
          path="/admin"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <AdminLazy />
            </Suspense>
          }
        >
          <Route
            path="products"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <ProductAdminLazy />
              </Suspense>
            }
          />
          <Route
            path="categories"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <CategoriesAdminLazy />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
