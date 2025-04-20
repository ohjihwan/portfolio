const serviceKey = 'GTr1cI7Wi0FRbOTFBaUzUCzCDP4OnyyEmHnn11pxCUC5ehG5bQnbyztgeydnOWz1O04tjw1SE5RsX8RNo6XCgQ==';

function dfs_xy_conv(lat, lon) {
	const RE = 6371.00877;
	const GRID = 5.0;
	const SLAT1 = 30.0;
	const SLAT2 = 60.0;
	const OLON = 126.0;
	const OLAT = 38.0;
	const XO = 43;
	const YO = 136;
	const DEGRAD = Math.PI / 180.0;
	const re = RE / GRID;
	const slat1 = SLAT1 * DEGRAD;
	const slat2 = SLAT2 * DEGRAD;
	const olon = OLON * DEGRAD;
	const olat = OLAT * DEGRAD;
	let sn = Math.tan(Math.PI * 0.25 + slat2 * 0.5) / Math.tan(Math.PI * 0.25 + slat1 * 0.5);
	sn = Math.log(Math.cos(slat1) / Math.cos(slat2)) / Math.log(sn);
	let sf = Math.tan(Math.PI * 0.25 + slat1 * 0.5);
	sf = Math.pow(sf, sn) * Math.cos(slat1) / sn;
	let ro = Math.tan(Math.PI * 0.25 + olat * 0.5);
	ro = re * sf / Math.pow(ro, sn);
	const ra = Math.tan(Math.PI * 0.25 + lat * DEGRAD * 0.5);
	const r = re * sf / Math.pow(ra, sn);
	let theta = lon * DEGRAD - olon;
	if (theta > Math.PI) theta -= 2.0 * Math.PI;
	if (theta < -Math.PI) theta += 2.0 * Math.PI;
	theta *= sn;
	const x = Math.floor(r * Math.sin(theta) + XO + 0.5);
	const y = Math.floor(ro - r * Math.cos(theta) + YO + 0.5);
	return { nx: x, ny: y };
}

function getLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(setLocation, showError);
	} else {
		alert("이 브라우저에서는 위치 정보를 지원하지 않습니다.");
	}
}

function setLocation(position) {
	const { latitude, longitude } = position.coords;
	const grid = dfs_xy_conv(latitude, longitude);
	document.getElementById('nx').value = grid.nx;
	document.getElementById('ny').value = grid.ny;
}

function showError(error) {
	switch (error.code) {
		case error.PERMISSION_DENIED:
			alert("위치 정보 사용이 거부되었습니다.");
			break;
		case error.POSITION_UNAVAILABLE:
			alert("위치 정보를 사용할 수 없습니다.");
			break;
		case error.TIMEOUT:
			alert("위치 정보를 가져오는 데 시간이 초과되었습니다.");
			break;
		default:
			alert("알 수 없는 오류가 발생했습니다.");
	}
}

function fetchData() {
	const baseDate = document.getElementById('base_date').value.replace(/-/g, '');
	const baseTime = document.getElementById('base_time').value;
	const nx = document.getElementById('nx').value;
	const ny = document.getElementById('ny').value;

	if (!baseDate || !baseTime || !nx || !ny) {
		alert('모든 값을 입력해주세요.');
		return;
	}

	const url = `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?` +
							`serviceKey=${encodeURIComponent(serviceKey)}` +
							`&base_date=${baseDate}&base_time=${baseTime}` +
							`&nx=${nx}&ny=${ny}&numOfRows=1000&dataType=JSON`;

	fetch(url)
		.then(response => response.json())
		.then(data => {
			if (!data.response || !data.response.body || !data.response.body.items) {
				document.getElementById('errorMessage').textContent = "데이터가 없습니다.";
				document.getElementById('errorMessage').style.display = 'block'; // 에러 나타내기
				document.getElementById('responseData').innerHTML = ""; // 이전 데이터 제거
				document.getElementById('result').style.display = 'none'; // 결과 숨기기
				return;
			}
			const items = data.response.body.items.item;
			const filtered = items.filter(item => item.fcstDate === baseDate);
			const formatted = formatWeatherData(filtered, baseDate, baseTime);
			document.getElementById('responseData').innerHTML = formatted;
			document.getElementById('result').style.display = 'block';
			document.getElementById('errorMessage').textContent = "";
			document.getElementById('errorMessage').style.display = 'none'; // 에러 메세지 숨기기
		})
		.catch(error => {
			console.error("API 호출 오류:", error);
			document.getElementById('errorMessage').textContent = `오류가 발생했습니다: ${error.message || '네트워크 또는 서버 문제'}`;
			document.getElementById('errorMessage').style.display = 'block'; // 에러 나타내기
			document.getElementById('responseData').innerHTML = ""; // 이전 데이터 제거
			document.getElementById('result').style.display = 'none'; // 결과 숨기기
		});
}

