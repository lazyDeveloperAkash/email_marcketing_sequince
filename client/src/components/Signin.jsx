import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/UserContext";
import Loader from "./Loader";

const SignInPage = () => {
    const [formData, setFormData] = useState({ emailOruserName: "", password: "" });
    const [isFocused, setIsFocused] = useState({ username: false, email: false, password: false });

    const navigate = useNavigate();
    const { signin, loading } = useAuth();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const res = await signin(formData);
        if (res) navigate("/dashboard");
        setFormData({ emailOruserName: "", password: "" })
    }

    return (
        <div className="h-screen bg-gradient-to-r from-[#a06bfa] to-[#3998c0] flex items-center justify-center">
            {loading && <Loader />}
            {/* Form Container */}
            <div className="bg-white w-[400px] p-8 rounded-lg shadow-lg">
                <h2 className="text-center text-2xl font-bold text-[#a06bfa] mb-6">Sign In</h2>

                <form onSubmit={submitHandler}>
                    {/* Username Input */}
                    <div className="relative mb-6">
                        <label
                            htmlFor="emailOruserName"
                            className={`absolute left-4 text-sm transition-all ${isFocused.emailOruserName || formData.emailOruserName
                                ? "text-[#a06bfa] -top-3 bg-white px-1"
                                : "text-gray-500 top-3"
                                }`}
                        >
                            Username or Email
                        </label>
                        <input
                            type="text"
                            id="emailOruserName"
                            name="emailOruserName"
                            value={formData.emailOruserName}
                            onChange={handleChange}
                            onFocus={() => setIsFocused({ ...isFocused, emailOruserName: true })}
                            onBlur={() => setIsFocused({ ...isFocused, emailOruserName: formData.emailOruserName !== "" })}
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
                        Sign In
                    </button>
                    <div className="w-full mt-4 flex items-center justify-center">
                        <p>Dont have an Account? <button onClick={() => navigate("/signup")} className="text-blue-800">Signup</button></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignInPage;
