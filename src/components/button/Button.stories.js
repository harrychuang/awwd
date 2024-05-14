

import { Button } from './'
import { Icon } from '../icon'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  title: 'Components/General/Buttons',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    type: {
      options: ['primary', 'ghost', 'success', 'error'],
      control: { type: 'radio' },
    },
    round: {
      options: [false, true],
      control: { type: 'boolean' }, 
    },
    fit: {
      options: [false, true],
      control: { type: 'boolean' }, 
    },
    size: {
      options: ['default', 'med'],
      control: { type: 'radio' },
    },
    disabled: {
      options: [false, true],
      control: { type: 'boolean' }, 
    }
  },
  args: {
    type: 'primary',
    round: false,
    fit: false,
    size: 'default',
    disabled: false,
  },
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default = (args) => (
  <>
    <Button style={{ margin: '0 10px 10px 0' }} {...args} icon={false}>
      Button
    </Button>
    <Button style={{ margin: '0 10px 10px 0' }} {...args} icon={false}>
      <Icon type='arrow-left' style={{ marginRight: '10px' }} />
      Button with icon
    </Button>
    <Button style={{ margin: '0 10px 10px 0' }} {...args} icon={false}>
      Button with icon
      <Icon type='arrow-right' style={{ marginLeft: '10px' }} />
    </Button>
    <Button style={{ margin: '0 10px 10px 0' }} {...args} icon>
      <Icon type='star' />
    </Button>
  </>
)

export const Primary = () => (
  <Button type='primary'>
    Primary
  </Button>
)
