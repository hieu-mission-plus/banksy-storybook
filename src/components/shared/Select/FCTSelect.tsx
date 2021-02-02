import { Box, Checkbox, Theme } from '@material-ui/core'
import React, { useState } from 'react'
import styled from 'styled-components'
import Chip from '@material-ui/core/Chip'
import theme from '../../../theme'
import Flex from '../Flex/Flex'
import { debounce } from 'lodash'
import withStyles, { CSSProperties } from '@material-ui/core/styles/withStyles'
import Icon from '../Icon/Icon'
import useClickOutside from '../../../hooks/useClickOutside'

export enum ChangeType {
  SELECT = 'SELECT',
  DESELECT = 'DESELECT',
}

const DropDownContainer = styled('div')`
  border-radius: 5px;
  position: relative;
  border: 1px solid #e7ecf3;
  &:hover,
  &:focus {
    ${({ theme }: { theme: Theme }) => `
      border: 1px solid ${theme.palette.primary.light};
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
  padding: 10px;
  padding-top: 0;
`

const DropDownList = styled('ul')`
  padding: 0;
  margin: 6px 0;
  max-height: 310px;
  overflow-y: auto;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 3px;
  }

  &::-webkit-scrollbar-thumb {
    ${({ theme }: { theme: Theme }) => `
    width: 100%;
    background: ${theme.palette.primary.main};
    border-radius: 3px;
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
  background: ${theme.palette.grey[100]};
  border: 0;
  outline: 0;
  &::placeholder {
    color: ${theme.palette.grey[400]};
  }
`}
`

const DropDownListInputContainer = styled('div')`
  padding: 10px;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  border-radius: 3px;
`

const ChipItem = withStyles({
  root: {
    borderRadius: '3px',
    zIndex: 1,
    margin: 2,
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
  ...props
}: DropDownSelectedListProps) => (
  <Flex flexWrap="wrap" minHeight={24} lineHeight={'24px'}>
    {list?.length > 0
      ? list?.map(item => (
          <ChipItem key={item} label={item} size="small" onDelete={() => onDelete(item)} />
        ))
      : placeHolder}
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
  ...props
}: FCTSelectProps) => {
  const wrapperRef = React.useRef<HTMLDivElement>(null)
  
  const [isTouched, setIsTouched] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  // Keep state of search string
  const [searchValue, setSearchValue] = useState('')

  useClickOutside(wrapperRef, () => setIsOpen(false))

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
    <DropDownContainer style={containerStyle} onMouseUp={() => setIsTouched(true)} ref={wrapperRef}>
      <DropDownLabel>
        {props.label}
        {required && ' *'}
      </DropDownLabel>
      <DropDownHeader onClick={toggling} className={size === 'small' ? 'sizeSmall' : undefined}>
        <DropDownSelectedList
          list={values}
          onDelete={item => deselectItem(values, item)}
          placeHolder={placeHolder}
        />
        <Icon name="arrowdown" />
      </DropDownHeader>
      {isOpen && (
        <DropDownListContainer>
          {isSearchable && (
            <DropDownListInputContainer>
              <Icon name="search" color={theme.palette.grey[400]} />
              <DropDownListInput value={searchValue} onChange={handleInputChange} />
            </DropDownListInputContainer>
          )}
          <DropDownList>
            {options.map(opt => (
              <ListItem key={opt.value} onClick={() => toggleItem(values, opt.value)}>
                {isMultiple && <Checkbox color="primary" checked={values.includes(opt.value)} />}
                <Box style={{ padding: 10, paddingLeft: isMultiple ? 0 : 10 }}>{opt.label}</Box>
              </ListItem>
            ))}
          </DropDownList>
        </DropDownListContainer>
      )}
    </DropDownContainer>
  )
}

export default FCTSelect

export type FCTSelectProps = {
  size?: 'small' | 'medium'
  values: string[]
  setValues(v: string[]): void
  label: string
  options: FCTOption[]
  placeHolder?: string
  isMultiple?: boolean
  isSearchable?: boolean
  isDisabled?: boolean
  onChange?(v: object): void
  onFilter(keyword: string): void
  isError?: boolean
  required?: boolean
}

export type FCTOption = {
  value: string
  label: string
}

export type DropDownSelectedListProps = {
  list: string[]
  onDelete(v: string): void
  placeHolder?: string
}
