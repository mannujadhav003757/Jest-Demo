import { render, screen } from "@testing-library/react";
import { Greet } from "../components/greet/greet";
import { toBeInTheDocument } from "@testing-library/jest-dom/matchers";

//Example of create grouping of test cases using describe method of jest

describe("greetTestGroup", () => {
  test("test1 - greet renders correctly", () => {
    render(<Greet />);
    let result = screen.getByText("Hello");
    expect(result).toBeInTheDocument();
  });

  // Example of test Driven Devlopments
  // greet should render the text hello if a name is passed into component it should render
  // hello followed by name

  test("test2", () => {
    render(<Greet data="manoj" />);
    let result = screen.getByText("Hello" + "manoj");
    expect(result).toBeInTheDocument();
  });
});
