import React from 'react'
import { Box, BoxProps } from '@material-ui/core'

const Flex = (props: BoxProps) => <Box display="flex" {...props}>{props.children}</Box>
export default Flex
