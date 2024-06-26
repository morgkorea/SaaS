export const firebaseAuthErrorCodes = {
    'auth/email-already-in-use': '사용중인 이메일 입니다.',
    'auth/invalid-email': '유효한 이메일을 입력해주세요.',
    'auth/user-not-found': '존재하지 않는 이메일입니다',
    'auth/wrong-password': '비밀번호가 틀렸습니다',
    'auth/user-token-expired': '이메일 인증 유효시간이 경과하였습니다. 재인증 해주세요',
    'auth/missing-email': '이메일을 입력해주세요.',
    'auth/requires-recent-login': '유효한 이메일을 입력해주세요.',
    'auth/too-many-requests':
        '로그인 시도가 여러 번 실패하여 이 계정에 대한 액세스가 일시적으로 비활성화되었습니다. 비밀번호를 재설정하여 즉시 복원하거나 나중에 다시 시도할 수 있습니다.',
};

// firebase auth error message
// auth/claims-too-large	setCustomUserClaims()에 제공된 클레임 페이로드가 최대 허용 크기인 1,000바이트를 초과합니다.
// auth/email-already-exists	제공된 이메일을 기존 사용자가 이미 사용 중입니다. 각 사용자마다 이메일이 고유해야 합니다.
// auth/id-token-expired	제공된 Firebase ID 토큰이 만료되었습니다.
// auth/id-token-revoked	Firebase ID 토큰이 취소되었습니다.
// auth/insufficient-permission	Admin SDK 초기화에 사용된 사용자 인증 정보에는 요청한 인증 리소스에 액세스할 권한이 없습니다. 적절한 권한을 가진 사용자 인증 정보를 생성하고 Admin SDK를 인증하는 데 사용하는 방법에 대한 도움말은 Firebase 프로젝트 설정을 참조하세요.
// auth/internal-error	인증 서버에서 요청을 처리하려고 시도하는 중에 예기치 않은 오류가 발생했습니다. 오류 메시지에는 추가 정보가 들어 있는 인증 서버의 응답이 포함되어야 합니다. 오류가 계속되면 버그 신고 지원 채널에 문제를 신고하시기 바랍니다.
// auth/invalid-argument	인증 메서드에 잘못된 인수가 제공되었습니다. 오류 메시지에 추가 정보가 들어 있습니다.
// auth/invalid-claims	setCustomUserClaims()에 제공된 커스텀 클레임 속성이 잘못되었습니다.
// auth/invalid-continue-uri	연결 URL은 올바른 URL 문자열이어야 합니다.
// auth/invalid-creation-time	생성 시간이 올바른 UTC 날짜 문자열이어야 합니다.
// auth/invalid-credential	Admin SDK 인증에 사용된 사용자 인증 정보로는 원하는 작업을 수행할 수 없습니다. createCustomToken() 및 verifyIdToken()과 같은 특정 인증 메서드는 갱신 토큰이나 애플리케이션 기본 사용자 인증 정보와는 달리 사용자 인증 정보 인증서로 SDK를 초기화해야 합니다. 사용자 인증 정보 인증서로 Admin SDK를 인증하는 방법은 SDK 초기화 문서를 참조하세요.
// auth/invalid-disabled-field	disabled 사용자 속성에 제공된 값이 잘못되었습니다. 이 값은 부울이어야 합니다.
// auth/invalid-display-name	displayName 사용자 속성에 제공된 값이 잘못되었습니다. 이 값은 비어 있지 않은 문자열이어야 합니다.
// auth/invalid-dynamic-link-domain	제공된 동적 링크 도메인이 구성되지 않거나 현재 프로젝트에 대해 승인되지 않았습니다.
// auth/invalid-email	email 사용자 속성에 제공된 값이 잘못되었습니다. 이 값은 문자열 이메일 주소여야 합니다.
// auth/invalid-email-verified	emailVerified 사용자 속성에 제공된 값이 잘못되었습니다. 이 값은 부울이어야 합니다.
// auth/invalid-hash-algorithm	해시 알고리즘이 지원되는 알고리즘 목록의 문자열 중 하나와 일치해야 합니다.
// auth/invalid-hash-block-size	해시 블록 크기가 올바른 숫자여야 합니다.
// auth/invalid-hash-derived-key-length	해시에서 파생된 키 길이가 올바른 숫자여야 합니다.
// auth/invalid-hash-key	해시 키가 올바른 바이트 버퍼여야 합니다.
// auth/invalid-hash-memory-cost	해시 메모리 비용이 올바른 숫자여야 합니다.
// auth/invalid-hash-parallelization	해시 병렬 처리가 올바른 숫자여야 합니다.
// auth/invalid-hash-rounds	해시 라운드가 올바른 숫자여야 합니다.
// auth/invalid-hash-salt-separator	해싱 알고리즘 솔트 구분자 필드가 올바른 바이트 버퍼여야 합니다.
// auth/invalid-id-token	제공된 ID 토큰이 올바른 Firebase ID 토큰이 아닙니다.
// auth/invalid-last-sign-in-time	마지막 로그인 시간이 올바른 UTC 날짜 문자열이어야 합니다.
// auth/invalid-page-token	listUsers()에 제공된 다음 페이지 토큰이 잘못되었습니다. 비어 있지 않은 유효한 문자열이어야 합니다.
// auth/invalid-password	password 사용자 속성에 제공된 값이 잘못되었습니다. 이 값은 6자 이상의 문자열이어야 합니다.
// auth/invalid-password-hash	비밀번호 해시가 올바른 바이트 버퍼여야 합니다.
// auth/invalid-password-salt	비밀번호 솔트가 올바른 바이트 버퍼여야 합니다.
// auth/invalid-phone-number	phoneNumber에 제공된 값이 잘못되었습니다. 이 값은 E.164 표준과 호환되는 비어 있지 않은 식별자 문자열이어야 합니다.
// auth/invalid-photo-url	photoURL 사용자 속성에 제공된 값이 잘못되었습니다. 이 값은 문자열 URL이어야 합니다.
// auth/invalid-provider-data	providerData가 올바른 UserInfo 객체 배열이어야 합니다.
// auth/invalid-provider-id	providerId가 지원되는 올바른 제공업체 식별자 문자열이어야 합니다.
// auth/invalid-oauth-responsetype	정확히 하나의 OAuth responseType만 true로 설정해야 합니다.
// auth/invalid-session-cookie-duration	세션 쿠키 기간이 5분에서 2주 사이의 올바른 밀리초 단위 숫자여야 합니다.
// auth/invalid-uid	제공된 uid는 128자(영문 기준) 이하의 비어 있지 않은 문자열이어야 합니다.
// auth/invalid-user-import	가져올 사용자 레코드가 잘못되었습니다.
// auth/maximum-user-count-exceeded	가져올 수 있는 최대 사용자 수를 초과했습니다.
// auth/missing-android-pkg-name	Android 앱을 설치해야 할 경우 Android 패키지 이름을 제공해야 합니다.
// auth/missing-continue-uri	요청에 올바른 연결 URL을 제공해야 합니다.
// auth/missing-hash-algorithm	비밀번호 해시를 사용해 사용자를 가져오려면 해싱 알고리즘 및 매개변수를 제공해야 합니다.
// auth/missing-ios-bundle-id	요청에 번들 ID가 누락되었습니다.
// auth/missing-uid	현재 작업에 uid 식별자가 필요합니다.
// auth/missing-oauth-client-secret	OIDC 코드 흐름을 사용 설정하려면 OAuth 구성 클라이언트 비밀번호가 필요합니다.
// auth/operation-not-allowed	제공된 로그인 제공업체가 Firebase 프로젝트에서 사용 중지되었습니다. Firebase Console의 로그인 방법 섹션에서 사용 설정하세요.
// auth/phone-number-already-exists	제공된 phoneNumber을 기존 사용자가 이미 사용 중입니다. 사용자마다 phoneNumber가 고유해야 합니다.
// auth/project-not-found	Admin SDK를 초기화하는 데 사용한 사용자 인증 정보에 해당하는 Firebase 프로젝트가 없습니다. 프로젝트의 사용자 인증 정보를 생성하고 Admin SDK를 인증하는 데 사용하는 방법에 대한 도움말은 Firebase 프로젝트 설정을 참조하세요.
// auth/reserved-claims	setCustomUserClaims()에 제공된 하나 이상의 커스텀 사용자 클레임이 예약되어 있습니다. 예를 들어 OIDC용 클레임(예: sub, iat, iss, exp, aud, auth_time 등)은 커스텀 클레임의 키로 사용할 수 없습니다.
// auth/session-cookie-expired	제공된 Firebase 세션 쿠키가 만료되었습니다.
// auth/session-cookie-revoked	Firebase 세션 쿠키가 취소되었습니다.
// auth/uid-already-exists	제공된 uid를 기존 사용자가 이미 사용하고 있습니다. 각 사용자마다 uid가 고유해야 합니다.
// auth/unauthorized-continue-uri	연결 URL의 도메인이 허용 목록에 포함되어 있지 않습니다. Firebase Console에서 도메인을 허용해야 합니다.
// auth/user-not-found	제공된 식별자에 해당하는 기존 사용자 레코드가 없습니다.
