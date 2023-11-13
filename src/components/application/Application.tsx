import { useState } from "react";
import { SkillsProps, skills } from "./Skills.types";
import { submitUser } from "../../services";
export const Application = (props: any) => {
  const { skillsData } = props;
  console.log("************heello world", skillsData);
  const [formData, setFormData] = useState({
    name: "",
    lname: "",
    bio: "",
    job_loc: "",
  });

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const result = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      throw error;
    }
  };

  console.log("===================", formData);

  return (
    <div data-testid="parent-div">
      <h1> Job Applicattion Form</h1>
      <h2> Section 1</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <img
            src="https://cdn-icons-png.flaticon.com/512/666/666201.png"
            alt="user_icon"
          />
        </div>
        <div>
          <p style={{ color: "red" }}>All fields are mandatory *********</p>
        </div>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            placeholder="Enter First Name"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="lname">Last Name:</label>
          <input
            type="text"
            id="lname"
            name="lname"
            placeholder="Enter Last Name"
            value={formData.lname}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="bio">Bio:</label>
          <input
            type="text"
            name="bio"
            id="bio"
            value={formData.bio}
            placeholder="Enter Bio"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="job-location">Job Location:</label>
          <select name="job_loc" id="job-location" onChange={handleChange}>
            <option value="ind">India</option>
            <option value="us">USA</option>
            <option value="uk">UK</option>
            <option value="pak">Pakistan</option>
            <option value="ch">China</option>
          </select>
        </div>
        <div>
          <label htmlFor=""></label>
          <input type="checkbox" id="terms" /> Accept terms and Condtions.
        </div>
        <div>
          <span title="check_1">Please mark the CheckBox</span>
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
      <div>
        <ol>
          {skillsData?.map((item: SkillsProps) => (
            <li key={item.id}>{item.skill_name}</li>
          ))}
        </ol>
      </div>
    </div>
  );
};
