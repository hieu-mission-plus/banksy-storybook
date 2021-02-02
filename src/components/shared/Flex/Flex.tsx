import React from 'react'
import { Box, BoxProps } from '@material-ui/core'

export default (props: BoxProps) => <Box display="flex" {...props}>{props.children}</Box>
