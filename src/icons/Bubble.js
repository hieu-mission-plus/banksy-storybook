import React from "react"
import { SvgIcon } from "@material-ui/core"

export default function BubbleIcon(props) {
  return (
    <SvgIcon {...props} viewBox="0 0 16 16">
      <circle cx="6.5" cy="9.5" r="6.5" />
      <circle cx="13.5" cy="2.5" r="2.5" />
    </SvgIcon>
  )
}
