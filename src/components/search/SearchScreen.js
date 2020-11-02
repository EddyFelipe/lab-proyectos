import React, { useMemo } from 'react'
import queryString from 'query-string'
import { useForm } from '../../hook/useForm'
import { useLocation } from 'react-router-dom'
import { getHeoresByName } from '../../selectors/getHeroesByName'
import { HeroCard } from '../heroes/HeroCard'

export const SearchScreen = ({ history }) => {

    
    const location =  useLocation()
    
    const { q = '' } = queryString.parse( location.search )
    
    const [ formValues, handleInputChange ] = useForm({
        searchText:q
    })
    
    const { searchText } = formValues
    
    const heroresFiltered = useMemo(() =>  getHeoresByName(q), [q])

    const handleSubmit = (e)=>{
        e.preventDefault()

        history.push(`?q=${searchText}`)
    }

    return (
        <div>
            <h1>SearchScreen</h1>
            <hr/>

            <div className="row">
                <div className="col-5">
                    <h4>Search Form</h4>
                    <hr/>

                    <form onSubmit={ handleSubmit }>
                        <input
                            type="text"
                            placeholder="Find your hero"
                            className="form-control"
                            name='searchText'
                            onChange = { handleInputChange }
                            autoComplete="off"
                        />

                        <button
                            type="submit"
                            className="btn m-1 btn-block btn-outline-primary"
                        >
                            Search
                        </button>

                    </form>

                </div>

                <div className="col-7">
                    <h4> Resulst </h4>
                    <hr/>

                    {
                        ( q === '')
                            &&
                            <div className="alert alert-info">
                                Search a hero
                            </div>

                    }
                    {
                        ( q !== '' && heroresFiltered.length === 0)
                            &&
                            <div className="alert alert-danger">
                                There is no a hero with { q }
                            </div>
                    }

                    {
                        heroresFiltered.map( hero => (
                            <HeroCard 
                                key={ hero.id }
                                hero={ hero }
                            />
                        ))
                    }
                </div>

            </div>
        </div>
    )
}
