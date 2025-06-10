import { generatePasswordResetEmailHtml, generateResetSuccessEmailHtml, generateWelcomeEmailHtml, htmlContent } from './hmtlEamil';
import {client, sender} from './mailtrap'


export const sendVerificationEmail = async (email: string, verificationToken:string) => {

  const recipient = [
  { email }];

  try {
    const res = await client.send({
      from:sender,
      to:recipient,
      subject:'Verify your email',
      html:htmlContent.replace("{verificationToken}", verificationToken),
      category:"email verification"
    })

  } catch (error) {
    console.log(error);
    throw new Error("Failed to send email verification")
  }

}

export const sendWelcomeEmail = async (email: string, name: string) => {
  const recipient = [{email}];
  const htmlContent = generateWelcomeEmailHtml(name)

  try {
    const res = await client.send({
      from:sender,
      to:recipient,
      subject:"Welcome to FoodEats",
      html:htmlContent,
      template_variables: {
        company_Info_name : "HamanEats",
        name:name
      }
    })
    
  } catch (error) {
    console.log(error);
    throw new Error("Error to send welcome email verification")
  }

}

export const sendPasswordRestEmail = async (email:string, reesetUrl:string) => {

  const recipient = [{email}];
  const htmlContent = generatePasswordResetEmailHtml(reesetUrl)
  try {
    const res = await client.send({
      from: sender,
      to:recipient,
      subject:"Reset your passowrd",
      html:htmlContent,
      category:"Reset passowrd"
    })
    
  } catch (error) {
    console.log(error);
    throw new Error("Failed to sendPasswordRestEmail ")
  }
}


export const sendResetSuccessEmail = async (email:string) => {
  const recipient = [{email}];
  const htmlContent = generateResetSuccessEmailHtml();
  try {
    const res = await client.send({
      from:sender,
      to:recipient,
      subject:"Password Reset successfully",
      html:htmlContent,
      category:"Password Reset"
    })
    
  } catch (error) {
    console.log(error)
    throw new Error('Failed to send ResetSuccessEmail ')
  }
}