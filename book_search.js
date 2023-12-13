/** 
 * RECOMMENDATION
 * 
 * To test your code, you should open "tester.html" in a web browser.
 * You can then use the "Developer Tools" to see the JavaScript console.
 * There, you will see the results unit test execution. You are welcome
 * to run the code any way you like, but this is similar to how we will
 * run your code submission.
 * 
 * The Developer Tools in Chrome are available under the "..." menu, 
 * futher hidden under the option "More Tools." In Firefox, they are 
 * under the hamburger (three horizontal lines), also hidden under "More Tools." 
 */


let initialized = false;
let searchable = {};
let globalResults = [];

function reset(){
    initialized = false;
    searchable = {};
    globalResults = [];
}

function initializesearchable(scannedTextObj) {
    let globalIndex = 0; // Track the index in globalResults

    scannedTextObj.forEach((book) => {
        book.Content.forEach(content => {
            // Push the content data to globalResults
            globalResults.push({
                "ISBN": book.ISBN,
                "Page": content.Page,
                "Line": content.Line,
            });

            // Consider all substrings within the line
            let words = content.Text.split(/\s+/);
            for (let i = 0; i < words.length; i++) {
                let substring = "";
                for (let j = i; j < words.length; j++) {
                    substring += (j > i ? " " : "") + words[j]; // Concatenate words to form the substring
                    
                    // Initialize an array for this substring if not already present
                    if (!searchable[substring]) {
                        searchable[substring] = [];
                    }

                    // Add the current global index to the array for this substring
                    if (!searchable[substring].includes(globalIndex)) {
                        searchable[substring].push(globalIndex);
                    }
                }
            }

            globalIndex++; // Increment the global index for the next content line
        });
    });

    initialized = true;
}


/**
 * Searches for matches in scanned text.
 * @param {string} searchTerm - The word or term we're searching for. 
 * @param {JSON} scannedTextObj - A JSON object representing the scanned text.
 * @returns {JSON} - Search results.
 * */ 
 function findSearchTermInBooks(searchTerm, scannedTextObj) {
    /** You will need to implement your search and 
     * return the appropriate object here. */
    var result = {
        "SearchTerm": searchTerm,
        "Results": []
    };

    // Initialize the hash table if it hasn't been done already
    if (!initialized) {
        initializesearchable(scannedTextObj);
    }

    // Search for the term in the hash table
    const indecies = searchable[searchTerm];
    if(indecies != null){
        indecies.forEach(index => {
            result.Results.push( globalResults[index] );
        });
    }
    

    return result; 
}



/** Example input object. */
const twentyLeaguesIn = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            } 
        ] 
    }
]

const books = [
{
    "Title": "Unique Book 1",
    "ISBN": "9789128603211",
    "Content": [
        {"Page": 437, "Line": 1, "Text": "The murder hornet was disappointed by the preconceived ideas people had of him."},
        {"Page": 437, "Line": 2, "Text": "The tears of a clown make my lipstick run, but my shower cap is still intact."},
        {"Page": 437, "Line": 3, "Text": "Each person who knows you has a different perception of who you are."},
        {"Page": 437, "Line": 4, "Text": "As the rental car rolled to a stop on the dark road, her fear increased by the moment."}
    ]
},
{
    "Title": "Unique Book 2",
    "ISBN": "9780464538675",
    "Content": [
        {"Page": 158, "Line": 1, "Text": "Karen believed all traffic laws should be obeyed by all except herself."},
        {"Page": 158, "Line": 2, "Text": "They were excited to see their first sloth."},
        {"Page": 158, "Line": 3, "Text": "Art doesn't have to be intentional."}
    ]
},
{
    "Title": "Unique Book 3",
    "ISBN": "9786754732459",
    "Content": [
        {"Page": 133, "Line": 1, "Text": "We need to rent a room for our party."},
        {"Page": 133, "Line": 2, "Text": "He was sitting in a trash can with high street class."},
        {"Page": 133, "Line": 3, "Text": "In a galaxy far, far away..."}
    ]
},
{
    "Title": "Unique Book 4",
    "ISBN": "9788193577119",
    "Content": [
        {"Page": 282, "Line": 1, "Text": "We should play with legos at camp."},
        {"Page": 282, "Line": 2, "Text": "She wanted a pet platypus but ended up getting a duck and a ferret instead."}
    ]
},
{
    "Title": "Unique Book 5",
    "ISBN": "9785575901199",
    "Content": [
        {"Page": 76, "Line": 1, "Text": "She had a difficult time owning up to her own crazy self."},
        {"Page": 76, "Line": 2, "Text": "Call me Ishmael."},
        {"Page": 76, "Line": 3, "Text": "Call me Ishmael."}
    ]
},
{
    "Title": "Unique Book 6",
    "ISBN": "9787694380279",
    "Content": [
        {"Page": 29, "Line": 1, "Text": "Elementary, my dear Watson."},
        {"Page": 29, "Line": 2, "Text": "He found rain fascinating yet unpleasant."}
    ]
},
{
    "Title": "Unique Book 7",
    "ISBN": "9783759845489",
    "Content": [
        {"Page": 244, "Line": 1, "Text": "It had been sixteen days since the zombies first attacked."},
        {"Page": 244, "Line": 2, "Text": "Elementary, my dear Watson."}
    ]
},
{
    "Title": "Unique Book 8",
    "ISBN": "9782378157135",
    "Content": [
        {"Page": 267, "Line": 1, "Text": "Watching the geriatric men's softball team brought back memories of 3 yr olds playing t-ball."},
        {"Page": 267, "Line": 2, "Text": "As the years pass by, we all know owners look more and more like their dogs."},
        {"Page": 267, "Line": 3, "Text": "In a galaxy far, far away..."},
        {"Page": 267, "Line": 4, "Text": "I'm working on a sweet potato farm."},
        {"Page": 267, "Line": 5, "Text": "The fish listened intently to what the frogs had to say."}
    ]
},
{
    "Title": "Unique Book 9",
    "ISBN": "9786003251403",
    "Content": [
        {"Page": 457, "Line": 1, "Text": "To be, or not to be: that is the question."},
        {"Page": 457, "Line": 2, "Text": "He shaved the peach to prove a point."},
        {"Page": 457, "Line": 3, "Text": "It's a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife."}
    ]
},
{
    "Title": "Unique Book 10",
    "ISBN": "9780803738131",
    "Content": [
        {"Page": 109, "Line": 1, "Text": "The answer to life, the universe, and everything is 42."},
        {"Page": 109, "Line": 2, "Text": "The quick brown fox jumps over the lazy dog."},
        {"Page": 109, "Line": 3, "Text": "I want to buy a onesie… but know it won't suit me."},
        {"Page": 109, "Line": 4, "Text": "The father handed each child a roadmap at the beginning of the 2-day road trip and explained it was so they could find their way home."}
    ]
}

];
    
