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

import { useDispatch, useSelector } from "react-redux";
import { loginStart, loginSuccess, loginFailure } from "../store/loginSlice";

export const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { loading } = useSelector((state) => state.login);
  const dispath = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispath(loginStart());

    try {
      const { data } = await axios.post("/api/v1/auth/admin/login", formData);

      console.log(data);
      dispath(loginSuccess(data.token));

      toast.success(data.message || "logged in success!");
      navigate("/");
    } catch (err) {
      dispath(loginFailure(err.response.data.message || "Failed to login"));
      toast.error(err.response.data.message || "Failed to login user");
      console.error(err);
    }
  };
  return (
    <div className="max-w-3xl sm:mx-auto sm:ml-64 mt-5 px-4">
      <Card className="">
        <CardHeader>
          <CardTitle>Login existing account</CardTitle>
          <CardDescription>please fill this form to enter.</CardDescription>
        </CardHeader>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <CardContent>
            <div className="grid w-full items-center gap-4">
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
            </div>
          </CardContent>
          <CardFooter className="">
            <Button type="submit" className="w-full">
              {loading ? "loading..." : "Login"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};
