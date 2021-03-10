<!-- @format -->

# 제로초 Slack 클론 무작정 따라해보기

#### 소스코드 다운받아서 momo 새 폴더로 프로젝트 시작

### 언어

-   ReactJs
-   TypeScript
-   SWR

### 타입스크립트를 자바스크립트로 변환할 때에는 2 가지 방법이 있다.

1. 타입스크립트가 처음부터 마지막까지 변경하는대로 그대로 사용
2. 타입스크립트가 한 번 변경한 다음에 바벨이 이어받아서 변경

-   바벨이 이미지, css, html등 모든 걸 자바스크립트로 변환해준다. 프론트엔드 편의상 2번 방식을 많이 사용한다.

### TypeScript

-   타입스크립트는 자바스크립트의 변수, 함수의 매개변수, 함수의 반환 값에 Type이 붙는다.

### devServer-historyApiFallback

-   싱글페이지 어플리케이션에서는 url이 없으며 오로지 index.html만이 존재한다.
-   새로고침을 하면 주소는 서버로 간다. 서버는 오로지 한 주소만 알고 있다 localhost:3090
-   / 뒤에는 다 무시한다.
-   하지만, historyApiFallback api를 통해서 주소를 실제로 있는 것 처럼 만들어준다.

### Code Splitting

