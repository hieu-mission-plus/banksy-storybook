import React from "react"
import { SvgIcon } from "@material-ui/core"

export default function ListIcon(props: any) {
  return (
    <SvgIcon {...props} viewBox="0 0 16 16">
      <path d="M1.875 4C2.91053 4 3.75 3.10457 3.75 2C3.75 0.89543 2.91053 0 1.875 0C0.839466 0 0 0.89543 0 2C0 3.10457 0.839466 4 1.875 4Z" />
      <path d="M1.875 10C2.91053 10 3.75 9.10457 3.75 8C3.75 6.89543 2.91053 6 1.875 6C0.839466 6 0 6.89543 0 8C0 9.10457 0.839466 10 1.875 10Z" />
      <path d="M1.875 16C2.91053 16 3.75 15.1046 3.75 14C3.75 12.8954 2.91053 12 1.875 12C0.839466 12 0 12.8954 0 14C0 15.1046 0.839466 16 1.875 16Z" />
      <path d="M15 1H5.625V3H15V1Z" />
      <path d="M15 7H5.625V9H15V7Z" />
      <path d="M15 13H5.625V15H15V13Z" />
    </SvgIcon>
  )
}
