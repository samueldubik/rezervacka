import { useState } from 'react';

const FileHandler = () => {
  const [file, setFile] = useState<File | null>(null);
  const [textInput, setTextInput] = useState<string>('');
  const [emailList, setEmailList] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setTextInput(''); // Clear text input when a file is selected
      loadFile(e.target.files[0]);
    }
  };

  const handleTextInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextInput(e.target.value);
    setFile(null); // Clear file input when text input is used
    const emails = e.target.value
      .split('\n')
      .map((email) => email.trim())
      .filter((email) => email.length > 0);
    setEmailList(emails);
  };

  const loadFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      const emails = content
        .split('\n')
        .map((email) => email.trim())
        .filter((email) => email.length > 0);
      setEmailList(emails);
    };
    reader.readAsText(file);
  };

  const handleUpload = async () => {
    if (emailList.length === 0) {
      setError('Please select a file or enter emails manually.');
      return;
    }

    try {
      const response = await fetch('/api/admin/upload-whitelist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ emails: emailList }),
      });

      if (response.ok) {
        setSuccess('Whitelist updated successfully.');
        setError(null);
        setEmailList([]);
        setTextInput('');
        setFile(null);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to update whitelist.');
        setSuccess(null);
      }
    } catch (error) {
      setError('An error occurred while uploading the whitelist.');
      setSuccess(null);
    }
  };

  const handleClearWhitelist = async () => {
    try {
      const response = await fetch('/api/admin/upload-whitelist', {
        method: 'DELETE',
      });

      if (response.ok) {
        setSuccess('Whitelist cleared successfully.');
        setError(null);
        setEmailList([]);
        setTextInput('');
        setFile(null);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to clear whitelist.');
        setSuccess(null);
      }
    } catch (error) {
      setError('An error occurred while clearing the whitelist.');
      setSuccess(null);
    }
  };

  return (
    <div className="my-10">
      <textarea
        placeholder="Enter emails here, one per line..."
        value={textInput}
        onChange={handleTextInputChange}
        rows={10}
        className="mb-4 w-full rounded border p-2"
      ></textarea>
      <div>
        <input type="file" accept=".txt" onChange={handleFileChange} />
      </div>
      <button onClick={handleUpload} className="mt-4 rounded bg-blue-500 p-2 text-white">
        Upload
      </button>
      <button
        onClick={handleClearWhitelist}
        className="ml-2 mt-4 rounded bg-red-500 p-2 text-white"
      >
        Clear Whitelist
      </button>
      {error && <p className="mt-2 text-red-500">{error}</p>}
      {success && <p className="mt-2 text-green-500">{success}</p>}
    </div>
  );
};

export default FileHandler;
