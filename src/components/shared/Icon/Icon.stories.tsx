import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import FCTIcon from './Icon'
export default {
  title: 'Example/Icon',
  component: FCTIcon,
} as Meta

const Template: Story<any> = args => {
  return <FCTIcon name={args.name} width={args.size} height={args.size} {...args} />
}

export const Icon = Template.bind({})
Icon.args = {
  name: 'add',
  color: '',
  width: '50',
  height: '50',
}
