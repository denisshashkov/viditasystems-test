import React, { useEffect, useState } from 'react';
import { Table } from './Table';
import { IDocument } from './../types/document';
import { useGetDocuments1Query, useGetDocuments2Query } from '../store';

export const TableContainer = () => {
    //Берем данные с локального сервера и передаем пропсами в таблицу
    const { data: documents1 } = useGetDocuments1Query('');
    const { data: documents2 } = useGetDocuments2Query('');
    const [dataArray, setDataArray] = useState<IDocument[]>([]);

    useEffect(() => {
        if (documents1 && documents2) {
            const arr = documents1.concat(documents2); // объединяем данные с обоих ендпоинтов в один массив
            if (arr instanceof Array) {
                const sortArr: IDocument[] = arr.sort(
                    (a, b) =>
                        a.delivery_date
                            .split('.')
                            .reverse()
                            .join()
                            .localeCompare(
                                b.delivery_date.split('.').reverse().join()
                            ) // сортируем по дате доставки
                );
                setDataArray(sortArr); // закидываем сортированный массив в state
            }
        }
    }, [documents1, documents2]);

    return (
        <React.Fragment>
            <Table dataArray={dataArray} />
        </React.Fragment>
    );
};
