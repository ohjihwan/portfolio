const serviceKey = 'GTr1cI7Wi0FRbOTFBaUzUCzCDP4OnyyEmHnn11pxCUC5ehG5bQnbyztgeydnOWz1O04tjw1SE5RsX8RNo6XCgQ=='; // 여기에 인증키 입력

// 위치 정보를 가져오는 함수
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(setLocation, showError);
    } else {
        alert("이 브라우저에서는 위치 정보를 지원하지 않습니다.");
    }
}

// 위치 정보가 성공적으로 받아졌을 때 호출되는 함수
function setLocation(position) {
    const latitude = position.coords.latitude;  // 위도
    const longitude = position.coords.longitude;  // 경도
}

// 위치 정보를 받아오는 데 실패했을 때 호출되는 함수
function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            alert("위치 정보를 사용자가 거부했습니다.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("위치 정보를 사용할 수 없습니다.");
            break;
        case error.TIMEOUT:
            alert("위치 정보를 가져오는 시간이 초과되었습니다.");
            break;
        default:
            alert("알 수 없는 오류가 발생했습니다.");
            break;
    }
}

// 페이지가 로드될 때 자동으로 위치 정보 요청
window.onload = function() {
    getLocation();
}

// API 호출 함수
function fetchData() {
    // HTML 입력값에서 데이터 가져오기
    const baseDate = document.getElementById('base_date').value;
    const baseTime = document.getElementById('base_time').value;
    const nx = document.getElementById('nx').value;
    const ny = document.getElementById('ny').value;
    const numOfRows = document.getElementById('num_of_rows').value;
    
    // 기본 유효성 검사
    if (!baseDate || !baseTime || !nx || !ny || !numOfRows) {
        alert('모든 필드를 입력해 주세요!');
        return;
    }

    // 파라미터 값들을 encodeURIComponent로 안전하게 인코딩하여 URL에 포함
    const url = `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?serviceKey=${encodeURIComponent(serviceKey)}&base_date=${encodeURIComponent(baseDate)}&base_time=${encodeURIComponent(baseTime)}&nx=${encodeURIComponent(nx)}&ny=${encodeURIComponent(ny)}&numOfRows=${encodeURIComponent(numOfRows)}&dataType=JSON`;
    // https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?serviceKey=GTr1cI7Wi0FRbOTFBaUzUCzCDP4OnyyEmHnn11pxCUC5ehG5bQnbyztgeydnOWz1O04tjw1SE5RsX8RNo6XCgQ==&base_date=20250419&base_time=0700&nx=&ny=&numOfRows=2&dataType=JSON
    // https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?serviceKey=GTr1cI7Wi0FRbOTFBaUzUCzCDP4OnyyEmHnn11pxCUC5ehG5bQnbyztgeydnOWz1O04tjw1SE5RsX8RNo6XCgQ==&base_date=20250419&base_time=0600&nx=&ny=&numOfRows=2&dataType=JSON

    console.log(url);  // URL 확인용 로그

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const responseData = data.response;

            // 응답 코드가 NO_DATA일 경우 오류 메시지 출력
            if (responseData.header.resultCode === "03" && responseData.header.resultMsg === "NO_DATA") {
                document.getElementById('errorMessage').textContent = "데이터가 없습니다. 다른 날짜나 시간으로 다시 시도해 주세요.";
                document.getElementById('responseData').textContent = ""; // 응답 데이터가 없으면 지우기
            } else {
                // 데이터가 정상적으로 있는 경우, 사람이 읽을 수 있는 형태로 변환
                document.getElementById('errorMessage').textContent = ""; // 오류 메시지 지우기
                const weatherData = responseData.body.items.item;
                const formattedData = formatWeatherData(weatherData, baseDate, baseTime);

                // 사람이 읽을 수 있는 형태로 변환한 데이터를 화면에 표시
                document.getElementById('responseData').innerHTML = formattedData;
            }
        })
        .catch(error => {
            console.error('API 호출 오류:', error);
            alert('데이터를 불러오는 중 오류가 발생했습니다. 다시 시도해 주세요.');
        });
}

// API 응답 데이터를 사람이 읽을 수 있는 형태로 포맷하는 함수
function formatWeatherData(weatherData, baseDate, baseTime) {
    let formattedData = "";
    // category 값을 한글로 변환하는 매핑
    const categoryMap = {
        "TMP": "기온",
        "RN1": "1시간 강수량",
        "WSD": "풍속",
        "VEC": "풍향",
        "REH": "습도",
        "UUU": "북쪽 바람성분",
        "VVV": "동쪽 바람성분",
        "PTY": "강수형태",
        "PCP": "강수량",
        "STP": "기온 차이",
        "T1H": "기온"
    };

    // weatherData 배열을 순회하며 필요한 정보만 추려서 출력
    weatherData.forEach(item => {
        // 발표일자와 발표시각은 입력된 값을 사용하여 표시
        const observationDate = baseDate ? baseDate : '알 수 없음';
        const observationTime = baseTime ? baseTime : '알 수 없음';

        // category를 한글로 변환
        const category = categoryMap[item.category] || item.category;  // 항목이 매핑에 없으면 원래 값 사용

        // 강수형태 (비, 눈, 맑음, 흐림 등) 직관적인 설명 추가
        let weatherDescription = "";
        if (item.category === "PTY") {
            switch (item.obsrValue) {
                case "0":
                    weatherDescription = "맑음";
                    break;
                case "1":
                    weatherDescription = "비";
                    break;
                case "2":
                    weatherDescription = "비/눈";
                    break;
                case "3":
                    weatherDescription = "눈";
                    break;
                case "4":
                    weatherDescription = "소나기";
                    break;
                default:
                    weatherDescription = "정보없음";
            }
        }

        // 직관적으로 설명을 추가하여 실황값을 좀 더 이해하기 쉽게 표시
        let description = "";
        switch (item.category) {
            case "TMP":
                description = "(단위: °C)";
                break;
            case "T1H":
                description = "(단위: °C)";
                break;
            case "RN1":
                description = "(단위: mm)";
                break;
            case "WSD":
                description = "(단위: m/s)";
                break;
            case "VEC":
                description = "(단위: °)";
                break;
            case "REH":
                description = "(단위: %)";
                break;
            case "UUU":
            case "VVV":
                description = "(단위: m/s)";
                break;
            default:
                description = "(단위: 정보없음)";
        }

        formattedData += `
            <li class="weather-item">
                <div class="key">${category}:</div>
                <div class="value">${item.obsrValue} ${description}</div>
                ${category === "강수형태" ? `<div class="key">날씨:</div><div class="value">${weatherDescription}</div>` : ""}
                <div class="key">측정시간:</div>
                <div class="value">${observationDate} ${observationTime}</div>
                <div class="key">위치:</div>
                <div class="value">X: ${item.nx}, Y: ${item.ny}</div>
            </li>
        `;
    });

    return formattedData;
}
