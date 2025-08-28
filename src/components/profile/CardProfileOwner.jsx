import storeProfile from "../../context/storeProfile"

export const CardProfileOwner = () => {

    const {user} = storeProfile()

    return (
        <div className="bg-white border border-slate-200 h-auto p-4 
                        flex flex-col items-center justify-between shadow-xl rounded-lg">

            <div>
                <img src="https://marketup.com/wp-content/themes/marketup/assets/icons/perfil-vazio.jpg" alt="img-client" className="m-auto " width={120} height={120} />
            </div>
            <div className="self-start">
                <b>Nombre del Docente:</b><p className="inline-block ml-3">{user.nombreDocente}</p>
            </div>
            <div className="self-start">
                <b>Cédula del Docente:</b><p className="inline-block ml-3">{user.cedulaDocente}</p>
            </div>
            <div className="self-start">
                <b>Email del Docente:</b><p className="inline-block ml-3">{user.emailDocente}</p>
            </div>
            <div className="self-start">
                <b>Email Alternativo:</b><p className="inline-block ml-3">{user.emailAlternativoDocente}</p>
            </div>
            <div className="self-start">
                <b>Celular del Docente:</b><p className="inline-block ml-3">{user.celularDocente}</p>
            </div>
            <div className="self-start">
                <b>Semestre Asignado:</b><p className="inline-block ml-3">{user.semestreAsignado}</p>
            </div>
            <div className="self-start">
                <b>Asignaturas:</b><p className="inline-block ml-3">{user.asignaturas}</p>
            </div>
        </div>
    )
}