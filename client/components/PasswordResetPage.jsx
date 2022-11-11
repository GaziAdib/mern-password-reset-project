import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom';

const PasswordResetPage = () => {

    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('forgot password form submitted')
        if (email === '') {
            alert('email is required')
        } else {
            const res = await fetch("http://localhost:5000/api/users/sendpasswordlink", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email })
            })

            const data = await res.json();

            console.log('data', data);

            if (data.status == 201) {
                setEmail('');
                setMessage(true);
            } else {
                alert('Invalid User')
            }
        }

        // call our forget password api 

    }

    return (
        <div className="grid place-items-center h-screen bg-[#F9FAFB">
            <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <Link to="/">
                            <img
                                className="mx-auto h-12 w-auto"
                                src="https://cdn-icons-png.flaticon.com/512/6146/6146587.png"
                                alt="Learn with sumit"
                            />
                        </Link>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                            Forgot Password Page
                        </h2>
                    </div>
                    {message ? <p style={{ color: "green", fontWeight: "bold" }}>pasword reset link send Succsfully in Your Email</p> : ""}
                    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                        {/* <input type="hidden" name="remember" value="true" /> */}
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label
                                    htmlFor="email-address"
                                    className="sr-only"
                                >
                                    Enter You Email Address Please
                                </label>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="mb-5 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                                    placeholder="Email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div>
                                <button
                                    // disabled={isLoading}
                                    type="submit"
                                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                                >
                                    Send Link To Email
                                </button>
                            </div>

                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default ForgotPasswordPage