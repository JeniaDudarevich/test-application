import React from "react";
import { Button, Col, Form, Input, Row, Spin } from "antd";
import { inject, observer } from "mobx-react";

class UploadVideoPage extends React.Component {
  state = {
    file: "",
    files: {}
  };

  formRef = React.createRef();

  submitHandler = values => {
    const { videoName } = values;
    const { files } = this.state;
    const { VideoStore: store } = this.props;
    store.uploadVideo(files, videoName).then(() => {
      this.formRef.current.resetFields();
    });
  };

  handleChange = event => {
    this.setState({
      file: event.target.value,
      files: event.target.files[0]
    });
  };

  render() {
    const { file } = this.state;
    const { VideoStore: {
      loading: { uploadingVideo }}
    } = this.props;
    return (
      <Spin spinning={uploadingVideo}>
        <Form onFinish={this.submitHandler} ref={this.formRef}>
          <Row gutter={16}>
            <Col md={10} lg={10} xl={10}>
              <Form.Item
                name="videoName"
                label="Enter video name"
                rules={[
                  {
                    required: true,
                    message: "Video name field is required"
                  }
                  ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col md={10} lg={10} xl={10}>
              <Form.Item
                name="videoFile"
                label="Select file for upload"
                rules={[
                  {
                    required: true,
                    message: "Video file field is required"
                  }
                ]}
              >
                <Input
                  accept=".mp4"
                  type="file"
                  className="uploader-field"
                  value={file}
                  onChange={this.handleChange}
                />
              </Form.Item>
            </Col>
            <Col md={4} lg={4} xl={4} className="custom-column">
              <Form.Item>
                <Button
                  htmlType="submit"
                  size="large"
                  type="primary">
                  Upload
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Spin>
    );
  }
}

export default inject("VideoStore")(observer(UploadVideoPage));
