import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

export default class PokemonList extends React.Component{

    constructor(props){
      super(props);
    }

    componentDidMount(){
      if(this.refs.pokemonlistRef){
        this.state={pokemonList: {},fetching: false};
      }
      this.getAllPokemon();
    }

    getAllPokemon(){
      this.updateFetching();
      axios.get("https://pokeapi.co/api/v1/pokedex/")
      .then((response)=>{
        let pokemonlist = response.data.objects[0].pokemon;
        this.updatePokemonList(pokemonlist);
      })
      .catch((err)=>{
        console.log(err);
      })
    }

    updateFetching(){
      this.setState(...this.state, {fetching : true})
    }

    updatePokemonList(pokemonList){
      this.setState(...this.state, {pokemonList: pokemonList, fetching: false});
    }

    getFormatedList(pokelist){
      var format = pokelist.map( (a) => {
        return( <li key={a.name} id={a.resource_uri}> {a.name} </li>)});
      return format
    }

    render(){
      var pokelist_format="loading";
      if(this.state && !this.state.fetching){
        pokelist_format = this.getFormatedList(this.state.pokemonList);
      }
      return (<div ref = "pokemonlistRef"> <ul>{pokelist_format} </ul></div>);
    }
}

module.exports = PokemonList
