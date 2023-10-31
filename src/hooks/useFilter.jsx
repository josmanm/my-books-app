import { useState } from "react";

const useFilter = (initalValue= {}) => {
    const [filters, setFilters] = useState(initalValue);
    const [booksFiltered, setBooksFiltered] = useState([]);
    const [categories, setCategories] = useState([]);
    const [responseFilter, setResponseFilter] = useState('');


    const handleFilter = (event,bookList,) =>{
        const { name, value } = event.target;
        const filtersParams = {
            ...filters,
            [name]: value
        }
       
        let filtered = [...bookList];
        for (const key in filtersParams) {
            if(filtersParams[key]){
                const filteredResult = !isNaN(filtersParams[key]) ? filtered.filter(item=> item.book[key] <= filtersParams[key]) : filtered.filter(item => item.book[key] == filtersParams[key])
                filtered = [...filteredResult];
            }
        }

        setFilters(filtersParams);
        setBooksFiltered(filtered);
        setResponseFilter(()=>filtered.length?'': 'No se encontraron resultados')
    }

    return {filters,booksFiltered,responseFilter,handleFilter}   
}

export default useFilter;