"use client";
import { useState } from "react";
import Select from "react-select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";

// Styles object for react-select dark theme
const selectStyles = {
  control: (baseStyles, state) => ({
    ...baseStyles,
    backgroundColor: '#27272a', // zinc-800
    borderColor: state.isFocused ? '#52525b' : '#3f3f46', // zinc-600 / zinc-700
    boxShadow: state.isFocused ? '0 0 0 1px #52525b' : 'none',
    '&:hover': {
      borderColor: '#52525b', // zinc-600
    },
    minHeight: '38px', // Match shadcn input height
    height: '38px',
  }),
  valueContainer: (baseStyles) => ({
    ...baseStyles,
    padding: '0 8px',
  }),
  input: (baseStyles) => ({
    ...baseStyles,
    color: '#e4e4e7', // zinc-200
    margin: '0px',
    padding: '0px',
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  indicatorsContainer: (baseStyles) => ({
    ...baseStyles,
    height: '38px',
  }),
  singleValue: (baseStyles) => ({
    ...baseStyles,
    color: '#e4e4e7' // zinc-200
  }),
  menu: (baseStyles) => ({
    ...baseStyles,
    backgroundColor: '#27272a', // zinc-800
    border: '1px solid #3f3f46' // zinc-700
  }),
  option: (baseStyles, state) => ({
    ...baseStyles,
    backgroundColor: state.isSelected ? '#16a34a' : state.isFocused ? '#3f3f46' : '#27272a', // emerald-600 / zinc-700 / zinc-800
    color: state.isSelected ? 'white' : '#e4e4e7', // zinc-200
    '&:active': {
      backgroundColor: '#15803d' // emerald-700
    },
    cursor: 'pointer'
  }),
  multiValue: (baseStyles) => ({
    ...baseStyles,
    backgroundColor: '#3f3f46', // zinc-700
  }),
  multiValueLabel: (baseStyles) => ({
    ...baseStyles,
    color: '#e4e4e7', // zinc-200
  }),
  multiValueRemove: (baseStyles) => ({
    ...baseStyles,
    color: '#a1a1aa', // zinc-400
    '&:hover': {
      backgroundColor: '#dc2626', // red-600 for remove hover
      color: 'white',
    },
    cursor: 'pointer'
  }),
  placeholder: (baseStyles) => ({
      ...baseStyles,
      color: '#71717a', // zinc-500
  }),
};

export default function CreateTest() {
  const [showModal, setShowModal] = useState(false);
  const [testGroups, setTestGroups] = useState([]); // Array to hold submitted groups
  const [currentGroup, setCurrentGroup] = useState({ // State for the group currently being edited/created
    name: "",
    description: "",
    ageRange: "",
    gender: "",
    languages: [],
    instruction: "",
    people: [],
  });
  const [testDetails, setTestDetails] = useState({ // State for the modal form
    name: "",
    desc: "",
    age: "",
    ageEnd: "",
    languages: [],
    gender: "",
    instruction: "",
    numberOfPeople: 2, // Default to 2 participants
  });

  const languageOptions = [
    { value: "English", label: "English" },
    { value: "Hindi", label: "Hindi" },
    { value: "Marathi", label: "Marathi" },
    // Add more languages as needed
  ];
  const genderOptions = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Non-binary", label: "Non-binary" },
    { value: "Other", label: "Other" },
    { value: "Prefer not to say", label: "Prefer not to say" },
  ];

  // Opens the modal and resets modal state
  const handleAddGroup = () => {
    setTestDetails({ // Reset modal form fields
        name: "",
        desc: "",
        age: "",
        ageEnd: "",
        languages: [],
        gender: "",
        instruction: "",
        numberOfPeople: 2, // Reset to default when opening
      });
    // Reset currentGroup as well, ensuring no lingering data
    setCurrentGroup({
      name: "",
      description: "",
      ageRange: "",
      gender: "",
      languages: [],
      instruction: "",
      people: []
    });
    setShowModal(true);
  };

  // Takes data from modal, populates currentGroup, closes modal
  const handleTestDetailsSubmit = () => {
    if (!testDetails.name || !testDetails.desc) {
      // Add some basic validation feedback
      alert("Please provide a name and description for the test group.");
      return;
    }

    // Create the ageRange string if both age values are provided
    const ageRange = testDetails.age && testDetails.ageEnd
      ? `${testDetails.age}-${testDetails.ageEnd}`
      : testDetails.age
        ? `${testDetails.age}+`
        : ""; // Or set to "Any" if preferred for display

    // Create the participant array based on numberOfPeople
    const peopleArray = Array(parseInt(testDetails.numberOfPeople, 10) || 0)
      .fill(null) // Use null or an empty object
      .map(() => ({ // Map to create distinct participant objects
        name: "",
        age: "",
        gender: "",
        languages: [],
      }));

    setCurrentGroup({
      name: testDetails.name,
      description: testDetails.desc,
      ageRange: ageRange,
      gender: testDetails.gender || "", // Ensure gender is at least an empty string
      languages: [...testDetails.languages],
      instruction: testDetails.instruction,
      people: peopleArray, // Assign the newly created array
    });

    setShowModal(false);
  };

  // Updates details for a specific person within the currentGroup
  const handlePersonChange = (index, field, value) => {
    const updatedPeople = [...currentGroup.people];
    // Ensure the object exists before trying to update it
    if (updatedPeople[index]) {
         updatedPeople[index] = {
           ...updatedPeople[index],
           [field]: value,
         };

         setCurrentGroup({
           ...currentGroup,
           people: updatedPeople,
         });
    } else {
        console.error("Attempted to update non-existent person at index:", index);
    }
  };

  // Submits the currentGroup to the testGroups list and resets currentGroup
  const handleSubmitTestGroup = () => {
    // Add validation if needed
    if (currentGroup.name && currentGroup.description) {
      setTestGroups([...testGroups, currentGroup]);
      // Reset currentGroup to hide the form and prepare for the next one
      setCurrentGroup({
        name: "",
        description: "",
        ageRange: "",
        gender: "",
        languages: [],
        instruction: "",
        people: [],
      });
    } else {
      // Should not happen if button is disabled correctly, but good practice
      alert("Cannot submit an empty group.");
    }
  };

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto">
      <Card className="mb-8 bg-zinc-900 border-zinc-800">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-xl text-white">Create Test</CardTitle>
          <div className="flex gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={handleAddGroup}
              className="bg-zinc-800 text-white border-zinc-700 hover:bg-zinc-700 hover:text-white"
              title="Add New Test Group"
            >
              <Plus className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              onClick={handleSubmitTestGroup}
              disabled={!currentGroup.name} // Disable if no group is being edited
              className="bg-emerald-600 text-white border-emerald-700 hover:bg-emerald-700 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-zinc-800 disabled:border-zinc-700 disabled:text-gray-400"
            >
              Submit Group
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          {/* --- Table for Submitted Test Groups --- */}
          {testGroups.length > 0 && (
            <div className="mb-6 overflow-x-auto border border-zinc-700 rounded-lg">
              <h3 className="text-lg font-semibold mb-0 p-3 text-gray-200 bg-zinc-800 rounded-t-lg border-b border-zinc-700">
                Submitted Groups
              </h3>
              <table className="w-full text-sm text-left text-gray-400">
                <thead className="text-xs text-gray-300 uppercase bg-zinc-700/50">
                  <tr>
                    <th scope="col" className="px-4 py-3">Group Name</th>
                    <th scope="col" className="px-4 py-3">Description</th>
                    <th scope="col" className="px-4 py-3">Age Range</th>
                    <th scope="col" className="px-4 py-3">Gender</th>
                    <th scope="col" className="px-4 py-3">Languages</th>
                    <th scope="col" className="px-4 py-3">Instructions</th>
                    <th scope="col" className="px-4 py-3 text-center">Participants</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-700">
                  {testGroups.map((group, groupIndex) => (
                    <tr key={`submitted-${groupIndex}-${group.name}`} className="bg-zinc-800 hover:bg-zinc-700/50">
                      <td className="px-4 py-3 font-medium text-white whitespace-nowrap">
                        {group.name}
                      </td>
                      <td className="px-4 py-3 text-gray-300">
                        {group.description}
                      </td>
                      <td className="px-4 py-3 text-gray-300">
                        {group.ageRange || "Any"}
                      </td>
                      <td className="px-4 py-3 text-gray-300">
                        {group.gender || "Any"}
                      </td>
                      <td className="px-4 py-3 text-gray-300">
                        {group.languages.length > 0 ? group.languages.map(lang => lang?.label || lang).join(", ") : "Any"}
                      </td>
                      <td className="px-4 py-3 text-gray-300">
                        {group.instruction || "N/A"}
                      </td>
                      <td className="px-4 py-3 text-center text-gray-300">
                        {group.people.length}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {/* --- End of Table --- */}

          {/* --- Current Group Display with Participants in Table --- */}
                    {/* --- Current Group Display with Participants in Table --- */}
                    {currentGroup.name && ( // Only show if a group is actively being edited
            <>
              <h3 className="text-lg font-semibold mb-3 text-gray-200 border-t border-zinc-700 pt-4">
                Editing Group: {currentGroup.name}
              </h3>

              {/* Group Details Summary Table - MODIFIED TO REPEAT ROWS */}
              <div className="mb-4 overflow-x-auto border border-zinc-700 rounded-lg">
                 <table className="w-full text-sm text-left text-gray-400">
                   <thead className="text-xs text-gray-300 uppercase bg-zinc-700/50">
                     <tr>
                       {/* Keep the original headers */}
                       <th scope="col" className="px-4 py-3">Group Name</th>
                       <th scope="col" className="px-4 py-3">Description</th>
                       <th scope="col" className="px-4 py-3">Age Range</th>
                       <th scope="col" className="px-4 py-3">Gender</th>
                       <th scope="col" className="px-4 py-3">Languages</th>
                       <th scope="col" className="px-4 py-3">Instructions</th>
                       <th scope="col" className="px-4 py-3 text-center">Participants</th>
                     </tr>
                   </thead>
                   {/* Map over people array to create rows */}
                   <tbody className="divide-y divide-zinc-700">
                     {currentGroup.people.length > 0 ? (
                       currentGroup.people.map((_, participantIndex) => ( // We only need the index here
                         // Render a row for each participant slot
                         <tr key={`group-summary-row-${participantIndex}`} className="bg-zinc-800 hover:bg-zinc-700/50">
                           {/* Repeat the SAME group details in each cell */}
                           <td className="px-4 py-3 font-medium text-white whitespace-nowrap">{currentGroup.name}</td>
                           <td className="px-4 py-3 text-gray-300">{currentGroup.description}</td>
                           <td className="px-4 py-3 text-gray-300">{currentGroup.ageRange || "Any"}</td>
                           <td className="px-4 py-3 text-gray-300">{currentGroup.gender || "Any"}</td>
                           <td className="px-4 py-3 text-gray-300">
                             {currentGroup.languages.length > 0 ? currentGroup.languages.map(lang => lang?.label || lang).join(", ") : "Any"}
                           </td>
                           <td className="px-4 py-3 text-gray-300">{currentGroup.instruction || "N/A"}</td>
                           {/* Show the total participant count in the last column for each row */}
                           <td className="px-4 py-3 text-center text-gray-300">{currentGroup.people.length}</td>
                         </tr>
                       ))
                     ) : (
                       // Display a message if there are somehow no participants (shouldn't happen with validation)
                       <tr className="bg-zinc-800">
                         <td colSpan="7" className="px-4 py-3 text-center text-gray-500">No participants defined for this group.</td>
                       </tr>
                     )}
                   </tbody>
                 </table>
               </div>

            </>
          )}
          {/* --- End of Current Group Display --- */}

          {/* ... rest of the component ... */}
          {/* --- End of Current Group Display --- */}

          {/* Placeholder when no group is being edited */}
          {!currentGroup.name && testGroups.length === 0 && (
            <p className="text-center text-gray-500 mt-6">
              Click the '+' button to add your first test group.
            </p>
          )}
          {!currentGroup.name && testGroups.length > 0 && (
            <p className="text-center text-gray-500 mt-6">
              Click the '+' button to add another test group or edit participants for the current group before submitting.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Modal dialog */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-md bg-zinc-900 border-zinc-800 text-white sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-white">New Test Group Details</DialogTitle>
            <DialogDescription className="text-gray-400">
              Enter the initial details for your new test group. You can specify participant details after this step.
            </DialogDescription>
          </DialogHeader>

          {/* Modal Form Grid */}
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="modal-name" className="text-gray-300">Group Name *</Label>
              <Input
                id="modal-name"
                value={testDetails.name}
                onChange={(e) => setTestDetails({...testDetails, name: e.target.value})}
                className="bg-zinc-800 border-zinc-700 text-white placeholder-zinc-400"
                placeholder="e.g., Pilot Study Alpha"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="modal-desc" className="text-gray-300">Group Description *</Label>
              <Input
                id="modal-desc"
                value={testDetails.desc}
                onChange={(e) => setTestDetails({...testDetails, desc: e.target.value})}
                className="bg-zinc-800 border-zinc-700 text-white placeholder-zinc-400"
                placeholder="Brief description of the group's purpose"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="age" className="text-gray-300">Target Age Range (Optional)</Label>
              <div className="flex gap-2">
                <Input
                  id="age"
                  type="number"
                  placeholder="Start"
                  min="0"
                  value={testDetails.age}
                  onChange={(e) => setTestDetails({...testDetails, age: e.target.value})}
                  className="bg-zinc-800 border-zinc-700 text-white placeholder-zinc-400"
                />
                 <span className="flex items-center text-gray-400">-</span>
                <Input
                  id="ageEnd"
                  type="number"
                  placeholder="End"
                  min={testDetails.age || "0"} // Ensure end age is not less than start age
                  value={testDetails.ageEnd}
                  onChange={(e) => setTestDetails({...testDetails, ageEnd: e.target.value})}
                  className="bg-zinc-800 border-zinc-700 text-white placeholder-zinc-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="modal-gender" className="text-gray-300">Target Gender (Optional)</Label>
                <Select
                  inputId="modal-gender"
                  value={genderOptions.find(option => option.value === testDetails.gender)}
                  onChange={(selectedOption) => setTestDetails({...testDetails, gender: selectedOption?.value || ''})}
                  options={genderOptions}
                  styles={selectStyles}
                  placeholder="Any"
                  isClearable
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="modal-languages" className="text-gray-300">Target Languages (Optional)</Label>
                <Select
                  inputId="modal-languages"
                  isMulti
                  options={languageOptions}
                  // Ensure value is an array of option objects for react-select
                  value={languageOptions.filter(option => testDetails.languages?.includes(option.value))}
                  onChange={(selectedOptions) =>
                    setTestDetails({
                      ...testDetails,
                      languages: selectedOptions ? selectedOptions.map((option) => option.value) : [],
                    })
                  }
                  styles={selectStyles}
                  placeholder="Any"
                  closeMenuOnSelect={false}
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="instruction" className="text-gray-300">Instructions (Optional)</Label>
              <Textarea
                id="instruction"
                value={testDetails.instruction}
                onChange={(e) => setTestDetails({...testDetails, instruction: e.target.value})}
                className="h-20 bg-zinc-800 border-zinc-700 text-white placeholder-zinc-400"
                placeholder="Optional instructions for this group"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="numberOfPeople" className="text-gray-300">Number of Participants *</Label>
              <Input
                id="numberOfPeople"
                type="number"
                min="1"
                value={testDetails.numberOfPeople}
                onChange={(e) => setTestDetails({...testDetails, numberOfPeople: Math.max(1, parseInt(e.target.value) || 1) })}
                className="w-32 bg-zinc-800 border-zinc-700 text-white"
                required
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowModal(false)} className="text-gray-300 border-zinc-600 hover:bg-zinc-700 hover:text-white">Cancel</Button>
            <Button onClick={handleTestDetailsSubmit} className="bg-emerald-600 hover:bg-emerald-700 text-white">
              Create Group & Add Participants
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}