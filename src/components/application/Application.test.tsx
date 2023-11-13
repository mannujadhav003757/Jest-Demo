process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  // You might want to throw the reason or handle it appropriately
});

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Application } from "./Application";

describe("Form rendering", () => {
  test("check renders correctly", () => {
    render(<Application />);

    //test Parent Div rendering
    const parentDiv = screen.getByTestId("parent-div");
    expect(parentDiv).toBeInTheDocument();

    //test case for check heading 1
    const formHeading1 = screen.getByRole("heading", {
      name: "Job Applicattion Form",
    });
    expect(formHeading1).toBeInTheDocument();

    //test case for check form heading 2
    const formHeading2 = screen.getByRole("heading", { name: "Section 1" });
    expect(formHeading2).toBeInTheDocument();

    // test case for check user icon image rendering
    const iconImg = screen.getByAltText("user_icon");
    expect(iconImg).toBeInTheDocument();

    // test case for check paragraph
    const p1 = screen.getByText("All fields are mandatory *********");
    expect(p1).toBeInTheDocument();
    const para = screen.getByText((content) => content.startsWith("All"));
    expect(para).toBeInTheDocument();

    // test case for check Name input box
    const input1 = screen.getByRole("textbox", { name: "Name:" });
    expect(input1).toBeInTheDocument();
    const name = screen.getByLabelText("Name:");
    expect(name).toBeInTheDocument();

    //test case for check Last Name Input Box
    const input3 = screen.getByPlaceholderText("Enter Last Name");
    expect(input3).toBeInTheDocument();

    //Test case for check Bio Input Box
    const input2 = screen.getByRole("textbox", { name: "Bio:" });
    expect(input2).toBeInTheDocument();
    const bio = screen.getByLabelText("Bio:", {
      selector: "input",
    });
    expect(bio).toBeInTheDocument();

    //test case for Country opttion comboBox
    const cmbBox = screen.getByRole("combobox");
    expect(cmbBox).toBeInTheDocument();

    // tast case for check terms and condition checkbox
    const chkBox1 = screen.getByRole("checkbox");
    expect(chkBox1).toBeInTheDocument();

    //test case for check boxx alert
    const span1 = screen.getByTitle("check_1");
    expect(span1).toBeInTheDocument();

    //test case for check submit button
    const btn1 = screen.getByRole("button");
    expect(btn1).toBeInTheDocument();
  });
});

describe("skills rendering", () => {
  test("check list rendernig", () => {
    const skills = [
      {
        id: 1,
        skill_name: "reactJs",
      },
      {
        id: 2,
        skill_name: "JavaScript",
      },
      {
        id: 3,
        skill_name: "TypeScript",
      },
      {
        id: 4,
        skill_name: "NodeJS",
      },
      {
        id: 5,
        skill_name: "expressJs",
      },
    ];
    render(<Application skillsData={skills} />);
    const listElement = screen.getByRole("list");
    expect(listElement).toBeInTheDocument();
  });

  test("renders a list of skills", () => {
    const skills = [
      {
        id: 1,
        skill_name: "reactJs",
      },
      {
        id: 2,
        skill_name: "JavaScript",
      },
      {
        id: 3,
        skill_name: "TypeScript",
      },
      {
        id: 4,
        skill_name: "NodeJS",
      },
      {
        id: 5,
        skill_name: "expressJs",
      },
    ];
    render(<Application skillsData={skills} />);
    const listItemElements = screen.getAllByRole("listitem");
    expect(listItemElements).toHaveLength(skills.length);
  });
});

describe("test submit form data", () => {
  it("submits form data with the correct payload", async () => {
    jest.setTimeout(30000);
    // Mock the fetch function
    const mockApiResponse = { success: true };
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockApiResponse),
    });

    // Render the component
    render(<Application />);

    // Simulate form input changes
    fireEvent.change(screen.getByLabelText("Name:"), {
      target: { value: "Manoj" },
    });
    fireEvent.change(screen.getByLabelText("Last Name:"), {
      target: { value: "Jadhav" },
    });
    fireEvent.change(screen.getByLabelText("Bio:"), {
      target: { value: "Hello world..!!" },
    });
    fireEvent.change(screen.getByLabelText("Job Location:"), {
      target: { value: "uk" },
    });

    // Submit the form
    fireEvent.submit(screen.getByRole("button"));

    // Wait for the fetch call to complete
    await waitFor(() => {
      // Check the payload sent to the API
      expect(global.fetch).toHaveBeenCalledWith(
        "http://localhost:3000/users",
        expect.objectContaining({
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: "Manoj",
            lname: "Jadhav",
            bio: "Hello world..!!",
            job_loc: "uk",
          }),
        })
      );
    });
  });
});
