import React from 'react'
import Link from 'next/link'

const header = () => {
  return (
    <header>
        <nav>
            <h1  className="text-3xl font-bold bg-black text-white text-left p-4">Nishilog</h1>
            <div>
                <ul>
                    {/*<li>
                        <Link href="#">About My Blog</Link>
                    </li>*/}
                </ul>
            </div>
        </nav>
    </header>
  )
}

export default header