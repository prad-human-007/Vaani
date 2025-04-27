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
        <div>
            <Orb />
        </div>
    );
}
