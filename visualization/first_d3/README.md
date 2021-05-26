# This Repo is visualization with d3, javascript, React lecture of freecodecamp.

[youtube link](https://www.youtube.com/watch?v=2LhoCfjm8R4)

* I want get visualization skill about big data.

**step 1**
* study d3 library
  * because other visualization library is.. not free customize from I want thing.
  * I think visualization is everything is contain a wide variety. And draw my thinking with code.
  * d3 library is complex. but I study d3 library slowly and step by step.
* See youtube video of freecodecamp.

### Let's go world of d3!
----
#### 주제별 기록
  * Refactoring a Bar Chart
    * App.js에 들어가 있던 data 불러오는 로직을 커스텀 훅으로 만들어 처리하였다.
    * axis도 x,y 둘다 나눠서 컴포넌트로 만들어준다.
    * 그래프 본체도 Marks 라는 컴포넌트로 추출해준다.
    * 이 챕터에서 중요한 점
      * 소스 리팩토링을 통해 d3함수 다루는 부분에서 좀 더 유연하게 함수들을 사용할 수 있다는 것을 배웠다. 예를 들면 App.js에서 xValue, yValue를 구할 때는 반복되는 부분을 지우기 위해 따로 함수를 구축함.
    * Custom hooks를 만들어 데이터를 가져오는 것은 자주 안써봤는데 이렇게 데이터로직을 따로 뺴니 관리하기가 훨씬 좋다. 데이터는 저 훅에서만 처리하면 되니까.