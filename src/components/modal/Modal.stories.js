import React, { useState } from 'react';
import { Modal } from './';
import { Card } from '../card';
import { Button } from '../button';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  title: 'Components/Feedback/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {},
  args: {},
};

export const OpenModal = (args) => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Button type='default' onClick={handleOpenModal}>Open Modal</Button>
      <Modal closeButton {...args} show={showModal} onClose={handleCloseModal}>
        <Card
          actions={
            <>
              <Button size="large" type="gray" onClick={handleCloseModal}>Cancel</Button>
              <Button size="large" type="primary" onClick={handleCloseModal}>OK</Button>
            </>
          }
          fit={false}
          // fixedActions
          // type='cover'
          // align='left'
          heading="Regions of Japan"
          desc="The Kanto Region (関東, Kantō, literally 'east of the border') contains Japan's largest plain and is very densely populated. The large metropolises of Tokyo and Yokohama are located in the Kanto Region which consists of seven prefectures."
          photo="/demo-img.jpg"
          style={{
            maxWidth: '400px'
          }}
        />
      </Modal>
    </>
  );
};

export const Default = () => (
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
)

export const HeroImage = () => (
  <Modal closeButton show>
    <Card
      actions={
        <>
          <Button size="large" type="primary">OK</Button>
        </>
      }
      align='left'
      photo="/demo-img.jpg"
      heading="Regions of Japan"
      desc="The Kanto Region (関東, Kantō, literally 'east of the border') contains Japan's largest plain and is very densely populated. The large metropolises of Tokyo and Yokohama are located in the Kanto Region which consists of seven prefectures."
      style={{
        maxWidth: '380px'
      }}
    />
  </Modal>
)

export const CoverType = () => (
  <Modal closeButton show>
    <Card
      actions={
        <>
          <Button size="large" type="gray">Cancel</Button>
          <Button size="large" type="primary">OK</Button>
        </>
      }
      type='cover'
      photo="/demo-img.jpg"
      heading="Regions of Japan"
      desc="The Kanto Region (関東, Kantō, literally 'east of the border') contains Japan's largest plain and is very densely populated. The large metropolises of Tokyo and Yokohama are located in the Kanto Region which consists of seven prefectures."
      style={{
        maxWidth: '380px',
        minHeight: '460px'
      }}
    />
  </Modal>
)

export const LongContent = () => (
  <Modal closeButton show>
    <Card
      actions={
        <>
          <Button size="large" type="gray">Cancel</Button>
          <Button size="large" type="primary">OK</Button>
        </>
      }
      fixedActions
      photo="/demo-img.jpg"
      heading="Tokyo and the cultural and natural treasures just at its doorstep"
      desc={`Japan's first permanent capital was established in the year 710 at Heijo, the city now known as Nara (奈良). \n\n Prior to that, the capital was moved to a new location whenever a new emperor ascended to the throne. However, as the influence and political ambitions of the city's powerful Buddhist monasteries grew to become a serious threat to the government,
        the capital was moved away from Nara to Nagaoka in 784 and a few years later to Kyoto. \n\n Japan's first permanent capital was established in the year 710 at Heijo, the city now known as Nara (奈良). 
        Prior to that, the capital was moved to a new location whenever a new emperor ascended to the throne. However, as the influence and political ambitions of the city's powerful Buddhist monasteries grew to become 
        a serious threat to the government, the capital was moved away from Nara to Nagaoka in 784 and a few years later to Kyoto. \n\n Japan's first permanent capital was established in the year 710 at Heijo, the city now known as Nara (奈良).`}
      style={{
        maxWidth: '460px',
        minHeight: '460px'
      }}
    />
  </Modal>
)