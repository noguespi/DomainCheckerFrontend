import React from 'react';
import {Table, Column, Cell} from 'fixed-data-table';
import DatePicker from 'react-datepicker';

import 'fixed-data-table/dist/fixed-data-table.css';
import 'react-datepicker/dist/react-datepicker.css';
import './Domains.css';

var SortTypes = {
    ASC: 'ASC',
    DESC: 'DESC',
};

function reverseSortDirection(sortDir) {
    return sortDir === SortTypes.DESC ? SortTypes.ASC : SortTypes.DESC;
}

export default class Domains extends React.Component {

    componentDidMount(){
        this.props.onDateChange(this.props.expireDate);
    }

    changeIframe(src){
        this.iframe.src = src;
    }

    tsvExport(){
        var exported = "domain\tlen\tcreated\trd\tbl\tcf\ttf\tsv\tcpc\n";
        this.props.domains.forEach(function(item, index){
            exported += item.name + "\t";
            exported += item.nameLen + "\t";
            exported += item.created.substr(0, 10) + "\t";

            exported += item.majesticRdRefDomains + "\t";
            exported += item.majesticRdExtBackLinks + "\t";
            exported += item.majesticRdCitationFlow + "\t";
            exported += item.majesticRdTrustFlow + "\t";

            exported += item.adwordsSearchVolume + "\t";
            exported += item.adwordsCpc + "\n";

        });
        document.location = "data:," + encodeURIComponent(exported);
    }

    render() {
        const tableWidth = window.innerWidth - 300;
        const tableHeight = (window.innerHeight - 100)/2;
        const domains = this.props.domains;

        return (
            <div>
                <DatePicker style={{color:'red', display: "inline"}}
                            placeholderText="Click to select a date"
                            selected={this.props.expireDate}
                            onChange={this.props.onDateChange}
                />&nbsp;
                <span>({domains != null ? domains.length : 0})</span>&nbsp;
                <button onClick={this.tsvExport.bind(this)}>TSV export</button>
                <Table
                    rowHeight={30}
                    rowsCount={domains.length}
                    width={tableWidth}
                    height={tableHeight}
                    headerHeight={30}>
                    <Column
                        columnKey="name"
                        header={<SortHeaderCell
                            sortColumn={this.props.sortColumn} sortDir={this.props.sortDir}
                            onSortChange={this.props.onSortChange} >Domain</SortHeaderCell>}
                        cell={<TextCell data={domains} />}
                        flexGrow={1}
                        width={100}
                    />
                    <Column
                        columnKey="name"
                        header={<Cell>Link</Cell>}
                        cell={<LinkCell changeIframe={this.changeIframe.bind(this)} data={domains} />}
                        width={50}
                    />
                    <Column
                        columnKey="nameLen"
                        header={<SortHeaderCell
                            sortColumn={this.props.sortColumn} sortDir={this.props.sortDir}
                            onSortChange={this.props.onSortChange}>Len</SortHeaderCell>}
                        cell={<TextCell data={domains} />}
                        width={50}
                    />
                    <Column
                        columnKey="created"
                        header={<SortHeaderCell
                            sortColumn={this.props.sortColumn} sortDir={this.props.sortDir}
                            onSortChange={this.props.onSortChange}>Created</SortHeaderCell>}
                        cell={<DateCell data={domains} />}
                        width={100}
                    />
                    <Column
                        columnKey="majesticRdRefDomains"
                        header={<SortHeaderCell
                            sortColumn={this.props.sortColumn} sortDir={this.props.sortDir}
                            onSortChange={this.props.onSortChange}>RD</SortHeaderCell>}
                        cell={<TextCell data={domains} />}
                        width={100}
                    />
                    <Column
                        columnKey="majesticRdExtBackLinks"
                        header={<SortHeaderCell
                            sortColumn={this.props.sortColumn} sortDir={this.props.sortDir}
                            onSortChange={this.props.onSortChange}>BL</SortHeaderCell>}
                        cell={<TextCell data={domains} />}
                        width={100}
                    />
                    <Column
                        columnKey="majesticRdCitationFlow"
                        header={<SortHeaderCell
                            sortColumn={this.props.sortColumn} sortDir={this.props.sortDir}
                            onSortChange={this.props.onSortChange}>CF</SortHeaderCell>}
                        cell={<TextCell data={domains} />}
                        width={100}
                    />
                    <Column
                        columnKey="majesticRdTrustFlow"
                        header={<SortHeaderCell
                            sortColumn={this.props.sortColumn} sortDir={this.props.sortDir}
                            onSortChange={this.props.onSortChange}>TF</SortHeaderCell>}
                        cell={<TextCell data={domains} />}
                        width={100}
                    />
                    <Column
                        columnKey="majesticRdLastCheck"
                        header={<SortHeaderCell
                            sortColumn={this.props.sortColumn} sortDir={this.props.sortDir}
                            onSortChange={this.props.onSortChange}>MJ</SortHeaderCell>}
                        cell={<DateCell data={domains} />}
                        width={100}
                    />
                    <Column
                        columnKey="adwordsSearchVolume"
                        header={<SortHeaderCell
                            sortColumn={this.props.sortColumn} sortDir={this.props.sortDir}
                            onSortChange={this.props.onSortChange}>SV</SortHeaderCell>}
                        cell={<TextCell data={domains} />}
                        width={100}
                    />
                    <Column
                        columnKey="adwordsCpc"
                        header={<SortHeaderCell
                            sortColumn={this.props.sortColumn} sortDir={this.props.sortDir}
                            onSortChange={this.props.onSortChange}>CPC</SortHeaderCell>}
                        cell={<TextCell data={domains} />}
                        width={100}
                    />
                    <Column
                        columnKey="adwordsLastCheck"
                        header={<SortHeaderCell
                            sortColumn={this.props.sortColumn} sortDir={this.props.sortDir}
                            onSortChange={this.props.onSortChange}>AW</SortHeaderCell>}
                        cell={<DateCell data={domains} />}
                        width={100}
                    />

                </Table>
                <iframe 
                    style={{width:"100%", height:(window.innerHeight - 100)/2}} 
                    ref={function(elt){
                        console.log("ref", this, elt);
                        this.iframe = elt;
                    }.bind(this)}
                    id="bottomFrame" 
                    rel="noreferrer" 
                ></iframe>
            </div>
        )
    }

}

