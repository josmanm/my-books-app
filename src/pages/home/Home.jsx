import React, { useEffect, useState } from 'react'
import { getBooks } from '../../services/booksServices';
import './home.scss';

const Home = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        getBooks().then((response) => {
            setBooks(response);
            console.log(response);
        })
    }, []);
    return (
        <main>
            <section className='filtersContainer'>
                <div>
                    <label >Fíltrar Por Págínas</label>
                    <input type="range"  min='0' max='100' step='10'/>
                </div>
                <div>
                    <label >Fíltrar Por Genero</label>
                    <select name="" >
                        <option value={''} >Todas</option>
                    </select>
                </div>
            </section>
            <section className='cardsContainer'>
                {books.length > 0 ? books.map((item, index) => <figure key={index}><img src={item.book.cover} alt={item.book.title} /></figure>) : <p>.. Cargando</p>}
            </section>
        </main>
    )
}

export default Home
