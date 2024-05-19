

import { Button } from './'
import { Icon } from '../icon'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  title: 'Components/General/Buttons',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    type: {
      options: ['default','primary', 'secondary' , 'gray', 'success', 'info', 'warning', 'error'],
      control: { type: 'radio' },
    },
    rounded: {
      options: [false, true],
      control: { type: 'boolean' }, 
    },
    fit: {
      options: [false, true],
      control: { type: 'boolean' }, 
    },
    size: {
      options: ['default', 'large'],
      control: { type: 'radio' },
    },
    transparentBg: {
      options: [false, true],
      control: { type: 'boolean' }, 
    },
    disabled: {
      options: [false, true],
      control: { type: 'boolean' }, 
    }
  },
  args: {
    type: 'default',
    rounded: false,
    fit: false,
    size: 'default',
    transparentBg: false,
    disabled: false,
  },
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
const elementStyle ={
  marginRight: 'var(--awwd-sys-spacing-sm)', 
  marginBottom: 'var(--awwd-sys-spacing-sm)'
}

export const All = (args) => (
  <>
    <Button {...args} style={elementStyle}>
      Button
    </Button>
    <Button {...args} style={elementStyle}>
      <Icon prefix type='arrow-back' />
      Button with icon
    </Button>
    <Button {...args} style={elementStyle}>
      Button with icon
      <Icon surfix type='arrow-next' />
    </Button>
    <Button iconType {...args} style={elementStyle}>
      <Icon type='home' />
    </Button>
    <Button iconType {...args} transparentBg style={elementStyle}>
      <Icon type='close' />
    </Button>
  </>
)

export const Default = () => (
  <Button type='default'>
    Primary
  </Button>
)

export const IconType = () => (
  <>
    <Button iconType rounded style={elementStyle}>
      <Icon type='close' />
    </Button>
    <Button iconType transparentBg style={elementStyle}>
      <Icon type='close' />
    </Button>
  </>
)

export const Primary = () => (
  <Button type='primary'>
    Primary
  </Button>
)

export const Secondary = () => (
  <Button type='secondary'>
    Secondary
  </Button>
)

export const Success = () => (
  <Button type='success'>
    Success
  </Button>
)

export const Info = () => (
  <Button type='info'>
    Info
  </Button>
)

export const Warning = () => (
  <Button type='warning'>
    Warning
  </Button>
)

export const Error = () => (
  <Button type='error'>
    Error
  </Button>
)