function formatWeatherData(data, baseDate, baseTime) {
	const map = {
		TMP: "기온(°C)",
		SKY: "하늘 상태",
		PTY: "강수 형태",
		PCP: "강수량(mm)",
		WSD: "풍속(m/s)",
		UUU: "동서 바람 성분(m/s)",
		VVV: "남북 바람 성분(m/s)",
		WAV: "파고(m)",
		REH: "습도(%)",
		VEC: "풍향(°)",
		POP: "강수확률(%)",
		SNO: "적설(cm)"        
	};
	
	const skyMap = {
		1: "맑음",
		3: "구름 많음",
		4: "흐림"
	};
	
	const skyEmojiMap = {
		1: "☀️",
		3: "⛅",
		4: "☁️"
	};
	
	const ptyMap = {
		0: "없음",
		1: "비",
		2: "비/눈",
		3: "눈",
		4: "소나기"
	};
	
	const grouped = {};
	data.forEach(item => {
		if (!item.fcstTime) return; // fcstTime이 없으면 건너뛰기
		if (!grouped[item.fcstTime]) grouped[item.fcstTime] = [];
		grouped[item.fcstTime].push(item);
	});
	  
	
	// === ✅ 하늘 상태 추출 ===
	let firstSky = null;
	for (const time in grouped) {
		const found = grouped[time].find(i => i.category === "SKY");
		if (found) {
		const emoji = skyEmojiMap[found.fcstValue] || "";
		const description = skyMap[found.fcstValue] || found.fcstValue;
		firstSky = `${emoji} 하늘 상태: ${description}`;
		break;
		}
	}
	
	if (firstSky) {
		const skyElem = document.getElementById('skySummary');
		if (skyElem) {
			skyElem.textContent = firstSky;
		}
	}
	
	const sortedTimes = Object.keys(grouped).sort(); // 시간순 정렬
	let result = "";
	for (const time of sortedTimes) {
		const items = grouped[time];
		if (!items) continue;
	
		// SKY와 PTY 값 추출
		const skyItem = items.find(item => item.category === "SKY");
		const ptyItem = items.find(item => item.category === "PTY");
	
		const skyValue = skyItem?.fcstValue;
		const ptyValue = ptyItem?.fcstValue;
	
		// 클래스 이름 만들기
		const skyClass = skyValue ? `sky-${skyValue}` : '';
		const ptyClass = ptyValue && ptyValue !== "0" ? `pty-${ptyValue}` : '';  // ⭐ 0인 경우 제외
	
		const liClass = ['data-list', skyClass, ptyClass].filter(Boolean).join(' ');
	
		result += `<li class="${liClass}"><h3>${time.slice(0, 2)}:00</h3><span class="sky-info"></span><ul>`;
		items.forEach(item => {
			let value = item.fcstValue;
			if (item.category === "SKY") value = skyMap[value] || value;
			if (item.category === "PTY") value = ptyMap[value] || value;
			const label = map[item.category] || item.category;
			result += `<li>${label}: ${value}</li>`;
		});
		result += `</ul></li>`;
	}
	
	return result;
}

function setDefaultDateTime() {
	const now = new Date();
	now.setMinutes(now.getMinutes() - 30); // 30분 뺀 시간 기준

	const year = now.getFullYear();
	const month = String(now.getMonth() + 1).padStart(2, '0');
	const date = String(now.getDate()).padStart(2, '0');
	const baseDate = `${year}${month}${date}`;

	const hour = now.getHours();
	const availableTimes = [2, 5, 8, 11, 14, 17, 20, 23];
	let closestTime = availableTimes[0];

	for (let i = 1; i < availableTimes.length; i++) {
		if (Math.abs(hour - availableTimes[i]) < Math.abs(hour - closestTime)) {
			closestTime = availableTimes[i];
		}
	}

	const baseTime = String(closestTime).padStart(2, '0') + "00";

	document.getElementById('base_date').value = baseDate;

	const timeSelect = document.getElementById('base_time');
	if (timeSelect) {
		timeSelect.value = baseTime;
	}
}

window.onload = function () {
	getLocation();
	setDefaultDateTime();
};
