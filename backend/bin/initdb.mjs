import fetch from 'node-fetch';
import { generateUser, generateTag } from "./data.mjs";

const tagURI = 'http://localhost:8000/tags';


for (let i = 0; i < 1000000; i++) {
  // const user = generateUser();
  // const response = await fetch(signupURI, {
  //   method: 'POST',
  //   headers:{
  //     'Content-Type': 'application/x-www-form-urlencoded'
  //   },body: new URLSearchParams(user)
  // });
  // //console.log(response);
    const tag = generateTag();
    const response = await fetch(tagURI, {
      method: 'POST',
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
      },body: new URLSearchParams(tag)
  });
  console.log(response);
}