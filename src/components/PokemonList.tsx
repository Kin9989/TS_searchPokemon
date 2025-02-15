import React, { useState ,useEffect } from 'react'
import './pokemon.css'
import { Detail } from '../interface';
interface Props {
    abilities?: {
        ability: {
            name: string;
            url: string;
        };
        is_hidden: boolean;
        slot: number;
    }[];
    viewDetail:Detail;
    setDetail:React.Dispatch<React.SetStateAction<Detail>>;
    name: string;
    id: number;
    img: string;
}

const PokemonList:React.FC<Props> = (props) => {
  const [isSelected, setSelected] = useState(false);
  const { name, id, img, abilities, viewDetail, setDetail } = props;
    useEffect(() => {
      setSelected(id === viewDetail?.id);
    }, [viewDetail]);
  
    const closeDetail = () => {
      setDetail({
        id: 0,
        isOpen: false,
      });
    };
  return (
    <div className=''>
      {isSelected ? (
        <section className="pokemon-list-detailed">
          <div className="detail-container">
            <p className="detail-close" onClick={closeDetail}>
              X
            </p>
            <div className="detail-info">
              <img src={img} alt="pokemon" className="detail-img" />
              <p className="detail-name"> {name}</p>
            </div>
            <div className="detail-skill">
              <p className="detail-ability"> Ablities: </p>
              {abilities?.map((ab: any) => {
                return <div className=""> {ab.ability.name}</div>;
              })}
            </div>
          </div>
        </section>
      ) : (
        <section className="pokemon-list-container">
          <p className="pokemon-name"> {name} </p>
          <img src={img} alt="pokemon" />
        </section>
      )}
    </div>
  )
}

export default PokemonList
