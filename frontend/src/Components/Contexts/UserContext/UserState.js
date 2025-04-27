import userContext from "./UserContext";

const tokenData = localStorage.getItem("accessToken")


const UserState = (props) => {
  const signUser = async ({ fullName, email, password }, userPic) => {
    try {
      const formData = new FormData();

      formData.append("fullName", fullName);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("profilePic", userPic);

      const response = await fetch(
        `https://personal-expense-tracker-sigma.vercel.app/api/v1/user/registeruser`,
        {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      );

      const data = await response.json();
      return data;
    } catch (error) {
      console.log("Issue while registering the user", error);
    }
  };

const logInUser = async ({email, password}) =>{
    try {
        const response = await fetch(`${process.env.REACT_APP_URL}/user/loginuser`, {
            method:"POST",
            credentials: "include",
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                email:email,
                password:password
            })
        })
    
        const data = await response.json();
        return data
    } 
    catch (error) {
    console.log("issue while login")    
    }

}

const logOutUser = async () =>{
    try {
        const response = await fetch(`${process.env.REACT_APP_URL}/user/logout`, {
            method:"POST",
            credentials: "include",
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Bearer ${tokenData}`,
            },
        })
    
        const data = await response.json()
        return data
    } 
    catch (error) {
    console.log("Issue while log out the user")    
    }

}

  return (
    <userContext.Provider value={{ signUser, logInUser, logOutUser }}>
      {props.children}
    </userContext.Provider>
  );
};

export default UserState;
