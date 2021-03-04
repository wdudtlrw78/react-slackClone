import axios from 'axios';

// 로그인 fetcher에서 넣은 주소를 매개변수(url) 넣어주고 응답(response)에서 데이터 꺼내서 돌려주겠다. return하는 data (=> response.data)는
// 로그인 페이지 { data } 에 들어간다.
const fetcher = (url: string) =>
  axios
    .get(url, {
      withCredentials: true,
    })
    .then((response) => response.data); // response.data.length

export default fetcher;

// fetcher를 다양하게 하면 좋다.
// 항상 response.data만 하면 서버쪽에서 주는 데이터 그대로 프론트에 저장해버리는데, fetcher를 여러개 만들어서 .length 배열로 저장하면 갯수만 저장할 수도 있다.
// 서버에서 부터 받는 데이터를 여기서 변조해서 데이터에 넣으면 된다.
