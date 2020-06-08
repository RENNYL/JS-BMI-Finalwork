const rightStatus = document.querySelector('.right-status')//右方結果
const resetBtn = document.querySelector('.resetBtn');//重新計算
const countBtn = document.querySelector('.resultBtn'); //黃圈圈
const listContent = document.querySelector('.list'); //顯示結果列表處
const bmiResult = document.querySelector('.bmiResult');
const differentBtn = document.getElementById('differentBtn');//各種結果的圈圈
const deleteAllBtn = document.querySelector('.deleteAll')
const main = document.querySelector('.main')
let data = JSON.parse(localStorage.getItem('data')) || [];//輸入的身高體重存到localstorage，並轉為陣列

countBtn.addEventListener('click', countBMI);
updateList(data);

function countBMI(e) {
    let heightNum = parseInt(document.querySelector('.heightClass').value);
    let weightNum = parseInt(document.querySelector('.weightClass').value);
    let BMIvalue = (weightNum / ((heightNum / 100) * (heightNum / 100))).toFixed(2); //.toFixed(2)小數點第2位

    const record = {};

    if (heightNum <= 0 || isNaN(heightNum) || weightNum <= 0 || isNaN(weightNum)) {
        alert('請輸入正確數字');
        return;
    }
    record.height = heightNum;
    record.weight = weightNum;
    record.BMIresult = BMIvalue;

    const bmiStatus = {
        stand: {
            textColor: '#86D73F',
            borderLeft: 'standBorder',
            status: '理想',
        },
        underweight: {
            textColor: '#31BAF9',
            borderLeft: 'underWBorder',
            status: '過輕',
        },
        overweight: {
            textColor: '#FF982D',
            borderLeft: 'overWBorder',
            status: '過重',
        },
        mildObesity: {
            textColor: '#FF6C03',
            borderLeft: 'mildObesityBorder',
            status: '輕度肥胖',
        },
        moderateObesity: {
            textColor: '#dd4a1d',
            borderLeft: 'moderateObesityBorder',
            status: '中度肥胖',
        },
        severeObesity: {
            textColor: '#FF1200',
            borderLeft: 'severeObesityBorder',
            status: '重度肥胖',
        },
    }

    if (BMIvalue < 18.5) {
        bmiResult.textContent = BMIvalue;
        differentBtn.setAttribute('id', 'underweight');
        resetBtn.setAttribute('id', 'underweightRe');
        rightStatus.textContent = bmiStatus.underweight.status;
        rightStatus.style.color = bmiStatus.underweight.textColor;
        rightStatus.classList.remove('d-none');
        record.status = '過輕';
        record.color = '#31BAF9';

    } else if (BMIvalue >= 18.5 && BMIvalue <= 25) {
        bmiResult.textContent = BMIvalue;
        differentBtn.setAttribute('id', 'stand');
        resetBtn.setAttribute('id', 'standReset');
        rightStatus.textContent = bmiStatus.stand.status;
        rightStatus.style.color = bmiStatus.stand.textColor;
        rightStatus.classList.remove('d-none');
        record.status = '理想';
        record.color = '#86D73F';

    } else if (BMIvalue >= 24 && BMIvalue < 27) {
        bmiResult.textContent = BMIvalue;
        differentBtn.setAttribute('id', 'overweight');
        resetBtn.setAttribute('id', 'overweightRe');
        rightStatus.textContent = bmiStatus.overweight.status;
        rightStatus.style.color = bmiStatus.overweight.textColor;
        rightStatus.classList.remove('d-none');
        record.status = '過重';
        record.color = '#FF982D';

    } else if (BMIvalue < 30 && BMIvalue >= 27) {
        bmiResult.textContent = BMIvalue;
        differentBtn.setAttribute('id', 'mildObesity');
        resetBtn.setAttribute('id', 'mildObesityRe');
        rightStatus.textContent = bmiStatus.mildObesity.status;
        rightStatus.style.color = bmiStatus.mildObesity.textColor;
        rightStatus.classList.remove('d-none');
        record.status = '輕度肥胖';
        record.color = '#FF6C03';

    } else if (BMIvalue < 35 && BMIvalue >= 30) {
        bmiResult.textContent = BMIvalue;
        differentBtn.setAttribute('id', 'moderateObesity');
        resetBtn.setAttribute('id', 'moderateObesityRe');
        rightStatus.textContent = bmiStatus.moderateObesity.status;
        rightStatus.style.color = bmiStatus.moderateObesity.textColor;
        rightStatus.classList.remove('d-none');
        record.status = '中度肥胖';
        record.color = '#dd4a1d';

    } else if (BMIvalue >= 35) {
        bmiResult.textContent = BMIvalue;
        differentBtn.setAttribute('id', 'severeObesity');
        resetBtn.setAttribute('id', 'severeObesityRe');
        rightStatus.textContent = bmiStatus.severeObesity.status;
        rightStatus.style.color = bmiStatus.severeObesity.textColor;
        rightStatus.classList.remove('d-none');
        record.status = '重度肥胖';
        record.color = '#FF1200';
    };

    data.push(record);
    localStorage.setItem('data', JSON.stringify(data));
    countBtn.classList.remove('d-flex');
    differentBtn.classList.add('d-flex');
    updateList(data);

    document.querySelector('#height').value = "";
    document.querySelector('#weight').value = "";
    updateList(data);
};
resetBtn.addEventListener('click', function (e) {
    differentBtn.classList.remove('d-flex');
    countBtn.classList.add('d-flex');
    rightStatus.classList.add('d-none');

}, false);

