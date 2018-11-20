import * as React from 'react';
import styled from 'react-emotion';
import Dropzone from 'react-dropzone';

const imageSize = 150;
const DropzoneWrapper = styled('div')`
  white-space: nowrap;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
`;
const StyledDropzone = styled(Dropzone)`
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  justify-content: space-around;
  min-height: ${imageSize}px;
  max-height: ${imageSize}px;
  min-width: ${imageSize}px;
  max-width: ${imageSize}px;
  border: dashed 3px #ccc;
  border-radius: 4px;
  margin: 4px;
  padding: 20px 10px;
  position: static !important;
  & > input {
    width: ${imageSize}px;
    height: ${imageSize}px;
  }
`;
const ImageList = styled('div')`
  display: flex;
`;
const DropzoneText = styled('p')`
  text-align: center;
  font-size: 0.8em;
  margin-bottom: 0;
  color: #666;
`;
const DropzoneOrText = styled('p')`
  text-align: center;
  font-size: 0.7em;
  margin-bottom: 0;
  color: #aaa;
`;
const Img = styled('div')`
  max-width: ${imageSize}px;
  min-width: ${imageSize}px;
  max-height: ${imageSize}px;
  min-height: ${imageSize}px;
  background-image: url("${({ src }: { src: string }) => src}:thumb");
  background-size: cover;
`;
export interface Props {
  images: string[];
}
class ImagePicker extends React.Component<Props> {
  onDrop = (acceptedFiles: File[]) => {
    console.log(acceptedFiles);
  };
  render() {
    const { images } = this.props;
    return (
      <DropzoneWrapper>
        <ImageList>
          <StyledDropzone onDrop={this.onDrop} accept=".png,.jpg,.jpeg">
            <DropzoneText>
              クリックして
              <br />
              アップロード
            </DropzoneText>
            <DropzoneOrText>または</DropzoneOrText>
            <DropzoneText>
              画像を
              <br />
              ドラッグアンド
              <br />
              ドロップ
            </DropzoneText>
          </StyledDropzone>
          {images.map(i => (
            <Img src={i} key={i}>
              &nbsp;
            </Img>
          ))}
        </ImageList>
      </DropzoneWrapper>
    );
  }
}

export default ImagePicker;
