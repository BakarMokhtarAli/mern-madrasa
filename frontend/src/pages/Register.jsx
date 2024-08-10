import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
export const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false); // Loading state

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await axios.post("/api/v1/admin", formData);

      console.log(data);
      setLoading(false);
      toast.success(data.data.message || "User registered successfully!");
      navigate("/login");
    } catch (err) {
      setLoading(false);

      toast.error(err.response.data.message || "Failed to register user");
      console.error(err);
    }
  };
  return (
    <div className="max-w-3xl sm:mx-auto sm:ml-64 mt-5 px-4">
      <Card className="">
        <CardHeader>
          <CardTitle>Create new user</CardTitle>
          <CardDescription>
            please fill this form with your info.
          </CardDescription>
        </CardHeader>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">User Name</Label>
                <Input
                  onChange={handleInputChange}
                  id="username"
                  placeholder="enter username"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  onChange={handleInputChange}
                  type="email"
                  id="email"
                  placeholder="email"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  onChange={handleInputChange}
                  id="password"
                  placeholder="password"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="confirmPasswors">Confirm Passwors</Label>
                <Input
                  type="password"
                  onChange={handleInputChange}
                  id="confirmPassword"
                  placeholder="please confirm your password"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="">
            <Button type="submit" className="w-full">
              {loading ? "loading..." : "Submit"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};
