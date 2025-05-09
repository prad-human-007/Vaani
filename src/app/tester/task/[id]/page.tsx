"use client";

import { useState, useEffect } from "react";
import Orb from "@/components/vapi/orb";
import useVapi from "@/hooks/use-vapi";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { showRatingDialogAtom } from "@/atom/ratingatom";
import { useAtom } from "jotai";
// import { StarIcon } from "@/components/livekit/StarIcon";
// import { CloseIcon } from "@/components/livekit/CloseIcon";

export default function TestPage() {
  const { isSessionActive, showRatingDialog, setShowRatingDialog } = useVapi();
  const [showRatingDialogState, setShowRatingDialogState] = useAtom(showRatingDialogAtom);
  const [tasks, setTasks] = useState(null);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [feedback, setFeedback] = useState("");


const [liked, setLiked] = useState('');
const [improvement, setImprovement] = useState('');
const [experienceType, setExperienceType] = useState('');

  useEffect(() => {
    console.log("State changed:", {
      isSessionActive,
      showRatingDialog,
    });
  }, [isSessionActive, showRatingDialog]);

  useEffect(() => {
    async function fetchTasks() {
      const fetchedTasks = [
        { id: 1, name: "Sample Task", description: "This is a sample task." },
      ];
      setTasks(fetchedTasks);
    }
    fetchTasks();
  }, []);

  const handleRate = (rating: number) => {
    setSelectedRating(rating);
    setTimeout(() => {
      setShowRatingDialog(false);
    }, 800);
  };

  const handleDialogClose = () => {
    setShowRatingDialog(false);
    setSelectedRating(null);
    setFeedback("");
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4">
      <Orb onShowRatingDialogChange={setShowRatingDialog} />

      {tasks && tasks.length > 0 && (
        <div className="mt-4 p-4 bg-card rounded-lg shadow w-full max-w-md">
          <h2 className="text-lg font-bold mb-2 text-card-foreground">Task Details:</h2>
          <pre className="text-sm overflow-auto text-card-foreground/90">
            {JSON.stringify(tasks[0], null, 2)}
          </pre>
        </div>
      )}

<Dialog open={showRatingDialogState} onOpenChange={setShowRatingDialogState}>
  <DialogContent className="bg-zinc-900 text-white border-zinc-700">
    <DialogHeader>
      <DialogTitle className="text-white">Rate Your Experience</DialogTitle>
      <p className="text-sm text-zinc-400 mt-1">
        Your feedback helps us improve. Please rate and share your thoughts.
      </p>
    </DialogHeader>
    <div className="flex flex-col items-center py-4">
      {/* Star Rating */}
      <div className="flex space-x-1 mb-4">
        {[1, 2, 3, 4, 5].map((starIndex) => {
          const isFilled = selectedRating && starIndex <= selectedRating;
          return (
            <button
              key={starIndex}
              type="button"
              onClick={() => handleRate(starIndex)}
              className={`p-1 text-3xl cursor-pointer transition-colors ${
                isFilled ? "text-yellow-400" : "text-zinc-500"
              }`}
              aria-label={`Rate ${starIndex} stars`}
            >
              ★
            </button>
          );
        })}
      </div>

      {/* Feedback Fields */}
      <Textarea
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        placeholder="Overall feedback (optional)"
        className="mb-4 bg-zinc-800 border-zinc-600 text-white placeholder-zinc-400 w-full"
      />
      <Textarea
        value={liked}
        onChange={(e) => setLiked(e.target.value)}
        placeholder="What did you like?"
        className="mb-4 bg-zinc-800 border-zinc-600 text-white placeholder-zinc-400 w-full"
      />
      <Textarea
        value={improvement}
        onChange={(e) => setImprovement(e.target.value)}
        placeholder="What could be improved?"
        className="mb-4 bg-zinc-800 border-zinc-600 text-white placeholder-zinc-400 w-full"
      />

      {/* Experience Type */}
      <select
        value={experienceType}
        onChange={(e) => setExperienceType(e.target.value)}
        className="mb-4 bg-zinc-800 border border-zinc-600 text-white w-full p-2 rounded"
      >
        <option value="">Select experience type</option>
        <option value="support">Support</option>
        <option value="product">Product</option>
        <option value="delivery">Delivery</option>
        <option value="other">Other</option>
      </select>

      {/* Buttons */}
      <div className="flex justify-end w-full">
        <Button onClick={handleDialogClose} className="bg-yellow-500 hover:bg-yellow-600 text-black">
          Submit
        </Button>
        <Button
          variant="ghost"
          onClick={handleDialogClose}
          className="ml-2 text-zinc-400 hover:text-white"
        >
          Maybe Later
        </Button>
      </div>
    </div>
  </DialogContent>
</Dialog>


    </div>
  );
}
