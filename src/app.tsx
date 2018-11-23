import * as React from 'react';
import { TwitterPicker } from 'react-color';
import { DateTime } from 'luxon';
import styled, { injectGlobal } from 'react-emotion';
import reboot from 'styled-reboot';
import produce from 'immer';
import { withState } from 'recompose';
import bigInt from 'big-integer';
import TextField from '@material-ui/core/TextField';
import ImageView from './image-view';
import Header, { headerHeight } from './header';
import LoginButton from './login-button';
import ImagePicker from './image-picker';
import { isLoggedIn, formatTwitterDate } from './utilities';
import TweetButton from './TweetButton';

const thresholdTime = DateTime.local()
  .minus({ months: 11 })
  .startOf('month');

const rebootCss = reboot({});
// eslint-disable-next-line
injectGlobal`
${rebootCss}
html, body {
  overflow: hidden;
}
`;
const Main = styled('main')`
  display: flex;
  flex-direction: row;
`;
const Left = styled('div')`
  height: calc(100vh - ${headerHeight});
`;
const Right = styled('div')`
  height: calc(100vh - ${headerHeight});
  width: 100%;
  overflow: auto;
`;

const Month = styled('h3')`
  margin-left: 5px;
  text-align: ${({ loggedIn }: { loggedIn: boolean }) =>
    (loggedIn ? 'left' : 'center')};
`;
const TopItems = styled('div')`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: left;
  & > * {
    margin: 6px;
  }
  margin-bottom: 10px;
  margin-top: 10px;
`;
const TwitterImageWrapper = styled('div')`
  width: 100%;
  margin-bottom: 20px;
  flex-wrap: wrap;
  display: ${({ loggedIn }: { loggedIn: boolean }) =>
    (loggedIn ? 'block' : 'flex;')};
`;
const LoginText = styled('p')``;
const MonthWrapper = styled('div')`
  margin-bottom: 10px;
`;
const Tweet = styled(TextField)`
  display: block;
  margin-top: 20px;
  margin-bottom: 20px;
`;
const Comment = styled(TextField)`
  display: block;
`;
interface State {
  color: string;
  images: (HTMLImageElement | null)[];
  twitterImages: string[][];
  loggedIn: boolean;
}
/* eslint-disable camelcase */
interface Medium {
  media_url_https: string;
  type: string;
}
interface Status {
  created_at: string;
  id: number;
  id_str: string;
  extended_entities: {
    media: Medium[];
  };
}
interface Props {
  displayName: string;
  setDisplayName: (n: string) => void;
  comment: string;
  setComment: (c: string) => void;
}
/* eslint-enable camelcase */
class App extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    const { loggedIn } = this.state;
    if (!loggedIn) {
      return;
    }
    this.fetchTweets();
  }
  state = {
    color: '#abb8c3',
    images: new Array(12).fill(null),
    twitterImages: new Array(12).fill(0).map(_ => []),
    loggedIn: isLoggedIn(),
  };
  setImage = (month: number) => async (image: string) => {
    const convertedImage = await new Promise<HTMLImageElement>(resolve => {
      const i = new Image();
      i.src = image;
      i.onloadend = () => resolve(i);
    });
    this.setState(state => {
      const newImages = [...state.images];
      newImages[month] = convertedImage;
      return { images: newImages };
    });
  };
  fetchTweets = async (max_id: string | null = null) => {
    const res = await fetch(
      `get-image.php${max_id === null ? '' : `?max_id=${max_id}`}`
    );
    const rawStatuses: { [key: string]: Status } = await res.json();
    const statuses = Object.values(rawStatuses);
    if (statuses.length === 0) return;
    for (const status of statuses) {
      const date = formatTwitterDate(status.created_at);
      if (date < thresholdTime) {
        return;
      }
      console.log(status);
      this.setState(state => ({
        twitterImages: produce(state.twitterImages, imgs => {
          imgs[date.month - 1].push(
            ...status.extended_entities.media
              .filter(m => m.type === 'photo')
              .map(m => `${m.media_url_https}`)
          );
        }),
      }));
    }
    this.fetchTweets(
      bigInt(statuses[statuses.length - 1].id_str)
        .minus(1)
        .toString()
    );
  };
  render() {
    const {
      images, color, twitterImages, loggedIn,
    } = this.state;
    const {
      displayName, setDisplayName, comment, setComment,
    } = this.props;
    return (
      <div>
        <Header />
        <Main>
          <Left>
            <ImageView
              displayName={displayName}
              color={color}
              images={images}
            />
          </Left>
          <Right>
            <TopItems>
              <TwitterPicker
                onChange={c => this.setState({ color: c.hex })}
                triangle="hide"
              />
              {!loggedIn && (
                <div>
                  <LoginText>
                    Twitterでログインすると、画像をTwitterから取得できます！(最大3000件程度)
                  </LoginText>
                  <LoginButton />
                </div>
              )}
            </TopItems>
            <TwitterImageWrapper loggedIn={loggedIn}>
              {twitterImages.map((img, i) => (
                <MonthWrapper key={i.toString()}>
                  <Month loggedIn={loggedIn}>{i + 1}月</Month>
                  <ImagePicker images={img} setImage={this.setImage(i)} />
                </MonthWrapper>
              ))}
            </TwitterImageWrapper>
            <div>
              <TextField
                value={displayName}
                onChange={e => setDisplayName(e.target.value)}
                label="お名前"
              />
            </div>
            <Comment
              label="コメント"
              value={comment}
              onChange={e => setComment(e.target.value)}
              multiline
            />
            <Tweet
              variant="outlined"
              multiline
              label="ツイート内容"
              value={`${
                displayName === '' ? '' : `${displayName}の`
              }お絵かき1年録！
#お絵かき1年録ジェネレーター${
                comment === ''
                  ? ''
                  : `

${comment}`
              }`}
            />
            <TweetButton />
          </Right>
        </Main>
      </div>
    );
  }
}
const nameState = withState('displayName', 'setDisplayName', '');
const commentState = withState('comment', 'setComment', '');
export default commentState(nameState(App));
