import { useEffect, useState } from 'react'
import { getBooks } from '../../services/booksServices';
import './home.scss';
import useFilter from '../../hooks/useFilter';

const Home = () => {
    const [books, setBooks] = useState([]);
    const {filters,booksFiltered,responseFilter,handleFilter} = useFilter();
    // const [booksFiltered, setBooksFiltered] = useState([]);
    const [categories, setCategories] = useState([]);
    // const [responseFilter, setResponseFilter] = useState('');
    const [pages, setPages] = useState({
        min: 0,
        max: 1000,
        step: 10
    });
    // const [filters, setFilters] = useState({});

    useEffect(() => {
        getBooks().then((response) => {
            setBooks(response);
            console.log(response);
            const categoriesList = getCategories(response);
            setCategories(categoriesList);
            const numPages = getPages(response);
            setPages({
                ...pages,
                ...numPages
            });

        })
    }, []);

    //Funcion que permite extraer las categorias de los libros
    const getCategories = (booklists) => {
        const categoryList = booklists.map((item) => item.book.genre);
        const categoryItems = new Set(categoryList);
        return [...categoryItems];
    }

    //Funcion que permite extraer la cantidad de paginas de los libros
    const getPages = (booklists) => {
        const pagesList = booklists.map((item) => item.book.pages);

        return {
            min: Math.floor(Math.min(...pagesList) / 1000) * 1000,
            max: Math.ceil(Math.max(...pagesList) / 1000) * 1000
        }

    }

    const onFilter = (event) => handleFilter(event,books);

    // //funcion que nos permite extraer los valores de los filtros
    // const onFilter = (event) => {
    //     const { name, value } = event.target;
    //     const filtersParams = {
    //         ...filters,
    //         [name]: value
    //     }
    //     console.log({
    //         ...filters,
    //         [name]: value
    //     });
    //     setFilters(filtersParams);

    //     if (value) {
    //         let filtered = [...books];
    //         for (const key in filtersParams) {
    //             if(filtersParams[key]){
    //                 const filteredResult = key ==='pages' ? filtered.filter(item=> item.book[key] <= filtersParams[key]) : filtered.filter(item => item.book[key] == filtersParams[key])
    //                 filtered = [...filteredResult];
    //             }
    //         }
    //         console.log(filtered);
    //         setBooksFiltered(filtered);
    //         setResponseFilter(()=>filtered.length?'': 'No se encontraron resultados')
    //     }else {
    //             setBooksFiltered([]);
    //             setResponseFilter('Filtros limpiados')
    //         }

    // }

return (
    <main>
        <section className='filtersContainer'>
            <div>
                <label >Fíltrar Por Págínas</label>
                <input type="range" min={pages.min} max={pages.max} step={pages.step} onChange={onFilter} name='pages' value={filters.pages} />
            </div>
            <div>
                <label >Fíltrar Por Genero</label>
                <select name='genre' onChange={onFilter} value={filters.genre}>
                    <option value={''} >Todas</option>
                    {
                        categories.length ? categories.map((item, index) => <option key={index} value={item}>{item}</option>) : <option value={''}>Cargando</option>
                    }
                </select>
            </div>
        </section>
        {
                responseFilter && <h2>{responseFilter}</h2>
        }
        <section className='cardsContainer'>
            {
                booksFiltered.length? booksFiltered.map((item, index) => <figure key={index}>
                      <img src={item.book.cover} alt={item.book.title} />
                    </figure>):
                books.length  ? books.map((item, index) =><figure key={index}>
                      <img src={item.book.cover} alt={item.book.title} />
                    </figure>):<div>...Cargando</div>
            }
        </section>
    </main>
)
}

export default Home
