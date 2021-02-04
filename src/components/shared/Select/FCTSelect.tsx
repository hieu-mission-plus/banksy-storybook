import { Box, Checkbox, Portal, Theme, ClickAwayListener } from '@material-ui/core'
import React, { useState } from 'react'
import styled from 'styled-components'
import Chip from '@material-ui/core/Chip'
import theme from '../../../theme'
import Flex from '../Flex/Flex'
import { debounce } from 'lodash'
import withStyles, { CSSProperties } from '@material-ui/core/styles/withStyles'
import Icon from '../Icon/Icon'
import { useRect } from '../../../hooks/useRect'

export enum ChangeType {
  SELECT = 'SELECT',
  DESELECT = 'DESELECT',
}

const DropDownContainer = styled('div')`
  border-radius: 5px;
  position: relative;
  border: 1px solid #e7ecf3;
  background: #fff;
  box-sizing: border-box;
  min-height: 50px;

  &.open {
    border-bottom: 0;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }
  &.sizeSmall {
    min-height: 40px;
  }

  &.open,
  &:hover,
  &:focus {
    ${({ theme }: { theme: Theme }) => `
      border-color: ${theme.palette.primary.light};
  `}
  }
`

const DropDownLabel = styled('div')`
  background-color: #fff;
  position: absolute;
  top: 0;
  left: 5px;
  transform: translateY(-50%);
  padding: 0 5px;
`

const DropDownHeader = styled('div')`
  padding: 15px 10px 10px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;

  &.sizeSmall {
    padding: 10px 10px 6px;
  }
`
const DropDownListContainer = styled('div')`
  ${({ theme }: { theme: Theme }) => `
  padding: 0;
  background: #fff;
  border: 1px solid ${theme.palette.primary.light};
  border-top: 0;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
  &:hover: {  
    border-color: ${theme.palette.primary.light};
  }
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1001;
`}}
`

const DropDownList = styled('ul')`
  padding: 0;
  margin: 6px 0;
  max-height: 310px;
  overflow-y: auto;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    ${({ theme }: { theme: Theme }) => `
    background: ${theme.palette.primary.main};
    border-right: 5px white solid;
    `}
  }

  &::-webkit-scrollbar-track {
    ${({ theme }: { theme: Theme }) => `
    border-radius: 10px;
    box-shadow: inset 0 0 5px  ${theme.palette.grey[100]}; 
  `}
  }
`
const ListItem = styled('li')`
  list-style: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  &:hover {
    ${({ theme }: { theme: Theme }) => `
    background: ${theme.palette.grey[100]};`}
`

const DropDownListInput = styled('input').attrs(() => ({
  type: 'text',
  placeholder: 'search keyword',
}))`
  ${({ theme }: { theme: Theme }) => `
  padding-left: 8px;
  width: 100%;
  box-sizing: border-box;
  background: #f5f5f5;
  border: 0;
  outline: 0;
  &::placeholder {
    color: ${theme.palette.grey[400]};
  }
`}
`

const DropDownListInputContainer = styled('div')`
  padding: 10px;
  margin: 0 10px;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  border-radius: 3px;
`

export const ChipItem = withStyles({
  root: {
    borderRadius: '3px',
    zIndex: 1,
  },
  deleteIcon: {
    width: 10,
    height: 10,
  },
  deleteIconSmall: {
    width: 10,
    height: 10,
  },
})(Chip)

const DropDownSelectedList = ({
  list = [],
  onDelete,
  placeHolder = 'Select',
  format = (item: string, onDelete: () => void) => (
    <ChipItem label={item} size="small" onDelete={onDelete} />
  ),
  ...props
}: DropDownSelectedListProps) => (
  <Flex flexWrap="wrap" minHeight={24} margin={'-2px'}>
    {list?.length > 0 ? (
      list?.map((item, index) => (
        <Box key={`${item}-${index}`} lineHeight={'24px'} maxHeight={'24px'} margin={'0 1px 2px'}>
          {format(item, () => onDelete(item))}
        </Box>
      ))
    ) : (
      <Box lineHeight={'26px'}>{placeHolder}</Box>
    )}
  </Flex>
)

