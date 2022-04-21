import { FiHeart } from 'react-icons/fi';
import { IconContext } from 'react-icons';
import { AiFillHeart } from 'react-icons/ai';

export default function Bookmark({ isBookmark }) {
    if (isBookmark)
        return (
            <span className='text-red-300 cursor-pointer'>
                <IconContext.Provider value={{ size: 28 }}>
                    <AiFillHeart />
                </IconContext.Provider>
            </span>
        );

    return (
        <span className='text-red-300 cursor-pointer'>
            <IconContext.Provider value={{ size: 28 }}>
                <FiHeart />
            </IconContext.Provider>
        </span>
    );
}
