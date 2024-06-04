

import { Button } from './'
import { Icon } from '../icon'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  title: 'Components/General/Buttons',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: { type: 'text' },
    },
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
    children: 'Button',
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

export const All = ({ children, ...args }) => (
  <>
    <Button iconType {...args}>
      <Icon type='home' />
    </Button>
    &nbsp;&nbsp;
    <Button iconType {...args} transparentBg>
      <Icon type='close' />
    </Button>
    &nbsp;&nbsp;
    <Button {...args}>
      {children}
    </Button>
    &nbsp;&nbsp;
    <Button {...args}>
      <Icon prefix type='arrow-back' />
      {children} with prefix icon
    </Button>
    &nbsp;&nbsp;
    <Button {...args}>
      {children} with surfix icon
      <Icon surfix type='arrow-next' />
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