-   [Code Splitting 참조](https://medium.com/humanscape-tech/react%EC%97%90%EC%84%9C-%ED%95%B4%EB%B3%B4%EB%8A%94-%EC%BD%94%EB%93%9C-%EC%8A%A4%ED%94%8C%EB%A6%AC%ED%8C%85-code-splitting-56c9c7a1baa4)
-   페이지들을 진짜 필요한 페이지만 불러오면 좋다.
-   필요없는 컴포넌트는 처음에 불러오지 않고 필요한 컴포넌트는 그때 그때 불러올 수 있도록한다.
-   Code Splitting 하다보면 어떤 컴포넌트를 불러올지 고민하게 된다.
-   이럴 때 page 기준으로 Code Splitting한다. (로그인페이지에 접속해있는데 굳이 회원가입 페이지를 미리 불러올 필요 없다. 그럼 둘다 해두된다.)
-   SSR이 필요없는 파일 Code Splitting한다.
-   `npm i @loadable/component`

### useCallback

-   함수에서는 블럭 내부 전체가 다시 실행되기 때문에 함수를 useCallback으로 감싸지 않으면, 매번 다시 실행된다.
-   useCallback 하지않으면 리렌더링이 발생한다. (크게 성능에 영향을 미치지는 않지만, 디버깅이 어려워진다.)
-   이때 리렌더링이 된다해도 화면을 다시 그리지 않는다. virtual DOM 이전 과 다음상테에서 달라진게 찾아보고 달라진게 있으면 다시 그리지만, 검사하는 과정에서는 어쩔 수 없지만 검사 후에 달라진게 없다면 실제로 화면을 다시 그리지 않는다.

### custom Hook

-   리액트에서 기본적으로 제공하는 Hook이다. Hook들을 하나로 합쳐서 새로운 Hook을 만들어낸다.

### Redux

-   Redux를 사용하는 이유는 전체적인 상태를 관리하고, 비동기 요청이 있을 때 redux-thunk, saga 미들웨어로 요청을 보낼 때
-   컴포넌트랑 비동기 로직과 분리되는 장점이 있다.
-   하지만 여기에선 Redux를 쓰지 않고 컴포넌트에서 비동기코드를 분리해야 할 없는 이유
    -   Sigup() 컴포넌트 하나에서만 유일하게 쓰이는 비동기가 있다면 예를들면 회원가입 컴포넌트 안에서만 쓰이는 비동기 요청 그런것들이 있을 때는 Redux로 빼면 코드가 길어진다. 무조건 redux-thunk, saga를 쓰는게 아니고 해당 컴포넌트 내부에서만 쓰이는 비동기를 해결한다.

### axios

-   프론트개발자 입장에서 백엔드 개발자한테 물어본다.
-   API 리스트를 받는다.
-   Network-Headers 공부하기
-   Network 탭에 보면 POST랑 OPTIONS 파일이 생성된다. OPTIONS는 백엔드 서버와(3095) 프론트 서버(3090)가 서로 포트가다르면 요청을 한 번씩 더 보낸다(OPTIONS)
-   원래 서로 주소가 다르면 요청이 안된다.
-   백엔드에서 어떤 설정을 했기때문에 정상적으로 처리가 됬지만, 설정을 풀면 CORS에러가 발생한다.
-   해결방법은 두 가지가 있다.
-   백엔드 개발자한테 에러 메시지 보여줘서 해결하기.
-   프론트엔드 개발자가 스스로 webpack-devserver에서 proxy 설정하기 (이때 같은 도메인으로 적용된거라서 `OPTIONS` 파일은 없어진다.)

```
   proxy: { // 프론트에서 api로 시작하는 요청은 3095로 보낸 것처럼 취급을 하겠다.
     '/api/': {
       target: 'http://localhost:3095',
       changeOrigin: true,
     },
   },
```

-   axios.post('http://localhost:3095/api/users) 3090(프론트)이 3095(백엔드)한테 보내는 거라서
-   이때 axios.post('/api/users') 설정해야 3095가 3095로 보낸 것처럼 취급을 한다.
-   백엔드와 프론트가 서로 localhost로 설정되야 사용할 수 있다. 백엔드 서버가 실제 돌아가는 서버는 적용할 수 없다.

-   then이나 catch에서 state 비동기(요청)에 관련해서 state변경해주는게 있으면 요청 보내기 직전에 초기화 해주기 (ex: setSignUpSuccess(false))
-   요청을 연달아서 보낼 때 첫번 째 요청 때 남아있던 결과가 두번 째 요청에 남아있는 경우가 있기때문에 초기화 시켜주고 요청해야 제대로 받을 수 있다.

-   로그인 풀고 다시 로그인 테스트해보고 싶을 때 (로그인 두 번 하면 401에러 발생) 백엔드 서버 다시 연동하기
-   백엔드 서버를 localhost로 돌릴 때 로그인 된 사용자 정보들을 메모리에 저장되기 때문에 껏다 다시 연동시키면 다 날려버린다.
-   만약 백엔드 서버를 못끄는 상황이면 Application탭 들어가서 connect(express 기준, java 스프링 - jsessionid) - Session 쿠키 지우면 된다. (로그아웃의 원리)

-   프론트입장에서 로그인 하고나서 내가 로그인 했다는 걸 어떻게 알 것인가
-   보통 로그인을 성공하면 서버에서 가져다 준다.
-   그럼 받을걸로 프론트에서 저장을 하려면 (로그아웃하면 버리면 된다.) Redux (전역 data)가 필요하다.
-   state는 컴포넌트에서만 저장이 된다. 컴포넌트를 넘나들면서 로그인 데이터를 가지고 있어야된다. Redux의 데안은 `Context API`나 `swr` 될 수 있다.

### swr

-   전역적으로 사용할 수 있다(파일 넘나 들면서), (전역 데이터 저장소 역할 ex 비동기, localStroage도 캐싱할 수 있다.)
-   받아온 응답 데이터를 저장한다.
-   로딩상태를 알 수 있다. (data가 존재하지 않으면 로딩중이다.)
-   백엔드 서버와 프론트서버 도메인이 다르면 쿠키가 생성되지도 않고 서로 보낼 수도 받을 수도 없다.
-   해결하려면 `withCredentials: true` 설정 POST는 3번째 자리, GET은 2번째 자리
-   그러면 proxy 설정은 해줄필요가 없어진다. (개발할 때 CORS피해가기 위해 proxy를 사용하지만 배포 후에는 proxy사용하는 경우는 없다.)
-   쿠키는 항상 백엔드에서 생성해서 브라우저가 기억하게 만들어주고 프론트엔드에서는 한 번 기억한 쿠키를 매 요청마다 백엔드한테 보내주는 식

**_직접 컨트롤해야하는 상황_**

-   1: 로그인 버튼 눌렀을 때 완료한 다음 내가 원할 때 SWR 호출하기
-   2: SWR이 몇 초 간격으로 주기적으로 요청을 한 번씩 더 보낸다. 그러면 서버에 무리가 간다. (주기적으로 SWR 스스로 호출하는거 막기)

-   1: revalidate - 로그인 성공했을 때 revalidata에서 바로 fetcher 실행한다.

    -   `revalidate()` 호출하는 순간 data나 error 값이 바뀌면 알아서 컴포넌트가 리렌더링 된다. (false에서 자기 정보로 바뀌게 되고 그 순간 리렌더링 되니까 true로 바뀌어서 data 실행이된다.)

    ```
    if (data) {
    return <Redirect to="/workspace/channel" />;
    }
    ```

-   2: [swr-options](https://github.com/vercel/swr) dedupingInterval: 2000 캐시의 유지 기간 (2초동안에는 useSWR()을 아무리 많이 호출해도 2초동안에는 한 번만 요청보내고 나머지 것들은 첫번째 요청 성공한거에 대한 데이터를 그대로 가지고 오겠다.)

**revaildate 와 mutate 차이점**
revaildate 단점은 요청을 한 번 더 보내는 것이다. (로그인 후에 사용자 데이터 얻어오려고 revaildate) SWR을 사용할 때에는 데이터를 저장해줘서 편하긴 하는데, 요청을 많이 보내는 것을 막아줘야한다. 그래서 `mutate`가 있다.

-   revaildate : 서버로 요청을 보내서 데이터를 다시 가져온다.
-   mutate : 서버로 요청 안보내고 데이터를 수정한다. (결론은 나중에는 데이터를 바꿨다가 서버에서는 바뀐게 맞나 점검을 한다. 바로 mutate 두번째 인자인 shouldRevaildate이다. 기본적으로 true이다. 서버요청 없이 데이터를 변경했다가 나중에 서버가 점검을 한다. 그 동작을 없애려면 `fasle`로 변경해야 요청을 안보낸다. 서버에 요청이 가기도 전에 먼저 실제 데이터를 변경하고 요청은 나중에 보낸다. 그러면 사용자 편의성이 좋아진다. 인스타그램 좋아요 버튼처럼 가끔가다 서버가 에러터질 때는 그래서 점검도 다시한다. 좋아요 요청이 실패하면 좋아요를 꺼버린다. shouldRevaildate `true`면 OPTIMISTIC UI 제공: 낙관적인 UI 내가 보내는 요청이 성공할 것이라는 낙관하고 바로 좋아요 버튼 누르자마자 성공하게 된 후에 점검을 하겠다. 점검을 했는데 성공하면 넘어가고 안되면 좋아요 버튼 취소한다. false면 서버요청 보내지도 않고 로컬 데이터를 그대로 수정)

### props.childern

-   [React 공식문서](https://reactjs.org/docs/composition-vs-inheritance.html#containment)

### 리액트에서 컴포넌트 나눌때 Input이 들어가면 한 글자 입력할 때마다 전체가 리렌더링 발생해서 따로 분리하는게 좋다.

### 보통 미리 실제 컴포넌트를 구현하기 전에 변수이름 먼저 선언(배치)부터하고 나중에 구현한다. 큰 틀에서 부터 어떤 컴포넌트가 어디에 위치해야 할지 정하면 좋다.

C

### npm

```

npm i react react-dom
npm i typescript @types/react @types/react-dom
npm i -D eslint
npm i -D prettier eslint-plugin-prettier eslint-config-prettier
npm i -D webpack @babel/core babel-loader @babel/preset-env @babel/preset-react
npm i -D @types/webpack @types/node @babel/preset-typescript
npm i style-loader css-loader
npm i ts-node
npm i cross-env // TS_NODE_PROJECT=\"tsconfig-for-webpack-config.json\" webpack 리눅스에서는 호환이 되지만 윈도우에서는 안되기때문에 cross-env 설치한다음에 앞에 붙여준다 cross-env TS_NODE_PROJECT=\"tsconfig-for-webpack-config.json\" webpack
npm i webpack-dev-server -D
npm i webpack-cli
npm i -D @types/webpack-dev-server
npm i @pmmmwh/react-refresh-webpack-plugin
npm i react-refresh
npm i fork-ts-checker-webpack-plugin -D // 타입스크립트 검사할 때 블럭킹 방식으로 검사하는데 다음 동작을 막아버린다. 하지만 fork를 설정하면 타입스크립트 checking이랑 웹팩 실행이 동시에 동작해서 성능면에서 좋아진다.
npm i react-router react-router-dom
npm i -D @types/react-router @types/react-router-dom
npm i @loadable/component //
npm i npm i --save-dev @types/loadable\_\_component
npm i @emotion/react @emotion/styled // emotion css in js
npm i axios
npm i swr
npm i garvatar @types/gravatar
npm i react-toastify // 에러 발생시 토스트기계처럼 나타났다가 사라지는 라이브러리
npm i autosize --save-dev @types/autosize
npm i socket.io-client@2 --save-dev @types/socket.io-client
npm i react-custom-scrollbars --save --save-dev @types/react-custom-scrollbars
npm install dayjs --save
npm i react-mentions --save-dev @types/react-mentions
npm i regexify-string
```
