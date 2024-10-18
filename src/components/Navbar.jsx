import React from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthProvider';
import useFetchUserName from '../hooks/useFetchUserName';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase.config';
import useUserRole from '../hooks/useUserRole';

export default function Navbar() {
    const { currentUser } = useAuth();
    const userId = currentUser?.uid
    const navigate = useNavigate();
    const { userRole} = useUserRole();

    const { userName, loading, error } = useFetchUserName(userId);
 console.log(userName)
    const handleLogout = async () => {
        await signOut(auth);
        navigate("/");
    };


    return (
        <div>
            <div className="navbar bg-neutral text-neutral-content justify-between ">
                <Link to={`/`}><button className="btn btn-ghost text-xl">Queue management</button></Link>

                <div className='flex gap-4'>
                    {
                        currentUser ? (<div className='flex gap-4 items-center'>
                            <h1 className=' uppercase font-semibold'>{userName}</h1>
                            <div>
                                <button className="btn" onClick={handleLogout}>Logout</button>
                            </div>
                            {userRole != 'creator' ? <Link to={`/joined-queues/${currentUser.uid}`}>
                                <button className="btn">Show Queue Status</button>
                            </Link> : ""}
                            
                        </div>

                        ) : ""
                    }
                               
                </div>
            </div>
        </div>
    )
}
