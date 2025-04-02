import React from 'react'
import { Check } from './Check'
import { Cross } from './Cross'
import { FormatBold } from './FormatBold'
import { FormatItalic } from './FormatItalic'
import { FormatUnderline } from './FormatUnderline'
import { FormatStriketrough } from './FormatStriketrough'
import { FormatCode } from './FormatCode'
import { BlockText } from './BlockText'
import { BlockH1 } from './BlockH1'
import { BlockH2 } from './BlockH2'
import { BlockH3 } from './BlockH3'
import { BlockNumList } from './BlockNumList'
import { BlockBulletList } from './BlockBulletList'
import { Chevron } from './Chevron'
import { Menu } from './Menu'
import { Bucket } from './Bucket'
import { Exit } from './Exit'
import { TrafficLightOutline } from './TrafficLightOutline'
import { TrafficLightCalendar } from './TrafficLightCalendar'
import { RatingEmoji } from './RatingEmoji'
import { RisedHands } from './RisedHands'
import { UpdateNow } from './UpdateNow'
import { FormatMark } from './FormatMark'
import { FormatHandStriketrough } from './FormatHandStriketrough'
import { Plus } from './Plus'
import { Edit } from './Edit'
import { Trash } from './Trash'
import { Settings } from './Settings'
import { Offline } from './Offline'
import { CardBrand } from './CardBrand'

type IconMapType = {
  [key: string]: any
}

interface IconProps extends React.HTMLAttributes<SVGElement> {
  name: keyof IconMapType
  size?: number
  scale?: number
  active?: boolean
  tintColor?: any
  type?: any
}

const IconMap: IconMapType = {
  Empty,
  Check,
  Cross,
  FormatBold,
  FormatItalic,
  FormatUnderline,
  FormatStriketrough,
  FormatHandStriketrough,
  FormatCode,
  BlockText,
  BlockH1,
  BlockH2,
  BlockH3,
  BlockNumList,
  BlockBulletList,
  Chevron,
  Menu,
  Bucket,
  Exit,
  TrafficLightOutline,
  TrafficLightCalendar,
  RatingEmoji,
  RisedHands,
  UpdateNow,
  FormatMark,
  Plus,
  Edit,
  Trash,
  Settings,
  Offline,
  CardBrand,
}

const Icon = function (props: IconProps) {
  const { name, size, scale, ...rest }: IconProps = props
  const Drawing = IconMap[name] ? IconMap[name] : IconMap['Empty']

  return <Drawing size={size} scale={scale} {...rest} />
}

function Empty() {
  return <></>
}

export { Icon }
