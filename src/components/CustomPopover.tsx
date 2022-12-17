import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { CustomButton } from './CustomButton';
import { IDocument } from './../types/document';
import { useCancelMutation } from '../store';
import { useState } from 'react';

interface IPropsType {
    selectedRowsData: IDocument[];
}

export const CustomPopover: React.FC<IPropsType> = React.memo(
    ({ selectedRowsData }) => {
        const [cancelProduct] = useCancelMutation();
        const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(
            null
        );

        // Обработчик отображения Popover при клике
        const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
            if (selectedRowsData.length) {
                setAnchorEl(event.currentTarget);
            }
        };

        // Обработчик скрытия Popover при клике
        const handleClose = () => {
            setAnchorEl(null);
        };

        // Посылаем массив ID на сервер
        const resetHandler = async () => {
            let selectedId = selectedRowsData.map((item) => {
                return item.id;
            });
            await cancelProduct({ id: selectedId })
                .unwrap()
                .catch((error) => console.error('rejected', error));
        };

        const open = Boolean(anchorEl);
        const id = open ? 'simple-popover' : undefined;

        const popoverStyle = {
            '.MuiPaper-root': {
                padding: '10px',
            },
        };

        return (
            <div style={{ marginTop: '10px' }}>
                <CustomButton
                    aria-describedby={id}
                    variant='contained'
                    onClick={handleClick}
                >
                    Аннулировать
                </CustomButton>
                <Popover
                    sx={popoverStyle}
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                >
                    <Typography sx={{ p: 2 }}>
                        Вы уверены что хотите аннулировать товар(ы):
                        {selectedRowsData.map((item, index) => (
                            <span key={item.id}>
                                {(index ? ', ' : '') + item.name}
                            </span>
                        ))}
                    </Typography>
                    <CustomButton
                        variant='contained'
                        style={{ backgroundColor: 'green' }}
                        onClick={resetHandler}
                    >
                        Применить
                    </CustomButton>
                    <CustomButton
                        variant='contained'
                        style={{ backgroundColor: 'red', marginLeft: '10px' }}
                        onClick={handleClose}
                    >
                        Отклонить
                    </CustomButton>
                </Popover>
            </div>
        );
    }
);
