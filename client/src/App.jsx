import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import CheckOutSuccess from './pages/checkout/CheckOutSuccess';
import Loading from './components/loading/Loading';
import CheckOutLoading from './pages/checkout/CheckOutLoading';
import Nothing from './pages/posts/nothing/Nothing';
const HomeLazy = lazy(() => import('./pages/Home'));
const AdminLazy = lazy(() => import('./pages/Admin'));
const ProductAdminLazy = lazy(() => import('./components/admin/ProductAdmin'));
const OrderAdminLazy = lazy(() => import('./components/admin/OrderAdmin'));
const AccountAdminLazy = lazy(() => import('./components/admin/AccountAdmin'));
const SlidersAdminLazy = lazy(() => import('./components/admin/SlidersAdmin'));
// admin
const PostAdminLazy = lazy(() =>
  import('./components/admin/postAdmin/PostAdmin')
);
const ListPostAdminLazy = lazy(() =>
  import('./components/admin/postAdmin/ListPosts')
);
const DashBoardAdminLazy = lazy(() =>
  import('./pages/admin/dashboard/DashBoard')
);
const CategoriesAdminLazy = lazy(() =>
  import('./components/admin/CategoriesAdmin')
);
const ListProductLazy = lazy(() => import('./components/admin/ListProducts'));
const CrawlLazy = lazy(() => import('./pages/crawl/Crawl'));
const CrawDetaillLazy = lazy(() => import('./pages/crawl/CrawlDetail'));

