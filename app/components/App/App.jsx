import React from 'react';
import moment from 'moment';
import Page from '../Page/Page.jsx'
import SideBar from '../SideBar/SideBar.jsx'
import Domains from '../Domains/Domains.jsx'
import './App.css';
import $ from 'jquery';

var SortTypes = {
    ASC: 'ASC',
    DESC: 'DESC',
};

export default class App extends React.Component {

    state = {
        sortColumn: null,
        sortDir: SortTypes.ASC,
        expireDate: moment().add(1, 'day'),
        domains: []
    }

    render(){
        return (
            <div className="wrapper">
                <SideBar  />
                <Page title="domains" >
                    <Domains
                        onDateChange={this.onDateChange.bind(this)}
                        onSortChange={this.onSortChange.bind(this)}
                        sortColumn={this.state.sortColumn}
                        sortDir={this.state.sortDir}
                        expireDate={this.state.expireDate}
                        domains={this.state.domains}
                    />
                </Page>
            </div>
        )
    }

    onDateChange(date){

        $.getJSON('/afnic/' + date.format('YYYY-MM-DD'), function(json){
            this.setState({
                sortColumn: null,
                sortDir: SortTypes.ASC,
                expireDate: date,
                domains: json
            });
        }.bind(this));

        /*
        const domains = [];
        for (var i = 0; i < 1000; i++) {
            domains.push({
                name: "dom-" + i + ".fr",
                expire: date.format('YYYY-MM-DD'),
                created: moment().format('YYYY-MM-DD'),
                root_rd: Math.floor((Math.random() * 10) + 1),
                root_bl: Math.floor((Math.random() * 10) + 1),
                root_cf: Math.floor((Math.random() * 10) + 1),
                root_tf: Math.floor((Math.random() * 10) + 1),
                root_mj_check: moment().format('YYYY-MM-DD'),
                adwords_search_volume: Math.floor((Math.random() * 10000) + 1),
                adwords_cpc: Math.floor((Math.random() * 10) + 1),
                adwords_check: moment().format('YYYY-MM-DD')
            })
        }
        this.setState({
            sortColumn: null,
            sortDir: SortTypes.ASC,
            expireDate: date,
            domains: domains
        });
        */

    }

    onSortChange(column, dir){
        if(column === this.state.sortColumn && dir === this.state.sortDir){
            return;
        }

        const sortOrder = dir === SortTypes.DESC ? -1 : 1;
        const sortedDomains = this.state.domains.sort(function (a,b) {
            var result = (a[column] < b[column]) ? -1 : (a[column] > b[column]) ? 1 : 0;
            return result * sortOrder;
        });
        this.setState({
            sortColumn: column,
            sortDir: dir,
            expireDate: this.state.expireDate,
            domains: sortedDomains
        });
    }

}
