# This Repo is visualization with d3, javascript, React lecture of freecodecamp.

[youtube link](https://www.youtube.com/watch?v=2LhoCfjm8R4)

- I want get visualization skill about big data.

**step 1**

- study d3 library
  - because other visualization library is.. not free customize from I want thing.
  - I think visualization is everything is contain a wide variety. And draw my thinking with code.
  - d3 library is complex. but I study d3 library slowly and step by step.
- See youtube video of freecodecamp.

### Let's go world of d3!

---

#### 주제별 기록

- Refactoring a Bar Chart
  - App.js에 들어가 있던 data 불러오는 로직을 커스텀 훅으로 만들어 처리하였다.
  - axis도 x,y 둘다 나눠서 컴포넌트로 만들어준다.
  - 그래프 본체도 Marks 라는 컴포넌트로 추출해준다.
  - 이 챕터에서 중요한 점
    - 소스 리팩토링을 통해 d3함수 다루는 부분에서 좀 더 유연하게 함수들을 사용할 수 있다는 것을 배웠다. 예를 들면 App.js에서 xValue, yValue를 구할 때는 반복되는 부분을 지우기 위해 따로 함수를 구축함.
  - Custom hooks를 만들어 데이터를 가져오는 것은 자주 안써봤는데 이렇게 데이터로직을 따로 뺴니 관리하기가 훨씬 좋다. 데이터는 저 훅에서만 처리하면 되니까.
- stylized Bar Chart
  - css 파일 추가 후 tick, mark 클래스 추가
    - text, mark의 fill, stroke 설정 진행
    - 이부분에서 중요한 것은 svg관련된 태그들의 속성들을 더 공부해야겠다는 것이다.
      - fill, stroke같은 속성들을 좀 더 빠삭하게 알아야하겠다.
      - svg에서 사용하는 text태그는 x, y같은 속성을 적용할 수 있다. svg요소 내에서 사용하는 태그들은 모두 위치를 컨트롤할 수 있는 듯하다.
  - d3.Format 함수 사용
    - 인구수는 x1000이기 때문에, 현재 표시되고 있는 숫자의 길이가 너무 길어지는 문제가 있다. 그래서 이를 단위별로 변환해주기위해 d3.format을 사용했다.
    - [api document](https://github.com/d3/d3-format), [format example](http://bl.ocks.org/zanarmstrong/05c1e95bf7aa16c4768e)
    - d3.format은 함수를 반환해주기 때문에, 특정 숫자를 아래처럼 매개변수로 넘겨줘야 한다.
      ```javascript
      d3.format(".2s")(n);
      ```
    - format은 다른 곳에서도 쓸 가능성이 있기 때문에, 따로 함수로 만들어서 리팩토링하였다.
      - tickFormatter
      ```javascript
      const tickFormatter = (formatstr) => format(formatstr);
      ```
      - axisTickFormat
      ```javascript
      const axisTickFormat = (n) => {
        if (!n) {
          return 0;
        }
        return tickFormatter(".2s")(n).replace("G", "B");
      };
      ```
    - 단위는 여러가지가 존재하므로, replace함수를 이용해 단위를 바꿔주는 방법도 있다.
    - format함수로 0을 집어넣으면 0.0이 반환되는데, 이를 0으로 표시해주기 위해 분기처리를 하여 0일 경우 0이 리턴되도록 변경하였다.
  - rect태그에 자식노드로 title을 넣을 경우 간단한 tooltip을 만들 수 있다.
    - 해당 xValue의 값에 tickFormatter함수를 전달하여 단위를 변경해주었다.
- Marking a Scatter plot
  - Scatter는 '뿌리다'라는 뜻을 가진 단어인데, plot들을 뿌려서 보여주는 형태다.
  - 이런 데이터 그래프는, 간단히 생각해보면 '분포도' 라고 할 수 있을 것 같다.
    - 위키백과에서는([링크](https://ko.wikipedia.org/wiki/산점도)) '분포도'가 아니고 '산점도'라고 한다는데, 두개 의미가 크게 다른거같진 않은데.. 여튼,
    - **산점도**는 두 변수간의 관계를 나타낼 때 가장 이상적인 그래프형태 중 하나이다.
    - 우선 두개의 변수를 직교좌표계를 이용해 좌표상의 점들을 표시한다.
      - 음.. 예를 들면 고기값같은게 될 수 있겠다. -> 고기무게에 따른 고기가격을 나타낼 수 있을듯?
      - 샘플을 더 찾아보면... 생각이 안나 구글링해봄.. 머신러닝쪽으로 뭔가 표현할 수 있을 것 같은데..뭔가 많다.
  - Iris Dataset
    - 데이터 키
      - sepal : 꽃받침
      - petal : 꽃잎
    - 꽃의 꽃받침의 길이, 너비, 꽃잎의 길이, 너비 통계를 산출한 데이터셋이다.
    - 1단계는 우선 데이터 상관관계 보단 산점도를 그리는 것에 집중해본다.
      - **1단계**
        - 산점도는 선형 스케일로 나타낼 수 있다. 특정 데이터의 수치는 일직선상의 선에 숫자크기에 따라 위치를 지정할 수 있으므로, x,y는 모두 scaleLinear로 표현한다.
        - 사전에 csv데이터를 가져올 때 csv로 숫자를 받을 때는 string이 되버리므로, csv의 두번째 파라미터에 string을 number로 바꿔주는 함수를 추가해줬다.
        - scaleLinear을 계산하기 위해, domain을 계산해줬다. domain은 배열값으로 [최소값, 최대값]을 구성하면 되므로, 직접 값을 입력하지 않고 extent 함수[링크](https://observablehq.com/@d3/d3-extent)를 이용해 구했다.
          - range는 svg의 내부 너비와 높이 그대로다.(0부터 시작)
        - 산점도는 단어 그대로 점으로 표현하는 그래프이기 때문에, x,y좌표상에 circle로 표현해주면 된다.
          - circle에서 줘야 할 속성은 cx(점의 x좌표), cy(점의 y좌표), r(점의 반지름)
        - label을 추가했다.
          - x axis는 margin bottom의 크기를 늘려주고 공간을 확보했으며, y axis는 margin left의 공간을 활용해 집어넣었다. y axis의 경우, 세로로 글자를 돌려야 하기 때문에, transform 속성에 rotate값을 지정해주었으며, 위치를 잡기 위해 translate를 같이 넣어주었다.
            - y axis의 경우 transform속성에서 rotate가 translate보다 먼저나오면 rotate된 후에 위치가 조정되므로 translate를 먼저 쓰고 rotate를 써야한다. 아래 참고
            ```javascript
            // 이게 아니라
            <text transform={`rotate(-90) translate(${-yAxisLabelOffset},${innerHeight / 2})`}>{yAxisLabelText}</text>
            // 이렇게 해야됨
            <text transform={`translate(${-yAxisLabelOffset},${innerHeight / 2}) rotate(-90)`}> </text>
            ```
- Stylized Line Chart
  - scatter plot chart에 line을 추가하였다.
  - 먼저, line은 path라는 요소에 있는 d 속성에 값을 넣으면 그려진다.[PATH](https://developer.mozilla.org/ko/docs/Web/SVG/Tutorial/Paths)
  - 이 d라는 속성에 들어갈 값은 line함수의 결과이다.
    - line은 함수로서 실행되며 메서드체이닝으로 x,y좌표를 구하는 메서드를 호출할 수 있다. x,y의 각 파라미터에는 data값을 순회할 수 있는 함수를 넣으면 되고, data 값을 통해 각 x,y좌표들의 배열을 구하게 된다.
    ```javascript
    d3.line().x(function (d) {
      return xScale(xValue(d));
    })(data);
    // data는 값의 배열
    ```
    위와 같은 형태가 되는데, d는 data의 각 요소를 매개변수로 받게되며, 그 결과로 x좌표들이 구해진다.(정확히는 path의 d 속성으로 계산된 x 좌표 리스트)
  - 이렇게 x, y를 구하고 d에다 집어넣으면 line이 완성된다.
  - svg의 요소들의 fill, stroke의 default 값은 black이므로, 따로 설정해주어야 한다.
  ```
  stroke - 선 색상
  stroke-width - 선 굵기
  stroke-linejoin - 선의 굴곡점의 모양
  stroke-linecap - 선의 끝부분의 모양
  fill - 채우기 색상 (line 그래프의 경우 none으로 해야 함)
  ```
  - scale함수 쪽에 nice함수를 써서 원하는 안내선의 구획을 나타내고 싶은데 아직 안된다. -> 해결중
