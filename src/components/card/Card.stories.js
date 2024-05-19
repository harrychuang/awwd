import { Card } from './'
import { Button } from '../button'
import { Icon } from '../icon'
const demoImage = 'https://noeinoi.com/storybook/demo-img.jpg';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  title: 'Components/Data Display/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    cornerSize: {
      options: ['default', 'large', 'none'],
      control: { type: 'radio' },
    },
    shadow: {
      options: ['default', 'short', 'large', 'none'],
      control: { type: 'radio' },
    },
    type: {
      options: [null, 'cover'],
      control: { type: 'radio' },
    },
    align: {
      options: [null, 'left'],
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
    align: null,
    cornerSize: 'default',
    shadow: 'default',
    type: null,
    fit: false,
    cardPaddingSpacing: 'default'
  },
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
const elementStyle ={
  marginRight: 'var(--awwd-sys-spacing-xl)', 
  marginBottom: 'var(--awwd-sys-spacing-xl)',
  verticalAlign: 'top'
}

export const All = (args) => (
  <>
    <Card {...args} style={elementStyle} heading='Heading' desc='Descriptions..' />
    <Card
      {...args}
      photo={demoImage}
      heading='Heading'
      desc='Descriptions..'
      actions={
        <>
          <Button type='gray' size='large'>Cancel</Button>
          <Button type='primary' size='large'>OK</Button>
        </>
      }
      style={{...elementStyle, width: '320px', minHeight: '400px'}}
    />
  </>
)

export const Default = () => (
  <Card type='default'>
    <b>Card content</b>
  </Card>
)

export const CustimizedStyling = () => (
  <>
    <Card
      type='default'
      style={{ marginRight: '20px' }}
    >
      <div
        style={{ display: 'flex', alignItems: 'center' }}
      >
        <Icon type='alert' style={{ marginRight: '5px' }} />
        <b>Card content</b>
      </div>
    </Card>
    <Card type='default'>
      <div
        style={{ display: 'flex', alignItems: 'center', flexDirection: 'column'}}
      >
        <Icon type='alert' size='lg' style={{ marginBottom: '5px' }} />
        <b>Card content</b>
      </div>
    </Card>
  </>
)

export const HeadingWithDesc = () => (
  <Card type='default' heading='Heading' desc='Descriptions..' />
)

export const HeroPhotoWithHeadingAndDesc = () => (
  <Card
    photo={demoImage}
    heading='Heading'
    desc='Descriptions..'
    actions={
      <>
        <Button type='gray' size='large'>Cancel</Button>
        <Button type='success' size='large'>OK</Button>
      </>
    }
    style={{maxWidth: '320px'}}
  />
)

export const CoverType = () => (
  <Card
    photo={demoImage}
    heading='Heading'
    desc='Descriptions..'
    type='cover'
    cornerSize='large'
    actions={
      <>
        <Button type='primary' size='large'>OK</Button>
      </>
    }
    style={{...elementStyle, width: '360px', height: '400px'}}
  />
)

export const RowType = () => (
  <>
    <Card
      photo={demoImage}
      heading='FUTURISTIC CITIES'
      desc='Japan is a country of incredible contrast. Combine this with some of the friendliest locals around and some of the tastiest food in the world and you’ve got a country that should absolutely be on your bucket list!'
      actions={
        <>
          <Button type='default' size='large'>OK</Button>
        </>
      }
      cardPaddingSpacing='large'
      type='row'
      style={{ maxWidth: '800px' }}
      photoStyle={{ width: '200px' }}
    />
    <br />
    <Card
      heading='FUTURISTIC CITIES'
      desc='Japan is a country of incredible contrast. Combine this with some of the friendliest locals around and some of the tastiest food in the world and you’ve got a country that should absolutely be on your bucket list!'
      actions={
        <>
          <Button type='default' size='large'>OK</Button>
        </>
      }
      cardPaddingSpacing='large'
      type='row'
      cornerSize='large'
      style={{ maxWidth: '800px' }}
      photoStyle={{ width: '200px' }}
    />
  </>
)