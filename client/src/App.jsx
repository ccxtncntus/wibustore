import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
const HomeLazy = lazy(() => import("./pages/Home"));
const AdminLazy = lazy(() => import("./pages/Admin"));
const ProductAdminLazy = lazy(() => import("./components/admin/ProductAdmin"));
const CategoriesAdminLazy = lazy(() =>
  import("./components/admin/CategoriesAdmin")
);
const ListProductLazy = lazy(() => import("./components/admin/ListProducts"));
const CrawlLazy = lazy(() => import("./pages/crawl/Crawl"));
const CrawDetaillLazy = lazy(() => import("./pages/crawl/CrawlDetail"));

const ShopllLazy = lazy(() => import("./pages/shop/Shop"));
const PostsllLazy = lazy(() => import("./pages/posts/Posts"));
const ContactllLazy = lazy(() => import("./pages/contact/Contact"));
const HomeContentllLazy = lazy(() => import("./pages/home/HomeContent"));
const ProductsDetailllLazy = lazy(() => import("./pages/shop/ProductsDetail"));
const LoginllLazy = lazy(() => import("./pages/login/Login"));
const RegisterllLazy = lazy(() => import("./pages/register/Register"));
const ForgotPassllLazy = lazy(() =>
  import("./pages/forgotpassword/ForgotPass")
);
const ChangePassllLazy = lazy(() =>
  import("./pages/changepassword/ChangePass")
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
        >
          <Route
            path="/login"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <LoginllLazy />
              </Suspense>
            }
          />

          <Route
            path="/register"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <RegisterllLazy />
              </Suspense>
            }
          />
          <Route
            path="/forgotpass"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <ForgotPassllLazy />
              </Suspense>
            }
          />

          <Route
            path="/changepass"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <ChangePassllLazy />
              </Suspense>
            }
          />
          <Route
            path="/shop"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <ShopllLazy />
              </Suspense>
            }
          />
          <Route
            path="/shop/page/:page"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <ShopllLazy />
              </Suspense>
            }
          />
          <Route
            path="/shop/:idProduct"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <ProductsDetailllLazy />
              </Suspense>
            }
          />
          <Route
            path="/shop/:category/:idcategory"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <ShopllLazy />
              </Suspense>
            }
          />
          <Route
            path="/shop/:category/:idcategory/page/:pageCate"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <ShopllLazy />
              </Suspense>
            }
          />
          <Route
            path="/shop/:category/:idcategory/:idProduct"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <ProductsDetailllLazy />
              </Suspense>
            }
          />
          <Route
            path="/shop/:category/:idcategory/page/:pageCate/:idProduct"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <ProductsDetailllLazy />
              </Suspense>
            }
          />

          <Route
            path="/posts"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <PostsllLazy />
              </Suspense>
            }
          />
          <Route
            path="/contact"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <ContactllLazy />
              </Suspense>
            }
          />
          <Route
            path="/"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <HomeContentllLazy />
              </Suspense>
            }
          />
        </Route>
        <Route
          path="/admin"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <AdminLazy />
            </Suspense>
          }
        >
          <Route
            path="list-products"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <ListProductLazy />
              </Suspense>
            }
          />
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

        <Route
          path="/crawl"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <CrawlLazy />
            </Suspense>
          }
        />

        <Route
          path="/crawl/products/:name"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <CrawDetaillLazy />
            </Suspense>
          }
        />
      </Routes>
    </>
  );
}

export default App;
