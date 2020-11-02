import React, { useContext } from 'react'
import { AuthContext } from '../../auth/AuthContext'
import { types } from '../../types/types'

export const LoginScreen = ({ history }) => {

   const {dispatch} =  useContext( AuthContext )

    
    const handleLogin = () =>{
        
        // Permite regresar a la pantalla anterior
        // history.push('/')
        
        const lastPath = localStorage.getItem('lastPath') || '/'

        dispatch({
            type: types.login,
            payload: {
                name:'Labotorio'
            }
        })
        
        history.replace( lastPath )
    }
    

    return (
        <div className="container mt-5">
            <h1>Iniciar Sesión a DevOps</h1>
            <hr />

            <button
                className="btn btn-primary"
                onClick={ handleLogin }
            >
                Login
            </button>
        </div>
    )
}
