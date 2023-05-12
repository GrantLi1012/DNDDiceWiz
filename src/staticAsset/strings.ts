export const strings = {
    appName: "DND Dice Wiz",
    home: {
        welcomeMessage: "🔮 Welcome to DND Dice Wiz! 🔮",
        appDescriptionLine1: "This is a tool to help you gain some insight into your potential dice rolls.",
        appDescriptionLine2: "Damange output, avrage roll numbers, and more!",
        startApp: "Get Started",
    },
    titles: {
        home: "Home",
        applications: "Applications",
        about: "About",
        diceRoller: "Dice Roller",
        averageCalculator: "Average Calculator"
    },
    about: {
        author: {
            aboutAuthor: "About the Author",
            aboutAuthorMessage: "DND nerd, web developer, dancer, and all around nerd. Hope you enjoy this app!",
        },
        attribution: {
            aboutAttribution: "Attribution",
        },
        featuresToCome: {
            featuresToCome: "Features to Come",
            featuresToComeList: [
                "Here are some features under consideration for future releases:",
                "- Dice roller",
                "- d20 with advantage/disadvantage",
                "- When dice range is limited, e.g. force re-roll when 1 or 2 is rolled",
                "- Probability of succeeding a check",
                "If you have any suggestions, please feel free to reach out to me!"
            ],
        }
    },
    averageCalculator: {
        instruction1: "This app helps you find out the average output of any combination of dice rolls. Curious of how much damage your Fireball spell generally deals? Wondering how much health can Cure Wound restore on average? Let's find out!",
        instruction2_1: "Step 1: Enter the number of dice you want to roll under the corresponding dice type.",
        instruction2_2: "e.g. If you want to roll 2d6 and 1d4, enter 2 under d6 and 1 under d4.",
        instruction3_1: "Step 2: Enter the modifier you want to add to the dice roll.",
        instruction3_2: "e.g. You can enter both positive and negative modifiers. For example, enter 5 or '+5' for +5 and '-2' for -2.",
        instruction4_1: "Step 3: Click the Calculate button to show the average result!",
        calculate: "Calculate",
    },
    dice: {
        d4: "d4",
        d6: "d6",
        d8: "d8",
        d10: "d10",
        d12: "d12",
        d20: "d20",
    },
    roller: {
        instruction1: "This app helps you roll your dice during game play! It generates TRUE RANDOM numbers using the random.org API! The randomness is guaranteed by the usage of atmospheric noise.",
        instruction2_1: "Quick d20 roll",
        instruction2_2: "Click the dice image to roll or re-roll",
        instruction3: "Custom multi-dice roll [COMING SOON]",
        roll: "Roll",
    }
};