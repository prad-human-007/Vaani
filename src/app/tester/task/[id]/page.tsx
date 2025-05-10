"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
  const { isSessionActive, showRatingDialog: vapiShowRatingDialog } = useVapi();
  const [showRatingDialogState, setShowRatingDialogState] = useAtom(showRatingDialogAtom);
  const [tasks, setTasks] = useState<any[] | null>(null);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [feedback, setFeedback] = useState(""); // Overall feedback (optional)

  const [understanding, setUnderstanding] = useState('');
  const [accuracy, setAccuracy] = useState('');
  const [interruptions, setInterruptions] = useState('');
  const [naturalness, setNaturalness] = useState('');
  const [intonation, setIntonation] = useState('');
  const [ease, setEase] = useState('');
  const [satisfaction, setSatisfaction] = useState('');
  const [reuse, setReuse] = useState('');

  const [liked, setLiked] = useState(''); // What did you like? (optional)
  const [improvement, setImprovement] = useState(''); // What could be improved? (optional)
  // experienceType state and related logic removed

  const router = useRouter();

  useEffect(() => {
    console.log("State changed (from useVapi):", {
      isSessionActive,
      vapiDialogState: vapiShowRatingDialog,
    });
  }, [isSessionActive, vapiShowRatingDialog]);

  useEffect(() => {
    async function fetchTasks() {
      const fetchedTasks = [
        { id: 1, name: "Sample Task", description: "This is a sample task." },
      ];
      setTasks(fetchedTasks);
    }
    fetchTasks();
  }, []);

  useEffect(() => {
    if (!showRatingDialogState) {
      setSelectedRating(null);
      setFeedback("");
      setLiked('');
      setImprovement('');
      // setExperienceType(''); // Removed
      setUnderstanding('');
      setAccuracy('');
      setInterruptions('');
      setNaturalness('');
      setIntonation('');
      setEase('');
      setSatisfaction('');
      setReuse('');
    }
  }, [showRatingDialogState]);

  const handleRate = (rating: number) => {
    setSelectedRating(rating);
  };

  // Determine if the form is valid for submission
  // Textareas (feedback, liked, improvement) are now optional.
  const isFormValid =
    selectedRating !== null &&
    understanding !== "" &&
    accuracy !== "" &&
    interruptions !== "" &&
    naturalness !== "" &&
    intonation !== "" &&
    ease !== "" &&
    satisfaction !== "" &&
    reuse !== "";

  const handleSubmit = async () => {
    if (!isFormValid) {
      console.warn("Submit called with invalid form (mandatory fields missing).");
      return;
    }

    const feedbackData = {
      rating: selectedRating,
      overallFeedback: feedback,
      liked,
      improvement,
      // experienceType, // Removed
      understanding,
      accuracy,
      interruptions,
      naturalness,
      intonation,
      ease,
      satisfaction,
      reuse,
    };

    console.log("Submitting feedback:", feedbackData);
    // TODO: Replace with actual API call to submit feedback

    setShowRatingDialogState(false);
    router.push("/tester/tasks");
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4">
      <Orb onShowRatingDialogChange={setShowRatingDialogState} />

      {tasks && tasks.length > 0 && (
        <div className="mt-4 p-4 bg-card rounded-lg shadow w-full max-w-md">
          <h2 className="text-lg font-bold mb-2 text-card-foreground">Task Details:</h2>
          <pre className="text-sm overflow-auto text-card-foreground/90">
            {JSON.stringify(tasks[0], null, 2)}
          </pre>
        </div>
      )}

      <Dialog open={showRatingDialogState} onOpenChange={setShowRatingDialogState}>
        <DialogContent className="bg-zinc-900 text-white border-zinc-700 max-h-screen overflow-y-auto mt-4 py-2 w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-white">Rate Your Experience</DialogTitle>
            <p className="text-sm text-zinc-400 mt-1">
              Your feedback helps us improve. Please rate and share your thoughts.
            </p>
          </DialogHeader>

          <div className="flex flex-col py-4 space-y-6">
            {/* Star Rating */}
            <div className="flex flex-col items-center">
              <div className="flex space-x-1 mb-2">
                {[1, 2, 3, 4, 5].map((starIndex) => {
                  const isFilled = selectedRating !== null && starIndex <= selectedRating;
                  return (
                    <button
                      key={starIndex}
                      type="button"
                      onClick={() => handleRate(starIndex)}
                      className={`p-1 text-3xl cursor-pointer transition-colors ${
                        isFilled ? "text-yellow-400" : "text-zinc-500 hover:text-yellow-300"
                      }`}
                      aria-label={`Rate ${starIndex} stars`}
                    >
                      ★
                    </button>
                  );
                })}
              </div>
              <p className="text-sm text-zinc-400">Overall rating</p>
            </div>

            {/*
              Experience Type select element has been removed.
              Textarea fields have been moved down.
            */}

            {/* Section 1: Understanding */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-2">Understanding</h3>
              <div className="bg-zinc-800 p-4 rounded-md space-y-2">
                <label className="block mb-1">How clearly did the Voice AI understand your speech?</label>
                <div className="flex flex-wrap gap-2 pl-2">
                  {["Very Poor", "Poor", "Neutral", "Good", "Excellent"].map((option) => (
                    <label key={option} className="flex items-center gap-1">
                      <input
                        type="radio"
                        name="understanding"
                        value={option}
                        checked={understanding === option}
                        onChange={(e) => setUnderstanding(e.target.value)}
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </div>
              <div className="bg-zinc-800 p-4 rounded-md space-y-2">
                <label className="block mb-1">How accurately did the Voice AI respond to your query or command?</label>
                <div className="flex flex-wrap gap-2 pl-2">
                  {["Very Inaccurate", "Inaccurate", "Neutral", "Accurate", "Very Accurate"].map((option) => (
                    <label key={option} className="flex items-center gap-1">
                      <input
                        type="radio"
                        name="accuracy"
                        value={option}
                        checked={accuracy === option}
                        onChange={(e) => setAccuracy(e.target.value)}
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </div>
              <div className="bg-zinc-800 p-4 rounded-md space-y-2">
                <label className="block mb-1">
                  Did the Voice AI handle interruptions or follow-up questions effectively?
                </label>
                <div className="flex gap-4 pl-2">
                  {["Yes", "No", "Not applicable"].map((option) => (
                    <label key={option} className="flex items-center gap-1">
                      <input
                        type="radio"
                        name="interruptions"
                        value={option}
                        checked={interruptions === option}
                        onChange={(e) => setInterruptions(e.target.value)}
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Section 2: Naturalness and Fluency */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-2">Naturalness and Fluency</h3>
              <div className="bg-zinc-800 p-4 rounded-md space-y-2">
                <label className="block mb-1">How natural did the Voice AI's responses sound?</label>
                <div className="flex flex-wrap gap-2 pl-2">
                  {["Very Robotic", "Robotic", "Neutral", "Natural", "Very Natural"].map((option) => (
                    <label key={option} className="flex items-center gap-1">
                      <input
                        type="radio"
                        name="naturalness"
                        value={option}
                        checked={naturalness === option}
                        onChange={(e) => setNaturalness(e.target.value)}
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </div>
              <div className="bg-zinc-800 p-4 rounded-md space-y-2">
                <label className="block mb-1">Was the tone and intonation appropriate for the context?</label>
                <div className="flex flex-wrap gap-2 pl-2">
                  {["Not at all", "Slightly", "Moderately", "Very much", "Completely"].map((option) => (
                    <label key={option} className="flex items-center gap-1">
                      <input
                        type="radio"
                        name="intonation"
                        value={option}
                        checked={intonation === option}
                        onChange={(e) => setIntonation(e.target.value)}
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Section 3: Usability and Satisfaction */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-2">Usability and Satisfaction</h3>
              <div className="bg-zinc-800 p-4 rounded-md space-y-2">
                <label className="block mb-1">How easy was it to communicate with the Voice AI?</label>
                <div className="flex flex-wrap gap-2 pl-2">
                  {["Very Difficult", "Difficult", "Neutral", "Easy", "Very Easy"].map((option) => (
                    <label key={option} className="flex items-center gap-1">
                      <input
                        type="radio"
                        name="ease"
                        value={option}
                        checked={ease === option}
                        onChange={(e) => setEase(e.target.value)}
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </div>
              <div className="bg-zinc-800 p-4 rounded-md space-y-2">
                <label className="block mb-1">How satisfied are you with the overall interaction?</label>
                <div className="flex flex-wrap gap-2 pl-2">
                  {["Very Unsatisfied", "Unsatisfied", "Neutral", "Satisfied", "Very Satisfied"].map((option) => (
                    <label key={option} className="flex items-center gap-1">
                      <input
                        type="radio"
                        name="satisfaction"
                        value={option}
                        checked={satisfaction === option}
                        onChange={(e) => setSatisfaction(e.target.value)}
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </div>
              <div className="bg-zinc-800 p-4 rounded-md space-y-2">
                <label className="block mb-1">Would you use this Voice AI system again?</label>
                <div className="flex gap-4 pl-2">
                  {["Yes", "No", "Maybe"].map((option) => (
                    <label key={option} className="flex items-center gap-1">
                      <input
                        type="radio"
                        name="reuse"
                        value={option}
                        checked={reuse === option}
                        onChange={(e) => setReuse(e.target.value)}
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Optional Feedback TextAreas - Moved Down */}
            <Textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Overall feedback (optional)"
              className="bg-zinc-800 border-zinc-600 text-white placeholder-zinc-400 w-full"
            />
            <Textarea
              value={liked}
              onChange={(e) => setLiked(e.target.value)}
              placeholder="What did you like? (optional)"
              className="bg-zinc-800 border-zinc-600 text-white placeholder-zinc-400 w-full"
            />
            <Textarea
              value={improvement}
              onChange={(e) => setImprovement(e.target.value)}
              placeholder="What could be improved? (optional)"
              className="bg-zinc-800 border-zinc-600 text-white placeholder-zinc-400 w-full"
            />

            {/* Buttons */}
            <div className="flex justify-end w-full">
              <Button
                onClick={handleSubmit}
                disabled={!isFormValid}
                className="bg-yellow-500 hover:bg-yellow-600 text-black disabled:opacity-60 disabled:cursor-not-allowed"
              >
                Submit
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}