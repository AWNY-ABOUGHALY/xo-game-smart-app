let oxDiv = document.querySelectorAll(".oxdiv");
let theWinner = document.querySelector(".thewinner");
let youInput = document.querySelector(".youscore input");
let pcInput = document.querySelector(".pcscore input");
youInput.value = window.localStorage.getItem("youScore") || 0;
pcInput.value = window.localStorage.getItem("pcScore") || 0;

let arr = [];
Array.from(oxDiv).map(q=>arr += q.innerHTML)
let arrOfOxDiv = arr.split("")

let xChosen = `<div class="oxcontent"><i class="fa-solid fa-x"></i></div>`;
let oChosen = `<div class="oxcontent"><i class="fa-solid fa-o"></i></div>`
let rowsChecker, columnsChecker, curve1Checker, curve2Checker;
function winChecker(player) {
    function winColor(index1, index2, index3) {
        if(player === xChosen) {
            index1.style.color = "#00c500";
            index2.style.color = "#00c500";
            index3.style.color = "#00c500";
        } else if (player === oChosen) {
            index1.style.color = "#ff2828";
            index2.style.color = "#ff2828";
            index3.style.color = "#ff2828";
        }
    }
    for(let i = 0; i < 7; i += 3) {
        rowsChecker = arrOfOxDiv[i] === player && arrOfOxDiv[i + 1] === player && arrOfOxDiv[i + 2] === player;
        if(rowsChecker) {
            winColor(oxDiv[i], oxDiv[i+1], oxDiv[i+2])
            return rowsChecker;
        }
    }
    for(let i = 0; i < 3; i++) {
        columnsChecker = arrOfOxDiv[i] === player && arrOfOxDiv[i + 3] === player && arrOfOxDiv[i + 6] === player;
        if(columnsChecker) {
            winColor(oxDiv[i], oxDiv[i+3], oxDiv[i+6])
            return columnsChecker;
        }
    }
    curve1Checker = arrOfOxDiv[0] === player && arrOfOxDiv[4] === player && arrOfOxDiv[8] === player;
    curve2Checker = arrOfOxDiv[2] === player && arrOfOxDiv[4] === player && arrOfOxDiv[6] === player;
    if(curve1Checker) {
        winColor(oxDiv[0], oxDiv[4], oxDiv[8])
        return curve1Checker;
    }
    if(curve2Checker) {
        winColor(oxDiv[2], oxDiv[4], oxDiv[6])
        return curve2Checker;
    }
}
function storageScore() {
    let playAgain = document.querySelector(".playagain");
    playAgain.addEventListener("click",()=>{
        window.localStorage.setItem("pcScore",pcInput.value);
        window.localStorage.setItem("youScore",youInput.value);
        window.location.reload();
    })
}
oxDiv.forEach((e)=>{
    e.addEventListener("click",function() {
        if(theWinner.innerHTML !== "YOU WIN" && theWinner.innerHTML !== "YOU LOSE") {
            if(this.innerHTML !== xChosen && this.innerHTML !== oChosen) {
                arrOfOxDiv[this.innerHTML -1] = xChosen;
                this.style.opacity = 1;
                this.innerHTML = xChosen;
                let arrOfOxDivfiltered = arrOfOxDiv.filter((n)=>{
                    return n != xChosen && n != oChosen;
                })
                winChecker(xChosen)
                if(winChecker(xChosen)) {
                    theWinner.innerHTML = "YOU WIN";
                    theWinner.style.cssText = "color: green!important";
                    ++youInput.value
                    storageScore()
                } else {
                    setTimeout(() => {
                        function pcSmart(player, rowColumnChecker, rowsChecker, columnsChecker, curveChecker, firstCurve, index1, index2, index3) {
                            if(rowColumnChecker) {
                                for(let j = 0; ; ) { 
                                    let pcSmartPlayer
                                    if(rowsChecker) {
                                        pcSmartPlayer = [arrOfOxDiv[j] === player, arrOfOxDiv[j + 1] === player, arrOfOxDiv[j + 2] === player]
                                    }
                                    if(columnsChecker) {  
                                        pcSmartPlayer = [arrOfOxDiv[j] === player, arrOfOxDiv[j + 3] === player, arrOfOxDiv[j + 6] === player]
                                    }
                                    let pcSmartTester = pcSmartPlayer.filter(e=>e === true).length
                                    if(pcSmartTester === 2) {
                                        let IndexOfFalse;
                                        if(rowsChecker) {IndexOfFalse = pcSmartPlayer.indexOf(false);}
                                        if(columnsChecker) {
                                            IndexOfFalse = 0;
                                            pcSmartPlayer.indexOf(false) === 1 ? IndexOfFalse = 3 : pcSmartPlayer.indexOf(false) === 2 ? IndexOfFalse = 6 : IndexOfFalse
                                        }
                                        let secondPlayer = player === xChosen ? oChosen : xChosen
                                        if(oxDiv[IndexOfFalse + j].innerHTML !== secondPlayer) {
                                            oxDiv[IndexOfFalse + j].innerHTML = oChosen;
                                            oxDiv[IndexOfFalse + j].style.opacity = 1;
                                            arrOfOxDiv[IndexOfFalse + j] = oChosen;
                                            return true;
                                        }
                                    }
                                    if(rowsChecker) {
                                        j += 3;
                                        if(j === 9) {break;}
                                    }
                                    if(columnsChecker) {
                                        j++;
                                        if(j === 3) {break;}
                                    }
                                }
                            }
                            if(curveChecker) {
                                let pcSmartPlayer = [index1 === player, index2 === player, index3 === player];
                                let pcSmartTester = pcSmartPlayer.filter(e=> e === true).length
                                if(pcSmartTester === 2) {
                                    let IndexOfFalse;
                                    if(firstCurve) {
                                        IndexOfFalse = 0;
                                        pcSmartPlayer.indexOf(false) === 1 ? IndexOfFalse = 4 : pcSmartPlayer.indexOf(false) === 2 ? IndexOfFalse = 8 : IndexOfFalse
                                    } else {
                                        IndexOfFalse = 2;
                                        pcSmartPlayer.indexOf(false) === 1 ? IndexOfFalse = 4 : pcSmartPlayer.indexOf(false) === 2 ? IndexOfFalse = 6 : IndexOfFalse
                                    }
                                    let secondPlayer = player === xChosen ? oChosen : xChosen
                                    if(oxDiv[IndexOfFalse].innerHTML !== secondPlayer) {
                                        oxDiv[IndexOfFalse].innerHTML = oChosen;
                                        oxDiv[IndexOfFalse].style.opacity = 1;
                                        arrOfOxDiv[IndexOfFalse] = oChosen;
                                        return true;
                                    }                            
                                }
                            }
                        }
                        if(pcSmart(oChosen, true, true, false, false) || pcSmart(oChosen, true, false, true, false) || pcSmart(oChosen, false, false, false, true, true, arrOfOxDiv[0], arrOfOxDiv[4], arrOfOxDiv[8]) || pcSmart(oChosen, false, false, false, true, false, arrOfOxDiv[2], arrOfOxDiv[4], arrOfOxDiv[6])) {
                            winChecker(oChosen)
                        } else if (pcSmart(xChosen, true, true, false, false) || pcSmart(xChosen, true, false, true, false) || pcSmart(xChosen, false, false, false, true, true, arrOfOxDiv[0], arrOfOxDiv[4], arrOfOxDiv[8]) || pcSmart(xChosen, false, false, false, true, false, arrOfOxDiv[2], arrOfOxDiv[4], arrOfOxDiv[6])) {
                            winChecker(oChosen)
                        } else {
                            for(let i = 0; i < 50; i++) {
                                if(arrOfOxDivfiltered.length < 1) {
                                    window.location.reload()
                                } else {
                                    let oRandam = (Math.random()*10).toFixed();
                                    if(oRandam > 0 && oRandam < 9 && arrOfOxDivfiltered.includes(oRandam)) {
                                        arrOfOxDiv[oRandam -1] = oChosen;
                                        oxDiv[oRandam -1].style.opacity = 1;
                                        oxDiv[oRandam -1].innerHTML = oChosen;
                                        break;
                                    }
                                }
                            }
                            winChecker(oChosen)
                        }
                        if(winChecker(oChosen)) {
                            theWinner.innerHTML = "YOU LOSE";
                            theWinner.style.cssText = "color: red!important;"
                            ++pcInput.value
                            storageScore()
                        }
                    }, 300);
                }
            }
        }
    })
})
let newScore = document.querySelector(".newscore");
newScore.addEventListener("click",()=>{
    window.localStorage.clear()
    window.location.reload()
})