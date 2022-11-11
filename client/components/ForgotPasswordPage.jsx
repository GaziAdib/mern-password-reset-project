import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';

const ForgotPasswordPage = () => {

    const { id, token } = useParams();

    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(false);
    const [data2, setData] = useState(false);

    const navigate = useNavigate();


    // function to verify user with id and token
    const userValid = async () => {

        const res = await fetch(`http://localhost:5000/api/users/forgotpassword/${id}/${token}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await res.json();

        if (data.status == 201) {
            console.log('user is valid');
            setPassword('');
            setMessage(true);
        } else {
            navigate('*');
            console.log('Token expired!')
        }
    }

    useEffect(() => {

        userValid();

        setTimeout(() => {
            setData(true)
        }, 3000)

    }, [])



    // send submit with new password (POST to backend)
    const handleSubmit = async (e) => {
        e.preventDefault();
        // send post request with user given new pasword
        if (password === '') {
            console.log('Enter password')
        } else {
            const res = await fetch(`http://localhost:5000/api/users/changepassword/${id}/${token}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ password: password })
            });

            const data = await res.json()

            console.log('data', data);

            if (data.status == 201) {
                setPassword("")
                setMessage(true)
            } else {
                alert('! Token Expired generate new LInk')
            }

        }
    }



    return (
        <>
            {data2 ? (<div className="grid place-items-center h-screen bg-[#F9FAFB">
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
                                Change Password Page
                            </h2>
                        </div>

                        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                            {message ? <p style={{ color: "green", fontWeight: "bold" }}>Password Updated!</p> : ""}
                            <div className="rounded-md shadow-sm -space-y-px">
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="sr-only"
                                    >
                                        New Password
                                    </label>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="pasword"
                                        required
                                        className="mb-5 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                                        placeholder="Enter New Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <button
                                        // disabled={isLoading}
                                        type="submit"
                                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                                    >
                                        Send
                                    </button>
                                </div>

                            </div>

                        </form>
                    </div>
                </div>
            </div>) : ('Loading')}

        </>
    )
}

export default ForgotPasswordPage