![NodeJS](https://img.shields.io/badge/nodeJS-v.18.17.0-green.svg)<br>

![React-Native](https://img.shields.io/badge/react_native-v.0.72.6-blue)<br>

![ruby](https://img.shields.io/badge/ruby-v.3.1.4-blue)<br>

### 개발환경 세팅 및 실행

> 맥 M1 환경에서 루비 버전 세팅하는 데에 어려움이 있었습니다. iOS 환경에서 rn 프로젝트를 실행하려면 루비가 설치되어야 하는걸로 아는데 생성된 `Gemfile`에 명시된 2.6.10을 설치하려 했지만 제대로 설치가 되지 않아 rbenv를 사용해 루비 3.1.4 버전을 설치해 글로벌로 적용해 진행했습니다.
>
> 따라서 **노드와 루비 버전을 맞추고** 테스트 하시길 권장드립니다.

```bash
// 홈브루를 통해 rbenv, cocoapods가 설치되어 있다고 전제함

$ rbenv version // 3.1.4
$ nvm use
$ yarn install
$ cd ios && pod install && cd .. // 프로젝트 홈 디렉터리라 가정
$ yarn ios
```

![스크린샷 2023-11-20 오후 7 39 27](https://github.com/unani92/frontEndAssignment/assets/53211781/d180429c-6902-4150-a5bc-e7aead31516c)

❓다음과 같은 문제 발생 시에는 ok 누르면 iOS 시뮬레이터 실행 가능합니다.

### 어려웠던 점 + 약간의 여담

리액트 네이티브 사용 경험이 커리어 초기 웹뷰를 사용해 본것이 전부여서 어려움이 예상되었지만 React-native를 공부하는 마음으로 진행했습니다.

프로젝트 생성 이후 예시 코드를 천천히 확인해 보았습니다. 다행이도 리액트를 커리어 내내 다루었다보니 크게 다르지 않은 사용 방식에 금방 적응했습니다. 개발자에게 있어 기술은 빠르게 발전하고 적응해 나가는 일은 평생 해야 한다는걸 알기에 기대했던 기술 스택의 과제가 아니였음에도 성실히 과제에 임했습니다.

### 배운 점

- Html 태그를 사용하듯이 <View /> <Text /> 사용할 수 있어서 적응하기 쉬었습니다.
- typescript의 특성 상 들어갈 key값이 자동완성 되기 때문에 StyleSheet 에서 원하는 key를 빠르게 찾고 스타일을 적용 할 수 있었습니다.
- Reanimated 문서에서 필요한 부분들을 찾아 빠르게 적용해 애니메이션을 구현했습니다.
- 라이브러리를 사용할 때 신중해야 겠다는 생각을 많이 했습니다. 유지보수가 안되는 생태계이면 기능 확장에 제약이 있을 것이라 판단되기 떄문입니다.

### 기능구현 현황

- 주차 선택 기능을 수행하는 카르셀

  - 주차 별 체크리스트 조회 가능(API 요청 시나리오 추가)

  - 앱 실행 시 [API 호출](https://file.notion.so/f/f/772fc649-1fcc-498c-94cc-cff14dc51887/cd375ffb-16ed-4926-bda3-d0b9605addf0/checklist_seeds.json?id=6dd919ce-57bd-4ca3-91f0-2923b9433edd&table=block&spaceId=772fc649-1fcc-498c-94cc-cff14dc51887&expirationTimestamp=1700568000000&signature=tb2QsijOw2n5B4KdmoRC0vFYgZGQemFhJm1c46mtgA8&downloadName=checklist_seeds.json)을 통해 데이터를 전부 받아온 후 context에 프로젝트 요구사항에 맞도록 저장

  - 데이터를 받아와 id, checked를 부여하고 주차별로 groupBy된 array로 정리(`lib/types.ts`, `home-screen.tsx` 참고)

  - 노션 파일에 url 만료시간이 걸려 있어 url 접속이 불가할 경우(`status code 419`) 있음. 이에 대비해 에러 핸들링으로 로컬 json 파일을 통해 데이터 저장이 가능하도록 구현

  - 해당 상황 발생 시 warning Dismiss 하고 테스트 진행 하셔도 무방합니다.

    <img src="https://github.com/unani92/frontEndAssignment/assets/53211781/83f7672c-88c6-4762-b3f1-ef0c9eecddc6" alt="스크린샷 2023-11-20 오후 7 49 56" style="zoom:50%;" />

- 체크리스트 체크 및 해제 토글링

  - 데이터 패칭 시나리오 이후 checked를 true / false 가 뜨도록 해놨습니다.
  - `ChecklistsMode.ModeCheck` 에서만 체크버튼 사용 가능합니다.

- 주차별 체크리스트 체크 여부에 따라 동작하는 프로그레스바

  - 선택한 주차, 선택 주차의 checklist들의 배열이 변할 때 마다 프로그레스가 변하도록 구현

- 모드를 선택 버튼(Edit / Done)

  - `ChecklistsMode.ModeCheck` : 체크리스트 체크여부 토글링, 체크리스트 아이템 수정
  - `ChecklistsMode.ModeCheck` : 체크리스트 삭제

- 삭제 시 2.5초 이내에 클릭 가능한 삭제 취소 스낵바

  - 삭제 시 opacity 애니메이션과의 sync를 위해 삭제버튼 클릭 후 0.25초 이후에 실제 삭제 진행됨
  - 삭제하기 전 삭제할 `CheckList` 객체를 보관해 삭제 시 노출될 스낵바 컴포넌트(노출시간 2500ms)의 핸들러에 넘겨 핸들러 동작 시 삭제된 객체를 복원

- 체크리스트 추가 기능

  - React-native 에서 제공하는 모달을 활용해 구현
  - 모달 오버레이 클릭 시 모달창 닫힘
  - 모달창 오픈 시 인풋창이 autofocus 되어 키보드 바로 위에 인풋창이 뜨도록 구현

### 디렉터리 요약

- `App.tsx`: 앱 내 글로벌 요소(뷰, context, react-query)들을 세팅해 두고 프로젝트를 스택 네비게이터를 이용해 라우팅 되도록 했습니다.
- `screens/home-screen.tsx`: api 호출 시나리오를 함수로 구현해 두었고 이로 인해 나온 데이터들을 타입에 맞춰 context api를 활용해 저장했습니다. 또한 화면의 컴포넌트들이 JSX 형태로 리턴됩니다.
- `components/`: home-screen의 리턴에 정의된 컴포넌트들이 구현되어 있습니다.
  - `app-header`: 헤더바 컴포넌트로 모드 선택 버튼이 있습니다.
  - `checklist-contents`: 주차 선택에 따라 해당 주의 체크리스트들의 crud 기능에 필요한 컴포넌트들입니다.
  - `progress`: 프로그레스바를 구현하는 wrapper가 있습니다.
  - `week-carousel-component`: 주차 선택이 가능한 카르셀이 구현된 wrapper 가 있습니다.
  - `elements`
    - homescreen 뿐 아니라 프로젝트가 확장되더라도 공통적으로 사용할 법한 UI 들을 모아두었습니다.
    - 프로그레스바, 카르셀 구현에 사용된 amimation core 가 있습니다.
- `lib`: 기능 구현에 필요한 기타 모듈들을 저장해 두었습니다.
  - `api`: axios 기본 세팅과 프로젝트 확장 시 추가 가능한 호출들을 함수화했습니다.
  - `context`:
    - checklist 관련 주차선택, 주차별 groupBy 된 object 들의 state를 관리하는 provider 가 정의되어 있습니다.
    - 스낵바를 homescreen에 하나만 놓고 스낵바 요청이 들어올 때 마다 스낵바의 동작을 설정해주는 방식으로 설계하기 위해 `snackBarActivation` 을 추가했습니다.
  - `types.ts`

### 상태관리

- prop drilling 될 일이 많을 것 같아 context api 사용해 구현했습니다.

- react와 사용 방식에 있어 차이가 거의 없는 것 같아 어려움이 없을 줄 알았지만 초기 세팅 시 `@react-navigation/stack` 보다 외부에 선언되어야 제대로 동작한다는 사실을 알게 되었습니다. 라우팅 될 페이지가 많아질 경우에 context 양이 비대해질것 같다는 우려가 있는 것은 사실입니다.
- 따라서 프로젝트를 복기한다면 context api를 라우터 별 모듈로 쪼개는 방식이나 다른 방식을 고민해볼 필요가 있다고 생각합니다.

### 애니메이션 구현목록

> Reanimated 라이브러리를 처음 사용해 보았지만 가이드 문서 읽어보고 진행하는 데에 큰 문제는 없었습니다. 다만 익숙했더라면 더 빠르고 다양한 애니메이션 시도해 보았을텐데 그러지 못해 할수 있는 만큼만 애니메이션 넣었습니다.

- 주차 선택 카르셀
  - **주차를 눌러서** 스와이프 하면 좌우로 이동 가능
  - `useAnimatedGestureHandler` 를 사용해 스와이프 activate, end 시에 translateX(sharedValue) 값이 바뀌도록 설정
  - 1~40주의 범위를 넘어가 주차 컴포넌트가 화면 밖으로 나가버리지 못하도록 onEnd 시에 제한을 걸어둠
- 프로그레스바
  - 주차에 따른 전체/체크된 checklist의 비율값이 변경될 때 마다 `width: ${value}%` 가 바뀌도록 세팅
  - 0 -> 0% 일때 사이드 이펙트를 방지하기 위해 해당 상황은 애니메이션 미작동
- 체크리스트
  - 생성 및 삭제 시
    - opacity 적용해 생성 및 삭제 시 서서히 보이고 서서히 삭제되도록 구현
  - 모드 변경 시
    - <<체크버튼, 내용, 삭제 버튼>> 의 width를 화면보다 길게 설정한 이후 모드가 변경될 때 마다 translateX 를 변경해 스와이프 효과 구현

### 미해결과제

- 최상단 부모가 아닌 곳에서 사용되는 React-Native 에서 제공하는 모달의 사이드이펙트
  - 모달을 이용해 인풋창을 구현했는데 최상단 부모가 아닌 곳에서 실행 시 인풋창, 키보드 이벤트를 온전히 통제하기 어려운 이슈가 있음
- React-native-svg 라이브러리를 좀 더 stable 한 것으로 대체
  - `componentWillReceiveProps` 가 rename 되기 이전에 만들어진 라이브러리이기 때문에 warning이 발생하는 것으로 추정
- RN에서 Absolute는 부모 컴포넌트 바깥으로 설정이 안되는 것 같습니다.
  - FAB 와 같이 절대위치로 플로팅 위치 설정이 필요한 컴포넌트의 경우 부모 element를 벗어날 수 없다는게 웹과 다르다는걸 알게 되었습니다.
  - 따라서 snackbar 처럼 action시 동작할 handler를 conntext에 넣으려 했지만 시간 관계상 fab에 checklist 추가 로직을 그냥 집어넣고 구현했습니다.

### 동작 화면

![Simulator Screen Recording - iPhone SE (3rd generation) - 2023-11-20 at 20 57 32](https://github.com/unani92/frontEndAssignment/assets/53211781/78ce75c2-706a-4d30-bf81-6a65fca845ea)
