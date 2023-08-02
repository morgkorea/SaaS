// @flow
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import classNames from 'classnames';
import { useSelector } from 'react-redux';

type ProfileMenuItem = {
    label: string,
    icon: string,
    redirectTo: string,
};

type ProfileDropdownProps = {
    menuItems: Array<ProfileMenuItem>,
    profilePic?: any,
    username: string,
    userTitle?: string,
};

type ProfileDropdownState = {
    dropdownOpen?: boolean,
};

const ProfileDropdown = (props: ProfileDropdownProps, state: ProfileDropdownState): React$Element<any> => {
    const profilePic = props.profilePic || null;
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const { username, role } = useSelector((state) => ({
        username: state.Auth.user?.username || '',
        role: state.Auth.user?.role || '',
    }));

    /*
     * toggle profile-dropdown
     */
    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <Dropdown show={dropdownOpen} onToggle={toggleDropdown}>
            <Dropdown.Toggle
                variant="link"
                id="dropdown-profile"
                as={Link}
                to="#"
                onClick={toggleDropdown}
                className="nav-link dropdown-toggle nav-user arrow-none me-0 d-flex align-items-center"
            >
                <span className="account-user-avatar">
                    <img src={profilePic} className="rounded-circle" alt="user" />
                </span>
                
                <p className="account-user-name mb-0">{username} 님</p>
            </Dropdown.Toggle>
            
            <Dropdown.Menu align={'end'} className="dropdown-menu-animated topbar-dropdown-menu profile-dropdown">
                <div onClick={toggleDropdown}>
                    <div className="dropdown-header noti-title">
                        <h6 className="text-overflow m-0">Welcome !</h6>
                    </div>
                    {props.menuItems.map((item, i) => {
                        return (
                            <Link to={item.redirectTo} className="dropdown-item notify-item" key={i + '-profile-menu'}>
                                <i className={classNames(item.icon, 'me-1')}></i>
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </div>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default ProfileDropdown;
