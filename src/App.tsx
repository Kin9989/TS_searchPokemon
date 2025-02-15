import React, { useEffect, useState } from 'react';

import './App.css';
import axios from 'axios';
import PokemonColection from './components/PokemonColection';
import {Pokemon,Detail} from './interface';
import SearchFilter from './components/SearchFilter';

interface Pokemons{
  name:string;
  url:string;
}





const App:React.FC = () => {

  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [nextUrl, setNextUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true)
  const [viewDetail, setDetail] = useState<Detail>({
    id:0,
    isOpen:false  
  })
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');



  useEffect(()=>{
    const getPokemon = async () => {
      const res = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=20&offset=20");
      setNextUrl(res.data.next);


      const fetchedPokemons: Pokemon[] = [];
    
      await Promise.all(
        res.data.results.map(async (pokemon: Pokemons) => {
          const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
          console.log(poke.data);
    
          // Kiểm tra ID trước khi thêm vào mảng
          if (!fetchedPokemons.some((p) => p.id === poke.data.id)) {
            fetchedPokemons.push({
              id: poke.data.id,
              name: poke.data.name,
              sprites: { front_default: poke.data.sprites.front_default },
              abilities: poke.data.abilities
            });
          }
        })
      );
    
      setPokemon(fetchedPokemons); // Chỉ cập nhật state 1 lần
      setLoading(false)
    };
    

getPokemon();
  },[])

  // const nextPage = async () => {
  //   const fetchedPokemons: Pokemon[] = [];
  //   let res = await axios.get(nextUrl);
  //   setNextUrl(res.data.next);
  //   res.data.results.forEach(async (pokemon: Pokemons) => {
  //     const poke = await axios.get(
  //       `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
  //     );
  //     setPokemon(fetchedPokemons);
      
  //   });
  // };

  const nextPage = async () => {
    setLoading(true);
    if (!nextUrl) return; // Kiểm tra nếu không có nextUrl thì không làm gì cả

    try {
      let res = await axios.get(nextUrl);
      setNextUrl(res.data.next); // Cập nhật URL tiếp theo
  
      const fetchedPokemons: Pokemon[] = await Promise.all(
        res.data.results.map(async (pokemon: Pokemons) => {
          const poke = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
          );
          return {
            id: poke.data.id,
            name: poke.data.name,
            sprites: { front_default: poke.data.sprites.front_default },
            abilities: poke.data.abilities
          };
        })
      );
  
      // Nối danh sách cũ với danh sách mới
      setPokemon((p) => [...p, ...fetchedPokemons]);
      setLoading(false);
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu:", error);
    }
  };
  

  const handleSearch = (value: string) => {
    setSearchTerm(value.toLowerCase());
  };

  const handleSort = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const filteredAndSortedPokemon = pokemon
    .filter((p) => p.name.toLowerCase().includes(searchTerm))
    .sort((a, b) => {
      const comparison = a.name.localeCompare(b.name);
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  return (
    <div className="App">
      <div className='container'>
        <header className='pokemon-header'>
          Pokemon
        </header>
        <SearchFilter 
          onSearch={handleSearch}
          onSort={handleSort}
          sortOrder={sortOrder}
        />
        <PokemonColection 
          pokemons={filteredAndSortedPokemon} 
          viewDetail={viewDetail} 
          setDetail={setDetail} 
        />
        {!viewDetail.isOpen && (
          <div className="btn">
            <button onClick={nextPage}>
              {loading ? "Loading..." : "Load more"}{" "}
            </button>
          </div>
        )}
        
      </div>
    </div>
  );
}

export default App;
