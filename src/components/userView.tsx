import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { createStartup } from '@/services/startup.service';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner';

export default function UserView() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [startupName, setStartupName] = useState('');
    const [startupWebsite, setStartupWebsite] = useState('');
    const [startupFounder, setStartupFounder] = useState('');
    const [startupDescription, setStartupDescription] = useState('');
    const [startupCity, setStartupCity] = useState('');
    const [startupCountry, setStartupCountry] = useState('');
    const [startupStage, setStartupStage] = useState('');
    const [phone, setPhone] = useState('');

    const handleDialogState = () => {
        setIsDialogOpen(!isDialogOpen);
    };

    const handleSubmit = async (e:React.SyntheticEvent) => {
        e.preventDefault();
        // Here you can implement the logic to create a new startup with the provided data
        console.log('Creating startup:', startupName, startupWebsite, startupFounder, startupDescription, startupCity, startupCountry, startupStage);

        const newStartup = await createStartup(
            startupName,
            startupWebsite,
            startupFounder,
            startupDescription,
            startupCity,
            startupCountry,
            startupStage,
            phone
        );

        // Reset the form fields after submission
        setStartupName('');
        setStartupWebsite('');
        setStartupFounder('');
        setStartupDescription('');
        setStartupCity('');
        setStartupCountry('');
        setStartupStage('');
        // Close the dialog
        setIsDialogOpen(false);
    };

    return (
        <Dialog open={isDialogOpen} onOpenChange={handleDialogState}>
            <DialogTrigger>
                    <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md transition-transform transform-gpu group-hover:scale-105">
                        <h3 className="font-semibold">Add New Startup</h3>
                        <p className="text-sm text-gray-500">Click here to create a new startup</p>
                    </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Startup</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col space-y-4">
                        <Label htmlFor="startupName">Startup Name</Label>
                        <Input type="text" id="startupName" name="startupName" value={startupName} onChange={(e) => setStartupName(e.target.value)} placeholder="Enter startup name" required />

                        <Label htmlFor="startupWebsite">Startup Website</Label>
                        <Input type="text" id="startupWebsite" name="startupWebsite" value={startupWebsite} onChange={(e) => setStartupWebsite(e.target.value)} placeholder="Enter startup website" required />

                        <Label htmlFor="startupFounder">Founder</Label>
                        <Input type="text" id="startupFounder" name="startupFounder" value={startupFounder} onChange={(e) => setStartupFounder(e.target.value)} placeholder="Enter founder name" required />

                        <Label htmlFor="startupDescription">Description</Label>
                        <Input type="text" id="startupDescription" name="startupDescription" value={startupDescription} onChange={(e) => setStartupDescription(e.target.value)} placeholder="Enter startup description" required />

                        <Label htmlFor="startupCity">City</Label>
                        <Input type="text" id="startupCity" name="startupCity" value={startupCity} onChange={(e) => setStartupCity(e.target.value)} placeholder="Enter startup city" required />

                        <Label htmlFor="startupCountry">Country</Label>
                        <Input type="text" id="startupCountry" name="startupCountry" value={startupCountry} onChange={(e) => setStartupCountry(e.target.value)} placeholder="Enter startup country" required />

                        <Label htmlFor="startupStage">Stage</Label>
                        <Select defaultValue="IDEA" value={startupStage} onValueChange={(value) => setStartupStage(value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Stage" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="IDEA">Idea</SelectItem>
                              <SelectItem value="DEVELOPMENT">Development</SelectItem>
                              <SelectItem value="LAUNCH">Launch</SelectItem>
                            </SelectContent>
                          </Select>
                        <div className="flex justify-end">
                            <Button type="submit">Create Startup</Button>
                        </div>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
