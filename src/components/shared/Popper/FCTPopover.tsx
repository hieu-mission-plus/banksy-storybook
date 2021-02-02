import React, { RefObject, useRef, useState } from 'react'
import { usePopper } from 'react-popper'
import styled from 'styled-components'
import { ClickAwayListener } from '@material-ui/core'

const PopoverContainer = styled(`div`)`
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  background-color: white;
  padding: 20px;
  text-align: center;

  .arrow {
    position: absolute;
    width: 10px;
    height: 10px;

    &:after {
      content: ' ';
      position: absolute;
      top: -25px;
      left: 0;
      transform: rotate(45deg);
      width: 10px;
      height: 10px;
      background-color: white;
      box-shadow: -1px -1px 1px rgba(0, 0, 0, 0.1);
    }
  }

  &[data-popper-placement^='top'] > .arrow {
    bottom: -30px;

    :after {
      box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);
    }
  }
`

const FCTPopover = (props: PopoverProps) => {
  const popperRef = useRef<HTMLDivElement>(null)
  const [arrowRef, setArrowRef] = useState<HTMLDivElement | null>(null)
  const { styles, attributes } = usePopper(props.targetRef.current, popperRef.current, {
    placement: 'top',
    modifiers: [
      {
        name: 'arrow',
        options: {
          element: arrowRef,
        },
      },
      {
        name: 'offset',
        options: {
          offset: [0, 10],
        },
      },
    ],
  })

  if (!props.isVisible) return null

  return (
    <ClickAwayListener onClickAway={props.handleClickAway}>
      <PopoverContainer ref={popperRef} style={styles.popper} {...attributes.popper}>
        <div ref={setArrowRef} style={styles.arrow} className={'arrow'} />
        {props.children}
      </PopoverContainer>
    </ClickAwayListener>
  )
}

export default FCTPopover

export type PopoverProps = {
  handleClickAway(): void,
  targetRef: RefObject<HTMLElement>
  isVisible: boolean
  children: React.ReactElement
}
