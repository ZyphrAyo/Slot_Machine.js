// 1. Deposti money
// 2.Determine number of lines to bet on
// 3.Collect bet amt
// 4.Spin slot machine
// 5.Check if usr won
// 6.Give the user the wining or deduct money if they loose
// 7.play again

const prompt = require("prompt-sync")();

const ROW = 3;
const COLS = 3;

const SYMBOL_COUNT={
    A : 2,
    B : 4,
    C : 6,
    D : 8
}
const SYMBOL_VALUE={
    A : 5,
    B : 4,
    C : 3,
    D : 2
}


const deposit=()=>{
    while(true){
        const amountDeposit=prompt("Enter a deposit amount: ");
    const numberAmountDeposit= parseFloat(amountDeposit);

    if (isNaN(numberAmountDeposit) || numberAmountDeposit<=0){
        console.log("Imvalid deposit amount try again!")
    }else{
        return numberAmountDeposit;
    }
    }
};

const getNumberofLines = ()=>{
    while(true){
        const lines=prompt("Enter the number of lines to bet on (1-3): ");
    const numberOfLines= parseFloat(lines);

    if (isNaN(numberOfLines) || numberOfLines<=0 || numberOfLines>3){
        console.log("Imvalid number of lines try again!")
    }else{
        return numberOfLines;
    }
    }
};

const getBet= (balance,lines) =>{
    while(true){
        const bet=prompt("Enter the amount of bet per line: ");
    const numberBet= parseFloat(bet);

    if (isNaN(numberBet) || numberBet<=0 || numberBet> balance / lines){
        console.log("Imvalid bet!")
    }else{ 
        return numberBet;
    }
    }
};

const spin =()=>{
    const symbols =[];
    for(const[symbol,count]of Object.entries(SYMBOL_COUNT)){
        for(let i=0;i<count;i++){
            symbols.push(symbol);
        }
    }
    const reels = [];
    for (let i=0;i<COLS;i++){
        reels.push([]);
        const reelSymbols=[...symbols];
        for(let j=0;j<ROW;j++){
            const randomIndex=Math.floor(Math.random()*reelSymbols.length)
            const selectedSymbol=reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex,1);
        }
    }
    return reels;
}
const transpose=(reels)=>{
    const tRow=[];
    for(let i=0;i<ROW;i++){
        tRow.push([]);
        for(let j=0;j<COLS;j++){
            tRow[i].push(reels[j][i])
        }
    }
    return tRow;
}

const printRows=(rows)=>{
    for(const row of rows){
        let rowString="";
        for(const[i,symbol]of row.entries()){
            rowString +=symbol
            if(i!=row.length-1){
                rowString += " | "
            }
        }
        console.log(rowString)
    }
}

const getWinnings=(tRow,bet,lines)=>{
    let winning = 0;
    for (let row = 0; row < lines ; row++){
        const symbols = tRow[row];
        let allSame = true;

        for(const symbol of symbols){
            if(symbol !=symbol[0]){
                allSame=false;
                break;
            }
        }
        if(allSame){
            winning+=bet*SYMBOL_VALUE[symbols[0]];
        }
    }
    return winning;
}

const game=()=>{ 
    let balance = deposit();

    while (true){ 
        console.log("You have a balance of Rs."+ balance)
        const numberOfLines=getNumberofLines();
        const bet = getBet(balance,numberOfLines);
        balance-=bet*numberOfLines
        const reels=spin();
        const rows=transpose(reels);
        printRows(rows);
        const winning=getWinnings(rows,bet,numberOfLines);
        balance +=winning;
            console.log("You won Rs. " + winning.toString());
        if (balance <= 0){
            console.log("You ran out of cash!");
            break;
        }
        const palyAgain =prompt("Do you want to playb again? (y/n) ")
        if(palyAgain!="y")break;
    }   
}

game();
