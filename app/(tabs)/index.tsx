import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Pressable } from 'react-native';

export default function HomeScreen() {
  const generateRandom = () => Math.floor(Math.random() * 100) + 1;

  const [secret, setSecret] = useState(generateRandom());
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');
  const [attempts, setAttempts] = useState(6);
  const [gameOver, setGameOver] = useState(false);

  const compliments = [
    '🧠 Nice try, genius!',
    '😅 You almost had it!',
    '🎯 Missed it by *that* much!',
    '👻 Not even close, ghostbuster!',
    '🙈 The number was smarter than you!',
    '🤡 You tried your best... maybe.',
    '🫢 Maybe next time, champ!',
    '💀 The number says goodbye!',
    '🐒 Monkey got the typewriter again!',
  ];

  const handleGuess = () => {
    const userGuess = parseInt(guess);
    if (isNaN(userGuess)) {
      setMessage('⛔ Enter a valid number!');
      return;
    }

    if (gameOver) return;

    if (userGuess === secret) {
      setMessage('🎉 Woohoo! You got it!');
      setGameOver(true);
    } else {
      const newAttempts = attempts - 1;
      setAttempts(newAttempts);
      if (newAttempts === 0) {
        const compliment = compliments[Math.floor(Math.random() * compliments.length)];
        setMessage(`💥 Out of tries! It was ${secret}. ${compliment}`);
        setGameOver(true);
      } else {
        setMessage(userGuess > secret ? '📉 Too high!' : '📈 Too low!');
      }
    }
    setGuess('');
  };

  const handleReset = () => {
    setSecret(generateRandom());
    setGuess('');
    setMessage('');
    setAttempts(6);
    setGameOver(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎮 Number Guessing Game</Text>
      <Text style={[styles.message, gameOver ? styles.gameOverText : styles.normalText]}>
        {message}
      </Text>
      <Text style={styles.attempts}>Attempts Left: {attempts}</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your guess"
        keyboardType="numeric"
        value={guess}
        onChangeText={setGuess}
        editable={!gameOver}
      />

      <View style={styles.buttonContainer}>
        <Button title="Guess" onPress={handleGuess} disabled={gameOver} />
      </View>

      {gameOver && (
        <Pressable style={styles.resetBtn} onPress={handleReset}>
          <Text style={styles.resetText}>🔄 Try Again</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0f7fa',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    width: '100%',
    paddingHorizontal: 32,
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#3949ab',
    textAlign: 'center',
  },
  message: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 12,
  },
  normalText: {
    color: '#00796b',
  },
  gameOverText: {
    color: '#d81b60',
  },
  attempts: {
    fontSize: 16,
    color: '#1976d2',
    marginBottom: 20,
  },
  input: {
  width: '95%',        
  maxWidth: 600,         
  height: 50,
  borderColor: '#81d4fa',
  borderWidth: 1,
  marginBottom: 20,
  paddingLeft: 12,
  borderRadius: 8,
  backgroundColor: '#ffffff',
  fontSize: 18,
  },
  buttonContainer: {
    width: '20%',
    marginBottom: 20,
  },
  resetBtn: {
    backgroundColor: '#ab47bc',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  resetText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
