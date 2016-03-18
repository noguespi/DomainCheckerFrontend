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

    randString(len){
        var text = "";
        var possible = "abcdefghijklmnopqrstuvwxyz0123456789";

        for( var i=0; i < len; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }

    onDateChange(date){

        if(process.env.NODE_ENV === "dev"){
            const domains = [];
            for (var i = 0; i < 1000; i++) {
                var domainName = this.randString(Math.floor((Math.random() * 20) + 1)) + i + ".fr";
                domains.push({
                    name: domainName,
                    expiration: date.format('YYYY-MM-DD'),
                    created: moment().format('YYYY-MM-DD'),
                    majesticRdRefDomains: Math.floor((Math.random() * 10) + 1),
                    majesticRdExtBackLinks: Math.floor((Math.random() * 10) + 1),
                    majesticRdCitationFlow: Math.floor((Math.random() * 10) + 1),
                    majesticRdTrustFlow: Math.floor((Math.random() * 10) + 1),
                    majesticRdLastCheck: moment().format('YYYY-MM-DD'),
                    adwordsSearchVolume: Math.floor((Math.random() * 10000) + 1),
                    adwordsCpc: Math.floor((Math.random() * 10) + 1),
                    adwordsLastCheck: moment().format('YYYY-MM-DD')
                })
            }
            domains.forEach(function(elt){
                elt.nameLen = elt.name.length - 3;
            });
            this.setState({
                sortColumn: null,
                sortDir: SortTypes.ASC,
                expireDate: date,
                domains: domains
            });
        } else {
            $.getJSON('/afnic/' + date.format('YYYY-MM-DD'), function(json){
                json.forEach(function(elt){
                    elt.nameLen = elt.name.length - 3;
                });
                this.setState({
                    sortColumn: null,
                    sortDir: SortTypes.ASC,
                    expireDate: date,
                    domains: json
                });
            }.bind(this));
        }
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
