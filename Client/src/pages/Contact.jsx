import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
`;



const ContactWrapper = styled.div`
  width: 768px;
  height: 480px;
  background-color: #fff;
  border-radius: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.35);
  position: relative;
  display: flex;
  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
  }
`;

const FormContainer = styled.div`
  width: 50%;
  padding: 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 768px) {
    width: 100%;
    padding: 24px;
  }
`;

const Title = styled.h2`
  color: #333;
  margin-bottom: 24px;
  text-align: center;
`;

const Input = styled.input`
  width: 50%;
  padding: 12px 16px;
  margin-bottom: 20px;
  border-radius: 8px;
  border: none;
  background: #eee;
  font-size: 14px;
`;

const TextArea = styled.textarea`
  width: 50%;
  padding: 12px 16px;
  height: 120px;
  border-radius: 8px;
  border: none;
  margin-bottom: 20px;
  background: #eee;
  font-size: 14px;
`;

const Button = styled.button`
  background-color: #512da8;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  width: 70%;
  cursor: pointer;
  font-weight: 600;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ToggleContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 50%;
  height: 100%;
  overflow: hidden;
  border-radius: 150px 0 0 100px;
  z-index: 10;
  @media (max-width: 768px) {
    position: relative;
    width: 100%;
    height: auto;
    border-radius: 0;
  }
`;

const Toggle = styled.div`
  background: linear-gradient(to right, #5c6bc0, #512da8);
  color: white;
  width: 100%;
  height: 100%;
  padding: 0 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  box-sizing: border-box;
  overflow: auto; /* allows scroll if content exceeds height */
  @media (max-width: 768px) {
    padding: 24px;
  }
`;

const ToggleTitle = styled.h2`
  margin-bottom: 16px;
  font-size: 24px;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const ToggleText = styled.p`
  font-size: 14px;
  line-height: 1.6;
  padding: 0 10px;
  max-width: 90%;
  word-wrap: break-word;
  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

function Contact() {
  return (
    <Container>
      <ContactWrapper>
        <FormContainer>
          <Title>Contact Us</Title>
          <form>
            <Input type="text" placeholder="Your Name" />
            <Input type="email" placeholder="Your Email" />
            <TextArea placeholder="Your Message..." />
            <Button type="submit">Send Message</Button>
          </form>
        </FormContainer>
        <ToggleContainer>
          <Toggle>
            <ToggleTitle>Hello, Friend!</ToggleTitle>
            <ToggleText>
              Leave us a message and we’ll get back to you shortly. We’re happy to hear from you!
              
            </ToggleText>
          </Toggle>
        </ToggleContainer>
      </ContactWrapper>
    </Container>
  );
}

export default Contact;
