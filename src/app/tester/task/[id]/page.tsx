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
import { StarIcon } from "@/components/livekit/StarIcon";
import { CloseIcon } from "@/components/livekit/CloseIcon";

export default function TestPage() {
  const { isSessionActive, showRatingDialog, setShowRatingDialog } = useVapi();
  const [showRatingDialogState, setShowRatingDialogState] =
    useAtom(showRatingDialogAtom);
  const [tasks, setTasks] = useState(null);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [feedback, setFeedback] = useState("");

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

      <Dialog open={showRatingDialog} onOpenChange={setShowRatingDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rate Your Experience</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center py-4">
            <div className="flex space-x-1 mb-4">
              {[1, 2, 3, 4, 5].map((starIndex) => {
                const isFilled = selectedRating && starIndex <= selectedRating;
                return (
                  <button
                    key={starIndex}
                    type="button"
                    onClick={() => handleRate(starIndex)}
                    className={`p-1 text-3xl cursor-pointer transition-colors ${
                      isFilled ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"
                    }`}
                    aria-label={`Rate ${starIndex} stars`}
                  >
                    ★
                  </button>
                );
              })}
            </div>
            {selectedRating && (
              <>
                <Textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Additional feedback (optional)"
                  className="mb-4"
                />
                <Button onClick={handleDialogClose}>Submit</Button>
              </>
            )}
            {!selectedRating && (
              <Button variant="ghost" onClick={handleDialogClose} className="mt-4">
                Maybe Later
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
