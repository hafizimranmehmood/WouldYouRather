import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class PageNotFound extends Component {

	render(){
		return(
			<div>
				<Link className="close-search" to="/">Home</Link>
				<h3>Page not found</h3>
			</div>
		)
	}
}

export default PageNotFound