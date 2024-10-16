import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
        <div>
            <div className="navbar bg-neutral text-neutral-content">
                <Link to={`/`}><button className="btn btn-ghost text-xl">Queue management</button></Link>

            </div>
        </div>
    )
}
