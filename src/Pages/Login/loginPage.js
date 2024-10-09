import React, { useState } from 'react';
import axios from 'axios';
import './style.css'

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     console.log({ username, password });

    //     try {
    //         const response = await axios.post('https://fm.skyhub.pk/api/v1/users/login', {
    //             username,
    //             password,
    //         });

    //         console.log('Login successful:', response.data);
    //     } catch (error) {
    //         console.error('Login failed:', error.response ? error.response.data : error.message);
    //     }
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await axios.post('https://fm.skyhub.pk/api/v1/users/login', {
                username,
                password,
            });
    
            const token = response.data.token; // Adjust based on the actual API response structure
            console.log('Login successful:', token);
    
            // Store the token in sessionStorage
            sessionStorage.setItem('authToken', token);
    
            // Redirect to the dashboard or any protected route after successful login
            window.location.href = '/Dashboard'; // Adjust the route based on your application
        } catch (error) {
            console.error('Login failed:', error.response ? error.response.data : error.message);
        }
    };    
    
    return (
        <div className="container">
            <div className="shadowGradient"></div>
            <div className="mainCont">
                <div className="otherDivLeft"></div>
                <div className="mainDiv">
                    <div className="leftDiv">
                        <form onSubmit={handleSubmit}>
                            <div className="Wel">Welcome!</div>
                            <div className="desc-div">
                                <div className="descMain">
                                    The Furniture Mecca admin panel provides a powerful dashboard that offers a comprehensive overview of your Site.
                                </div>
                                <div className="descOther"></div>
                            </div>

                            <div className="InputDivHolder">
                                <div className="InputDiv">
                                    <div className="InputMainDiv">
                                        <input
                                            id="username"
                                            type="text"
                                            name="u-name"
                                            required
                                            placeholder="username"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                        />
                                        <div className="IconCont">
                                            {/* Replace the SVG below with your username icon */}
                                            <svg
                                                className="icon"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                width="24"
                                                height="24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                            >
                                                <path d="M20.7739 18C21.5232 18 22.1192 17.5285 22.6543 16.8691C23.7498 15.5194 21.9512 14.4408 21.2652 13.9126C20.5679 13.3756 19.7893 13.0714 18.9999 13M17.9999 11C19.3806 11 20.4999 9.88071 20.4999 8.5C20.4999 7.11929 19.3806 6 17.9999 6" />
                                                <path d="M3.2259 18C2.47659 18 1.88061 17.5285 1.34548 16.8691C0.250028 15.5194 2.04861 14.4408 2.73458 13.9126C3.43191 13.3756 4.21052 13.0714 4.99994 13M5.49994 11C4.11923 11 2.99994 9.88071 2.99994 8.5C2.99994 7.11929 4.11923 6 5.49994 6" />
                                                <path d="M8.08368 15.1112C7.0619 15.743 4.38286 17.0331 6.01458 18.6474C6.81166 19.436 7.6994 20 8.8155 20H15.1843C16.3004 20 17.1881 19.436 17.9852 18.6474C19.6169 17.0331 16.9379 15.743 15.9161 15.1112C13.52 13.6296 10.4797 13.6296 8.08368 15.1112Z" />
                                                <path d="M15.4999 7.5C15.4999 9.433 13.9329 11 11.9999 11C10.0669 11 8.49988 9.433 8.49988 7.5C8.49988 5.567 10.0669 4 11.9999 4C13.9329 4 15.4999 5.567 15.4999 7.5Z" />
                                            </svg>

                                        </div>
                                    </div>
                                    <div className="InputOtherDiv"></div>
                                </div>

                                <div className="InputDiv">
                                    <div className="InputMainDiv">
                                        <input
                                            id="password"
                                            type="password"
                                            name="pass"
                                            required
                                            placeholder="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <div className="IconCont">
                                            {/* Replace the SVG below with your password icon */}
                                            <svg
                                                className="icon"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                width="24"
                                                height="24"
                                                fill="none"
                                            >
                                                <path
                                                    d="M12 16.5V14.5"
                                                    stroke="currentColor"
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                />
                                                <path
                                                    d="M4.26781 18.8447C4.49269 20.515 5.87613 21.8235 7.55966 21.9009C8.97627 21.966 10.4153 22 12 22C13.5847 22 15.0237 21.966 16.4403 21.9009C18.1239 21.8235 19.5073 20.515 19.7322 18.8447C19.879 17.7547 20 16.6376 20 15.5C20 14.3624 19.879 13.2453 19.7322 12.1553C19.5073 10.485 18.1239 9.17649 16.4403 9.09909C15.0237 9.03397 13.5847 9 12 9C10.4153 9 8.97627 9.03397 7.55966 9.09909C5.87613 9.17649 4.49269 10.485 4.26781 12.1553C4.12104 13.2453 4 14.3624 4 15.5C4 16.6376 4.12104 17.7547 4.26781 18.8447Z"
                                                    stroke="currentColor"
                                                    strokeWidth="1.5"
                                                />
                                                <path
                                                    d="M7.5 9V6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5V9"
                                                    stroke="currentColor"
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>

                                        </div>
                                    </div>
                                    <div className="InputOtherDiv"></div>
                                </div>
                            </div>

                            {/* <div className="inputCont">
                                <div className="radioDiv">
                                    <div className="radioDivMain">
                                        <div className="mainNewRadioDiv">
                                            <div className="onhover">
                                                <div className="divider">
                                                    <div className="iconofdivider">
                                                        <svg
                                                            className="iconofdividerno1"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 24 24"
                                                            width="24"
                                                            height="24"
                                                            color="#000000"
                                                            fill="none"
                                                        >
                                                        </svg>
                                                    </div>
                                                    <div className="text">
                                                        <label>
                                                            <input
                                                                type="checkbox"
                                                                checked={rememberMe}
                                                                onChange={() => setRememberMe(!rememberMe)}
                                                            />
                                                            Remember me
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="radioDivOther"></div>
                                </div>
                            </div> */}

                            <div className="LoginDivMain">
                                <div className="LoginMain">
                                    <button type="submit" className="Loginbtn">Login</button>
                                </div>
                                <div className="LoginOther"></div>
                            </div>

                            <div className="forSignMainDiv">
                                <div className="forSignMain">
                                    <div className="forSignMainLeft">
                                        <span className="spanof-forg-signleft">
                                            <a className="newUser" target="_blank" href="">
                                                New User? Sign Up
                                            </a>
                                        </span>
                                    </div>
                                    <div className="forSignMainRight">
                                        <span className="spanof-forg-signright">
                                            <a className="forgot" target="_blank" href="">
                                                Forgot Password
                                            </a>
                                        </span>
                                    </div>
                                </div>
                                <div className="forSignOther"></div>
                            </div>
                        </form>
                    </div>

                    <div className="rightDiv">
                        <div className="LogoDiv">
                            <img className="logo" src="https://i.imghippo.com/files/P3rtT1727770053.png" alt="Logo" />
                        </div>
                    </div>
                </div>
                <div className="otherDivRight"></div>
            </div>
        </div>
    );
};

export default LoginForm;
