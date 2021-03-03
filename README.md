# 제로초 Slack 클론 무작정 따라해보기

#### 소스코드 다운받아서 momo 새 폴더로 프로젝트 시작

### 언어

- ReactJs
- TypeScript
- Swr

### 타입스크립트를 자바스크립트로 변환할 때에는 2 가지 방법이 있다.

1. 타입스크립트가 처음부터 마지막까지 변경하는대로 그대로 사용
2. 타입스크립트가 한 번 변경한 다음에 바벨이 이어받아서 변경

- 바벨이 이미지, css, html등 모든 걸 자바스크립트로 변환해준다. 프론트엔드 편의상 2번 방식을 많이 사용한다.

### TypeScript

- 타입스크립트는 자바스크립트의 변수, 함수의 매개변수, 함수의 반환 값에 Type이 붙는다.


### devServer-historyApiFallback
- 싱글페이지 어플리케이션에서는 url이 없으며 오로직 index.html만이 존재한다.
- 새로고침을 하면 주소는 서버로 간다. 서버는 오로지 한 주소만 알고 있다 localhost:3090
- / 뒤에는 다 무시한다.
- 하지만, historyApiFallback api를 통해서 주소를 실제로 있는 것 처럼 만들어준다.
 
### Code Splitting
- [Code Splitting 참조](https://medium.com/humanscape-tech/react%EC%97%90%EC%84%9C-%ED%95%B4%EB%B3%B4%EB%8A%94-%EC%BD%94%EB%93%9C-%EC%8A%A4%ED%94%8C%EB%A6%AC%ED%8C%85-code-splitting-56c9c7a1baa4)
- 페이지들을 진짜 필요한 페이지만 불러오면 좋다.
- 필요없는 컴포넌트는 처음에 불러오지 않고 필요한 컴포넌트는 그때 그때 불러올 수 있도록한다.
- Code Splitting 하다보면 어떤 컴포넌트를 불러올지 고민하게 된다.
- 이럴 때 page 기준으로 Code Splitting한다. (로그인페이지에 접속해있는데 굳이 회원가입 페이지를 미리 불러올 필요 없다. 그럼 둘다 해두된다.)
- SSR이 필요없는 파일 Code Splitting한다.
- `npm i @loadable/component`

### useCallback
- 함수에서는 블럭 내부 전체가 다시 실행되기 때문에 함수를 useCallback으로 감싸지 않으면, 매번 다시 실행된다.
- useCallback 하지않으면 리렌더링이 발생한다. (크게 성능에 영향을 미치지는 않지만, 디버깅이 어려워진다.)
- 이때 리렌더링이 된다해도 화면을 다시 그리지 않는다. virtual DOM 이전 과 다음상테에서 달라진게 찾아보고 달라진게 있으면 다시 그리지만, 검사하는 과정에서는 어쩔 수 없지만 검사 후에 달라진게 없다면 실제로 화면을 다시 그리지 않는다.

### custom Hook
- 리액트에서 기본적으로 제공하는 Hook이다. Hook들을 하나로 합쳐서 새로운 Hook을 만들어낸다.

### Redux
- Redux를 사용하는 이유는 전체적인 상태를 관리하고, 비동기 요청이 있을 때 redux-thunk, saga 미들웨어로 요청을 보낼 때
- 컴포넌트랑 비동기 로직과 분리되는 장점이 있다.
- 하지만 여기에선 Redux를 쓰지 않고 컴포넌트에서 비동기코드를 분리해야 할 없는 이유
  - Sigup() 컴포넌트 하나에서만 유일하게 쓰이는 비동기가 있다면 예를들면 회원가입 컴포넌트 안에서만 쓰이는 비동기 요청 그런것들이 있을 때는 Redux로 빼면 코드가 길어진다. 무조건 redux-thunk, saga를 쓰는게 아니고 해당 컴포넌트 내부에서만 쓰이는 비동기를 해결한다.

### axios
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
npm i npm i --save-dev @types/loadable__component
npm i @emotion/react @emotion/styled // emotion css in js

```
