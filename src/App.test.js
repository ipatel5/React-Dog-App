import React from "react";
import { shallow, mount } from "enzyme";
import App from "./App";

beforeAll(() => {
  global.fetch = jest.fn();
});
let wrapper;
beforeEach(() => {
  wrapper = shallow(<App />, { disableLifecycleMethods: true });
});
afterEach(() => {
  wrapper.unmount();
});

it("should render the App Component correctly", () => {
  expect(wrapper).toMatchSnapshot();
});

it("must show the select component dropdown list", done => {
  // here we are spying on componentDidMount to know that it has been called
  const spyDidMount = jest.spyOn(App.prototype, "componentDidMount");
  fetch.mockImplementation(() => {
    return Promise.resolve({
      status: 200,
      json: () => {
        return Promise.resolve({
          breedList: ["affenpinscher", "african", "airedale"]
        });
      }
    });
  });
  window.alert = () => {};
  const didMount = wrapper.instance().componentDidMount();

  // expecting componentDidMount have been called
  expect(spyDidMount).toHaveBeenCalled();
  didMount.then(() => {
    // updating the wrapper
    wrapper.update();
    expect(wrapper.find(".App").length).toBe(1);
    spyDidMount.mockRestore();
    fetch.mockClear();
    done();
  });
});
