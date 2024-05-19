import React, { useState } from 'react';
import { Modal } from './';
import { Card } from '../card';
import { Button } from '../button';
const demoImage = 'https://noeinoi.com/storybook/demo-img.jpg';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  title: 'Components/Feedback/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {},
  args: {},
};

const storyBodyStyle = { minHeight: '620px' }
const storyLongBodyStyle = { minHeight: '1000px' }

export const OpenModal = (args) => {
  const [showDefaultModal, setShowDefaultModal] = useState(false);

  const handleOpenDefaultModal = () => {
    setShowDefaultModal(true);
  };

  const handleCloseDefaultModal = () => {
    setShowDefaultModal(false);
  };

  return (
    <div style={storyBodyStyle}>
      <Button type='default' onClick={handleOpenDefaultModal}>Open Modal</Button>
      <Modal closeButton {...args} show={showDefaultModal} onClose={handleCloseDefaultModal}>
        <Card
          actions={
            <>
              <Button size="large" type="gray" onClick={handleCloseDefaultModal}>Cancel</Button>
              <Button size="large" type="primary" onClick={handleCloseDefaultModal}>OK</Button>
            </>
          }
          fit={false}
          heading="Regions of Japan"
          desc="The Kanto Region (関東, Kantō, literally 'east of the border') contains Japan's largest plain and is very densely populated. The large metropolises of Tokyo and Yokohama are located in the Kanto Region which consists of seven prefectures."
          photo={demoImage}
          style={{
            maxWidth: '400px'
          }}
        />
      </Modal>
      {/* <HeroImage show={showModal} onClose={handleCloseDefaultModal} /> */}
    </div>
  );
};

export const DefaultModal = () => (
  <div style={storyBodyStyle}>
    <Modal closeButton show>
      <Card
        actions={
          <>
            <Button size="large" type="primary">OK</Button>
          </>
        }
        align='left'
        heading="Regions of Japan"
        desc="The Kanto Region (関東, Kantō, literally 'east of the border') contains Japan's largest plain and is very densely populated. The large metropolises of Tokyo and Yokohama are located in the Kanto Region which consists of seven prefectures."
        style={{
          maxWidth: '380px'
        }}
      />
    </Modal>
  </div>
)

export const HeroImageModal = () => (
  <div style={storyBodyStyle}>
    <Modal closeButton show>
      <Card
        actions={
          <>
            <Button size="large" type="default">OK</Button>
          </>
        }
        align='left'
        photo={demoImage}
        heading="Regions of Japan"
        desc="The Kanto Region (関東, Kantō, literally 'east of the border') contains Japan's largest plain and is very densely populated. The large metropolises of Tokyo and Yokohama are located in the Kanto Region which consists of seven prefectures."
        style={{
          maxWidth: '380px'
        }}
      />
    </Modal>
  </div>
)

export const CoverTypeModal = () => (
  <div style={storyBodyStyle}>
    <Modal closeButton show>
      <Card
        actions={
          <>
            <Button size="large" type="gray">Cancel</Button>
            <Button size="large" type="primary">OK</Button>
          </>
        }
        type='cover'
        photo={demoImage}
        cornerSize='large'
        heading="Regions of Japan"
        desc="The Kanto Region (関東, Kantō, literally 'east of the border') contains Japan's largest plain and is very densely populated. The large metropolises of Tokyo and Yokohama are located in the Kanto Region which consists of seven prefectures."
        style={{
          maxWidth: '380px',
          minHeight: '460px'
        }}
      />
    </Modal>
  </div>
)

export const LongContentModal = () => (
  <div style={storyLongBodyStyle}>
    <Modal closeButton show>
      <Card
        actions={
          <>
            <Button size="large" type="gray">Cancel</Button>
            <Button size="large" type="primary">OK</Button>
          </>
        }
        fixedActions
        photo={demoImage}
        heading="Tokyo and the cultural and natural treasures just at its doorstep"
        desc={`This series of articles about credit cards, points and miles, and budgeting for travel is brought to you in partnership with The Points Guy. Advertiser Disclosure: This post contains references to products from one or more of our advertisers. We may receive compensation when you click on links to those products. Terms apply to the offers listed on this page. This relationship may impact how and where links appear on this site. This site does not include all financial companies or all available financial offers. All information about the American Express® Green Card*, Alaska Airlines credit cards, Citi credit cards, the World of Hyatt Credit Card, and AAdvantage credit cards has been collected independently by Lonely Planet. These cards are not available through Lonely Planet. \n\n
With its unique culture, cuisine and stunning natural beauty, it's no wonder why Japan is a popular destination for travelers from around the world. From ancient temples to modern cities, there is something for everyone — making it the perfect place for a memorable vacation. However, Japan can also be incredibly expensive, thanks to the high cost of food, lodging and airfare. The solution? Points and miles. Traveling to Japan using points and miles is a great way to experience this fascinating country's culture, cuisine and natural beauty without breaking the bank. With an abundance of airline rewards programs offering flights from North America for as little as 40,000 miles round-trip, making your dream trip a reality with some strategic planning.  \n\n
From taking advantage of airline loyalty programs or signing up for credit cards with generous rewards points, there are plenty of ways for travelers looking for a budget-friendly journey through Japan.
        `}
        style={{
          width: '600px',
          minHeight: '460px'
        }}
      />
    </Modal>
  </div>
)