'use client';
import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Admin/signinNavbar/page';
import { useRouter } from 'next/navigation';

export default function AdminSignIn() {
    const [message, setMessage] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);


    useEffect(() => {
        const storedMessage = localStorage.getItem('message');
        if (storedMessage) {
            setMessage(storedMessage);
            localStorage.removeItem('message');
            setTimeout(() => {
                setMessage('');
            }, 3000); // Hide message after 3 seconds
        }
    }, []);

    const handleSignIn = (e) => {
        e.preventDefault();

        const credentials = {
            username,
            pwd: password,
        };

        fetch('http://localhost/Monasbtak-Backend/php/api/admin/login.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text().then((text) => text ? JSON.parse(text) : {}); // Check for empty response
        })
        .then((data) => {
            if (data.success) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));

                localStorage.setItem('message', `Welcome, ${data.user.username}!`);

                setTimeout(() => {
                    router.push(`/admin/dashboard?id=${data.user.id}`); // Redirect to the admin dashboard
                }, 0);
            } else {
                setMessage(data.message);
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            setMessage('Failed to sign in.');
        });
    };

    return (
        <>
            <Navbar/>
            <div className="m-10  h-fit bg-white rounded-xl shadow-md ">
                <div className=" grid grid-cols-[0.5fr,1fr] max-md:grid-cols-1 justify-center ">
                    <div className='max-md:hidden'>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            id="visual"
                            viewBox="0 0 540 540"
                            width="540"
                            height="540"
                            version="1.1"
                            className='rounded-xl w-[124%]'

                            
                            >
                            <g transform="translate(0, 0) scale(0.8)">
                                <path
                                d="M639.8 -300C734.1 -206.2 649.8 60.2 513.4 240.7C377 421.3 188.5 516.2 14.7 507.7C-159.1 499.2 -318.1 387.3 -416.3 228.8C-514.4 70.3 -551.7 -134.8 -472.1 -220.1C-392.6 -305.4 -196.3 -270.8 38.2 -292.9C272.8 -315 545.6 -393.8 639.8 -300"
                                fill="#d9b34d"
                                />
                            </g>
                            <g transform="translate(100, 660) scale(0.4) rotate(185)">
                                <path
                                d="M639.8 -300C734.1 -206.2 649.8 60.2 513.4 240.7C377 421.3 188.5 516.2 14.7 507.7C-159.1 499.2 -318.1 387.3 -416.3 228.8C-514.4 70.3 -551.7 -134.8 -472.1 -220.1C-392.6 -305.4 -196.3 -270.8 38.2 -292.9C272.8 -315 545.6 -393.8 639.8 -300"
                                fill="#d9b34d"
                                />
                            </g>
                        </svg>
 
                    </div>
                    
                    <div className="flex flex-col justify-center">
                        <>
                        {message && (
                            <div className=" text-red-600 border-red-600 border-solid border-2 rounded-md  bg-red-100 py-2 mx-4 text-center p-0 m-0">
                                {message}
                            </div>
                        )}
                        </>
                        
                        <form onSubmit={handleSignIn} className="flex flex-col gap-5 justify-evenly   my-16 px-16 w-full h-full">
                            <div className='flex flex-col'>
                                <label htmlFor="userName" className="my-3 font-bold text-xl">Username</label>
                                <input 
                                type="text" 
                                id="userName" 
                                placeholder="Enter Username" 
                                className="px-5 py-2 rounded-full bg-white border-[#4c1b41] border-2"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                />
                            </div   >
                            <div className="flex flex-col relative">
                                <label htmlFor="password" className="my-2 font-bold text-xl">Password</label>
                                <div className="relative">
                                    <input 
                                    type={showPassword ? "text" : "password"} 
                                    id="password" 
                                    placeholder="Enter Password" 
                                    className="px-5 py-2 pr-12 rounded-full bg-white border-[#4c1b41] border-2 w-full"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <button
                                    type="button"
                                    aria-label={showPassword ? "Password Visible" : "Password Invisible."}
                                    className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-400"
                                    onClick={() => {
                                        setShowPassword((prev) => !prev);
                                    }}
                                    >
                                    {showPassword ? (
                                        <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="w-6 h-6"
                                        >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                                        ></path>
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                        ></path>
                                        </svg>
                                    ) : (
                                        <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="w-6 h-6"
                                        >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                                        ></path>
                                        </svg>
                                    )}
                                    </button>
                                </div>
                            </div>

                            <div className="flex flex-col items-center gap-4 ">
                                <button type="submit" className="bg-[#d9b34d] px-10 py-3 mt-4 rounded-full text-center text-white w-full">Sign In</button>
                            </div>
                        </form>
                        
                    </div>
                </div>
        </div>
    </>
    );
}