class SortHeaderCell extends React.Component {



    constructor(props){
        super(props);
    }

    render() {
        var {sortDir, sortColumn, columnKey, children, ...props} = this.props;
        var sortDirIco = '';
        if(sortColumn === columnKey){
            sortDirIco = sortDir ? (sortDir === SortTypes.DESC ? '↓' : '↑') : '';
        }
        return (
            <Cell {...props}>
                <a style={{textDecoration:"none"}} href="#" onClick={this._onSortChange.bind(this)}>
                    {children} {sortDirIco}
                </a>
            </Cell>
        );
    }

    _onSortChange(e) {
        e.preventDefault();
        if (this.props.onSortChange) {
            var sortDir = SortTypes.DESC;
            if(this.props.sortColumn === this.props.columnKey){
                sortDir = reverseSortDirection(this.props.sortDir);
            }
            this.props.onSortChange(
                this.props.columnKey,
                sortDir
            );
        }
    }
}

class LinkCell extends React.Component {

    constructor(props){
        super(props);
    }

    onClick(e){
        e.preventDefault();
        console.log(this.props.changeIframe(e.currentTarget.getAttribute('href')));
        return false;
    }

    render() {
        const {rowIndex, columnKey, data, ...props} = this.props;
        const domain = data[rowIndex][columnKey];
        const webArchiveUrl = "https://web.archive.org/web/*/" + domain;
        const majesticUrl = "https://majestic.com/reports/site-explorer?q=" + domain + "&IndexDataSource=F#anchor-text-chart";
        return (
            <Cell {...props}>
                <a href="#" onClick={this.onClick.bind(this)} href={webArchiveUrl} ><img src="/images/archives.png" /></a>
                <a href="#" onClick={this.onClick.bind(this)} href={majesticUrl} ><img src="/images/majestic.png" /></a>
            </Cell>
        );
    }
}

class TextCell extends React.Component {
    render() {
        const {rowIndex, columnKey, data, ...props} = this.props;
        return (
            <Cell {...props}>
                {data[rowIndex][columnKey]}
            </Cell>
        );
    }
}

class DateCell extends React.Component {
    render() {
        const {rowIndex, columnKey, data, ...props} = this.props;
        const date = data[rowIndex][columnKey] != null ? data[rowIndex][columnKey].substring(0, 10) : null;
        return (
            <Cell {...props}>
                {date}
            </Cell>
        );
    }
}

