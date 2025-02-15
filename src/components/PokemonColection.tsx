import React from 'react'
import PokemonList from './PokemonList';
import './pokemon.css'
import {Pokemon, PokemonDetail} from '../interface';
import {Detail} from '../interface';
interface Props{
  pokemons:PokemonDetail[];
  viewDetail:Detail;
  setDetail : React.Dispatch<React.SetStateAction<Detail>>;
}

const PokemonColection:React.FC<Props>= (props) => {
const {pokemons ,viewDetail ,setDetail} = props;
const selectPokemon =(id:number)=>{ 
  if (!viewDetail.isOpen) {
    setDetail({
      id: id,
      isOpen: true,
    });
  }
}

  return (
    <div >
      <section className={
          viewDetail.isOpen
            ? "collection-container-active"
            : "collection-container"
        }>
          {viewDetail.isOpen ? (
          <div className="overlay"></div>
        ) : (
          <div className=""></div>
        )}
      {pokemons.length === 0 ? (
  <p>Đang tải dữ liệu...</p>
) : (
  pokemons.map((pokemon) => (
    <div  className=''  onClick={()=>selectPokemon(pokemon.id)}>
     <PokemonList
                viewDetail={viewDetail}
                setDetail={setDetail}
                key={pokemon.id}
                name={pokemon.name}
                id={pokemon.id}
                abilities={pokemon.abilities}
                img={pokemon.sprites.front_default}
              />
    </div>
  ))
)}


      </section>
    </div>
  )
}

export default PokemonColection
