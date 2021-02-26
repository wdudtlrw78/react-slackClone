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

- npm

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

```
