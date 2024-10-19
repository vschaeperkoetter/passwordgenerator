import React, { useState } from 'react';

// Function to generate random password
const generatePassword = (length) => {
  const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz';
  const upperCaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*+?';

  if (length < 4) {
    return 'Password must be at least 4 characters long to include all character types.';
  }
  
  if (length > 100) {
    return 'Password cannot exceed 100 characters.';
  }

  // Guarantee at least one of each type
  let password = '';
  password += lowerCaseLetters[Math.floor(Math.random() * lowerCaseLetters.length)];
  password += upperCaseLetters[Math.floor(Math.random() * upperCaseLetters.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  password += symbols[Math.floor(Math.random() * symbols.length)];

  // Fill the rest of the password with random characters
  const allCharacters = lowerCaseLetters + upperCaseLetters + numbers + symbols;
  for (let i = 4; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * allCharacters.length);
    password += allCharacters[randomIndex];
  }

  // Shuffle the password to ensure randomness
  password = password.split('').sort(() => Math.random() - 0.5).join('');

  return password;
};

// Function to calculate the time to crack the password
const calculateCrackingTime = (length) => {
  const lowerCaseLetters = 26;
  const upperCaseLetters = 26;
  const numbers = 10;
  const symbols = 32; // Based on the set of symbols we use

  const totalCharacters = lowerCaseLetters + upperCaseLetters + numbers + symbols;

  // Total combinations is the number of possible characters to the power of the password length
  const totalCombinations = Math.pow(totalCharacters, length);

  // Time to crack in seconds, assuming 1 billion guesses per second
  const timeToCrackSeconds = totalCombinations / 1_000_000_000;

  // Convert time to crack into more human-readable formats (years, days, hours)
  const secondsInMinute = 60;
  const secondsInHour = secondsInMinute * 60;
  const secondsInDay = secondsInHour * 24;
  const secondsInYear = secondsInDay * 365;

  if (timeToCrackSeconds >= secondsInYear) {
    const years = timeToCrackSeconds / secondsInYear;
    return `${years.toFixed(2)} years`;
  } else if (timeToCrackSeconds >= secondsInDay) {
    const days = timeToCrackSeconds / secondsInDay;
    return `${days.toFixed(2)} days`;
  } else if (timeToCrackSeconds >= secondsInHour) {
    const hours = timeToCrackSeconds / secondsInHour;
    return `${hours.toFixed(2)} hours`;
  } else if (timeToCrackSeconds >= secondsInMinute) {
    const minutes = timeToCrackSeconds / secondsInMinute;
    return `${minutes.toFixed(2)} minutes`;
  } else {
    return `${timeToCrackSeconds.toFixed(2)} seconds`;
  }
};

const PasswordGenerator = () => {
  const [length, setLength] = useState(12); // Default password length
  const [password, setPassword] = useState('');
  const [crackingTime, setCrackingTime] = useState('');
  const [error, setError] = useState('');

  const handleGeneratePassword = () => {
    const newPassword = generatePassword(length);

    if (newPassword.includes('Password must be at least') || newPassword.includes('Password cannot exceed')) {
      setError(newPassword); // Handle error message
      setPassword('');
      setCrackingTime('');
    } else {
      setError('');
      setPassword(newPassword);
      const time = calculateCrackingTime(length);
      setCrackingTime(time);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Password Generator</h2>
      <div style={styles.inputGroup}>
        <label htmlFor="length" style={styles.label}>Password Length:</label>
        <input
          type="number"
          id="length"
          value={length}
          min="4"
          max="100"
          onChange={(e) => setLength(Math.min(Math.max(e.target.value, 4), 100))}
          style={styles.input}
        />
      </div>
      <button onClick={handleGeneratePassword} style={styles.button}>
        Generate Password
      </button>
      {error && <p style={styles.error}>{error}</p>}
      {password && (
        <div style={styles.result}>
          <h3>Generated Password:</h3>
          <p style={styles.password}>{password}</p>
          <h4>Estimated time to crack:</h4>
          <p style={styles.time}>{crackingTime}</p>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '400px', // Container width
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f7f7f7',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  title: {
    textAlign: 'center',
    color: '#333',
  },
  inputGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontSize: '14px',
    color: '#555',
  },
  input: {
    width: '100%',
    padding: '8px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    marginBottom: '10px',
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  result: {
    marginTop: '20px',
    textAlign: 'center',
  },
  password: {
    fontFamily: 'monospace',
    backgroundColor: '#e9ecef',
    padding: '10px',
    borderRadius: '4px',
    display: 'inline-block',
    fontSize: '16px',
    color: '#333',
    maxWidth: '100%', // Ensures it stays within container width
    wordWrap: 'break-word', // Allows long passwords to break into new lines
    wordBreak: 'break-all', // Forces a break if needed
    whiteSpace: 'pre-wrap', // Preserves white space and breaks lines properly
  },
  time: {
    marginTop: '10px',
    color: '#555',
  },
};


export default PasswordGenerator;
