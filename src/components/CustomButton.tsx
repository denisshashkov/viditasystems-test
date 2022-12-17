import React from 'react';
import { Button as MUIButton, ButtonProps } from '@mui/material';

export const CustomButton = (props: ButtonProps) => {
    return <MUIButton {...props}></MUIButton>;
};
