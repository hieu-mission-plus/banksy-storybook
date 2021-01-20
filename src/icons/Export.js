import React from "react"
import { SvgIcon } from "@material-ui/core"

export default function ExportIcon(props) {
  return (
    <SvgIcon {...props} viewBox="0 0 16 16">
      <path
        d="M14.125 15H1.875C1.35 15 1 14.65 1 14.125V3.625C1 3.1 1.35 2.75 1.875 2.75H4.5V4.5H2.75V13.25H13.25V8.875H15V14.125C15 14.65 14.65 15 14.125 15Z"
      />
      <path
        d="M9.75 3.625C6.95 3.625 4.5 5.8125 4.5 9.75C5.4625 8.2625 6.6 7.125 9.75 7.125V9.75L15 5.375L9.75 1V3.625Z"
      />
    </SvgIcon>
  )
}