const ShopllLazy = lazy(() => import('./pages/shop/Shop'));
const PostsllLazy = lazy(() => import('./pages/posts/Posts'));
const PostDetailLazy = lazy(() =>
  import('./pages/posts/postDetail/PostDetail')
);
const ContactllLazy = lazy(() => import('./pages/contact/Contact'));
const HomeContentllLazy = lazy(() => import('./pages/home/HomeContent'));
const ProductsDetailllLazy = lazy(() => import('./pages/shop/ProductsDetail'));
const LoginllLazy = lazy(() => import('./pages/login/Login'));
const RegisterllLazy = lazy(() => import('./pages/register/Register'));
const CheckOutllLazy = lazy(() => import('./pages/checkout/CheckOut'));
const CartsllLazy = lazy(() => import('./pages/carts/Carts'));
const ForgotPassllLazy = lazy(() =>
  import('./pages/forgotpassword/ForgotPass')
);
const ChangePassllLazy = lazy(() =>
  import('./pages/changepassword/ChangePass')
);
const MyCartsllLazy = lazy(() => import('./pages/orders/MyOders'));
// profile
const ProfilellLazy = lazy(() => import('./pages/profile/Profile'));

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<Loading />}>
              <HomeLazy />
            </Suspense>
          }
        >
          <Route
            path="/login"
            element={
              <Suspense fallback={<Loading />}>
                <LoginllLazy />
              </Suspense>
            }
          />

          <Route
            path="/register"
            element={
              <Suspense fallback={<Loading />}>
                <RegisterllLazy />
              </Suspense>
            }
          />
          <Route
            path="/forgotpass"
            element={
              <Suspense fallback={<Loading />}>
                <ForgotPassllLazy />
              </Suspense>
            }
          />

          <Route
            path="/changepass"
            element={
              <Suspense fallback={<Loading />}>
                <ChangePassllLazy />
              </Suspense>
            }
          />
          <Route
            path="/shop"
            element={
              <Suspense fallback={<Loading />}>
                <ShopllLazy />
              </Suspense>
            }
          />
          <Route
            path="/shop/page/:page"
            element={
              <Suspense fallback={<Loading />}>
                <ShopllLazy />
              </Suspense>
            }
          />
          <Route
            path="/shop/:idProduct"
            element={
              <Suspense fallback={<Loading />}>
                <ProductsDetailllLazy />
              </Suspense>
            }
          />
          <Route
            path="/shop/:category/:idcategory"
            element={
              <Suspense fallback={<Loading />}>
                <ShopllLazy />
              </Suspense>
            }
          />
          <Route
            path="/shop/:category/:idcategory/page/:pageCate"
            element={
              <Suspense fallback={<Loading />}>
                <ShopllLazy />
              </Suspense>
            }
          />
          <Route
            path="/shop/:category/:idcategory/:idProduct"
            element={
              <Suspense fallback={<Loading />}>
                <ProductsDetailllLazy />
              </Suspense>
            }
          />
          <Route
            path="/shop/:category/:idcategory/page/:pageCate/:idProduct"
            element={
              <Suspense fallback={<Loading />}>
                <ProductsDetailllLazy />
              </Suspense>
            }
          />
          <Route
            path="/check-out"
            element={
              <Suspense fallback={<Loading />}>
                <CheckOutllLazy />
              </Suspense>
            }
          />
          <Route path="/check-out/success" element={<CheckOutSuccess />} />
          <Route path="/check-out/loading" element={<CheckOutLoading />} />
          <Route
            path="/carts"
            element={
              <Suspense fallback={<Loading />}>
                <CartsllLazy />
              </Suspense>
            }
          />
          <Route
            path="/my-orders"
            element={
              <Suspense fallback={<Loading />}>
                <MyCartsllLazy />
              </Suspense>
            }
          />
          <Route
            path="/my-profile"
            element={
              <Suspense fallback={<Loading />}>
                <ProfilellLazy />
              </Suspense>
            }
          />
          <Route
            path="/posts"
            element={
              <Suspense fallback={<Loading />}>
                <PostsllLazy />
              </Suspense>
            }
          />
          <Route
            path="/posts/:idPost"
            element={
              <Suspense fallback={<Loading />}>
                <PostDetailLazy />
              </Suspense>
            }
          />
          <Route
            path="/contact"
            element={
              <Suspense fallback={<Loading />}>
                <ContactllLazy />
              </Suspense>
            }
          />
          <Route
            path="/"
            element={
              <Suspense fallback={<Loading />}>
                <HomeContentllLazy />
              </Suspense>
            }
          />
        </Route>
        <Route
          path="/admin"
          element={
            <Suspense fallback={<Loading />}>
              <AdminLazy />
            </Suspense>
          }
        >
          <Route
            path="list-products"
            element={
              <Suspense fallback={<Loading />}>
                <ListProductLazy />
              </Suspense>
            }
          />
          <Route
            path="dashboard"
            element={
              <Suspense fallback={<Loading />}>
                <DashBoardAdminLazy />
              </Suspense>
            }
          />
          <Route
            path="products"
            element={
              <Suspense fallback={<Loading />}>
                <ProductAdminLazy />
              </Suspense>
            }
          />
          <Route
            path="orders"
            element={
              <Suspense fallback={<Loading />}>
                <OrderAdminLazy />
              </Suspense>
            }
          />
          <Route
            path="account"
            element={
              <Suspense fallback={<Loading />}>
                <AccountAdminLazy />
              </Suspense>
            }
          />
          <Route
            path="sliders"
            element={
              <Suspense fallback={<Loading />}>
                <SlidersAdminLazy />
              </Suspense>
            }
          />
          <Route
            path="categories"
            element={
              <Suspense fallback={<Loading />}>
                <CategoriesAdminLazy />
              </Suspense>
            }
          />
          {/* adminpost */}
          <Route
            path="post"
            element={
              <Suspense fallback={<Loading />}>
                <PostAdminLazy />
              </Suspense>
            }
          />
          <Route
            path="posts"
            element={
              <Suspense fallback={<Loading />}>
                <ListPostAdminLazy />
              </Suspense>
            }
          />
        </Route>
        <Route
          path="/crawl"
          element={
            <Suspense fallback={<Loading />}>
              <CrawlLazy />
            </Suspense>
          }
        />

        <Route
          path="/crawl/products/:name"
          element={
            <Suspense fallback={<Loading />}>
              <CrawDetaillLazy />
            </Suspense>
          }
        />
        <Route path="/loading" element={<Loading />} />
        <Route path="*" element={<Nothing />} />
      </Routes>
    </>
  );
}

export default App;
