export interface Pokemon{
    id:number;
    name:string;
    sprites:{
      front_default:string;
    }
    abilities?: {
      ability: {
        name: string;
        url: string;
      };
      is_hidden: boolean;
      slot: number;
    }[];
  } 

  export interface Detail {
    id: number; 
    isOpen: boolean;  
  }

  export interface PokemonDetail extends Pokemon {
    abilities?: {
      ability: {
        name: string;
        url: string;
      };
      is_hidden: boolean;
      slot: number;
    }[];
  } 