/* eslint-disable react/no-array-index-key */
import * as React from 'react';
import { Stage, Text, Layer, Rect, Image as RKImage, Group } from 'react-konva';
import styled, { css } from 'react-emotion';
import base from '../img/base.png';
import roundedMplusBold, { onLoaded, isLoaded } from './rounded-mplus';
import { mq } from './style';
import calcFillScale from './calcScale';

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
const imageWidth = (width - lineWidth * 2) / 4;
const imageInnerWidth = imageWidth;
const imageHeight = (height - headerHeight - lineWidth) / 3;
const imageInnerHeight = imageHeight - monthHeaderSize;
const calcFillScaleBySize = calcFillScale(imageInnerWidth, imageInnerHeight);
baseImage.src = base;

interface State {
  positions: (number | null)[];
}
const ImageView = ({
  images, color, displayName, fontLoaded,
}: Props) => {
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
        {images.map((img, i) =>
            img !== null && (
              <Group
                clipFunc={(ctx) => {
                  ctx.rect(0, 0, imageInnerWidth, imageInnerHeight);
                }}
                x={lineWidth + imageWidth * (i % 4)}
                y={
                  headerHeight +
                  monthHeaderSize +
                  imageHeight * Math.floor(i / 4)
                }
                key={i}
              >
                <RKImage
                  key={i}
                  image={img}
                  scaleX={calcFillScaleBySize(img)}
                  scaleY={calcFillScaleBySize(img)}
                />
              </Group>
            ))}
        {new Array(4).fill(0).map((_, i) => (
          <Rect
            y={headerHeight + imageHeight * i}
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
            x={lineWidth + imageWidth * (i + 1)}
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
    return <ImageView {...this.props} fontLoaded={loaded} />;
  }
}
export default IsFontLoaded;
