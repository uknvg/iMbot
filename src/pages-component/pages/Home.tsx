import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import '../design/Home.css'; // استيراد ملف CSS
import LogoutModal from '../funcs/logoutModal'; // استيراد المودال

const Home: React.FC = () => { 
    const [authCode, setAuthCode] = useState<string | null>(null);
    const [user, setUser] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false); // حالة لإظهار المودال
    const navigate = useNavigate();
    const location = useLocation();

    const handleAvatarClick  = () => {
      setShowDropdown(!showDropdown);
    };
  
    const handleLogoutClick = () => {
        setShowLogoutModal(true); // إظهار المودال عند النقر على تسجيل الخروج
    };

    const handleLogout = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
          const userData = JSON.parse(storedUser);
          
          if (userData.id === user.id) {
              localStorage.removeItem('user');
              setUser(null); 
              setAuthCode(null); 
          }
      }
      setShowLogoutModal(false); 
    };

    const handleCancel = () => {
      setShowLogoutModal(false); 
      handleAvatarClick();
    };

    const clientId = '1353686904356474991';
    const clientSecret = '1wk5b78RnaWbo--t52_f01pesnYpuFps';
    const redirectUri = 'http://localhost:3000/dashboard';

    const discordAuthUrl = `https://discord.com/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=identify`;

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    useEffect(() => {
        if (location.pathname === 'iMbot/dashboard') {
            const urlParams = new URLSearchParams(window.location.search);
            const code = urlParams.get('code');
            if (code) {
                setAuthCode(code);
            }
        }
    }, [location.pathname]);

    useEffect(() => {
        if (authCode) {
            const params = new URLSearchParams({
                client_id: clientId,
                client_secret: clientSecret,
                code: authCode,
                grant_type: 'authorization_code',
                redirect_uri: redirectUri,
            });

            axios
                .post('https://discord.com/api/oauth2/token', params.toString(), {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                })
                .then((response) => {
                    const { access_token } = response.data;

                    return axios.get('https://discord.com/api/v10/users/@me', {
                        headers: {
                            Authorization: `Bearer ${access_token}`,
                        },
                    });
                })
                .then((userResponse) => {
                    const userData = userResponse.data;
                    setUser(userData);
                    localStorage.setItem('user', JSON.stringify(userData));
                    navigate('/dashboard'); 
                })
                .catch((error) => {
                    console.error('خطأ في استبدال الكود أو استرجاع بيانات المستخدم:', error.response?.data);
                    setError('فشل في تسجيل الدخول. يرجى المحاولة مرة أخرى.');
                });
        }
    }, [authCode, navigate]);

    const renderContent = () => {
        if (user) {
            return (
                <div className="dashboard-page">
                    <div className="user">
                        <img
                            src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`}
                            alt="User Avatar"
                            onClick={handleAvatarClick} 
                            style={{ cursor: 'pointer' }}
                        />
                        {showDropdown && (
                            <div className="dropdown-menu">
                                <ul>
                                    <li onClick={handleLogoutClick} className='logout' style={{ color: 'rgb(151, 50, 50)', fontWeight: 'bold' }}>
                                        تسجيل الخروج <i className='bx bx-log-out'></i>
                                    </li>
                                    <li style={{ color: 'rgb(60, 88, 132)', fontWeight: 'bold', cursor: 'default', opacity: '0.7' }}>
                                        تغيير اللغة <i className='bx bxs-edit'></i>
                                    </li>
                                    <li className='gold' style={{ color: 'rgb(241, 241, 241)', fontWeight: 'bold' }}>
                                        العملات <i className='bx bx-bitcoin'></i>
                                    </li>
                                    <li style={{ color: 'rgb(64, 51, 129)', fontWeight: 'bold' }}>
                                        السيرفرات <i className='bx bx-server'></i>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            );
        } else {
            return (
                <div className="login">
                    <a className="lwd" href={discordAuthUrl}>
                        تسجيل الدخول
                    </a>
                </div>
            );
        }
    };

    return (
        <div className='container'>
            {/* عرض المودال إذا كانت showLogoutModal true */}
            <LogoutModal 
                showModal={showLogoutModal} 
                onConfirm={handleLogout} 
                onCancel={handleCancel} 
            />
            {renderContent()}
        </div>
    );
};

export default Home;
