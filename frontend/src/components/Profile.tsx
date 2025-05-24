import { Loader2, LocateIcon, Mail, MapPin, MapPinnedIcon, Plus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import React, { useRef, useState, type FormEvent } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";


const Profile = () => {


  const imageRef = useRef<HTMLInputElement | null>(null)
  const [selectedProfilePicture, setSelectedProfilePicture] = useState<string>("");
  const [profileData, setProfileData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    profilePicture: "",

  })

  const loading = false;


  const fileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {

    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setSelectedProfilePicture(result)
        setProfileData((prevData) => ({ ...prevData, profilePicture: result }))
      };
      reader.readAsDataURL(file);
    };


  }


  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setProfileData({ ...profileData, [name]: value });
  }


  const updateProfileHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(profileData)
  }

  return (
    <form onSubmit={updateProfileHandler} className="max-w-7xl mx-auto my-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar className="relative md:w-28 md:h-28 w-20">
            <AvatarImage src={selectedProfilePicture} alt="Profile" className="object-cover" />
            <AvatarFallback>CN</AvatarFallback>

            <input
              ref={imageRef}
              type="file"
              onChange={fileChangeHandler}
              accept="image/*"
              className="hidden" />
            <div
              className="absolute inset-0 items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300"
              onClick={() => imageRef.current?.click()}
            >
              <Plus className="text-white w-8 h-8" />
            </div>
          </Avatar>
          <Input
            type="text"
            name='fullName'
            value={profileData.fullName}
            onChange={changeHandler}
            className="font-bold text-2xl outline-none border-none focus-visible:ring-transparent"
          />
        </div>
      </div>
      <div className="grid md:grid-cols-4 md:gap-3 my-10 ">
        <div className="flex items-center gap-4 rounded-sm p-2">
          <Mail className="text-gray-500" />
          <div className="w-full">
            <Label>
              Email
            </Label>
            <Input
              name="email"
              value={profileData.email}
              onChange={changeHandler}
              className="w-full text-gray-600 bg-transparent focus-visible:ring-transparent focus-visible:ring-0 focus-visible:border-transparent outline-none" />
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-sm p-2">
          <LocateIcon className="text-gray-500" />
          <div className="w-full">
            <Label>
              Address
            </Label>
            <Input
              name="address"
              value={profileData.address}
              onChange={changeHandler}
              className="w-full text-gray-600 bg-transparent focus-visible:ring-transparent focus-visible:ring-0 focus-visible:border-transparent outline-none" />
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-sm p-2">
          <MapPin className="text-gray-500" />
          <div className="w-full">
            <Label>
              City
            </Label>
            <Input
              name="city"
              value={profileData.city}
              onChange={changeHandler}
              className="w-full text-gray-600 bg-transparent focus-visible:ring-transparent focus-visible:ring-0 focus-visible:border-transparent outline-none" />
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-sm p-2">
          <MapPinnedIcon className="text-gray-500" />
          <div className="w-full">
            <Label>
              Country
            </Label>
            <Input
              name="country"
              value={profileData.country}
              onChange={changeHandler}
              className="w-full text-gray-600 bg-transparent focus-visible:ring-transparent focus-visible:ring-0 focus-visible:border-transparent outline-none" />
          </div>
        </div>
      </div>
      <div className="text-center">
        {
          loading ? (
            <Button disabled={loading}>
              <Loader2 className="mr-2 w-4 h-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button className="bg-orange-600 hover:bg-orange-800">
              Update
            </Button>
          )
        }
      </div>
    </form>
  );
};

export default Profile;
