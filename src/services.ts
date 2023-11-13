type payloadData ={
    name:string;
    lname:string;
    bio:string;
    job_loc:string
}
export const submitUser = async (payload: payloadData): Promise<any> => {
    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload), 
      });

      console.log("Here is reponse>>>>>>",response)
  
      if (!response.ok) {
        throw new Error(`Failed to submit user data. Status: ${response.status}`);
      }
  
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error submitting user data:", error);
      throw error;
    }
  };
  
  