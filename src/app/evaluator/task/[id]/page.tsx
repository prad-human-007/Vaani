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
import { StarIcon } from "@/components/livekit/StarIcon";
import { Textarea } from "@/components/ui/textarea";
import { CloseIcon } from "@/components/livekit/CloseIcon";
import { showRatingDialogAtom } from "@/atom/ratingatom";
import { useAtom } from "jotai";
export default function TestPage() {
  const { isSessionActive, showRatingDialog, setShowRatingDialog } = useVapi();
  const [showRatingDialogState, setShowRatingDialogState] =
    useAtom(showRatingDialogAtom);
  const [tasks, setTasks] = useState(null);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [feedback, setFeedback] = useState("");

  // Debug logging
  useEffect(() => {
    console.log("State changed:", {
      isSessionActive,
      showRatingDialog,
    });
  }, [isSessionActive, showRatingDialog]);

  useEffect(() => {
    // Fetch tasks (example logic)
    async function fetchTasks() {
      // Simulate fetching tasks
      const fetchedTasks = [
        { id: 1, name: "Sample Task", description: "This is a sample task." },
      ];
      setTasks(fetchedTasks);
    }
    fetchTasks();
  }, []);

  const handleRate = (rating: number) => {
    setSelectedRating(rating);
    // Optionally, send rating to backend here
    setTimeout(() => {
      setShowRatingDialog(false);
    }, 800); // Show feedback for a moment
  };

  const handleDialogClose = () => {
    setShowRatingDialog(false);
    setSelectedRating(null);
    setFeedback("");
  };

    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((starIndex) => {
          const isFilled = starIndex <= hoverRating;
          const starColor = isFilled
            ? 'text-yellow-400'
            : 'text-gray-300 dark:text-gray-600';
          return (
            <button
              key={starIndex} type="button"
              onMouseEnter={() => setHoverRating(starIndex)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => onRate(starIndex)}
              className={`p-1 bg-transparent border-none text-3xl cursor-pointer transition-colors duration-150 ease-in-out ${starColor}`}
              aria-label={`Rate ${starIndex} stars`}
            > ★ </button>
          );
        })}
      </div>
    );
  };
  // --- End Star Rating Component ---


  // Determine dialog content based on the *absolute* first load
  const DialogBody = () => {
    // We use isFirstLoadEver state which is determined by localStorage check on mount
    if (isFirstLoadEver) {
      // Absolute first time content: Mic check
      console.log("Rendering Mic Check Dialog"); // Debug log
      return (
        <>
          <DialogHeader>
            <DialogTitle>Microphone Check</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center py-4">
            <p className="text-foreground/80 mb-4 text-center">
              Before we begin, please make sure your microphone is turned on and working correctly.
            </p>
             <Button onClick={handleCloseFirstTimeDialog}>Got it!</Button>
          </div>
        </>
      );
    } else {
      // Subsequent loads EVER content: Rating
      console.log("Rendering Rating Dialog"); // Debug log
      return (
        <>
          <DialogHeader>
            <DialogTitle>Rate Your Experience</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center py-4">
            <p className="text-foreground/80 mb-4">How was your experience?</p>
            <StarRating onRate={handleRate} />
             <Button variant="ghost" onClick={() => setShowDialog(false)} className="mt-4">
               Maybe Later
             </Button>
          </div>
        </>
      );
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4">
      {/* Orb triggers the dialog by calling onShowRatingDialogChange(true) */}
      <Orb onShowRatingDialogChange={setShowDialog} />

      {tasks && tasks.length > 0 && (
         <div className="mt-4 p-4 bg-card rounded-lg shadow w-full max-w-md">
          <h2 className="text-lg font-bold mb-2 text-card-foreground">Task Details:</h2>
          <pre className="text-sm overflow-auto text-card-foreground/90">{JSON.stringify(tasks[0], null, 2)}</pre>
        </div>
      )}

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
           {/* Render body only when open and after initial check */}
           {showDialog && <DialogBody />}
        </DialogContent>
      </Dialog>
    </div>
  );
}
