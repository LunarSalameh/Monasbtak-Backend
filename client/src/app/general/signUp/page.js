'use client';
import React, { useState } from 'react';
import Navbar from '../../components/navbar/page';
import Footer from '../../components/footer/page';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignUp() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [retypePassword, setRetypePassword] = useState('');
    const [phonenumber, setPhonenumber] = useState('');
    const [gender , setGender] = useState('');
    const [message, setMessage] = useState('');
    const [isTransitioning, setIsTransitioning] = useState(false);
    
    const [showPassword, setShowPassword] = useState(false);
    
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username || !password || !retypePassword || !phonenumber || !gender) {
            setMessage('All fields are required');
            return;
        }

        if (password !== retypePassword) {
            setMessage('Passwords do not match');
            return;
        }

        const data = {
            username,
            pwd: password,
            phonenumber,
            gender,
        };

        

        try {
            const response = await fetch('http://localhost/FullProject/php/api/auth/register.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            if (result.success) {
                localStorage.setItem('message', 'User registered successfully');
                setIsTransitioning(true);
                setTimeout(() => {
                    router.push('/general/signIn');
                }, 1000); // Delay for transition
            } else {
                setMessage('Error: ' + (result.error || 'Something went wrong.'));
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('Error: ' + error.message);
        }
    };

    return (
        <>
        <Navbar />
        <div className={`p-8 pb-20 transition-opacity duration-1000 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
            <div className=" w-[80%] mx-auto my-20 bg-white grid grid-cols-1 lg:grid-cols-2 rounded-2xl shadow-xl shadow-gray-500">
                <div className="flex flex-col gap-2 w-full px-8 py-10 md:p-8 justify-center ">
                    <div className="text-center">
                        <img src="/Monasbtak-EN-logo.png" className=" w-full"/>
                        <div className="text-lg my-2">All Your Planners In ONE PLACE!</div>
                    </div>
                    <>
                        {message && (
                            <div className=" text-red-600 border-red-600 border-solid border-2 rounded-md  bg-red-100 py-2 mx-4 text-center p-0 m-0">
                                {message}
                            </div>
                        )}
                        </>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col">
                            <label htmlFor="name" className="my-3 font-bold">Username</label>
                            <input 
                              type="text" 
                              id="name" 
                              placeholder="Enter your Name" 
                              className="px-5 py-2 rounded-full bg-white border-[#4c1b41] border-2"
                              value={username}
                              onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col relative">
                            <label htmlFor="password" className="my-2 font-bold">Password</label>
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

                            <div className="flex flex-col relative">
                            <label htmlFor="Re-typePassword" className="my-2 font-bold">Re-type Password</label>
                            <div className="relative">
                                <input 
                                type={showPassword ? "text" : "password"} 
                                id="Re-typePassword" 
                                placeholder="Re-type Password" 
                                className="px-5 py-2 pr-12 rounded-full bg-white border-[#4c1b41] border-2 w-full"
                                value={retypePassword}
                                onChange={(e) => setRetypePassword(e.target.value)}
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

                        <div className="flex flex-col">
                            <label htmlFor="PhoneNumber" className="my-2 font-bold">Phone Number</label>
                            <input 
                              type="text" 
                              id="PhoneNumber" 
                              placeholder="Phone Number" 
                              className="px-5 py-2 rounded-full bg-white border-[#4c1b41] border-2"
                              value={phonenumber}
                              onChange={(e) => setPhonenumber(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col gap-2 mt-4">
                            <div className="font-bold">Gender:</div>
                            <div className="flex items-center gap-4">
                                <label className="flex items-center gap-2">
                                    <input 
                                        type="radio" 
                                        name="gender" 
                                        value="Male" 
                                        className="text-[#4c1b41]" 
                                        checked={gender === 'Male'}
                                        onChange={(e) => setGender(e.target.value)}
                                    /> Male
                                </label>
                                <label className="flex items-center gap-2">
                                    <input 
                                        type="radio" 
                                        name="gender" 
                                        value="Female" 
                                        className="text-[#4c1b41]" 
                                        checked={gender === 'Female'}
                                        onChange={(e) => setGender(e.target.value)}
                                    /> Female
                                </label>
                            </div>
                        </div>

                        {/* <div className="flex flex-col gap-2 mt-4">
                            <div className="font-bold">Account Type:</div>

                            <div className="flex items-center gap-4">
                                <label className="flex items-center gap-2">
                                    <input type="radio" name="userType" value="Customer" className="text-[#4c1b41]"/> Customer</label>

                                <label className="flex items-center gap-2">
                                    <input type="radio" name="userType" value="Other" className="text-[#4c1b41]"/> Other (planner, venue, or vendor)</label>
                            </div>
                        </div> */}

                        <div className="flex flex-col items-center gap-4">
                            <button type="submit" className="bg-[#4C1B41] px-10 py-3 mt-4 rounded-full text-center text-white w-full">Sign Up</button>
                            <div className="font-bold mt-2 flex flex-col items-center gap-3">
                               <span> Already Have an Account? </span>
                                <Link href="/general/signIn" className="text-[#4C1B41]">Sign In</Link></div>
                        </div>
                    </form>
                </div>

                <div className="hidden lg:block justify-center items-center p-8  relative ">
                        <img src='/Event1.jpg' alt="Monasbtak Logo" className="absolute inset-0  w-full  h-full object-cover rounded-r-2xl"/>
                </div>
            </div>
        </div>
        <Footer />
        </>
    );
}