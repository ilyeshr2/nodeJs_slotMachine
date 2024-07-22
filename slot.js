const prompt = require('prompt-sync')();

function run() {
    const moneyDeposit = () => {
        let n;
        do {
            n = parseFloat(prompt('How much money do you want to deposit?: '));
            if (n <= 0) {
                console.log('Please enter a positive balance.');
            } else if (isNaN(n)) {
                console.log('Please enter a valid balance.');
            }
        } while (n <= 0 || isNaN(n));
        return n;
    };

    const numberOfLines = () => {
        let n;
        do {
            n = parseFloat(prompt('How many lines do you want to bet on (1-3)?: '));
            if (n <= 0 || n > 3 || isNaN(n)) {
                console.log('Please enter a valid number of lines (1-3).');
            }
        } while (n <= 0 || n > 3 || isNaN(n));
        return n;
    };

    const betAmount = (balance, lines) => {
        let n;
        do {
            n = parseFloat(prompt('Enter a bet amount per line: '));
            if (n <= 0 || isNaN(n)) {
                console.log('Please enter a valid bet amount.');
            } else if (n * lines > balance) {
                console.log('Insufficient balance for the bet. Please enter a lower amount.');
            }
        } while (n <= 0 || isNaN(n) || n * lines > balance);
        return n;
    };

    const makeSlotMachine = () => {
        return [[], [], []];
    };

    const spinSlotMachine = (slotMachine) => {
        const slotItems = ['A', 'B', 'C'];
        for (let i = 0; i < slotMachine.length; i++) {
            for (let j = 0; j < 3; j++) {
                let rand = Math.floor(Math.random() * slotItems.length);
                slotMachine[i].push(slotItems[rand]);
            }
        }
        return slotMachine;
    };

    const checkIfUserWon = (slotMachine) => {
        let winCount = 0;
        const allEqual = arr => arr.every(v => v === arr[0]);
        slotMachine.forEach(line => {
            if (allEqual(line)) {
                winCount += 1;
            }
        });
        return winCount;
    };

    const updateBalance = (balance, bet, winCount, lines) => {
        balance -= bet * lines;
        if (winCount > 0) {
            balance += bet * winCount * lines;
        }
        return balance;
    };

    let balance = moneyDeposit();
    let playAgain = true;

    while (playAgain && balance > 0) {
        let lines = numberOfLines();
        let bet = betAmount(balance, lines);
        let slotMachine = makeSlotMachine();
        slotMachine = spinSlotMachine(slotMachine);
        console.log(slotMachine);

        let winCount = checkIfUserWon(slotMachine);
        if (winCount > 0) {
            console.log(`Congratulations, you won ${winCount} lines!`);
        } else {
            console.log('Sorry, you didn’t win.');
        }

        balance = updateBalance(balance, bet, winCount, lines);
        console.log(`Your current balance is: ${balance}`);

        if (balance <= 0) {
            console.log('Your balance is zero. Game over.');
            playAgain = false;
        } else {
            let response = prompt('Do you want to play again? (yes/no): ');
            if (response.toLowerCase() !== 'yes') {
                playAgain = false;
            }
        }
    }
}

run();
