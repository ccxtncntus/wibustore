import { useEffect, useState, useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import * as AccountService from '../services/AccountService';
import { useCookies } from 'react-cookie';
import AdminNav from './admin/AdminNav';
import './admin/admincontent.css';
import './admin/adminnav.css';
import LoadingComponent from '../components/loading/Loading';
import { UContexts } from '../components/context/UserContext';
const Admin = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const [IsAdmin, setIsAdmin] = useState(false);
  const [Loading, setLoading] = useState(false);
  const { User, addUser } = useContext(UContexts);
  useEffect(() => {
    const adminCheck = async () => {
      if (User) {
        setLoading(true);
        User.role === 'admin' && setIsAdmin(true);
        setLoading(false);
      } else {
        setIsAdmin(false);
        if (Object.values(cookies.length > 0)) {
          setLoading(true);
          if (cookies.token) {
            const login = await AccountService.authen(cookies.token);
            if (login.status === 200) {
              addUser(login.data);
              login.data.role === 'user'
                ? console.log('is not admin')
                : setIsAdmin(true);
            }
          }
          setLoading(false);
        }
      }
    };
    adminCheck();
  }, [User, cookies]);
  return (
    <div className="container-fluit admin">
      {!Loading ? (
        IsAdmin ? (
          <div className="row">
            <div className="col-md-2">
              <div className="admin_nav">
                <AdminNav />
              </div>
            </div>
            <div className="col-md-10 admin_content">
              <Outlet />
            </div>
          </div>
        ) : (
          <div style={{ textAlign: 'center' }}>
            Bạn k đủ thẩm quyền <Link to={'/'}>về</Link>
          </div>
        )
      ) : (
        <LoadingComponent />
      )}
    </div>
  );
};

export default Admin;
