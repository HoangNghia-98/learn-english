console.log('hello word')

var vnMonthLabel = document.getElementById("vnMonthLabel");
var engMonthInput = document.querySelector("#InputMonth");
var checkBtn = document.querySelector("#checkBtn");
var notCorretMess = document.querySelector(".notCorretMess");
var formInput = document.querySelector(".formInput");
notCorretMess.style.display = "none";
engMonthInput.value = ""
// get the dom element

var months = [
    { vn: 1, eng: "January" },
    { vn: 2, eng: "February" },
    { vn: 3, eng: "March" },
    { vn: 4, eng: "April" },
    { vn: 5, eng: "May" },
    { vn: 6, eng: "June" },
    { vn: 7, eng: "July" },
    { vn: 8, eng: "August" },
    { vn: 9, eng: "September" },
    { vn: 10, eng: "October" },
    { vn: 11, eng: "November" },
    { vn: 12, eng: "December" }
]

let data = {
    months,
    currentMonthIndex: 0,
    currentMonth: ""
}

let totalCorretAnswer = 0;

function shuffle(arra1) {
    var ctr = arra1.length,
        temp,
        index;

    // While there are elements in the array
    while (ctr > 0) {
        // Pick a random index
        index = Math.floor(Math.random() * ctr);
        // Decrease ctr by 1
        ctr--;
        // And swap the last element with it
        temp = arra1[ctr];
        arra1[ctr] = arra1[index];
        arra1[index] = temp;
    }

    return arra1;
}

var updateVnMonthLabel = () => {
    vnMonthLabel.innerHTML = `Tháng ${data.months[data.currentMonthIndex]?.vn}`
}

var checkMonthSubmit = () => {
    console.log("🚀 ~ checkMonthSubmit ~ months:", data.months)

    let submitValue = engMonthInput.value?.trim() || ""
    console.log('data.currentIndex', data.currentMonthIndex)
    console.log('check value: ', submitValue)
    console.log('data.currentMonth: ', data.currentMonth)

    if (submitValue?.toUpperCase() && submitValue?.toUpperCase() == data.currentMonth?.toUpperCase()) {
        notCorretMess.style.display = "none";
        totalCorretAnswer += 1
        console.log("🚀 ~ checkMonthSubmit ~ totalCorretAnswer:", totalCorretAnswer)
        if (totalCorretAnswer === 12) {
            totalCorretAnswer = 0
            shuffleMonths()
            console.log('new months', data.months)
        } else {
            data.currentMonthIndex += 1
            data.currentMonth = data.months[data.currentMonthIndex]?.eng || ''
        }
        
        updateVnMonthLabel()
        engMonthInput.value = ""
        // update vnMonthLabel



        return true
    } else {
        // show not correct message
        notCorretMess.style.display = "block";
        return false
    }
}

var shuffleMonths = () => {
    data.months = [...shuffle(months)]
    console.log("data.months", data.months)
    data.currentMonthIndex = 0
    data.currentMonth = data.months[0].eng
}

var main = () => {
    shuffleMonths()
    updateVnMonthLabel()
    // engMonthInput.value = months[currentIndexMonths].eng || ""

    checkBtn.addEventListener('click', () => checkMonthSubmit())
    formInput.addEventListener('submit', () => checkMonthSubmit())
}

main()