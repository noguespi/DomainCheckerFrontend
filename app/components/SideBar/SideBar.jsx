import React from 'react';
import './SideBar.css'

export default class Page extends React.Component {

    render(){
        return (
            <ul className="sidebar-wrapper">
                <li>Menu #1</li>
                <li>Menu #2</li>
                <li>Menu #3</li>
                <li>Menu #4</li>
            </ul>
        )
    }

}
