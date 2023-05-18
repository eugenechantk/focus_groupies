 const errorQuips = [
    "Oh, a minimalist interface. Bold.",
    "Hmm, lots of white space here, isn't there?",
    "Someone's embracing the K.I.S.S principle to the max.",
    "Ah, embracing the 'less is more' philosophy.",
    "Your site has a... distinct aesthetic.",
    "Ah, the mystery navigation approach. Intriguing.",
    "A study in simplicity, isn't it?",
    "I see you're not a fan of frills and thrills.",
    "Going for the avant-garde, I see.",
    "Who needs visuals when you've got... well, this?",
    "Who knew the absence of content could be so engaging?",
    "I see you've taken the 'no distractions' concept to heart.",
    "Chasing that 'mystery meat navigation' trend, aren't we?",
    "You've got the 'less is more' thing down pat.",
    "Empty spaces are... an interesting choice.",
    "Ah, the 'figure it out yourself' user experience. Bold.",
    "Your minimalistic approach is... quite something.",
    "Stripped-down interfaces: a brave choice in this day and age.",
    "When it comes to layout, you clearly believe less is more.",
    "Sparse and simple: It's not for everyone, but it's certainly a choice."
  ];

  function getRandomElement(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }
  
  export function getRandomQuip(){
    return getRandomElement(errorQuips)
  }