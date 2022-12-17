import React, { useState } from 'react';
import { DataGrid, GridColDef, GridSelectionModel } from '@mui/x-data-grid';
import { IDocument } from '../types/document';
import { TableFooter } from './TableFooter';
import { CustomPopover } from './CustomPopover';

interface IPropsType {
    dataArray: IDocument[];
}

export const Table: React.FC<IPropsType> = React.memo(({ dataArray }) => {
    const [selectedRows, setSelectedRows] = useState<IDocument[]>([]);
    // Получаем сумму всех volume
    const totalVolume = dataArray.reduce(
        (acc: number, currentValue: IDocument) => {
            return acc + currentValue.volume;
        },
        0
    );

    // Получаем сумму всех qty
    const totalQty = dataArray.reduce(
        (acc: number, currentValue: IDocument) => {
            return acc + currentValue.qty;
        },
        0
    );

    const columns: GridColDef[] = [
        { field: 'status', headerName: 'Status', width: 130 },
        { field: 'sum', headerName: 'Sum', width: 130 },
        { field: 'qty', headerName: 'Qty', width: 130 },
        { field: 'volume', headerName: 'Volume', width: 130 },
        { field: 'name', headerName: 'Name', width: 130 },
        { field: 'delivery_date', headerName: 'Delivery date', width: 130 },
        { field: 'currency', headerName: 'Currency', width: 130 },
        { field: 'total', headerName: 'Всего', width: 130 },
    ];

    const rows = dataArray.map((item: IDocument) => {
        return {
            id: item.id,
            status: item.status,
            sum: item.sum,
            qty: item.qty,
            volume: item.volume,
            name: item.name,
            delivery_date: item.delivery_date,
            currency: item.currency,
            total: `${item.sum * item.qty} ${item.currency}`,
        };
    });

    const CustomFooter = () => {
        return <TableFooter totalQty={totalQty} totalVolume={totalVolume} />;
    };

    // Берем выбранные данные и закидываем в state
    const onCheckBoxHandler = (ids: GridSelectionModel) => {
        const selectedIDs = new Set(ids);
        const selectedRowData = rows.filter((row: IDocument) =>
            selectedIDs.has(row.id.toString())
        );
        setSelectedRows(selectedRowData);
    };

    return (
        <div style={{ height: 500, width: '100%' }}>
            <DataGrid
                disableColumnSelector
                disableSelectionOnClick
                pageSize={6}
                rowsPerPageOptions={[5]}
                rows={rows}
                columns={columns}
                checkboxSelection
                hideFooterPagination
                components={{ Footer: CustomFooter }}
                onSelectionModelChange={(ids) => onCheckBoxHandler(ids)}
            />
            <CustomPopover selectedRowsData={selectedRows} />
        </div>
    );
});
