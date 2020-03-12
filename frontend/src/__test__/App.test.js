import React from "react";
import {shallow} from "enzyme";
import App from "../containers/App";
import toJson from "enzyme-to-json";

describe("App", () => {
  it("renders without crashing", () => {
      const wrapper = shallow(<App />);
      expect(toJson(wrapper)).toMatchSnapshot();
  });
});
