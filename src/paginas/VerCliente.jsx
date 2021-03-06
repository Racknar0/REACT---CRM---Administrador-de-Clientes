import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';

const VerCliente = () => {
    const { id } = useParams();
    const [cliente, setCliente] = useState({});
    const [cargando, setCargando] = useState(false);

    useEffect(() => {
        setCargando(!cargando);

        const obtenerCLienteApi = async () => {
            try {
                const url = `${import.meta.env.VITE_API_URL}/${id}`;
                const respuesta = await fetch(url);
                const resultado = await respuesta.json();
                console.log(resultado);
                setCliente(resultado);
            } catch (error) {
                console.log(error);
            }

            setTimeout(() => {
                setCargando(false);
            }, 1000);
        };

        obtenerCLienteApi();
    }, []);

    //console.log(cargando);

    return (
        <div>
            {cargando ? (
                <div>
                    <Spinner></Spinner>
                </div>
            ) : Object.keys(cliente).length === 0 ? (
                <p>No se encontraron clientes</p>
            ) : (
                <>
                    <h1 className="font-black text-4xl text-blue-900 mt-10">
                        Ver Cliente {cliente.nombre}
                    </h1>
                    <p className="mt-3">Información del cliente</p>
                    <p className="text-2xl text-gray-600 mt-4">
                        <span className=" uppercase font-bold text-gray-800">
                            Cliente:{' '}
                        </span>
                        {cliente.nombre}
                    </p>
                    <p className="text-2xl text-gray-600 mt-4">
                        <span className=" uppercase font-bold text-gray-800">
                            Email:{' '}
                        </span>
                        {cliente.email}
                    </p>
                    {cliente.telefono && (
                        <p className="text-2xl text-gray-600 mt-4">
                            <span className=" uppercase font-bold text-gray-800">
                                Teléfono:{' '}
                            </span>
                            {cliente.telefono}
                        </p>
                    )}

                    {cliente.empresa && (
                        <p className="text-2xl text-gray-600 mt-4">
                            <span className=" uppercase font-bold text-gray-800">
                                Empresa:{' '}
                            </span>
                            {cliente.empresa}
                        </p>
                    )}

                    {cliente.notas && (
                        <p className="text-2xl text-gray-600 mt-4">
                            <span className=" uppercase font-bold text-gray-800">
                                Notas:{' '}
                            </span>
                            {cliente.notas}
                        </p>
                    )}
                </>
            )}
        </div>
    );
};

export default VerCliente;
