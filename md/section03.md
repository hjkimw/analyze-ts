# 🔍 axios 타입 분석하기

## 1. 다양한 방식으로 사용 가능한 axios

[npm: axios](https://www.npmjs.com/package/axios)

axios는 다음과 같이 npm 패키지에 ts 아이콘이 표기된것을 볼 수 있으며 

이 경우 해당 패키지에 타입이 내장되어 있기 때문에 

별도로 `@types/axios` 이런 같은 타입 정의 모듈을 설치하지 않아도 된다.

![axio.ts.png](/images/section03/axios.ts.png)

<br>

### **1.2. axios의 타이핑**

axios 패키지를 설치후 `node_modules` 폴더에 `axios/index.d.ts` 파일에 다음과 같이

타입이 정의되어 있다.

```tsx
// axios/index.d.ts

declare const axios: AxiosStatic;
export default axios;

export interface AxiosStatic extends AxiosInstance {
	create(config?: CreateAxiosDefaults): AxiosInstance;
	Cancel: CancelStatic;
	CancelToken: CancelTokenStatic;
	Axios: typeof Axios;
	AxiosError: typeof AxiosError;
	readonly VERSION: string;
	isCancel(value: any): value is Cancel;
	all<T>(values: Array<T | Promise<T>>): Promise<T[]>;
	spread<T, R>(callback: (...args: T[]) => R): (array: T[]) => R;
	isAxiosError<T = any, D = any>(payload: any): payload is AxiosError<T, D>;
	toFormData(sourceObj: object, targetFormData?: GenericFormData, options?: FormSerializerOptions): GenericFormData;
	formToJSON(form: GenericFormData|GenericHTMLFormElement): object;
}

export interface AxiosInstance extends Axios {
<T = any, R = AxiosResponse<T>, D = any>(config: AxiosRequestConfig<D>): AxiosPromise<R>;
<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): AxiosPromise<R>;

defaults: Omit<AxiosDefaults, 'headers'> & {
	headers: HeadersDefaults & {
		[key: string]: AxiosHeaderValue
		}
	};
}

export class Axios {
	constructor(config?: AxiosRequestConfig);
		defaults: AxiosDefaults;
		interceptors: {
		request: AxiosInterceptorManager<AxiosRequestConfig>;
		response: AxiosInterceptorManager<AxiosResponse>;
	};
	getUri(config?: AxiosRequestConfig): string;
	request<T = any, R = AxiosResponse<T>, D = any>(config: AxiosRequestConfig<D>): Promise<R>;
	get<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
	delete<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
	head<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
	options<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
	post<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
	put<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
	patch<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
	postForm<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
	putForm<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
	patchForm<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
}

export interface AxiosResponse<T = any, D = any>  {
	data: T;
	status: number;
	statusText: string;
	headers: RawAxiosResponseHeaders | AxiosResponseHeaders;
	config: AxiosRequestConfig<D>;
	request?: any;
}
```

타입을 분석할때는 아래서 위로 올라가면서 보는 게 좋다

모듈을 `export =` 으로 내보낼 경우 `CommonJS` Module이고 

`export default`, `export { }` 형식으로 내보낼 경우 `ES Module`이다.

다음과 같이 현재 `axios/index.d.ts` 파일 마지막 줄에 `export default`로 

`axios`를 내보내는 것을 볼 수 있는데

```tsx
// axios/index.d.ts

// ...

export default axios;
```

그럼 즉, `ES Module` 시스템으로 작성된거고

`tsconfig.json`의 `"esModuleInterop"` 옵션과 관계없이 다음과 같이 불러올 수 있겠다.

```tsx
import axios from 'axios';
```

<br>

#### 💡 복습: TypeScript에서 모듈을 불러올 때 해당 모듈이 `CommonJS`일 경우

```tsx
// TypeScript에서 불러오는 모듈이 CommonJS 일 경우 불러올 때
import axios = require('axios');

// - "esModuleInterop" 옵션 활성화(true)
//   import * as axios from 'axios';
import axios from 'axios';
```

<br>
<br>

다음과 같이 `Axios`를 상속 받는 `AxiosInstance`는 함수다

`interface`로 정의한 타입은 무조건 객체가 아니라 함수로 되어 있으면 함수가 될 수 있다.

왜냐하면 함수도 곧 객체이기 때문이다.

```tsx
// axios/index.d.ts

// ...

export interface AxiosInstance extends Axios {
  <T = any, R = AxiosResponse<T>, D = any>(config: AxiosRequestConfig<D>): Promise<R>;
  <T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;

  defaults: Omit<AxiosDefaults, 'headers'> & {
    headers: HeadersDefaults & {
      [key: string]: AxiosHeaderValue
    }
  };
}

// ...
```

<br>

함수도 객체이므로 다음과 같이 함수 `a`를 선언하고 함수, 속성을 추가할 수 있기 때문이다.

```tsx
const a = () => {};

a.create = () => {};
a.isAxiosError = () => {};
a.b = 2;
a.c = false;

a();
a.create();
a.isAxiosError();
a.b;
a.c;
```

<br>

아래와 같이 함수인 객체 `AxiosInstance`를 상속받아서 

`AxiosStatic` 객체에 또 다른 함수와 속성들을 넣어주는 식이다.

js에서 이러한 방식이 허용되기 때문에 ts에서도 이러한 방식을 사용할 수 있다.

```tsx
// axios/index.d.ts

// ...

export interface AxiosStatic extends AxiosInstance {
  create(config?: CreateAxiosDefaults): AxiosInstance;
  Cancel: CancelStatic;
  CancelToken: CancelTokenStatic;
  Axios: typeof Axios;
  AxiosError: typeof AxiosError;
	// ...
}

declare const axios: AxiosStatic;

export default axios;
```

<br>

그리고 `AxiosInstance`의 경우 `Axios`를 상속받는 것을 볼 수 있는데 

`Axios`는 클래스인 것을 볼 수 있다.

```tsx
// axios/index.d.ts

export class Axios {
  constructor(config?: AxiosRequestConfig);
  defaults: AxiosDefaults;
  interceptors: {
    request: AxiosInterceptorManager<InternalAxiosRequestConfig>;
    response: AxiosInterceptorManager<AxiosResponse>;
  };
  getUri(config?: AxiosRequestConfig): string;
  request<T = any, R = AxiosResponse<T>, D = any>(config: AxiosRequestConfig<D>): Promise<R>;
  get<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
  delete<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
  head<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
  options<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
  post<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
  put<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
  patch<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
  postForm<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
  putForm<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
  patchForm<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
}

// ...

export interface AxiosStatic extends AxiosInstance {
	// ...
}
```

<br>

즉, `Axios`는 **클래스**이면서 **함수**이자 **객체**이다.

타입 정의에서 알 수 있듯이 다음과 같이 3개 방법으로 `Axios`를 사용할 수 있다.

```tsx
// axios.ts

import axios from 'axios';

(async ()=>{
	try{
		// 1. axios 인스턴스 생성
		new axios();

		// 2. axios 함수로 호출
		axios();
		
		// 3. axios 객체에서 .get()메서드 호출
		axios.get();
			
	}catch(error){
	
		// ...
		
	}
})()
```

<br>

## 2.  `ts-node` 패키지 사용하기

ts 코드를 `npx tsc` 명령어로 컴파일하면 다음과 같이 js 파일이 생성된다.

```jsx
// axios.js

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get("https://jsonplaceholder.typicode.com/todos/1");
        response.data;
    }
    catch (error) {
        console.error(error);
    }
}))();
```

그럼 해당 js파일을 `node axios.js` 명령어로 실행시킬 수 있는데 

매번 이와 같은 동작을 하기엔 번거롭다.

<br>

### 2.1. ts-node

`ts-node` 패키지를 사용하면 ts파일을 `npx tsc` 명령어로

js 파일로 컴파일 후에 `node`로 js 파일을 실행시키지 않아도

`ts-node` 패키지를 사용해서 한번에 ts 파일을 즉시 실행할 수 있다.

[npm: ts-node](https://www.npmjs.com/package/ts-node)

```tsx
// ts-node로 해당 ts 실행
npx ts-node <ts파일명>
```

<br>

## 3. 제네릭을 활용한 `AxiosResponse<T>`타이핑

다음과 같은 코드에서 `axios.get()` 메서드를 호출해 반환된 값의 타입을 확인해보면

`AxiosResponse<any, any>` 타입이 반환된 것을 볼 수 있다.

```tsx
// axios.ts

import axios from "axios";

(async () => {
  try {
    const response = await axios.get("https://jsonplaceholder.typicode.com/todos/1");
    // -> : AxiosResponse<any, any>

    response.data // : any

  } catch (error) {
    // ...
  }
})();
```

`axios.get()` 메서드 타입 정의로 이동(`f12`)하면

<br>

`Axios` 클래스에 `get` 메서드 타입이 다음과 같이 정의되어 있다.   
`get` 메서드 타입에 제네릭 `T`는 `any` 타입이 `R`은 `AxiosResponse<T>`가 기본값으로 설정되어 있다.

```tsx
// axios/index.d.ts

export class Axios {
  constructor(config?: AxiosRequestConfig);
	// ...
  interceptors: {
		// ...
  };  
  // ...	
  get<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
}
```

<br>

메서드 제네릭 `R`에 기본값 설정되어 있는 `AxiosResponse<T>`타입 정의로 이동(`f12`)하면   
다음과같이 `interface`로 제네릭 `T = any`, `D = any` 로 제네릭을 전달받고 각각 기본값이 `any`로 설정되어 있으며   
`data` 속성 타입을 제네릭 `T`로 설정하고 있다.   
```tsx
// axios/index.d.ts

// ...

export interface AxiosResponse<T = any, D = any> {
  data: T;
	// ...
}

//...
```

<br>

즉, `AxiosResponse["data"]` 속성에 설정된 제네릭 `T`를 타이핑 해줘야 한다.

<br>

`Axios` 클래스에 `get()` 메서드 타입으로   
첫번째 제네릭에  `T`가 들어오고 기본값이 `any`로 설정된 것을 볼 수 있다.

```tsx
// axios/index.d.ts

export class Axios {
  constructor(config?: AxiosRequestConfig);
	// ...
  interceptors: {
		// ...
  };  
  // ...	
  get<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
}
```

<br>

즉, `Axios.get()` 메서드를 호출할때   
다음과 같이 첫번째 제네릭(`T`)으로 타입을 정의해 전달해주면 된다.

```tsx
// axios.ts

import axios from "axios";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

(async () => {
  try {
    const response = await axios.get<Post>("https://jsonplaceholder.typicode.com/posts/1");
    console.log(response.data);
    
  } catch (error) {
    console.error(error);
  }
})();
```

<br>

그럼 `Axios.get()` 메서드의 제네릭 `T`가 `Post` 타입을 받으므로

```tsx
// axios/index.d.ts

export class Axios {
  constructor(config?: AxiosRequestConfig);
	// ...
  interceptors: {
		// ...
  };  
  // ...	
  get<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
}
```

<br>

`AxiosResponse[”data”]` 가 `Post` 타입이 되겠다.

```tsx
// axios/index.d.ts

// ...

export interface AxiosResponse<T = any, D = any> {
  data: T;
	// ...
}

//...
```

```tsx
// axios.ts

import axios from "axios";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

(async () => {
  try {
    const response = await axios.get<Post>("https://jsonplaceholder.typicode.com/posts/1");

    console.log(response); // AxiosResponse<Post, any>        
    console.log(response.data); // Post        
    console.log(response.data.userId); // number
    console.log(response.data.id); // number
    console.log(response.data.title); // string
    console.log(response.data.body); // string
    
  } catch (error) {
    console.error(error);
  }
})();
```

## **4. AxiosError와 unknown error 대처법**

서버에 요청을 보낼때 에러가 날 수 있다.

네트워크 요청을 보낼 때는 항상 에러가 날 가능성을 고려해야 한다.

`AxiosError` 타입의 경우 다음과 같이 클래스로 구현된 것을 볼 수 있다.

```tsx
// axios.index.d.ts

// ...

export class AxiosError<T = unknown, D = any> extends Error {
  constructor(
      message?: string,
      code?: string,
      config?: InternalAxiosRequestConfig<D>,
      request?: any,
      response?: AxiosResponse<T, D>
  );

  config?: InternalAxiosRequestConfig<D>;
  code?: string;
  request?: any;
  response?: AxiosResponse<T, D>;
  isAxiosError: boolean;
  status?: number;
  toJSON: () => object;
  cause?: Error;
  static from<T = unknown, D = any>(
    error: Error | unknown,
    code?: string,
    config?: InternalAxiosRequestConfig<D>,
    request?: any,
    response?: AxiosResponse<T, D>,
    customProps?: object,
): AxiosError<T, D>;
  static readonly ERR_FR_TOO_MANY_REDIRECTS = "ERR_FR_TOO_MANY_REDIRECTS";
  static readonly ERR_BAD_OPTION_VALUE = "ERR_BAD_OPTION_VALUE";
  static readonly ERR_BAD_OPTION = "ERR_BAD_OPTION";
  static readonly ERR_NETWORK = "ERR_NETWORK";
  static readonly ERR_DEPRECATED = "ERR_DEPRECATED";
  static readonly ERR_BAD_RESPONSE = "ERR_BAD_RESPONSE";
  static readonly ERR_BAD_REQUEST = "ERR_BAD_REQUEST";
  static readonly ERR_NOT_SUPPORT = "ERR_NOT_SUPPORT";
  static readonly ERR_INVALID_URL = "ERR_INVALID_URL";
  static readonly ERR_CANCELED = "ERR_CANCELED";
  static readonly ECONNABORTED = "ECONNABORTED";
  static readonly ETIMEDOUT = "ETIMEDOUT";
}

// ...
```

<br>

`catch`문 매개변수로 들어오는 `error` 객체는 `unknown`타입이므로  

`error` 객체에 `reponse` 속성에 접근을 하려면  

다음과 같이 `error`를 `AxiosError`타입으로 단언(`as`)을 하거나  

<br>

`AxiosError`는 클래스이므로 `instanceof` 연산자로  

`error`가 `AxiosError`의 인스턴스 객체인지 체크하는 방식으로 타입을 가드하거나  

<br>

`Axios` 에서 제공하는 error 타입 가드 함수 `isAxiosError()` 를 사용해 체크하는 방법이 있다.  

```tsx
// axios.ts

import axios, { AxiosError } from "axios";

// ...

(async () => {
  try {
		
		// ...

  } catch (error) { // error 타입은 unknown 타입

    // 1. error를 AxiosError 타입으로 단언
    const errorResponse = error as AxiosError;
    console.error(errorResponse.response?.data);

    // 2. AxiosError 가 클래스 이므로 instanceof 연산자로 체크
    if(error instanceof AxiosError){
      console.error(error.response?.data);
    }

    // 3. Axios 에서 제공하는 error 타입 가드 함수를 사용해 체크
    if(axios.isAxiosError(error)){
      console.error(error.response?.data);
    }
    
  }
})();
```

<br>

## **5. Axios 타입 직접 만들기**

```tsx
// axios.ts

import axios, { AxiosResponse, AxiosError } from "axios";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}
interface Created{
  userId: number;
  id: number;
  title: string;
  body: string;
}
interface Data{
  userId: number;
  id: number;
  title: string;
  body: string;
}
interface Config<D = any>{
  method?: 'POST'| 'GET'| 'PUT'| 'DELETE' | 'post'| 'get'| 'put'| 'delete';
  url?: string;
  data?: D;
}
interface A {
  get: <T = any, R = AxiosResponse<T>>(url: string)=> Promise<R>;
  post: <T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D)=> Promise<R>;
  isAxiosError: (error: unknown)=> error is AxiosError;
  <T>(config: Config): Promise<AxiosResponse<T>>;
  <T>(url: string, config: Config): Promise<AxiosResponse<T>>;
}

const a: A = axios;

(async () => {
  try {
		
    // * axios 사용 방식
    // 1. axios 인스턴스 생성
		// new axios();

		// 2. axios 함수로 호출
		// axios();
		
		// 3. axios 객체에서 .get()메서드 호출
		// axios.get();

    const getResponse = await a.get<Post, AxiosResponse<Post>>("https://jsonplaceholder.typicode.com/posts/1"); 

    console.log(getResponse); // AxiosResponse<Post, any>        
    console.log(getResponse.data); // Post        
    console.log(getResponse.data.userId); // number
    console.log(getResponse.data.id); // number
    console.log(getResponse.data.title); // string
    console.log(getResponse.data.body); // string

    const postResponse = await a.post<Post, AxiosResponse<Created>>("https://jsonplaceholder.typicode.com/posts/1");
    
    console.log(postResponse); // AxiosResponse<Post, any>        
    console.log(postResponse.data); // Post        
    console.log(postResponse.data.userId); // number
    console.log(postResponse.data.id); // number
    console.log(postResponse.data.title); // string
    console.log(postResponse.data.body); // string   
    

    const postResponse2 = await a({
      method: "POST",
      url: "https://jsonplaceholder.typicode.com/posts/1",
      data: {
        title: "foo",
        body: "bar",
        userId: 1,
      },
    });

  } catch (error) { // error 타입은 unknown 타입

    // 1. error를 AxiosError 타입으로 단언
    const errorResponse = error as AxiosError;
    console.error(errorResponse.response?.data);

    // 2. AxiosError 가 클래스 이므로 instanceof 연산자로 체크
    if(error instanceof AxiosError){
      console.error(error.response?.data);
    }

    // 3. axios 에서 제공하는 error 타입 체크 함수를 사용해 체크
    if(a.isAxiosError(error)){
      console.error(error.response?.data);
    }
    
  }
})();

```

---