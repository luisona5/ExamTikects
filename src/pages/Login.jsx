import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import useFetch from '../hooks/useFetch';
import { ToastContainer } from 'react-toastify';
import estudiantesLogin from '../assets/estudianteURL.avif';
import storeAuth from '../context/storeAuth';

const Login = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const { fetchDataBackend } = useFetch();
    const { setToken, setRol } = storeAuth()

    const loginUser = async (data) => {
        const url = data.password.includes("ESFOT")
            ? `${import.meta.env.VITE_BACKEND_URL}/empleado/login`
            : `${import.meta.env.VITE_BACKEND_URL}/login`
        const response = await fetchDataBackend(url, data,'POST', null)
        setToken(response.token)
        setRol(response.rol)
        if(response){
            navigate('/dashboard')
        }
    };

    return (
        <div
            className="relative min-h-screen w-full bg-cover bg-center flex items-center justify-center"
            style={{ backgroundImage: `url(${estudiantesLogin})` }}
        >
            {/* Capa negra con opacidad */}
            <div className="absolute inset-0 bg-black opacity-70 z-0"></div>

            {/* Contenido centrado */}
            <div className="relative z-10 bg-white bg-opacity-90 p-8 rounded-xl shadow-2xl w-full max-w-md">
                <ToastContainer />

                <h1 className="text-3xl font-semibold mb-2 text-center text-amber-900">
                    Bienvenido al sistema
                </h1>
                <small className="text-gray-400 block my-4 text-sm text-center">
                    Ingrese sus datos para el inicio de sesión
                </small>

                <form onSubmit={handleSubmit(loginUser)}>
                    {/* Correo electrónico */}
                    <div className="mb-3">
                        <label className="mb-2 block text-sm font-semibold">Correo electrónico</label>
                        <input
                            type="email"
                            placeholder="Ingrese su correo electrónico..."
                            className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-2 text-gray-500"
                            {...register("email", { required: "El correo es obligatorio" })}
                        />
                        {errors.email && <p className="text-red-800">{errors.email.message}</p>}
                    </div>

                    {/* Contraseña */}
                    <div className="mb-3 relative">
                        <label className="mb-2 block text-sm font-semibold">Contraseña</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Ingrese su contraseña..."
                                className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500 pr-10"
                                {...register("password", { required: "La contraseña es obligatoria" })}
                            />
                            {errors.password && <p className="text-red-800">{errors.password.message}</p>}
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute top-2 right-3 text-gray-500 hover:text-gray-700"
                            >
                                {showPassword ? (
                                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A9.956 9.956 0 0112 19c-4.418 0-8.165-2.928-9.53-7a10.005 10.005 0 0119.06 0 9.956 9.956 0 01-1.845 3.35M9.9 14.32a3 3 0 114.2-4.2m.5 3.5l3.8 3.8m-3.8-3.8L5.5 5.5" />
                                    </svg>
                                ) : (
                                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm-9.95 0a9.96 9.96 0 0119.9 0m-19.9 0a9.96 9.96 0 0119.9 0M3 3l18 18" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Botón de iniciar sesión */}
                    <div className="my-4">
                        <button className="py-2 w-full block text-center bg-red-900 text-white border rounded-xl 
                            hover:scale-105 duration-300 hover:bg-gray-900">
                            Iniciar sesión
                        </button>
                    </div>
                </form>

                
                {/* Olvidaste tu contraseña */}
                <div className="mt-5 text-xs border-b-2 py-4">
                    <Link to="/forgot/id" className="text-sm text-black hover:text-gray-900">¿Olvidaste tu contraseña?</Link>
                </div>

                {/* Enlaces adicionales */}
                <div className="mt-3 text-sm flex justify-between items-center">
                    <Link to="/" className="underline text-sm text-black hover:text-gray-900">Regresar</Link>
                    <Link to="/register" className="py-2 px-5 bg-red-900 text-white border rounded-xl hover:scale-110 duration-300 hover:bg-gray-200 hover:text-white">Registrarse</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
