import { createContext, useState, useContext, useEffect } from 'react'
import { useRouter } from 'next/router'


const AuthContext = createContext({})

const AuthProvider = ({ children }) => {

    const [currentPath, setCurrentPath] = useState()
    let router = useRouter()

    useEffect(() => {
        const getCurrentPath = () => {
            setCurrentPath(router.asPath)
        }

        getCurrentPath()
    }, [])

    return (
        <AuthContext.Provider
            value={{
                currentPath,
            }}>

            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => useContext(AuthContext);
export { AuthProvider, useAuth };
