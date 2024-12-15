'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../../components/navbar/page';
import Footer from '../../components/footer/page';
import { useRouter } from 'next/navigation';

export default function SignIn() {
    const [message, setMessage] = useState('');
    const [usernameOrPhone, setUsernameOrPhone] = useState(''); // Updated variable name
    const [password, setPassword] = useState('');
    const router = useRouter();

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
            usernameOrPhone,
            pwd: password,
        };
        console.log('Sending credentials:', credentials);

        fetch('http://monasbtak.org/php/api/auth/login.php', {
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
                return response.json();
            })
            .then((data) => {
                if (data.success) {
                    // Store the JWT token
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('user', JSON.stringify(data.user));
    
                    // Display success message and redirect
                    localStorage.setItem('message', `Welcome, ${data.user.username}!`);
    
                    if (data.user.accountType === 'planner') {
                        router.push(`/planners/home?id=${data.user.id}`);
                    } else if (data.user.accountType === 'customer') {
                        router.push(`/customers/landingPage?id=${data.user.id}`);
                    }
                } else {
                    setMessage(data.message || 'Invalid credentials.');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                setMessage('Failed to sign in. Please try again later.');
            });
    };

    return (
        <>
            <Navbar />
            <div className="p-8 pb-20">
                {message && (
                    <div className={`fixed top-4 right-4 p-4 rounded ${message.includes('Welcome') ? 'bg-green-500' : 'bg-red-500'} text-white`}>
                        {message}
                    </div>
                )}
                <div className="p-10">
                    <div className="w-[80%] m-auto bg-white grid grid-cols-1 lg:grid-cols-2 rounded-2xl shadow-xl shadow-gray-500">
                        <div className="hidden lg:block justify-center items-center p-8 relative">
                            <img
                                src="/Event1.jpg"
                                alt="Monasbtak Logo"
                                className="absolute inset-0 w-full h-full object-cover rounded-l-2xl"
                            />
                        </div>
                        <div className="flex flex-col gap-6 w-full px-8 py-10 md:p-8 justify-center">
                            <div className="text-center">
                                <img src="/Monasbtak-EN-logo.png" className="w-full" alt="Monasbtak Logo" />
                                <div className="text-lg my-2">All Your Planners In ONE PLACE!</div>
                            </div>

                            <form onSubmit={handleSignIn} className="flex flex-col">
                                <label htmlFor="usernameOrPhone" className="my-3 font-bold">
                                    Username/Phone Number
                                </label>
                                <input
                                    type="text"
                                    id="usernameOrPhone"
                                    placeholder="Enter username or phone number"
                                    className="px-5 py-2 rounded-full bg-white border-[#4c1b41] border-2"
                                    value={usernameOrPhone}
                                    onChange={(e) => setUsernameOrPhone(e.target.value)}
                                    required
                                />

                                <label htmlFor="password" className="my-2 font-bold">
                                    Enter Your Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="Enter Password"
                                    className="px-5 py-2 rounded-full bg-white border-[#4c1b41] border-2"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />

                                <div className="flex flex-col items-center gap-4">
                                    <button
                                        type="submit"
                                        className="bg-[#4C1B41] px-10 py-3 mt-4 rounded-full text-center text-white w-full"
                                    >
                                        Sign In
                                    </button>
                                    <div className="font-bold mt-2 flex flex-col items-center gap-3">
                                        <span> Don't Have an Account? </span>
                                        <Link href="/general/signUp" className="text-[#4C1B41]">
                                            Sign Up
                                        </Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}