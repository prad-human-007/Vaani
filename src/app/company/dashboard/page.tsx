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
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4">
      <Orb />

      {tasks && tasks.length > 0 && (
        <div className="mt-4 p-4 bg-card rounded-lg shadow w-full max-w-md">
          <h2 className="text-lg font-bold mb-2 text-card-foreground">
            Task Details:
          </h2>
          <pre className="text-sm overflow-auto text-card-foreground/90">
            {JSON.stringify(tasks[0], null, 2)}
          </pre>
        </div>
      )}

      {/* Rating Dialog */}
      <Dialog
        open={showRatingDialogState}
        onOpenChange={(open) => setShowRatingDialog(open)}
      >
        <DialogContent className="max-w-sm p-0 overflow-visible">
          <div className="flex rounded-md flex-col items-center py-4 bg-gray-900">
            <p className="text-gray-300 mb-2 text-base font-medium">
              How was your experience?
            </p>
            <div className="flex space-x-1 mb-4">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  className={`transition-transform ${
                    selectedRating === rating ? "scale-110" : ""
                  } focus:outline-none focus:ring-2 focus:ring-amber-400`}
                  onClick={() => handleRate(rating)}
                  disabled={selectedRating !== null}
                  aria-label={`Rate ${rating} star${rating > 1 ? "s" : ""}`}
                >
                  <StarIcon
                    filled={selectedRating ? rating <= selectedRating : false}
                    size={36}
                    className={`${
                      selectedRating && rating <= selectedRating
                        ? "text-amber-400"
                        : "text-gray-400"
                    }`}
                  />
                </button>
              ))}
            </div>
            {selectedRating && (
              <div className="text-amber-400 font-semibold mb-2">
                You rated {selectedRating} star{selectedRating > 1 ? "s" : ""}!
              </div>
            )}
            <Textarea
              className="mt-2 mb-2 bg-gray-800 text-gray-200 border-gray-600 placeholder-gray-400 focus:ring-amber-400 focus:border-amber-400"
              placeholder="Optional feedback..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
            <Button
              className="mt-2"
              variant="secondary"
              onClick={handleDialogClose}
            >
              <CloseIcon className="mr-2 h-4 w-4" />
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