const FCTSelect = ({
  isSearchable = true,
  isDisabled,
  isMultiple,
  placeHolder = 'Select',
  values,
  setValues,
  options,
  onFilter,
  onChange,
  required,
  size = 'small',
  format,
  ...props
}: FCTSelectProps) => {
  // TODO: Implement Scroll Strategy

  const wrapperRef = React.useRef<HTMLDivElement>(null)
  const dropdownRef = React.useRef<HTMLDivElement>(null)

  const position = useRect(wrapperRef)

  const [isTouched, setIsTouched] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  // Keep state of search string
  const [searchValue, setSearchValue] = useState('')

  const toggling = () => setIsOpen(!isDisabled && !isOpen)

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget?.value?.trim()
    setSearchValue(value)
    debounce(onFilter, 400)(value)
  }

  const selectItem = (selectedList: string[], value: string) => {
    if (isDisabled) return
    setValues(isMultiple ? [...selectedList, value] : [value])
    onChange && onChange({ type: ChangeType.SELECT, value })
    !isMultiple && setIsOpen(false)
  }

  const deselectItem = (selectedList: string[], value: string) => {
    if (isDisabled) return
    setValues(selectedList.filter(item => item !== value))
    onChange && onChange({ type: ChangeType.DESELECT, value })
  }

  const toggleItem = (selectedList: string[], value: string) => {
    if (isDisabled) return
    if (isMultiple && selectedList.includes(value)) {
      deselectItem(selectedList, value)
    } else selectItem(selectedList, value)
  }

  const isError = (isTouched && required && values.length === 0) || props.isError ? true : false
  const containerStyle = {
    ...(isDisabled ? { opacity: 0.5, pointerEvents: 'none' } : {}),
    ...(isError ? { borderColor: theme.palette.error.main } : {}),
  } as CSSProperties

  return (
    <ClickAwayListener onClickAway={() => setIsOpen(false)}>
      <DropDownContainer
        ref={wrapperRef}
        style={containerStyle}
        onMouseUp={() => setIsTouched(true)}
        className={`${size === 'small' ? 'sizeSmall' : ''} ${isOpen ? 'open' : ''} `}
      >
        <DropDownLabel>
          {props.label}
          {required && ' *'}
        </DropDownLabel>
        <DropDownHeader onClick={toggling} className={`${size === 'small' ? 'sizeSmall' : ''}`}>
          <DropDownSelectedList
            list={values}
            onDelete={item => deselectItem(values, item)}
            placeHolder={placeHolder}
            format={format}
          />
          <Box>
            <Icon name="arrowdown" width={12} height={12} />
          </Box>
        </DropDownHeader>
        {isOpen && (
          <Portal container={document.getElementById('root')}>
            <DropDownListContainer
              ref={dropdownRef}
              style={{
                width: position.width,
                transform: `translate(${position.left}px, ${position.top + position.height}px`,
              }}
            >
              {isSearchable && (
                <DropDownListInputContainer>
                  <Icon name="search" color={theme.palette.grey[400]} />
                  <DropDownListInput value={searchValue} onChange={handleInputChange} />
                </DropDownListInputContainer>
              )}
              <DropDownList>
                {options.map(opt => (
                  <ListItem key={opt.value} onClick={() => toggleItem(values, opt.value)}>
                    {isMultiple && (
                      <Checkbox color="primary" checked={values.includes(opt.value)} />
                    )}
                    <Box style={{ padding: 10, paddingLeft: isMultiple ? 0 : 10 }}>{opt.label}</Box>
                  </ListItem>
                ))}
              </DropDownList>
            </DropDownListContainer>
          </Portal>
        )}
      </DropDownContainer>
     </ClickAwayListener>
  )
}

export default FCTSelect

export type FCTSelectProps = {
  size?: 'small' | 'medium'
  values: string[]
  setValues(v: string[]): void
  label: string
  options: FCTOption[]
  isMultiple?: boolean
  isSearchable?: boolean
  isDisabled?: boolean
  onChange?(v: object): void
  onFilter(keyword: string): void
  isError?: boolean
  required?: boolean
} & Pick<DropDownSelectedListProps, 'onDelete' | 'placeHolder' | 'format'>

export type FCTOption = {
  value: string
  label: string
}

export type DropDownSelectedListProps = {
  list: string[]
  onDelete(v: string): void
  placeHolder?: string
  format?(item: string, onDelete: () => void): React.ReactNode
}
