'use client'
import request from '@/utils/request';
import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const UsuarioContext = createContext();

export const useUsuario = () => useContext(UsuarioContext);

export const UsuarioProvider = ({ children }) => {
    const [userId, setUserId] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [usuario, setUsuario] = useState(null);
    const [loadingUsuario, setLoadingUsuario] = useState(true);
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [closing, setClosing] = useState(false);

    const login = (id) => {
        if(id){
            setUserId(id);
            setIsAuthenticated(true);
        }
    }

    const editUsuario = (field, data) => {
        if(data){
            setUsuario({
                ...usuario,
                [field]: data
            });
        }
    }

    const logout = () => {
        setClosing(true);
        request('/auth', 'DELETE')
            .then(() => {
                setUserId(null);
                setIsAuthenticated(false);
                router.push('/auth');
            })
            .catch(() => {
                setUserId(null);
                setIsAuthenticated(false);
            })
            .finally(() => {
                setClosing(false);
            });
    }

    useEffect(() => {
        setLoading(true);
        request('/auth', 'GET')
            .then((res) => {
                if(res.error){
                    setIsAuthenticated(false);
                    return;
                }else{
                    const {data} = res;
                    if(!data.id){
                        setIsAuthenticated(false);
                        return;
                    }
                    setUserId(data.id);
                    setIsAuthenticated(true);
                }
            })
            .catch(() => {
                setIsAuthenticated(false);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        if(userId){
            setLoadingUsuario(true);
            request(`/usuarios/${userId}`, 'GET')
                .then((res) => {
                    if(res.error){
                        setUsuario(null);
                        return;
                    }else{
                        const {data} = res;
                        setUsuario(data);
                    }
                })
                .catch(() => {
                    setUsuario(null);
                })
                .finally(() => {
                    setLoadingUsuario(false);
                });
        }
    }, [userId]);

    return (
        <UsuarioContext.Provider value={{editUsuario, usuario, isAuthenticated, login, logout, loading, loadingUsuario }}>
            {
                closing ? <div className='h-[100dvh] flex justify-center gap-8 flex-col items-center'>
                    <div className='loader'></div>
                    <div className='text-center'>
                        <p className=''>Esperamos que vuelvas pronto</p>
                        <p className='text-secondary text-sm'>Cerrando sesión...</p>
                    </div>

                </div> : <>
                        {children}
                    </>
            }
        </UsuarioContext.Provider>
    );
}
