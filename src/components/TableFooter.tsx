import { Typography } from '@mui/material';
import { GridFooterContainer } from '@mui/x-data-grid';
import React from 'react';

interface IPropsType {
    totalVolume: number;
    totalQty: number;
}

export const TableFooter: React.FC<IPropsType> = React.memo(
    ({ totalVolume, totalQty }) => {
        return (
            <GridFooterContainer
                style={{
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    padding: '10px',
                }}
            >
                <Typography variant='h6'>Общий объем: {totalVolume}</Typography>
                <Typography variant='h6'>
                    Общее количество: {totalQty}
                </Typography>
            </GridFooterContainer>
        );
    }
);
