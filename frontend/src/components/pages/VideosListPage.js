import React from "react";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";
import { Card, Col, List, Row, Spin } from "antd";
import { Player } from "video-react";

class VideosListPage extends React.Component {
  componentDidMount() {
    const { VideoStore: store } = this.props;
    store.loadVideos();
  }

  renderVideosList() {
    const { VideoStore: { videos, loading: { gettingVideos } } } = this.props;
    const modifiedToJSVideos = toJS(videos);
    return (
      <>
        {gettingVideos
          ? <Spin size="large" />
          : <List>
              <Row>
                {modifiedToJSVideos.map(item => (
                  <Col key={`video-${item._id}`} xl={12} lg={12} md={12} sm={24} xs={24}>
                    <Card title={item.video_name}>
                      <Player playesInline src={item.link} />
                    </Card>
                  </Col>
                ))}
              </Row>
            </List>
        }
      </>
    );
  }

  render() {
    return (
      <>
        <h3>List of videos</h3>
        {this.renderVideosList()}
      </>
    );
  }
}

export default inject("VideoStore")(observer(VideosListPage));