function updateList(data) {
    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth();
    let date = today.getDate();
    let todayDate = `${date}-${month + 1}-${year}`;
    let str = "";
    for (let i = 0; i < data.length; i++) {
        str += `
        <li class="d-flex flex-column flex-md-row justify-content-between align-items-center col-11 col-md-8 py-md-3 bg-white shadow-sm mb-4 borderLeft" style="border-color: ${data[i].color};  position: relative;row">
        <h4 class="col-12 col-md-2 main-text-color mb-0 text-nowrap py-3 py-md-0 w-100">${data[i].status}</h4>
        <ul class="d-flex w-100 align-items-center justify-content-around pb-3 pb-md-0 pl-0 pl-md-2 ">
            <li class="d-flex align-items-between pr-2">
                <span class="pr-2 main-text-color">BMI</span>
                <h4 class="mb-0 main-text-color">${data[i].BMIresult}</h4>
            </li>
            <li class="d-flex align-items-center pr-2">
                <span class="pr-2 main-text-color">height</span>
                <h4 class="mb-0 main-text-color">${data[i].height}</h4>
            </li>
            <li class="d-flex align-items-center pr-2">
                <span class="pr-2 main-text-color">weight</span>
                <h4 class="mb-0 main-text-color">${data[i].weight}</h4>
            </li>
            <li class="d-md-flex align-items-center pr-2 d-none">
                <span class="pr-2 main-text-color">${todayDate}</span>
            </li>
        </ul>
        <div class="close">
        <i class="far fa-times-circle" data-num=${i}></i>
        </div>
        </li>
        `
    };
    listContent.innerHTML = str;

    if (data.length === 0) {
        deleteAllBtn.setAttribute('class', 'd-none');
    } else {
        deleteAllBtn.classList.remove('d-none');
    }
}

deleteAllBtn.addEventListener('click', function (e) {
    e.preventDefault();
    console.log(data)
    data.splice(0, data.length);
    localStorage.setItem('data', JSON.stringify(data));
    updateList(data);
})


listContent.addEventListener('click', function (e) {
    if (e.target.nodeName === 'I') {
        const num = e.target.dataset.num;
        data.splice(num, 1);
        localStorage.setItem('data', JSON.stringify(data));
        updateList(data);

    } else {
        return;
    };
});


