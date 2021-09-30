import React, { FC } from 'react';
import styled from '@emotion/styled';
import Spinner from '../../static/svg/Spinner'; 
import { css } from '@emotion/react';
import { Botton } from '../typography';
import { 
  Colors, 
  ButtonProps,
  ButtonElementProps,
} from './types';
import { 
  colorObjectToColorString,
  fillStyleToColorString,
  isBackgroundNone
} from './utils';

enum Cursor {
  DISABLED = "not-allowed",
  LOADING = "progress",
  DEFAULT = "pointer"
};

enum PaddingVertical {
  lg = 16,
  md = 16,
  sm = 8
};

enum PaddingHorizontal {
  lg = 150,
  md = 68,
  sm = 16
};

enum BorderRadius {
  lg = 12,
  md = 12,
  sm = 4
}

const initialProps: ButtonProps = {
  fill: "default",
  size: "md",
  loading: false,
  disabled: false,
  background: true
};


export const ButtonElement = styled.button<ButtonElementProps>`
    display: flex;
    align-items: center;
    border: none;
    cursor: ${(props) => props.cursor};
    background: ${(props) => props.theme.colors[props.background]};
    padding: ${(props) => `${props.paddingVertical}px ${props.paddingHorizontal}px`};
    border-radius: ${(props) => props.borderRadius}px;
    border: 1px solid ${(props) => props.theme.colors[props.borderColor]};
    
    ${(props) => props.isFull && css`
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 0;
    `}

    ${(props) => props.fillStyle === "link" && css`
        &:hover, &:active {
            text-decoration: underline 1px solid ${props.theme.colors[props.color]};
        }
    `}

    &:hover, &:active {
        background: ${(props) => props.theme.colors[props.activeBackground]};
    }

    & .semicolon-button-typography {
        margin-left: ${(props) => props.marginLeft}px;
        margin-right: ${(props) => props.marginRight}px;
    }
`;

const Button: FC<ButtonProps> = (props = initialProps) => {
  const {
    children,
    onClick,
    disabled,
    className,
    fill,
    leftIcon,
    rightIcon,
    loading,
    size,
  } = props;

  const cursorType = disabled ? "DISABLED" : loading ? "LOADING" : "DEFAULT";
  const colorString = colorObjectToColorString(fill, true);
  const BackgroundColor = disabled ? 
    fillStyleToColorString(colorString, "diabled") : 
    fillStyleToColorString(colorString, "default");

  const BackgroundActiveColor = disabled ? 
    fillStyleToColorString(colorString, "diabled") : 
    fillStyleToColorString(colorString, "active");

  const FontColor = disabled ? 
    fillStyleToColorString(colorString, "disabledFont") :
    fillStyleToColorString(colorString, "font");

  const styledProps = {
    cursor: Cursor[cursorType],
    background: BackgroundColor,
    activeBackground: loading && isBackgroundNone(colorString) ? BackgroundColor : BackgroundActiveColor,
    paddingVertical: PaddingVertical[size || "md"],
    paddingHorizontal: PaddingHorizontal[size || "md"],
    borderRadius: BorderRadius[size || "md"],
    borderColor: colorString === "border" ? Colors["borderColor"] : BackgroundColor,
    size: size || "md",
    fillStyle: colorString || "default",
    color: FontColor,
    isFull: typeof fill !== "string" && fill?.full === true,
    marginLeft: leftIcon ? 6 : 0,
    marginRight: loading || rightIcon ? 6 : 0,
  };

  return (
    <ButtonElement
      {...disabled}
      {...className}
      {...onClick}
      {...styledProps}
    >
      { leftIcon }
      <Botton className="semicolon-button-typography" color={FontColor}>
        { children }
      </Botton>
      { loading && <Spinner fill={colorString} /> }
      { rightIcon }
    </ButtonElement>
  )
};

export default Button;