

import { Card } from './'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  title: 'Components/General/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    cornerSize: {
      options: ['default', 'large', 'none'],
      control: { type: 'radio' },
    },
    shadow: {
      options: ['default', 'large', 'none'],
      control: { type: 'radio' },
    },
    fit: {
      options: [false, true],
      control: { type: 'radio' },
    },
    cardPaddingSpacing: {
      options: ['default', 'large', 'none'],
      control: { type: 'radio' },
    }
  },
  args: {
    cornerSize: 'default',
    shadow: 'default',
    fit: false,
    cardPaddingSpacing: 'default'
  },
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
const elementStyle ={
  marginRight: 'var(--awwd-sys-spacing-lg)', 
  marginBottom: 'var(--awwd-sys-spacing-lg)'
}

export const All = (args) => (
  <>
    <Card {...args} style={elementStyle} />
    <Card {...args} style={elementStyle} heading='Heading' desc='Descriptions..' />
  </>
)

export const Default = () => (
  <Card type='default'>
    Card
  </Card>
)