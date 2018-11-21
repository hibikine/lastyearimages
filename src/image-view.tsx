/* eslint-disable react/no-array-index-key */
import * as React from 'react';
import {
  Stage,
  Text,
  Layer,
  Rect,
  Sprite,
  Image as RKImage,
} from 'react-konva';
import { withState, mapProps, lifecycle } from 'recompose';
import styled, { css } from 'react-emotion';
import base from '../img/base.png';
import roundedMplusBold, { onLoaded, isLoaded } from './rounded-mplus';
import { mq } from './style';

export interface Props {
  displayName: string;
  images: Array<HTMLImageElement | null>;
  fontLoaded: boolean;
  color: string;
}
const sizeList = [200, 300, 500];
const width = 1236;
const height = 1252;
const StyledStage = styled(Stage)`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;
const stageStyle = css(mq({
  width: sizeList.map(v => `${v + 20}px`),
  height: sizeList.map(v => `${(v / width) * height + 20}px`),
  '& canvas, & .konvajs-content': {
    width: sizeList.map(v => `${v}px !important`),
    height: sizeList.map(v => `${(v / width) * height}px !important`),
  },
}));
const baseImage = new Image();
const headerHeight = 140;
const monthHeaderSize = 68;
const lineWidth = 6;
const innerLineWidth = 3;
baseImage.src = base;

const ImageView = ({
  images, color, displayName, fontLoaded,
}: Props) => {
  console.log(images);
  if (!fontLoaded) {
    return null;
  }
  return (
    <StyledStage
      className={stageStyle}
      width={width}
      height={height}
      style={{ padding: 0 }}
    >
      <Layer>
        <Text
          fontFamily={roundedMplusBold}
          fontSize={60}
          align="center"
          verticalAlign="center"
          text={`${displayName}${displayName === '' ? '' : 'の'}お絵かき1年録`}
          width={width}
          height={height / 5}
          x={0}
          y={70}
        />
        {images.map((img, i) => img !== null && <RKImage key={i} image={img} />)}
        {new Array(4).fill(0).map((_, i) => (
          <Rect
            y={headerHeight + ((height - headerHeight - lineWidth) / 3) * i}
            height={monthHeaderSize}
            width={width}
            fill={color}
            key={i}
          />
        ))}
        {new Array(2).fill(0).map((_, i) => (
          <Rect
            x={i === 0 ? 0 : width - lineWidth}
            width={lineWidth}
            y={headerHeight}
            height={height - headerHeight}
            fill={color}
            key={i}
          />
        ))}
        {new Array(3).fill(0).map((_, i) => (
          <Rect
            x={lineWidth + ((width - lineWidth * 2) / 4) * (i + 1)}
            y={headerHeight}
            height={height - headerHeight}
            width={innerLineWidth}
            fill={color}
            key={i}
          />
        ))}
        {new Array(12).fill(0).map((_, i) => (
          <Text
            key={i}
            fontSize={40}
            align="center"
            verticalAlign="top"
            text={`${i + 1}月`}
            x={lineWidth + ((width - lineWidth * 2) / 4) * (i % 4)}
            y={
              headerHeight +
              ((height - headerHeight - lineWidth) / 3) * Math.floor(i / 4) +
              14
            }
            width={(width - lineWidth * 2) / 4}
            stroke="#ffffff"
            fill="#ffffff"
          />
        ))}
      </Layer>
    </StyledStage>
  );
};
ImageView.defaultProps = { displayName: '', images: new Array(12).fill(null) };

const StringImageView = withState(
  'convertedImages',
  'setConvertedImages',
  new Array(12).fill(null) as Array<HTMLImageElement | null>,
)(lifecycle<
    {
      images: Array<string | null>;
      convertedImages: Array<HTMLImageElement>;
      setConvertedImages:(imgs: Array<HTMLImageElement>) => void;
        },
    {},
    {}
        >({
          async componentDidUpdate(prevProps) {
            const { images, convertedImages, setConvertedImages } = this.props;
            const prevImages = prevProps.images;
            const nextConvertedImages = [...convertedImages];
            const waits: Promise<any>[] = [];
            for (let i = 0; i < images.length; i += 1) {
              if (images[i] !== prevImages[i]) {
                nextConvertedImages[i] = new Image();
                nextConvertedImages[i].src = images[i];
                waits.push(new Promise((r) => {
                  nextConvertedImages[i].onloadend = r;
                }));
              }
            }
            await Promise.all(waits);
            setConvertedImages(nextConvertedImages);
          },
        })(mapProps((props) => {
          console.log('a', props);
          return { ...props, images: props.convertedImages };
        })(ImageView)));

class IsFontLoaded extends React.Component<Omit<Props, 'fontLoaded'>> {
  constructor(props) {
    super(props);
    if (isLoaded()) {
      this.state = { loaded: true };
    }
    onLoaded.push(this.callback);
  }
  state = { loaded: false };
  callback = () => {
    this.setState({ loaded: true });
  };
  render() {
    const { loaded } = this.state;
    return <StringImageView {...this.props} fontLoaded={loaded} />;
  }
}
export default IsFontLoaded;
