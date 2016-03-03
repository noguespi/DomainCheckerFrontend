import React from 'react';
import './Page.css'

export default class Page extends React.Component {

    render(){
        return (
            <div className="page-wrapper">
                <div className="container-fluid" >

                    <h1>{this.props.title}</h1>
                    <div className="row" >
                        <div className="col-lg-12" >
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}
