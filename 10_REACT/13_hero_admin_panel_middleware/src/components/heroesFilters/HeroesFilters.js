import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
// import {useHttp} from '../../hooks/http.hook';
// import {fetchFilters} from '../../actions/index';
import {fetchFilters, activeFilterChanged, selectAll} from './filtersSlice';
import store from "../../store";

import classNames from 'classnames';
import Spinner from '../spinner/Spinner';
// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {

    const {filtersLoadingStatus, activeFilter} = useSelector(state => state.filters);
    const filters = selectAll(store.getState())
    const dispatch = useDispatch();
    // const {request} = useHttp();

    useEffect(() => {
        dispatch(fetchFilters())
        // eslint-disable-next-line
    }, []);

    if (filtersLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (filtersLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const filterList = (arr) => {

        return arr.map(({name, label, className}) => {

            // Используем библиотеку classnames и формируем классы динамически
            const btnClass = classNames('btn', className, {
                'active': name === activeFilter
            });

            return <button
                key={name}
                id={name}
                className={btnClass}
                onClick={() => dispatch(activeFilterChanged(name))}
            >{label}</button>
        })
    }

    const elements = filterList(filters);

    return (<div className="card shadow-lg mt-4">
        <div className="card-body">
            <p className="card-text">Отфильтруйте героев по элементам</p>
            <div className="btn-group">
                {elements}
                {/* <button className="btn btn-outline-dark active">Все</button>
                    <button className="btn btn-danger">Огонь</button>
                    <button className="btn btn-primary">Вода</button>
                    <button className="btn btn-success">Ветер</button>
                    <button className="btn btn-secondary">Земля</button> */}
            </div>
        </div>
    </div>)
}

export default HeroesFilters;