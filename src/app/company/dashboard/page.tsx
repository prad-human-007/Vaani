'use client'

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Orb from "@/components/vapi/orb";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";


// --- Define a key for localStorage (make it unique) ---
const MIC_DIALOG_SHOWN_EVER_KEY = 'micDialogShownEver_TestPage_v1'; // Added version in case structure changes

export default function TestPage() {
  const [showDialog, setShowDialog] = useState(false);
  // --- State to track if this is the absolute first load EVER ---
  const [isFirstLoadEver, setIsFirstLoadEver] = useState(false); // Default to false until checked
  const [tasks, setTasks] = useState(null);
  const params = useParams();
  const id = params.id;
  const supabase = createClient();

  // --- Check localStorage on component mount ---
  useEffect(() => {
    let initialCheckDone = false; // Prevent setting state after unmount if fetch is slow

    // Check localStorage only on the client
    if (typeof window !== 'undefined' && !initialCheckDone) {
      const hasShownBeforeEver = localStorage.getItem(MIC_DIALOG_SHOWN_EVER_KEY);
      console.log("localStorage check:", MIC_DIALOG_SHOWN_EVER_KEY, "=", hasShownBeforeEver); // Debug log
      if (!hasShownBeforeEver) {
        // If it hasn't been shown before EVER, mark this as the first load
        setIsFirstLoadEver(true);
        // We will set the localStorage item *after* the user dismisses the mic dialog
      } else {
        // If it has been shown ever, it's not the first load
        setIsFirstLoadEver(false);
      }
      initialCheckDone = true; // Mark check as done for this mount
    }

    // Fetch tasks (existing logic)
    async function fetchTasks() {
      if (!id) return; // Don't fetch if id isn't available yet
      try {
        const { data, error } = await supabase
          .from("tasks")
          .select('*')
          .eq('id', id);

        if (error) {
          console.error("Error fetching tasks:", error);
          setTasks(null); // Reset tasks on error
        } else {
          console.log("Tasks fetched:", data);
          setTasks(data);
        }
      } catch (err) {
         console.error("Exception during task fetch:", err);
         setTasks(null);
      }
    }

    fetchTasks();

    // Cleanup function (optional but good practice)
    return () => {
      initialCheckDone = true; // Prevent state update on unmounted component
    };

  }, [id, supabase]); // Dependencies for fetching tasks
  // Note: localStorage check ideally runs only once, but it's okay in this effect.
  // --- End localStorage Check ---


  const handleRate = (rating) => {
    console.log(`Rated: ${rating}`);
    // Add logic to save the rating
    setShowDialog(false);
  };

  const handleCloseFirstTimeDialog = () => {
     // --- Mark that the dialog has been shown EVER ---
     if (typeof window !== 'undefined') {
       try {
         localStorage.setItem(MIC_DIALOG_SHOWN_EVER_KEY, 'true');
         console.log("localStorage set:", MIC_DIALOG_SHOWN_EVER_KEY, "= 'true'"); // Debug log
       } catch (error) {
          console.error("Failed to set localStorage item:", error);
          // Handle potential storage errors (e.g., private browsing, storage full)
       }
     }
     // --- End localStorage set ---

     setIsFirstLoadEver(false); // Update state to immediately reflect the change
     setShowDialog(false); // Close the initial mic check dialog
  }

  // --- Star Rating Component (Keep as before) ---
  const StarRating = ({ onRate }) => {
    const [hoverRating, setHoverRating] = useState(0);
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