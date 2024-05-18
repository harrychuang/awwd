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

export const All = (args) => {
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
          desc="At Shopmatic, we continuously iterate our products and offerings to provide a better user experience to you. Our new smart home screen provides you with clear suggestions and resources to move you to the right path to success. The interface will also automatically adjust to any stage of your business."
          fit={false}
          fixedActions
          // type='cover'
          // align='left'
          heading="Welcome to a fresh new experience Welcome to a fresh new experience Welcome to a fresh new experience Welcome to a fresh new experience"
          photo="/demo-img.jpg"
          style={{
            maxWidth: '500px',
            // minHeight: '400px'
          }}
        />
      </Modal>
    </>
  );
};