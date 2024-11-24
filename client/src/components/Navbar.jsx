// import { BiTask } from "react-icons/bi";
import { Link } from 'react-router-dom';
import { useAuth } from "../contexts/UserContext";

const Navbar = () => {
    const { user } = useAuth();
    return (
        <div className='flex items-center justify-between w-[70%] mx-auto py-6'>
            <Link to="/dashboard" >
                {user && <h1 className='text-2xl'>{`Hey, ${user?.userName}`}</h1>}
            </Link>
            {/* <Link to="/create">
                <button className='flex items-center gap-2 px-4 py-2 rounded-md bg-[#3998c0] text-white'>
                    <BiTask />
                    <p>Create Task</p>
                </button>
            </Link> */}
        </div>
    )
}

export default Navbar