import React from 'react';
import style from './style.less'
import axios from 'axios'
import {Select, Input, Spin, Button} from 'antd';

const Option = Select.Option;
const Search = Input.Search;

export default class Showcase extends React.Component {

    constructor() {
        super();
        this.state = {
            coursesList: [],
            baseCoursesList: [],
            filterArr: [],
            loading: false,
            paymentMethod: 'rub'
        }
        this.filterTable = this.filterTable.bind(this)
    }

    componentDidMount() {
        this.setState({
            loading: true,
        });

        axios.post('http://api.qa.imumk.ru/api/mobilev1/update', {
            'data': ''
        })
            .then((response) => {
                this.setState({
                    loading: false,
                    coursesList: response.data.items,
                    baseCoursesList: response.data.items,
                });
            })
            .catch((error) => {
                console.log(error);
                this.setState({
                    loading: false,
                });
            });
    }

    filterTable = (string) => {
        const new_arr = [];
        //string - только для поиска чере search
        if (string) {
            string = string.toLowerCase()
            this.state.coursesList.map((item, i) => {
                if (item.title.toLowerCase().includes(string) || item.genre.toLowerCase().includes(string) || item.grade.toLowerCase().includes(string)) {
                    new_arr.push(item)
                }
            });
            this.setState({
                coursesList: new_arr,
            });
            return false
        }
        // если фильтрация инициализированна не через поиск:
        let arr = this.state.filterArr;
        // првоеряем на удовлетворения условиям фильтров
        function isAllOk (item) {
            let res = true;
            for (let i = 0; i < arr.length; i ++) {
                if (item[arr[i].name].includes(arr[i].value)) {
                    res = true
                } else {
                    res = false;
                    return false
                }
            }
            return res
        }

        this.state.baseCoursesList.map((item, i) => {
            // если условия фильтров выполены то записиыываем обьект
            if (isAllOk(item)) {
                new_arr.push(item)
            }
        });

        this.setState({
            coursesList: new_arr,
        });
    };

    handleChange(string, value) {
        //обновляем список фильтров
        function isThisEl(element, index, array) {
            return element.name === string
        }

        const new_arr = this.state.filterArr.slice();
        if (value !== 'all') {
            if (new_arr.findIndex(isThisEl) !== -1) {
                new_arr.splice(new_arr.findIndex(isThisEl), 1, {name: string, value: value})
            } else {
                new_arr.push({name: string, value: value})
            }
        } else {
            new_arr.splice(new_arr.findIndex(isThisEl), 1)
        }

        // запускаем фильтрацию
        this.setState({
            filterArr: new_arr,
        }, () => {
            this.filterTable()
        });
    }

    _search (val) {
        // для поиска отдельно запускается фильтрация с аргументом строкой поиска
        this.filterTable(val)
    }
    searchChange (e) {
        e.target.value === '' ? this.filterTable('') : null
    }

    render() {
        const {loading, coursesList} = this.state;

        return (
            <div className={'showcase-p'}>
                <h1 className="u-text-center">Курсы</h1>

                <div className="showcase__filter">
                    <Select defaultValue="all" onChange={this.handleChange.bind(this, 'title')}>
                        <Option value={"all"}>Все предметы</Option>
                        <Option value={'Алгебра'}>Алгебра</Option>
                        <Option value={'Английский '}>Английский язык</Option>
                        <Option value={'Биология'}>Биология</Option>
                        <Option value={'География'}>География</Option>
                        <Option value={'Геометрия'}>Геометрия</Option>
                        <Option value={'Демо'}>Демо-версия</Option>
                        <Option value={'Естествознание'}>Естествознание</Option>
                        <Option value={'Информатика'}>Информатика</Option>
                        <Option value={'История'}>История</Option>
                        <Option value={'Математика'}>Математика</Option>
                        <Option value={'Обществознание'}>Обществознание</Option>
                        <Option value={'Окружающий '}>Окружающий мир</Option>
                        <Option value={'Русский '}>Русский язык</Option>
                        <Option value={'Физика'}>Физика</Option>
                        <Option value={'Химия'}>Химия</Option>
                    </Select>
                    <Select defaultValue="all" onChange={this.handleChange.bind(this, 'genre')}>
                        <Option value="all">Все жанры</Option>
                        <Option value="Медиа-коллекция">Медиа-коллекция</Option>
                        <Option value="Рабочая тетрадь">Рабочая тетрадь</Option>
                        <Option value="Тренажер ВПР-2017">Тренажер ВПР-2017</Option>
                        <Option value="Тренажер ЕГЭ-2016">Тренажер ЕГЭ-2016</Option>
                        <Option value="Тренажер ЕГЭ-2018">Тренажер ЕГЭ-2018</Option>
                    </Select>
                    <Select defaultValue="all" onChange={this.handleChange.bind(this, 'grade')}>
                        <Option value="all">Все классы</Option>
                        <Option value={'1'}>1</Option>
                        <Option value={'2'}>2</Option>
                        <Option value={'3'}>3</Option>
                        <Option value={'4'}>4</Option>
                        <Option value={'5'}>5</Option>
                        <Option value={'6'}>6</Option>
                        <Option value={'7'}>7</Option>
                        <Option value={'8'}>8</Option>
                        <Option value={'9'}>9</Option>
                        <Option value={'10'}>10</Option>
                        <Option value={'11'}>11</Option>
                    </Select>
                    <Search
                        placeholder="Поиск"
                        style={{width: 200}}
                        onSearch={value => ::this._search(value)}
                        onChange={::this.searchChange}
                        className={'search'}
                    />
                </div>
                <div className="change-payment-method" style={{padding: '10px 0px 15px'}}>
                    <span style={{fontSize: '14px'}}>Изменить способ оплаты: </span>
                    <Button onClick={() => {
                        this.setState({
                            paymentMethod: this.state.paymentMethod === 'rub' ? 'bonus' : 'rub',
                        });
                    }}>
                        {this.state.paymentMethod === 'rub' ? 'Бонусы' : 'Рубли'}
                    </Button>
                </div>
                <div className="courses-list">
                    {loading ? <Spin size="large"/> : null}
                    {
                        coursesList && coursesList.map((item, i) => {

                            return (
                                <div className="courses-sci" key={i}>
                                    <div className="sci-figure">
                                        {
                                            !item.img ?
                                                <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRogidlVrfx2Q_qKWJIZ43w4RbD4YCaf6lBXG5LjnyrxxZ8Q4xw' alt=""/>
                                                :
                                                <img src={item.img} alt=""/>
                                        }
                                    </div>
                                    <div className="sci-info">
                                        <div className="sci-title">
                                            {item.title}
                                        </div>
                                        <div className="sci-grade">
                                            <span>{item.grade.replace(';', '-')} </span>
                                            <span>{item.grade < 10 ? 'класс' : 'классов'}</span>
                                        </div>
                                        <div className="sci-genre">
                                            {item.genre}
                                        </div>
                                        <div className="price">
                                            {
                                                this.state.paymentMethod === 'rub' ? item.price + ' р.' : item.price*1.2 + ' бонусов'
                                            }
                                        </div>
                                        <div className="sci-meta">
                                            <a href="#">Перейти к обучению</a>
                                        </div>
                                        <div className="sci-controls">
                                            <a href={item.shopUrl}>Подробнее</a>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        );
    }
}