import toast from 'react-hot-toast';

export const SuccessNotification = (text) => toast.success(`${text}`, {
    position: "bottom-center",
    style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
    },
})