import * as React from 'react'
import { ReactComponent as add } from '../../../images/icons/add.svg'
import { ReactComponent as arrowdown } from '../../../images/icons/arrowdown.svg'
import { ReactComponent as arrowtop } from '../../../images/icons/arrowtop.svg'
import { ReactComponent as arrowright } from '../../../images/icons/arrowright.svg'
import { ReactComponent as arrowleft } from '../../../images/icons/arrowleft.svg'
import { ReactComponent as search } from '../../../images/icons/search.svg'
import { ReactComponent as bankDeposit } from '../../../images/icons/bank-deposit.svg'
import { ReactComponent as referral } from '../../../images/icons/referral.svg'
import { ReactComponent as customers } from '../../../images/icons/customers.svg'
import { ReactComponent as realEstate } from '../../../images/icons/real-estate-pay-building.svg'
import { ReactComponent as calendar } from '../../../images/icons/calendar.svg'
import { ReactComponent as team } from '../../../images/icons/team.svg'
import { ReactComponent as money } from '../../../images/icons/money.svg'
import { ReactComponent as link } from '../../../images/icons/link.svg'
import { ReactComponent as network } from '../../../images/icons/network.svg'
import { ReactComponent as location } from '../../../images/icons/location.svg'
import { ReactComponent as filter } from '../../../images/icons/filter.svg'
import { ReactComponent as export1 } from '../../../images/icons/export.svg'
import { ReactComponent as export2 } from '../../../images/icons/export-1.svg'
import { ReactComponent as handshake } from '../../../images/icons/handshake.svg'
import { ReactComponent as plus } from '../../../images/icons/plus.svg'
import { ReactComponent as eyeClose } from '../../../images/icons/eye-close.svg'
import { ReactComponent as close } from '../../../images/icons/close.svg'
import { ReactComponent as bubble } from '../../../images/icons/bubble.svg'
import { ReactComponent as list } from '../../../images/icons/list.svg'
import { ReactComponent as compare } from '../../../images/icons/compare.svg'
import { ReactComponent as analytics } from '../../../images/icons/analytics.svg'
import { ReactComponent as fullscreen } from '../../../images/icons/fullscreen.svg'
import { ReactComponent as collapse } from '../../../images/icons/collapse.svg'
import { ReactComponent as hierachy } from '../../../images/icons/hierachy.svg'
import { ReactComponent as coordinate } from '../../../images/icons/coordinate.svg'
import { ReactComponent as payment } from '../../../images/icons/payment.svg'
import { ReactComponent as edit } from '../../../images/icons/edit.svg'

export const IconMap = {
  add,
  arrowdown,
  arrowleft,
  arrowright,
  arrowtop,
  bankDeposit,
  bubble,
  calendar,
  close,
  customers,
  export1,
  export2,
  eyeClose,
  money,
  network,
  handshake,
  link,
  location,
  filter,
  referral,
  realEstate,
  search,
  team,
  plus,
  list,
  compare,
  analytics,
  fullscreen,
  collapse,
  hierachy,
  coordinate,
  payment,
  edit
}

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: keyof typeof IconMap
}

const Icon: React.FC<IconProps> = ({ name, width = '16', height = '16', ...rest }) => {
  const MatchIcon = IconMap[name] || null
  return <MatchIcon width={width} height={height} {...rest} />
}

export default Icon
