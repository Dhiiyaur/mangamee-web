import { FiHeart } from 'react-icons/fi';
import { IconContext } from 'react-icons';
import { AiFillHeart } from 'react-icons/ai';

export default function Bookmark({ isBookmark }) {
    if (isBookmark)
        return (
            <div className='bg-gray-700 rounded-full p-1.5'>
                <span className='text-red-400 cursor-pointer'>
                    <IconContext.Provider value={{ size: 20 }}>
                        <AiFillHeart />
                    </IconContext.Provider>
                </span>
            </div>

        );

    return (
        <div className='bg-gray-700 rounded-full p-1.5'>
            <span className='text-red-400 cursor-pointer'>
                <IconContext.Provider value={{ size: 20 }}>
                    <FiHeart />
                </IconContext.Provider>
            </span>
        </div>
    );
}