/** Example output object */
const twentyLeaguesOut = {
    "SearchTerm": "the",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        }
    ]
}

/*
 _   _ _   _ ___ _____   _____ _____ ____ _____ ____  
| | | | \ | |_ _|_   _| |_   _| ____/ ___|_   _/ ___| 
| | | |  \| || |  | |     | | |  _| \___ \ | | \___ \ 
| |_| | |\  || |  | |     | | | |___ ___) || |  ___) |
 \___/|_| \_|___| |_|     |_| |_____|____/ |_| |____/ 
                                                      
 */

/* We have provided two unit tests. They're really just `if` statements that 
 * output to the console. We've provided two tests as examples, and 
 * they should pass with a correct implementation of `findSearchTermInBooks`. 
 * 
 * Please add your unit tests below.
 * */

/** We can check that, given a known input, we get a known output. */
const test1result = findSearchTermInBooks("the", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOut) === JSON.stringify(test1result)) {
    console.log("PASS: Test 1");
} else {
    console.log("FAIL: Test 1");
    console.log("Expected:", twentyLeaguesOut);
    console.log("Received:", test1result);
}

// /** We could choose to check that we get the right number of results. */
const test2result = findSearchTermInBooks("the", twentyLeaguesIn); 
if (test2result.Results.length == 1) {
    console.log("PASS: Test 2");
} else {
    console.log("FAIL: Test 2");
    console.log("Expected:", twentyLeaguesOut.Results.length);
    console.log("Received:", test2result.Results.length);
}

reset();

// Test 1: Search for a term that exists in multiple books
function testSearchMultipleOccurrences() {
    const searchTerm = "In a galaxy far, far away...";
    const results = findSearchTermInBooks(searchTerm, books);
    console.assert(results.Results.length === 2, `Test 1 Failed: Expected 2 occurrences, found ${results.Results.length}`);
}

// Test 2: Search for a term that exists in a single book
function testSearchSingleOccurrence() {
    const searchTerm = "Call me Ishmael.";
    const results = findSearchTermInBooks(searchTerm, books);
    console.assert(results.Results.length === 2, `Test 2 Failed: Expected 2 occurrences, found ${results.Results.length}`);
}

// Test 3: Search for a term that doesn't exist
function testSearchNoOccurrence() {
    const searchTerm = "ytdfkuhj";
    const results = findSearchTermInBooks(searchTerm, books);
    console.assert(results.Results.length === 0, `Test 3 Failed: Expected 0 occurrences, found ${results.Results.length}`);
}

// Test 4: Search for a term with mixed case
function testSearchMixedCase() {
    const searchTerm = "a Galaxy Far, far Away...";
    const results = findSearchTermInBooks(searchTerm, books);
    console.assert(results.Results.length === 0, `Test 0 Failed: Expected 4 occurrences, found ${results.Results.length}`);
}

// Test 5: Search for a numeric term
function testSearchNumeric() {
    const searchTerm = "42.";
    const results = findSearchTermInBooks(searchTerm, books);
    console.assert(results.Results.length === 1, `Test 5 Failed: Expected 1 occurrences, found ${results.Results.length}`);
}

// Test 6: Search for a word fragment
function testSearchFragment() {
    const searchTerm = "know";
    const results = findSearchTermInBooks(searchTerm, books);
    console.assert(results.Results.length === 2, `Test 6 Failed: Expected 2 occurrences, found ${results.Results.length}`);
}

// Test 7: Search for a symbol
function testSearchSymbol() {
    const searchTerm = ".";
    const results = findSearchTermInBooks(searchTerm, books);
    console.assert(results.Results.length === 0, `Test 7 Failed: Expected 5 occurrences, found ${results.Results.length}`);
}

// Run the tests
testSearchMultipleOccurrences();
testSearchSingleOccurrence();
testSearchNoOccurrence();
testSearchMixedCase();
testSearchNumeric();
testSearchFragment();
testSearchSymbol();

console.log("Tests completed");