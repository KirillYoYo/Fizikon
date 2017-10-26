import React from 'react';
import styles from './style.less';
import { Button, Input, Icon } from 'antd';
const Search = Input.Search;

export default class Header extends React.Component {

	constructor() {
		super();
		this.state = {
			visible: false,
			searchText: null
		}
	}


	changeSearch (e) {
		console.log('changeSearch')
		this.setState({
			searchText: e.target.value,
		});

	};

	render () {
        return(
			<div className="header">
				<div className="page-container">

				</div>
			</div>
        );
	}
}
