import React from 'react';

import Header from '../components/header/index';
import Footer from '../components/footer/index';
import Showcase from './showcase';
import app from './app.less';

class App extends React.Component {

	shouldComponentUpdate(nextProps, nextState, nextContext) {
		if (nextProps.match !== this.props.match) {
			return false
		}
		return true
	}


	render () {
		return (
			<div className='app-inner'>
				<Header />
				<div className="page-container">
					<Showcase />
				</div>
				<Footer />
			</div>
		)
	}
}

export default App;