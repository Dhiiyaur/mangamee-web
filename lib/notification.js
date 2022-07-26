import toast from 'react-hot-toast';

export const LinkNotification = () => toast.success('Link copied', {
    position: "bottom-center",
    style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
    },
})