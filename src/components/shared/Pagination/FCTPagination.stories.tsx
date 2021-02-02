import { useState } from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { FCTTablePagination } from './FCTTablePagination'
import { action } from '@storybook/addon-actions'
export default {
  title: 'Example/Table',
} as Meta

const Template: Story<any> = args => {
  // The amount of records
  // Page index for table or list
  const [pageIndex, setPageIndex] = useState<number>(0)
  // Page size for table or list
  const [pageSize, setPageSize] = useState<number>(10)

  return (
    <>
      <FCTTablePagination
        rowsPerPageOptions={[10, 25, 50, 100]}
        onChangeRowsPerPage={e => {
          setPageSize(parseInt(e.target.value, 10))
          setPageIndex(0)
          action('onChangeRowsPerPage')('onChangeRowsPerPage')
        }}
        totalRows={args.count}
        paginationProps={{
          count: Math.ceil(args.count / pageSize),
          size: 'small',
          page: pageIndex + 1,
          onChange: (e, value) => {
            action('onChangePage')('ChangePage')
            setPageIndex(value - 1)
          },
        }}
      />
    </>
  )
}

export const Table = Template.bind({})
Table.args = {
  count: 21,
}
