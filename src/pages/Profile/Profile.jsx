import { ConnectButton } from "@rainbow-me/rainbowkit";
import React, { useState } from "react";
import CustomButton from "../../components/CustomButton";
import FormField from "../../components/FormField";
import { ethers } from "ethers";
import createUserabi from "../../utils/createuserabi.json";
import userabi from "../../utils/userabi.json";

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [contractuser, setContractuser] = useState("");
  const [form, setForm] = useState({
    user_name: "",
    user_email: "",
    user_pref_location: "",
  });

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const checkProfile = async (e) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.listAccounts();
    console.log(accounts);
    const signer = provider.getSigner()
    const contract = new ethers.Contract(
        "0x6c4Cda37aEFf8A94f84c3BF64A857F16030be89d",
        createUserabi,
        signer
    );
    return contract.checkUser(accounts[0]);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.listAccounts();
    // console.log(accounts);
    const signer = provider.getSigner()
    const contract = new ethers.Contract(
        "0x6c4Cda37aEFf8A94f84c3BF64A857F16030be89d",
        createUserabi,
        signer
    );
    
    if(!checkProfile){
      const tx = await contract.createUser(
        form.user_name,
        form.user_email,
        form.user_pref_location,
        accounts[0]
      )
      console.log("Transaction id" + tx);
    }
    else{
      console.log("Profile already created");
      console.log("This" + contract._users[accounts[0]]);
      setContractuser(contract._users[accounts[0]]);
      const contract2 = new ethers.Contract(
        contractuser,
        userabi,
        signer
      );
      console.log(contract2.name());
      setForm.user_name(contract2.name);
      setForm.email(contract2.email);
      setForm.user_pref_location(contract2.location);
    }

  };

  return (
    <div className="h-[95vh] bg-black-gradient-2">
      <div className="flex items-center justify-center flex-col">
        <div className="m-5">
          <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
            {isLoading && "Loader..."}
            {/* <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-purple-600 rounded-[10px]">
              <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">
                Your profile
              </h1>
            </div> */}
            <ConnectButton />
            <form
              onSubmit={handleSubmit}
              className="w-full mt-[30px] flex flex-col gap-[30px]"
            >
              <div className="flex flex-wrap gap-[30px]">
                <FormField
                  labelName="Your Name *"
                  placeholder="Your Name"
                  inputType="text"
                  value={form.user_name}
                  handleChange={(e) => handleFormFieldChange("user_name", e)}
                />
                <FormField
                  labelName="Your Email *"
                  placeholder="Enter your email"
                  inputType="text"
                  value={form.user_email}
                  handleChange={(e) => handleFormFieldChange("user_email", e)}
                />
              </div>

              <FormField
                labelName="Preferred Location *"
                placeholder="Your Preferred Location"
                inputType="text"
                value={form.user_pref_location}
                handleChange={(e) =>
                  handleFormFieldChange("user_pref_location", e)
                }
              />
              <div className="flex justify-center items-center mt-[20px]">
                <CustomButton
                  btnType="submit"
                  title="Update Profile"
                  styles="bg-purple-600"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
