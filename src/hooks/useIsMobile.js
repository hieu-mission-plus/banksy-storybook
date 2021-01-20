import { useTheme, useMediaQuery } from "@material-ui/core"

export default function useIsMobile() {
  const theme = useTheme()
  return useMediaQuery(theme.breakpoints.down("xs"), {
    defaultMatches: false,
  })
}