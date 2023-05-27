const STATES = [
    {
      "title": "Literals",
      "explanation": "",
      "positives": ["bark","baba","boo"],
      "negatives": ["baa","bellow","boom"],
      "index": 0,
      "hidden_key": "on",
    },
    {
      "title": "Alternation",
      "explanation": "",
      "positives": ["cat","dog"],
      "negatives": [],
      "index": 1,
      "hidden_key": "your",
    },
    {
      "title": "Character Sets",
      "explanation": "",
      "positives": ["cat","hat","rat"],
      "negatives": ["eat","mat","sat"],
      "index": 2,
      "hidden_key": "exciting",
    },
    {
      "title": "Wildcards",
      "explanation": "",
      "positives": ["bear.", "lion.", "orca."],
      "negatives": ["mouse","koala","snail"],
      "index": 3,
      "hidden_key": "journey",
    },
    {
      "title": "Ranges",
      "explanation": "",
      "positives": ["cub", "dog", "elk"],
      "negatives": ["ape","cow","ewe"],
      "index": 4,
      "hidden_key": "learning",
    },
    {
      "title": "Shorthand Character Classes",
      "explanation": "",
      "positives": ["5 sloths", "8 llamas", "7 hyenas"],
      "negatives": ["one bird","two owls"],
      "index": 5,
      "hidden_key": "to",
    },
    {
      "title": "Grouping",
      "explanation": "",
      "positives": ["puppies are my favorite!", "kitty cats are my favorite!"],
      "negatives": ["deer are my favorite!","otters are my favorite!","hedgehogs are my favorite!"],
      "index": 6,
      "hidden_key": "code",
    },
    {
      "title": "Quantifiers - Fixed",
      "explanation": "",
      "positives": ["squeaaak", "squeaaaak", "squeaaaaak"],
      "negatives": ["squeak","squeaak","squeaaaaaak"],
      "index": 7,
      "hidden_key": "you",
    },
    {
      "title": "Quantifiers - Optional",
      "explanation": "",
      "positives": ["1 duck for adoption?", "5 ducks for adoption?", "7 ducks for adoption?"],
      "negatives": [],
      "index": 8,
      "hidden_key": "will",
    },
    {
      "title": "Quantifiers - Kleene",
      "explanation": "",
      "positives": ["hoot", "hoooooot", "hooooooooooot"],
      "negatives": ["hot","hoat","hoo"],
      "index": 9,
      "hidden_key": "find",
    },
    {
      "title": "Anchors",
      "explanation": "",
      "positives": ["penguins are cooler than regular expressions"],
      "negatives": ["king penguins are cooler than regular expressions", "penguins are cooler than regular expressions!"],
      "index": 10,
      "hidden_key": "this.gif",
    },
    {
      "title": "Review Challenge",
      "explanation": "",
      "positives": ["718-555-3810", "9175552849", "1 212 555 3821", "(917)5551298", "212.555.8731"],
      "negatives": ["wildebeest","hippopotamus","woolly mammoth"],
      "index": 11,
      "hidden_key": "",
    }
  ]
  
  export default STATES;
  