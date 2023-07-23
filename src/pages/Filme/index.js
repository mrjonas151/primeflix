import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./filme.css"
import { toast } from "react-toastify";

function Filme(){
    //Como na route, está /filme/id, vamos usar o id aqui como arg
    const {id} = useParams();
    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect( () => {
        async function loadFilme(){
            await api.get(`/movie/${id}`, {
                params:{
                    api_key: "7d0b693249324c57a076401d872add36",
                    language: "pt-BR",
                }
            })
            .then( (response) => {
                setFilme(response.data);
                setLoading(false);
            })
            .catch( () => {
                console.log("Filme nao encontrado!");
                navigate("/", {replace: true});
                return;
            })
        }
        loadFilme();

        return () => {
            console.log("Componente desmontado!!!!!");
        }
    },[navigate, id])

    function salvarFilme(){
        const minhaLista = localStorage.getItem("@primeflix");

        let filmesSalvos = JSON.parse(minhaLista) || [];

        const hasFilme = filmesSalvos.some( (filmesSalvos) => filmesSalvos.id === filme.id);

        if(hasFilme){
            toast.warn("Este filme já está na lista!");
            return;
        }else{
            filmesSalvos.push(filme);
            localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
            toast.success("Filme salvo com sucesso!");
        }
    }

    if(loading){
        return(
            <div className="filme-info"> 
                <h1>Carregando conteúdo...</h1>
            </div>
            
        )
    }

    return(
        <div className="filme-info">
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original${filme.backdrop_path}`} alt={filme.title}/>
            <h3>Sinopse</h3>
            <span>{filme.overview}</span> <br/>
            <strong>Avaliação: {filme.vote_average.toFixed(1)}/10</strong>

            <div className="area-buttons">
                <button onClick={salvarFilme}>Salvar</button>
                <button><a target="blank" rel="external" href={`https://www.youtube.com/results?search_query=${filme.title} Trailer`}>
                    Trailer
                </a></button>
                
            </div>

        </div>

        
    );
}

export default Filme;