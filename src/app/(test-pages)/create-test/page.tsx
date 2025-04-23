"use client";
import { useState } from "react";
import Select from "react-select"; // Import react-select
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
    numberOfPeople: 2,
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
        numberOfPeople: 2,
      });
    // Reset currentGroup as well, ensuring no lingering data
    setCurrentGroup({ name: "", description: "", people: [] });
    setShowModal(true);
  };

  // Takes data from modal, populates currentGroup, closes modal
  const handleTestDetailsSubmit = () => {
    if (!testDetails.name || !testDetails.desc) {
      // Add some basic validation feedback if desired
      alert("Please provide a name and description for the test group.");
      return;
    }
    const peopleArray = Array(parseInt(testDetails.numberOfPeople, 10) || 0)
      .fill()
      .map(() => ({
        name: "",
        age: "",
        // Optionally pre-fill from modal if needed, e.g.,
        // gender: testDetails.gender || "",
        // languages: [...testDetails.languages],
        gender: "", // Start blank for individual entry
        languages: [], // Start blank for individual entry
      }));

    setCurrentGroup({
      name: testDetails.name,
      description: testDetails.desc,
      people: peopleArray,
    });

    setShowModal(false);
  };

  // Updates details for a specific person within the currentGroup
  const handlePersonChange = (index, field, value) => {
    const updatedPeople = [...currentGroup.people];
    updatedPeople[index] = {
      ...updatedPeople[index],
      [field]: value,
    };

    setCurrentGroup({
      ...currentGroup,
      people: updatedPeople,
    });
  };

  // Submits the currentGroup to the testGroups list and resets currentGroup
  const handleSubmitTestGroup = () => {
    // Add validation if needed (e.g., check if all people details are filled)
    if (currentGroup.name && currentGroup.description) {
      setTestGroups([...testGroups, currentGroup]);
      // Reset currentGroup to hide the form and prepare for the next one
      setCurrentGroup({
        name: "",
        description: "",
        people: [],
      });
    } else {
      // Should not happen if button is disabled correctly, but good practice
      alert("Cannot submit an empty group.");
    }
  };

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto"> {/* Added responsive padding */}
      <Card className="mb-8 bg-zinc-900 border-zinc-800">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-xl text-white">Create Test</CardTitle>
          <div className="flex gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={handleAddGroup}
              className="bg-zinc-800 text-white border-zinc-700 hover:bg-zinc-700 hover:text-white"
              title="Add New Test Group" // Added title for accessibility
            >
              <Plus className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              onClick={handleSubmitTestGroup}
              // Disable submit if currentGroup doesn't have a name (isn't being edited)
              disabled={!currentGroup.name}
              className="bg-emerald-600 text-white border-emerald-700 hover:bg-emerald-700 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-zinc-800 disabled:border-zinc-700 disabled:text-gray-400"
            >
              Submit Group
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          {/* --- Table for Submitted Test Groups --- */}
          {testGroups.length > 0 && (
            <div className="mb-6 overflow-x-auto border border-zinc-700 rounded-lg"> {/* Added border and rounding */}
              <h3 className="text-lg font-semibold mb-0 p-3 text-gray-200 bg-zinc-800 rounded-t-lg border-b border-zinc-700"> {/* Adjusted heading style */}
                Submitted Groups
              </h3>
              <table className="w-full text-sm text-left text-gray-400">
                <thead className="text-xs text-gray-300 uppercase bg-zinc-700/50"> {/* Lighter thead */}
                  <tr>
                    <th scope="col" className="px-4 py-3">
                      Group Name
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Description
                    </th>
                    <th scope="col" className="px-4 py-3 text-center">
                      Participants
                    </th>
                    {/* Add more headers if needed */}
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-700">
                  {testGroups.map((group, groupIndex) => (
                    <tr key={groupIndex} className="bg-zinc-800 hover:bg-zinc-700/50"> {/* Subtle hover */}
                      <td className="px-4 py-3 font-medium text-white whitespace-nowrap">
                        {group.name}
                      </td>
                      <td className="px-4 py-3 text-gray-300">
                        {group.description}
                      </td>
                      <td className="px-4 py-3 text-center text-gray-300">
                        {group.people.length}
                      </td>
                      {/* Add more cells if needed */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {/* --- End of Table --- */}


          {/* --- Form for Current Test Group --- */}
          {/* Only show the form if a current group is being edited (has a name) */}
          {currentGroup.name && (
            <>
              <h3 className="text-lg font-semibold mb-3 text-gray-200 border-t border-zinc-700 pt-4"> {/* Added separator */}
                Editing Group: {currentGroup.name}
              </h3>
              <Card className="bg-zinc-800 border border-emerald-600"> {/* Keep border */}
                <CardContent className="pt-4">
                  {/* Group Name and Description Inputs (Read-only after modal submit) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label htmlFor="current-group-name" className="text-gray-300 block mb-1">Test Group Name</Label>
                      <Input
                        id="current-group-name"
                        value={currentGroup.name}
                        // onChange={(e) => setCurrentGroup({...currentGroup, name: e.target.value})} // Typically set via modal
                        className="bg-zinc-700 border-zinc-600 text-white read-only:bg-zinc-700/50 read-only:cursor-not-allowed"
                        readOnly // Make read-only as it's set from modal
                      />
                    </div>
                    <div>
                      <Label htmlFor="current-group-desc" className="text-gray-300 block mb-1">Test Group Description</Label>
                      <Input
                        id="current-group-desc"
                        value={currentGroup.description}
                        // onChange={(e) => setCurrentGroup({...currentGroup, description: e.target.value})} // Typically set via modal
                        className="bg-zinc-700 border-zinc-600 text-white read-only:bg-zinc-700/50 read-only:cursor-not-allowed"
                        readOnly // Make read-only as it's set from modal
                      />
                    </div>
                  </div>

                  {/* People Details Inputs */}
                   <h4 className="text-md font-medium mb-3 text-gray-300 pt-2 border-t border-zinc-700">
                      Participant Details ({currentGroup.people.length})
                   </h4>
                  {currentGroup.people.map((person, personIndex) => (
                    <Card key={personIndex} className="mb-4 bg-zinc-700 border-zinc-600 p-4"> {/* Use padding on Card */}
                      {/* Removed inner CardContent for simplicity */}
                      <p className="font-medium mb-3 text-gray-200">Person {personIndex + 1}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"> {/* Name/Age row */}
                        <div>
                          <Label htmlFor={`person-${personIndex}-name`} className="text-gray-300 block mb-1">Name</Label>
                          <Input
                            id={`person-${personIndex}-name`}
                            value={person.name}
                            onChange={(e) => handlePersonChange(personIndex, 'name', e.target.value)}
                            className="bg-zinc-800 border-zinc-700 text-white"
                            placeholder="Enter name"
                          />
                        </div>
                        <div>
                          <Label htmlFor={`person-${personIndex}-age`} className="text-gray-300 block mb-1">Age</Label>
                          <Input
                            id={`person-${personIndex}-age`}
                            type="number"
                            value={person.age}
                            onChange={(e) => handlePersonChange(personIndex, 'age', e.target.value)}
                            className="bg-zinc-800 border-zinc-700 text-white"
                            placeholder="Enter age"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> {/* Gender/Languages row */}
                        <div>
                          <Label htmlFor={`person-${personIndex}-gender`} className="text-gray-300 block mb-1">Gender</Label>
                          <Select
                             inputId={`person-${personIndex}-gender`} // Use inputId for label association
                             value={genderOptions.find(option => option.value === person.gender)}
                             onChange={(selectedOption) => handlePersonChange(personIndex, 'gender', selectedOption?.value || '')} // Handle null selection
                             options={genderOptions}
                             styles={selectStyles} // Apply dark theme styles
                             placeholder="Select..."
                             isClearable // Optional: allow clearing selection
                           />
                        </div>
                        <div>
                          <Label htmlFor={`person-${personIndex}-languages`} className="text-gray-300 block mb-1">Languages</Label>
                          <Select
                            inputId={`person-${personIndex}-languages`} // Use inputId
                            isMulti
                            options={languageOptions}
                            value={person.languages.map((lang) =>
                              languageOptions.find((option) => option.value === lang)
                            ).filter(Boolean)} // Filter out potential nulls
                            onChange={(selectedOptions) =>
                              handlePersonChange(
                                personIndex,
                                "languages",
                                selectedOptions ? selectedOptions.map((option) => option.value) : [] // Handle null selectedOptions
                              )
                            }
                            styles={selectStyles} // Apply dark theme styles
                            placeholder="Select..."
                            closeMenuOnSelect={false} // Keep menu open for multi-select
                          />
                        </div>
                      </div>
                    </Card>
                  ))}
                </CardContent>
              </Card>
            </>
          )}
          {/* --- End of Current Group Form --- */}

           {/* Placeholder when no group is being edited */}
           {!currentGroup.name && testGroups.length === 0 && (
             <p className="text-center text-gray-500 mt-6">
               Click the '+' button to add your first test group.
             </p>
           )}
           {!currentGroup.name && testGroups.length > 0 && (
             <p className="text-center text-gray-500 mt-6">
               Click the '+' button to add another test group.
             </p>
           )}

        </CardContent>
      </Card>

      {/* Modal dialog */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-md bg-zinc-900 border-zinc-800 text-white sm:max-w-lg"> {/* Responsive width */}
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
                className="bg-zinc-800 border-zinc-700 text-white"
                placeholder="e.g., Pilot Study Alpha"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="modal-desc" className="text-gray-300">Group Description *</Label>
              <Input
                id="modal-desc"
                value={testDetails.desc}
                onChange={(e) => setTestDetails({...testDetails, desc: e.target.value})}
                className="bg-zinc-800 border-zinc-700 text-white"
                placeholder="Brief description of the group's purpose"
              />
            </div>

            {/* Removed optional fields from modal for simplicity, can be re-added if needed */}
            
            <div className="grid gap-2">
              <Label htmlFor="age" className="text-gray-300">Target Age Range (Optional)</Label>
              <div className="flex gap-2">
                <Input
                  id="age"
                  type="number"
                  placeholder="Start"
                  value={testDetails.age}
                  onChange={(e) => setTestDetails({...testDetails, age: e.target.value})}
                  className="bg-zinc-800 border-zinc-700 text-white"
                />
                <Input
                  id="ageEnd"
                  type="number"
                  placeholder="End"
                  value={testDetails.ageEnd}
                  onChange={(e) => setTestDetails({...testDetails, ageEnd: e.target.value})}
                  className="bg-zinc-800 border-zinc-700 text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
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

              <div>
                <Label htmlFor="modal-languages" className="text-gray-300">Target Languages (Optional)</Label>
                <Select
                  inputId="modal-languages"
                  isMulti
                  options={languageOptions}
                  value={testDetails.languages.map((lang) =>
                    languageOptions.find((option) => option.value === lang)
                  ).filter(Boolean)}
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
                className="h-20 bg-zinc-800 border-zinc-700 text-white"
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
                onChange={(e) => setTestDetails({...testDetails, numberOfPeople: Math.max(1, parseInt(e.target.value) || 1) })} // Ensure positive number
                className="w-32 bg-zinc-800 border-zinc-700 text-white"
              />
            </div>
          </div>
          {/* End Modal Form Grid */}

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