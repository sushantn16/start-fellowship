'use client'
import React, { useState } from 'react';
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default function Component() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dob: '',
    address: '',
    city: '',
    country: '',
    nationality: '',
    residence: '',
    idType: '',
    idNumber: '',
    idIssue: '',
    idExpiry: '',
    startupName: '',
    startupWebsite: '',
    startupFounding: '',
    startupDescription: '',
    pitchDeck: null,
    video: '',
    question1: '',
    question2: '',
    question3: '',
    question4: '',
    referrer: '',
    experience: '',
    skills: '',
    question5: '',
    question6: '',
    question7: '',
    question8: '',
    question9: '',
    question10: '',
    confirmationName: '',
    confirmationDate: '',
  });

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e:any) => {
    const { name, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files[0],
    }));
  };

  const handleSubmit = (e:React.SyntheticEvent) => {
    e.preventDefault();
    console.log(formData);
    // Add your submission logic here
  };

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">START Fellowship 23/24 - Application Form LatAm</h1>
        <p className="text-gray-500 dark:text-gray-400">
          This form is for individual applicants and does not include co-founders. Each co-founder needs to apply
          separately. The form is limited to a maximum of 2 co-founders per startup. Please note that this form does not
          save your progress, so ensure that you complete it in one session.
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="first-name">First name</Label>
              <Input id="first-name" placeholder="First name" required name="firstName" value={formData.firstName} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last-name">Last name</Label>
              <Input id="last-name" placeholder="Last name" required name="lastName" value={formData.lastName} onChange={handleChange} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="Email" required type="email" name="email" value={formData.email} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone number</Label>
            <Input id="phone" placeholder="Phone number" required type="tel" name="phone" value={formData.phone} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dob">Date of birth</Label>
            <Input id="dob" required type="date" name="dob" value={formData.dob} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input id="address" placeholder="Address" required name="address" value={formData.address} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input id="city" placeholder="City" required name="city" value={formData.city} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Input id="country" placeholder="Country" required name="country" value={formData.country} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="nationality">Nationality</Label>
            <Input id="nationality" placeholder="Nationality" required name="nationality" value={formData.nationality} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="residence">Country of residence</Label>
            <Input id="residence" placeholder="Country of residence" required name="residence" value={formData.residence} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="id-type">ID type</Label>
            <Select>
              <SelectTrigger id="id-type">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="passport">Passport</SelectItem>
                <SelectItem value="national-id">National ID card</SelectItem>
                <SelectItem value="driving-license">Driving license</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="id-number">ID number</Label>
            <Input id="id-number" placeholder="ID number" required name="idNumber" value={formData.idNumber} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="id-issue">ID issue date</Label>
            <Input id="id-issue" required type="date" name="idIssue" value={formData.idIssue} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="id-expiry">ID expiry date</Label>
            <Input id="id-expiry" required type="date" name="idExpiry" value={formData.idExpiry} onChange={handleChange} />
          </div>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="startup-name">Startup name</Label>
            <Input id="startup-name" placeholder="Startup name" required name="startupName" value={formData.startupName} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="startup-website">Startup website</Label>
            <Input id="startup-website" placeholder="Startup website" name="startupWebsite" value={formData.startupWebsite} onChange={handleChange} />
            </div>
          <div className="space-y-2">
            <Label htmlFor="startup-founding">Date of startup founding</Label>
            <Input id="startup-founding" required type="date" name="startupFounding" value={formData.startupFounding} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="startup-description">Brief description of your startup</Label>
            <Textarea id="startup-description" placeholder="Description" required name="startupDescription" value={formData.startupDescription} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pitch-deck">Pitch deck</Label>
            <Input accept=".pdf" id="pitch-deck" required type="file" name="pitchDeck" onChange={handleFileChange} />
            <p className="text-sm text-gray-500 dark:text-gray-400">Please upload your pitch deck as a PDF file.</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="video">Video pitch</Label>
            <Input id="video" placeholder="Video URL" required type="url" name="video" value={formData.video} onChange={handleChange} />
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Please provide a link to your 3-minute video pitch (e.g. YouTube, Vimeo).
            </p>
          </div>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="question1">Why are you passionate about your startup? (max. 300 words)</Label>
            <Textarea id="question1" required name="question1" value={formData.question1} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="question2">What problem does your startup solve? (max. 300 words)</Label>
            <Textarea id="question2" required name="question2" value={formData.question2} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="question3">How is your solution unique? (max. 300 words)</Label>
            <Textarea id="question3" required name="question3" value={formData.question3} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="question4">What is your vision for your startup? (max. 300 words)</Label>
            <Textarea id="question4" required name="question4" value={formData.question4} onChange={handleChange} />
          </div>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="referrer">How did you hear about the START Fellowship? (max. 300 words)</Label>
            <Textarea id="referrer" required name="referrer" value={formData.referrer} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="experience">
              Please describe your previous entrepreneurial experience (if any). (max. 300 words)
            </Label>
            <Textarea id="experience" required name="experience" value={formData.experience} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="skills">What skills or expertise do you bring to your startup? (max. 300 words)</Label>
            <Textarea id="skills" required name="skills" value={formData.skills} onChange={handleChange} />
          </div>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="question5">
              What are your short-term and long-term goals for your startup? (max. 300 words)
            </Label>
            <Textarea id="question5" required name="question5" value={formData.question5} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="question6">
              What are the biggest challenges you expect to face in building your startup? (max. 300 words)
            </Label>
            <Textarea id="question6" required name="question6" value={formData.question6} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="question7">How do you plan to measure the impact of your startup? (max. 300 words)</Label>
            <Textarea id="question7" required name="question7" value={formData.question7} onChange={handleChange} />
          </div>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="question8">How do you plan to scale your startup? (max. 300 words)</Label>
            <Textarea id="question8" required name="question8" value={formData.question8} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="question9">
              How will you apply the knowledge gained from the START Fellowship to your startup? (max. 300 words)
            </Label>
            <Textarea id="question9" required name="question9" value={formData.question9} onChange={handleChange} />
          </div>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="question10">Is there anything else you would like to share with us? (max. 300 words)</Label>
            <Textarea id="question10" name="question10" value={formData.question10} onChange={handleChange} />
          </div>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>
              I confirm that the information provided in this application is true, complete, and accurate to the best of
              my knowledge. I understand that any false statements or omissions may disqualify my application or lead to
              the revocation of the START Fellowship.
            </Label>
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>First name and last name (as a digital signature)</Label>
                  <Input placeholder="First name and last name" required name="confirmationName" value={formData.confirmationName} onChange={handleChange} />
                </div>
                <div>
                  <Label>Today's date</Label>
                  <Input required type="date" name="confirmationDate" value={formData.confirmationDate} onChange={handleChange} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <Button size="lg" type="submit">Submit application</Button>
        </div>
      </form>
    </div>
  );
}
