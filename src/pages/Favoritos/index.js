import './favoritos.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function Favoritos(){
    
    const [filmes, setFilmes] = useState([]);

    useEffect( () => {
        const minhaLista = localStorage.getItem("@primeflix");
        setFilmes(JSON.parse(minhaLista) || []);
    }, [])


    function removerFilme(id){
        let filtroFilmes = filmes.filter(filme => {
            return (filme.id !== id)
        });
        setFilmes(filtroFilmes);
        localStorage.setItem("@primeflix", JSON.stringify(filtroFilmes));
        toast.success("Filme removido dos favoritos!");
    }

    return(
        <div className='meus-filmes'>
            <h1>Meus favoritos</h1>

            {filmes.length === 0 && <span>Você não tem filmes salvos 🙁 </span>}
            <ul>
                {filmes.map( (filme) => {
                    return(
                        <li key={filme.id}>
                            <span>{filme.title}</span>
                            <div>
                                <Link to={`/filme/${filme.id}`}>Ver detalhes</Link>
                                <button onClick={() => removerFilme(filme.id)}>Excluir</button>

                            </div>
                        </li> 
                    );
                })}
                
            </ul>
        </div>
        
    );
}

export default Favoritos;