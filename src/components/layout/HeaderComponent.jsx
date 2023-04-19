import navButton from "../../assets/nav-button.svg";
import logo from "../../assets/logo.svg";
import React, {useState} from "react";
import LoginModal from "../../modals/auth/LoginModal.jsx";
import avatar from '../../assets/avatar.png';
import settingIcon from '../../assets/settings.svg';
import {Link} from "react-router-dom";
import PreferencesModal from "../../modals/auth/PreferencesModal";

const HeaderComponent = () => {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isPreferencesModalOpen, setIsPreferencesModalOpen] = useState(false);
    const user = JSON.parse(localStorage.getItem('user'));

    const handleCloseLoginModal = () => setIsLoginModalOpen(false);
    const handleShowLoginModal = () => setIsLoginModalOpen(true);

    const handleClosePreferencesModal = () => setIsPreferencesModalOpen(false);
    const handleShowPreferencesModal = () => setIsPreferencesModalOpen(true);

    return (
        <section>
            <header>
                <div>
                    <img src={navButton} alt={'nav-button'}/> 
                </div>
                <div className={'header-logo'}>
                    <Link to={'/'}>
                        <img src={logo} style={{width: '400px'}} alt={'today news'}/>
                    </Link>
                </div>

                <div className={'header-signin'}>
                    {user ? (
                        <div className={'d-flex justify-content-center align-items-center'}>
                            <Link className={'fw-bold fs-3 text-dark text-decoration-none p-5'} to={'/news-feeds'}>
                                News Feed
                            </Link>
                            <img src={avatar} className={'rounded-circle shadow-4'}  style={{width: '50px'}}/>
                            <strong className={'fs-3 p-4'}>{user?.name}</strong>
                            <img src={settingIcon} style={{width: '50px'}} onClick={handleShowPreferencesModal}/>
                        </div>
                    ) : (<button className={'signin-button'} onClick={handleShowLoginModal}>
                        Sign In
                    </button>)}
                </div>
            </header>
            <LoginModal show={isLoginModalOpen} onClose={handleCloseLoginModal}/>
            <PreferencesModal show={isPreferencesModalOpen} onClose={handleClosePreferencesModal} />
        </section>
    );
}
export default HeaderComponent;