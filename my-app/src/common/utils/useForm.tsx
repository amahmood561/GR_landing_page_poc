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
    console.log(Object.keys(values))
    console.log(values)
    //@ts-ignore
    let email: string = values.email
    //@ts-ignore
    let name: string = values.name
    //@ts-ignore
    let message: string = values.message
    console.log(message)

    //https://www.smtpjs.com/
    const url = "";
    if (Object.keys(values).length === 3) {
      let send = await smtpjs.send({
        SecureToken : "23252e3b-a401-4294-ac28-f8600e084f1b",
        To : 'amahmood561@gmail.com',
        From : 'amahmood561@gmail.com',
        Subject : name,
        Body : message + ' ' + email
      })

      console.log(send)

      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Accept', 'application/json');
      headers.append('Access-Control-Allow-Origin', "*");
      headers.append('Access-Control-Allow-Credentials', 'true');
      headers.append('GET', 'POST');
      //http://desolate-taiga-68374.herokuapp.com/v1/customemail
      let request = await axios.post('http://desolate-taiga-68374.herokuapp.com/v1/customemail', {
        subject: name,
        message:  message + ' ' + email
      })
      /*
      let request = await axios.post('http://127.0.0.1:5000/v1/customemail', {
        subject: name,
        message:  message + ' ' + email
      })*/

      console.log(request)
      // hit custom api
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
