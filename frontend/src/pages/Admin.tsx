import React, { useState } from 'react'

//now here we have to create a from like page where the admin user can create new flashcards, update old flashcards.
export default function adminPage() {
  const [flashcard, setFlashcard] = useState({
    question: "",
    answer: "",
    index: "",
  });


  return (
    <div>
      <h1>Admin Page</h1>
    </div>
  )
}
