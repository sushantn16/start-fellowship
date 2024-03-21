import { useState, useEffect } from "react";
import Milestone from "./milestone";
import { getMilestone, createMilestone } from "@/services/milestone.service";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface MilestoneProps {
    startupId: number;
}

export interface Milestone {
    title: string;
    description: string;
}

export default function Timeline({ startupId }: MilestoneProps) {
    const [milestones, setMilestones] = useState<Milestone[]>([]);
    const [newMilestoneTitle, setNewMilestoneTitle] = useState("");
    const [newMilestoneDescription, setNewMilestoneDescription] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const onDialogChange = () => {
        setIsDialogOpen(!isDialogOpen);
    };

    const fetchMilestones = async () => {
        const milestonesData = await getMilestone(startupId);
        setMilestones(milestonesData);
    };

    useEffect(() => {
        fetchMilestones();
    }, [startupId]);

    const handleMilestoneSubmit = async () => {
        if (newMilestoneTitle.trim() !== "" && newMilestoneDescription.trim() !== "") {
            await createMilestone(newMilestoneTitle, newMilestoneDescription, startupId);
            fetchMilestones();
            setNewMilestoneTitle("");
            setNewMilestoneDescription("");
        }
    };

    return (
        <div className="w-full max-w-3xl">
            <div className="relative w-px h-full bg-gray-200 dark:bg-gray-800">
                <div className="absolute w-4 h-4 transform -translate-x-2 -translate-y-2 top-0 left-1/2 -translate-x-1/2 rounded-full border-2 border-gray-200 dark:border-gray-800 bg-gray-200 dark:bg-gray-800" />
                <div className="absolute w-4 h-4 bottom-0 left-1/2 -translate-x-1/2 rounded-full border-2 border-gray-200 dark:border-gray-800 bg-gray-200 dark:bg-gray-800" />
                <div className="flex flex-col gap-4 px-4 py-2">
                    {milestones.map((milestone: Milestone, index: number) => (
                        <Milestone key={index} title={milestone.title} description={milestone.description} />
                    ))}

                    <Dialog open={isDialogOpen} onOpenChange={onDialogChange}>
                        <DialogTrigger>
                            Add Event
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add Event</DialogTitle>
                            </DialogHeader>
                            <div className="flex flex-col gap-2">
                                <Input
                                    type="text"
                                    placeholder="Enter milestone title"
                                    value={newMilestoneTitle}
                                    onChange={(e) => setNewMilestoneTitle(e.target.value)}
                                />
                                <Input
                                    type="text"
                                    placeholder="Enter milestone description"
                                    value={newMilestoneDescription}
                                    onChange={(e) => setNewMilestoneDescription(e.target.value)}
                                />
                                <Button onClick={handleMilestoneSubmit}>Add Milestone</Button>
                            </div>
                        </DialogContent>
                    </Dialog>

                </div>
            </div>
        </div>
    );
}
