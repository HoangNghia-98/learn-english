console.log('hello word')

// Lấy các phần tử DOM và kiểm tra tồn tại
var monthLabel = document.getElementById("monthLabel");
var engMonthInput = document.querySelector("#InputMonth");
var checkBtn = document.querySelector("#checkBtn");
var notCorretMess = document.querySelector(".notCorretMess");
var formInput = document.querySelector(".formInput");
var modeSelector = document.getElementById("modeSelector");
var totalSuccessElement = document.getElementById("totalSuccess");

// Kiểm tra xem các phần tử DOM có tồn tại không
if (!monthLabel || !engMonthInput || !checkBtn || !notCorretMess || !formInput || !modeSelector || !totalSuccessElement) {
    console.error("Some DOM elements not found, game may not work correctly");
} else {
    notCorretMess.style.display = "none";
    engMonthInput.value = "";
    
    // Thêm placeholder để hướng dẫn định dạng đầu vào
    if (modeSelector.value === "eng") {
        engMonthInput.placeholder = "e.g. January";
    } else {
        engMonthInput.placeholder = "e.g. Tháng 1";
    }
}

// get the dom element

var months = [
    { vn: "Tháng 1", eng: "January" },
    { vn: "Tháng 2", eng: "February" },
    { vn: "Tháng 3", eng: "March" },
    { vn: "Tháng 4", eng: "April" },
    { vn: "Tháng 5", eng: "May" },
    { vn: "Tháng 6", eng: "June" },
    { vn: "Tháng 7", eng: "July" },
    { vn: "Tháng 8", eng: "August" },
    { vn: "Tháng 9", eng: "September" },
    { vn: "Tháng 10", eng: "October" },
    { vn: "Tháng 11", eng: "November" },
    { vn: "Tháng 12", eng: "December" }
]

let data = {
    months,
    currentMonthIndex: 0,
    currentMonth: "",
    mode: "eng" // Default mode: Vietnamese → English
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

var updateMonthLabel = () => {
    if (data.mode === "eng") {
        // Show Vietnamese, ask for English
        monthLabel.innerHTML = data.months[data.currentMonthIndex]?.vn;
    } else {
        // Show English, ask for Vietnamese
        monthLabel.innerHTML = data.months[data.currentMonthIndex]?.eng;
    }
}

var checkMonthSubmit = () => {
    let submitValue = engMonthInput.value?.trim() || "";
    let correctValue;
    
    if (data.mode === "eng") {
        // Check English answer
        correctValue = data.months[data.currentMonthIndex]?.eng;
    } else {
        // Check Vietnamese answer
        correctValue = data.months[data.currentMonthIndex]?.vn;
        
        // Kiểm tra xem người dùng chỉ nhập số thay vì "Tháng X"
        const monthNumber = correctValue.match(/Tháng (\d+)/)?.[1];
        if (monthNumber && submitValue === monthNumber) {
            // Nếu câu trả lời là chỉ số tháng, cũng tính là đúng
            submitValue = correctValue;
        }
    }

    // Chuẩn hóa chuỗi để so sánh chính xác hơn
    const normalizedSubmit = submitValue.toUpperCase().replace(/\s+/g, ' ');
    const normalizedCorrect = correctValue.toUpperCase().replace(/\s+/g, ' ');

    if (
        submitValue &&
        normalizedSubmit === normalizedCorrect
    ) {
        notCorretMess.style.display = "none";
        totalCorretAnswer += 1;
        
        if (totalCorretAnswer === 12) {
            totalCorretAnswer = 0;
            totalSuccessElement.innerHTML = `Total correct: ${totalCorretAnswer}`;
            shuffleMonths();
        } else {
            data.currentMonthIndex += 1;
            // Kiểm tra nếu vượt quá chỉ số của mảng
            if (data.currentMonthIndex >= data.months.length) {
                data.currentMonthIndex = 0;
                shuffleMonths();
            }
            totalSuccessElement.innerHTML = `Total correct: ${totalCorretAnswer}`;
        }

        updateMonthLabel();
        engMonthInput.value = "";
        engMonthInput.focus();
        
        return true;
    } else {
        // show not correct message
        notCorretMess.style.display = "block";
        return false;
    }
}

var shuffleMonths = () => {
    data.months = [...shuffle(months)];
    data.currentMonthIndex = 0;
}

var changeMode = () => {
    data.mode = modeSelector.value;
    totalCorretAnswer = 0;
    totalSuccessElement.innerHTML = `Total correct: ${totalCorretAnswer}`;
    shuffleMonths();
    updateMonthLabel();
    engMonthInput.value = "";
    engMonthInput.focus();
    notCorretMess.style.display = "none";

    // Cập nhật placeholder khi thay đổi chế độ
    if (data.mode === "eng") {
        engMonthInput.placeholder = "e.g. January";
    } else {
        engMonthInput.placeholder = "e.g. Tháng 1";
    }
}

var main = () => {
    shuffleMonths()
    updateMonthLabel()

    checkBtn.addEventListener('click', () => checkMonthSubmit())
    formInput.addEventListener('submit', () => checkMonthSubmit())
    modeSelector.addEventListener('change', changeMode)
    
    engMonthInput.focus()
}

main()