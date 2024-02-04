import styled from 'styled-components';

interface Props {
  src?: string;
  alt?: string;
}

const ImageProfile = ({ src, alt }: Props) => {
  return (
    <ParticipantsSection>
      {src ? <ParticipantImage src={src} alt={alt} /> : <UnknownUserImage />}
    </ParticipantsSection>
  );
};

export default ImageProfile;

const ParticipantsSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

const UnknownUserImage = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-left: -8px;
  border: 1px solid #eee;
  z-index: 1;
  background-color: #eee;
  &:first-child {
    margin-left: 0;
  }
`;

const ParticipantImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-left: -8px;
  border: 1px solid #fff;
  z-index: 1;

  &:first-child {
    margin-left: 0;
  }
`;
