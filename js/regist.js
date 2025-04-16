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
	const expEmailText = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*]){4,30}$/;

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

	if(email.value === ''){
		alert('이메일형식이 맞지 않습니다')
		email.focus();
		return false;
	}

// 주민등록 번호
// 생년월일 - 성별 - 시도번호 - 읍면동번호 - 접수순서 - 검증번호
// xxxxxx  -  x   -   xx    -     xx    -    x     -   x


// 001011 - 3068518

// 1. 마지막 번호를 빼놓습니다
// 2. 2,3,4,5,7,8,9,1,2,3,4,5를 각자리에 곱합니다.
// 3. 각 자리에 결과를 모두 더합니다
// 4. 결과에 11로 나누어 나머지 값을 구합니다.
// 5. 11에서 나머지 값을 뺍니다. (단 검증숫자가 10 은 '0', 11 은 '1'로 간주)
// 6. 주민등록번호의 검증숫자와 결과가 같으면 유효한 주민등록번호입니다.

	return true;
}