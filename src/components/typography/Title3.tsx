import React,{ FC } from "react";
import { BaseTypography, TypoProps } from "./BaseTypography";

export const Title3: FC<TypoProps> = (props) => { 
    const { children, ...restProps} = props;
    return(
        <BaseTypography md="Title3" {...restProps}>
            {children}
        </BaseTypography>
    )
}