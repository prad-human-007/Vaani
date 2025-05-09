import { useEffect, useRef, useState, useCallback } from "react";
import Vapi from "@vapi-ai/web";
import { showRatingDialogAtom } from "@/atom/ratingatom";
import { useAtom } from "jotai";
const publicKey = "81c01af8-d371-4191-bbf4-56c4bc0765bb";
const assistantId = "43f7b402-06f6-4c67-a7ef-1832886a9b66";

const useVapi = () => {
  const [volumeLevel, setVolumeLevel] = useState(0);
  const [showRatingDialogState, setShowRatingDialogState] = useAtom(showRatingDialogAtom);
  const [isSessionActive, setIsSessionActive] = useState<"pending" | "ongoing" | "completed">("pending");
  const [isMuted, setIsMuted] = useState(false);
  const [conversation, setConversation] = useState<
    { role: string; text: string; timestamp: string; isFinal: boolean }[]
  >([]);
  const [showRatingDialog, setShowRatingDialog] = useState(false);
  const vapiRef = useRef<any>(null);

  // Debug logging for state changes
  useEffect(() => {
    console.log('Vapi state changed:', { isSessionActive, showRatingDialog });
  }, [isSessionActive, showRatingDialog]);

  const initializeVapi = useCallback(() => {
    if (!vapiRef.current) {
      console.log('Initializing Vapi instance...');
      const vapiInstance = new Vapi(publicKey);
      vapiRef.current = vapiInstance;

      vapiInstance.on("call-start", () => {
        console.log('Call started');
        setIsSessionActive("ongoing");
        setShowRatingDialog(false);
      });

      vapiInstance.on("call-end", () => {
        console.log('Call ended by Preadhumn');
        setIsSessionActive("completed");
        setShowRatingDialogState(true);
        setConversation([]);
        setShowRatingDialog(true);
      });

      vapiInstance.on("volume-level", (volume: number) => {
        setVolumeLevel(volume);
      });

      vapiInstance.on("message", (message: any) => {
        if (message.type === "transcript") {
          setConversation((prev) => {
            const timestamp = new Date().toLocaleTimeString();
            const updatedConversation = [...prev];
            if (message.transcriptType === "final") {
              const partialIndex = updatedConversation.findIndex(
                (msg) => msg.role === message.role && !msg.isFinal
              );
              if (partialIndex !== -1) {
                updatedConversation[partialIndex] = {
                  role: message.role,
                  text: message.transcript,
                  timestamp: updatedConversation[partialIndex].timestamp,
                  isFinal: true,
                };
              } else {
                updatedConversation.push({
                  role: message.role,
                  text: message.transcript,
                  timestamp,
                  isFinal: true,
                });
              }
            } else {
              const partialIndex = updatedConversation.findIndex(
                (msg) => msg.role === message.role && !msg.isFinal
              );
              if (partialIndex !== -1) {
                updatedConversation[partialIndex] = {
                  ...updatedConversation[partialIndex],
                  text: message.transcript,
                };
              } else {
                updatedConversation.push({
                  role: message.role,
                  text: message.transcript,
                  timestamp,
                  isFinal: false,
                });
              }
            }
            return updatedConversation;
          });
        }

        if (
          message.type === "function-call" &&
          message.functionCall.name === "changeUrl"
        ) {
          const command = message.functionCall.parameters.url.toLowerCase();
          console.log(command);
          if (command) {
            window.location.href = command;
          } else {
            console.error("Unknown route:", command);
          }
        }
      });

      vapiInstance.on("error", (e: Error) => {
        console.error("Vapi error:", e);
        // Use a timeout to ensure state updates happen after the error
        setShowRatingDialogState(true);
        setTimeout(() => {
          console.log('Setting states after error');
          setShowRatingDialogState(true); // Close rating dialog if open
          setIsSessionActive("completed");
          setShowRatingDialog(true);
        }, 0);
      });
    }
  }, []);

  useEffect(() => {
    console.log('Initializing Vapi...');
    initializeVapi();
    return () => {
      if (vapiRef.current) {
        console.log('Cleaning up Vapi instance');
        vapiRef.current.stop();
        vapiRef.current = null;
      }
    };
  }, [initializeVapi]);

  const toggleCall = async () => {
    try {
      if (isSessionActive === "ongoing") {
        console.log('Stopping call...');
        await vapiRef.current.stop();
      } else {
        console.log('Starting call...');
        await vapiRef.current.start(assistantId);
      }
    } catch (err) {
      console.error("Error toggling Vapi session:", err);
      setShowRatingDialogState(true);
      // Use a timeout to ensure state updates happen after the error
      setTimeout(() => {
        console.log('Setting states after toggle error');
        setIsSessionActive("completed");
        setShowRatingDialog(true);
      }, 0);
    }
  };

  const sendMessage = (role: string, content: string) => {
    if (vapiRef.current) {
      vapiRef.current.send({
        type: "add-message",
        message: { role, content },
      });
    }
  };

  const say = (message: string, endCallAfterSpoken = false) => {
    if (vapiRef.current) {
      vapiRef.current.say(message, endCallAfterSpoken);
    }
  };

  const toggleMute = () => {
    if (vapiRef.current) {
      const newMuteState = !isMuted;
      vapiRef.current.setMuted(newMuteState);
      setIsMuted(newMuteState);
    }
  };

  return {
    volumeLevel,
    isSessionActive,
    conversation,
    toggleCall,
    sendMessage,
    say,
    toggleMute,
    isMuted,
    showRatingDialog,
    setShowRatingDialog,
  };
};

export default useVapi;
