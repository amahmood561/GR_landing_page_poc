import { useState, useEffect } from "react";
import { notification } from "antd";
import axios from "axios";
import emailjs from 'emailjs-com';
declare const window: any;


export const useForm = (validate: any) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [shouldSubmit, setShouldSubmit] = useState(false);
  const smtpjs = window.Email;

  const openNotificationWithIcon = () => {
    notification["success"]({
      message: "Success",
      description: "Your message has been sent!",
    });
  };

  const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors(validate(values));
    // Your url for API  23252e3b-a401-4294-ac28-f8600e084f1b
    console.log(Object.keys(values))


    let send = await smtpjs.send({
      SecureToken : "23252e3b-a401-4294-ac28-f8600e084f1b",
      To : 'amahmood561@gmail.com',
      From : 'amahmood561@gmail.com',
      Subject : Object.keys(values)[1],
      Body : Object.keys(values)[2] + ' ' +  Object.keys(values)[0]
    })

    const url = "";
    if (Object.keys(values).length === 3) {
      let send = await smtpjs.send({
        SecureToken : "23252e3b-a401-4294-ac28-f8600e084f1b",
        To : 'amahmood561@gmail.com',
        From : 'amahmood561@gmail.com',
        Subject : Object.keys(values)[1],
        Body : Object.keys(values)[2] + ' ' +  Object.keys(values)[0]
      })
      if (send == "OK"){
        console.log("sent successful")
      }
    }
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && shouldSubmit) {
      setValues("");
      openNotificationWithIcon();
    }
  }, [errors, shouldSubmit]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
    setErrors((errors) => ({ ...errors, [event.target.name]: "" }));
  };

  return {
    handleChange,
    handleSubmit,
    values,
    errors,
  };
};
