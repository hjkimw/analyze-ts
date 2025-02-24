# 🔍 라이브러리 타입 지원 여부 파악하기

## 📘 라이브러리 TS 분석

- `package.json`의 `"types"` 속성에 적힌 파일이 메인 타이핑 파일임.
- npmjs.com에서 패키지를 검색했을 때 패키지 우측에 TS로 뜨면 ts 지원 라이브러리이고, DT로 뜨면 `@types`를 설치해야 하며, 그것마저도 없으면 직접 타이핑해야 함
- 첫 번째 줄부터 보기 보다는 마지막 줄 `exports default`나 `export =` 부분을 보고 거슬러 올라가는 게 좋음
- 제네릭이 제일 읽기 어려워서 제네릭 부분은 따로 필기하면서 보는게 좋음

<br>

## ✅ 라이브러리 TS 지원 여부 확인

npm에서 타입을 기본적으로 제공하는 라이브러리에는 다음과 같이 라이브러리 타이틀에 TS 아이콘이 표기되어 있다.   
즉, 설치만 해도 알아서 타이핑이 다 되어있다는 것이다.  

- **[redux-npm](https://www.npmjs.com/package/redux)**   
    ![redux-npm](/images/section01/section01-00.png)

<br>

- **[axios-npm](https://www.npmjs.com/package/axios)**   
    ![axios-npm](/images/section01/section01-01.png)

<br>

## 🔍 차이점 

두 라이브러리를 비교해보자면 제작에 사용된 언어가 다르다   
 
**redux**의 경우 TypeScript로 구성되어 있고
- **redux**   
    ![redux-lang](/images/section01/section01-02.png)

<br>

**axios**의 경우 JavaScript로 구성된 것을 볼 수 있다.
- **axios**   
    ![axios-lang](/images/section01/section01-03.png)

<br>

이러한 차이점은 **axios** 경우 JavaScript 라이브러리인데   
TypeScript 사용자를 위해 `.d.ts` 확장자 파일인 `index.d.ts`파일을 생성해서   
`index.d.ts`파일에는 실제 구현은 없고 해당 라이브러리 코드에 대한 type들을 전부 정의해놓은 것이다.   
![index.d.ts](/images/section01/section01-04.png)

반대로 **redux**는 애초에 전부 TypeScript로 작성되어 있으므로
type들을 별도로 전부 정의해놓은 `.d.ts` 확장자 파일이 기본적으로 대부분은 필요가 없다.

<br>

## 📝 `pacakage.json`의 `"main"`, `"types"`에 설정하는 파일

주의할것은 라이브러리 내부의 `index.d.ts` 파일이 무조건 타입을 정의해둔 파일이 아니라   
어디서 확인해 봐야 하냐면 **node-project**는 `package.json`이 가장 중요한 파일인데   
`package.json`의 `"types"`에 설정된 파일이 type들이 정의된 메인 타이핑 파일이다.   
( `"types"` 또는 `"typings"`에 설정되어 있다. )   
![package.json-types](/images/section01/section01-05.png)

<br>

그리고 `package.json`의 `"main"`에는 해당 패키지를 사용할 때 기본적으로 로드되는 
모듈의 경로를 설정한다.
![package.json-main](/images/section01/section01-06.png)

<br>

redux 라이브러리를 설치해서 `node_modules`에 있는    `redux`폴더에 세팅된 `package.json`를 확인해보자   
`"main"`에 `dist/cjs/redux.cjs`파일이 설정되어 있고   
![package.json-main](/images/section01/section01-07.png)   

<br>

`"types"`에는 `dist/cjs/redux.d.ts`파일이 설정된 것을 볼 수 있다.   
![package.json-main](/images/section01/section01-08.png)   

<br>

## 📘 DefinitelyTyped

🔗 **[DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped)**

다음과 같이 TypeScript이 지원되지 않는 라이브러리에는 DT 아이콘이 설정되어 있다.
- **[jquery-npm](https://www.npmjs.com/package/jquery)**   
    ![jquery-npm](/images/section01/section01-09.png)   

<br>

그럴 경우 `DefinitelyTyped`라고 오픈소스로 제작된 타입을 가져다 사용한다.
- **[@types/jquery-npm](https://www.npmjs.com/package/@types/jquery)**   
    ![@types/jquery](/images/section01/section01-10.png)   


---