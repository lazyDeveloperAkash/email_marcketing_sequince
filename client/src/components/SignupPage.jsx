import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/UserContext";
import Loader from "./Loader";

const SignUpPage = () => {
    const [formData, setFormData] = useState({ userName: "", email: "", password: "" });
    const [isFocused, setIsFocused] = useState({ userName: false, email: false, password: false });

    const navigate = useNavigate();
    const { signup, loading } = useAuth();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const res = await signup(formData);
        if (res) navigate("/dashboard");
        setFormData({ userName: "", email: "", password: "" })
    }

    return (
        <div className="h-screen bg-gradient-to-r from-[#a06bfa] to-[#3998c0] flex items-center justify-center">
            {loading && <Loader />}
            {/* Form Container */}
            <div className="bg-white w-[400px] p-8 rounded-lg shadow-lg">
                <h2 className="text-center text-2xl font-bold text-[#a06bfa] mb-6">Sign Up</h2>

                {/* userName Input */}
                <form onSubmit={submitHandler}>
                    <div className="relative mb-6">
                        <label
                            htmlFor="userName"
                            className={`absolute left-4 text-sm transition-all ${isFocused.userName || formData.userName
                                ? "text-[#a06bfa] -top-3 bg-white px-1"
                                : "text-gray-500 top-3"
                                }`}
                        >
                            userName
                        </label>
                        <input
                            type="text"
                            id="userName"
                            name="userName"
                            value={formData.userName}
                            onChange={handleChange}
                            onFocus={() => setIsFocused({ ...isFocused, userName: true })}
                            onBlur={() => setIsFocused({ ...isFocused, userName: formData.userName !== "" })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#a06bfa] focus:border-[#a06bfa]"
                        />
                    </div>

                    {/* Email Input */}
                    <div className="relative mb-6">
                        <label
                            htmlFor="email"
                            className={`absolute left-4 text-sm transition-all ${isFocused.email || formData.email
                                ? "text-[#a06bfa] -top-3 bg-white px-1"
                                : "text-gray-500 top-3"
                                }`}
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            onFocus={() => setIsFocused({ ...isFocused, email: true })}
                            onBlur={() => setIsFocused({ ...isFocused, email: formData.email !== "" })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#a06bfa] focus:border-[#a06bfa]"
                        />
                    </div>

                    {/* Password Input */}
                    <div className="relative mb-6">
                        <label
                            htmlFor="password"
                            className={`absolute left-4 text-sm transition-all ${isFocused.password || formData.password
                                ? "text-[#a06bfa] -top-3 bg-white px-1"
                                : "text-gray-500 top-3"
                                }`}
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            onFocus={() => setIsFocused({ ...isFocused, password: true })}
                            onBlur={() => setIsFocused({ ...isFocused, password: formData.password !== "" })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#a06bfa] focus:border-[#a06bfa]"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-[#a06bfa] text-white py-3 rounded-full hover:bg-[#9353f8] transition-all"
                    >
                        Sign Up
                    </button>
                    <div className="w-full mt-4 flex items-center justify-center">
                        <p>Have an Account? <button onClick={() => navigate("/signin")} className="text-blue-800">Signin</button></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUpPage;
