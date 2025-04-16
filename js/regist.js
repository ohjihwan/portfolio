let checkSet = false;

function sendit(){
	const userid = document.getElementById('userid');
	const userpw = document.getElementById('userpw');
	const userpw_re = document.getElementById('userpw_re');
	const name = document.getElementById('name');
	const hp = document.getElementById('hp')
	const email = document.getElementById('email')

	const expIdText = /^[A-Za-z0-9]{4,20}$/;
	const expPwText = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/;
	const expNameText = /^[가-힣]+$/
	const expHpText = /^\d{3}-\d{3,4}-\d{4}$/
	const expEmailText = /^.+@.+\..+$/;

	if(userid.value === '') {
		alert('아이디를 입력해주세요');
		userid.focus();
		return false;
	}

	if(!expIdText.test(userid.value)) {
		alert('아이디는 4자이상 20자이하의 영문자 및 숫자로 입력하세요.');
		userid.focus();
		return false;
	}

	if(!expPwText.test(userpw.value)) {
		alert('비밀번호는 8자이상 20자이하의 영문자, 숫자, 특수문자를 한 자 이상 꼭 포함해야합니다');
		userpw.focus();
		return false;
	}

	if(userpw.value != userpw_re.value){
		alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.')
		userpw_re.focus();
		return false;
	}

	if(!expNameText.test(name.value)){
		alert('이름은 한글로 입력하세요.')
		name.focus();
		return false;
	}

	if(!expHpText.test(hp.value)){
		alert('휴대폰번호 형식이 일치하지 않습니다.\n-하이픈을 꼭 입력하세요')
		hp.focus();
		return false;
	}

	if(!expEmailText.test(email.value)){
		alert('이메일형식이 맞지 않습니다')
		email.focus();
		return false;
	}

	if (!checkSet) {
		alert('주민등록번호를 확인해주세요.')
		return false
	}
	
	return true;
}


const ssnBtn = document.getElementById('ssnBtn')
function isValidBirthDate(YY,MM,DD,sevenNum){
	let year = parseInt(YY)
	const month = parseInt(MM)
	const day = parseInt(DD)

	if (sevenNum == 1 || sevenNum == 2 || sevenNum == 5 || sevenNum == 6) {
        year += 1900;
    } else if (sevenNum == 3 || sevenNum == 4 || sevenNum == 7 || sevenNum == 8) {
        year += 2000;
    } else {
        year += 1800;
    }

	if ( month < 1 || month > 12 ) {
		return false
	}

	const daysInMonth = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

	const leap = (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0));

	if ( month === 2 && leap ) {
		daysInMonth[2] = 29;
	}

	if (day < 1 || day > daysInMonth[month]) {
		return false;
	}

	return true;
}

function checkSsn(ssn) {
	const weights = [2,3,4,5,6,7,8,9,2,3,4,5];
	let sum = 0;
	for (let i = 0; i < 12; i++) {
		sum += parseInt(ssn.charAt(i)) * weights[i];
	}
	let remainder = sum % 11;
    let checkSsn = 11 - remainder;
	console.log(checkSsn)
    if (checkSsn >= 10) {
        checkSsn %= 10;
    }

	return checkSsn;
}

ssnBtn.addEventListener('click', function(){
	const ssnFirst = document.getElementById('ssn1').value
	const ssnLast = document.getElementById('ssn2').value
	const ssn = ssnFirst + ssnLast
	const sevenNum = parseInt(ssnLast.charAt(0))

	if ( ssn.length === 13 && /^\d+$/.test(ssn) ){
		if ( ssnFirst.length == 6 ) {
			let YY = ssnFirst.slice(0,2)
			let MM = ssnFirst.slice(2,4)
			let DD = ssnFirst.slice(4,6)
			const sevenNum = parseInt(ssn.charAt(6));
            const calculatedCheckSsn = checkSsn(ssn);
            const inputCheckDigit = parseInt(ssn.charAt(12));
			
			if (!isValidBirthDate(YY, MM, DD, sevenNum)) {
				alert('주민번호 앞 6자리가 틀렸습니다')
				checkSet = false
			} else if(calculatedCheckSsn !== inputCheckDigit) {
				alert('주민번호 뒷 7자리가 틀렸습니다')
				checkSet = false
			} else {
				alert('생년월일이 유효합니다.')
				checkSet = true
			}
		} else {
			alert('주민등록번호를 입력해주세요')
			checkSet = false
		}
	} else {
		alert('주민등록번호가 올바르지 않습니다')
		checkSet = false
	}
})