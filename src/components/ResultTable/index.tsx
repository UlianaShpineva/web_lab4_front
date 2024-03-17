import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import React, {useContext, useState} from "react";
import './index.css';
import {DotsFormContext} from "../Inputs/Context";

export default function ResultTable(){
    const context = useContext(DotsFormContext);
    if (!context) return (<></>);

    return (
    <DataTable className="flex" tableClassName="resultTable" value={context.getDots}>
        <Column field="x" header="X"></Column>
        <Column field="y" header="Y"></Column>
        <Column field="r" header="R"></Column>
        <Column field="success" header="Hit/Miss"></Column>
        <Column field="curTime" header="Current Time" sortable></Column>
        <Column field="execTime" header="Execution Time, ms"></Column>
    </DataTable>
    );
}
