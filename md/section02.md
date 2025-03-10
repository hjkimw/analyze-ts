## 2.1. 🛠️ `@types/jquery` 설치하기

#### npm: @types/jquery 
🔗 **[npm: @types/jquery](https://www.npmjs.com/package/@types/jquery)**

타입 정의 파일인 `index.d.ts`로 이동해 보자.

🔗 **[jquery/index.d.ts](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/jquery/index.d.ts)**

TypeScript Version이 주석으로 명시되어 있을 경우, 해당 버전 이상에서 정의된 타입을 사용할 수 있다.

예를 들어, `TypeScript Version: 2.7`이라고 작성되어 있을 경우, ts 2.7 버전부터 사용할 수 있다는 의미다.

다음과 같이 주석이 

`<reference types="" />`, 

`<reference path="" />`, 

`<reference lib="" />` 이런 식으로 작성된 것은 이 타입이 참조하고 있는 파일들을 작성해 놓은 것이다.

**<reference 종류>**

- `types`: npm 라이브러리
- `path`: 현재 라이브러리 파일
- `lib`: TS 기본 제공 라이브러리

![jquery-index.d.ts.png](/images/section02/jquery-index.d.ts.png)

즉, 해당 파일들을 자동으로 불러와서 쓰고 있다고 보면 된다.

<aside>

1. 항상 `index.d.ts` 파일을 먼저 본다.
2. 어떤 모듈을 참조하고 있는지 알아야 한다.
    
    해당 파일에 type이 없을 수 있기 때문이다.
    
</aside>

그럼 `export = jQuery;`라고만 작성되어 있고 나머지 `<reference />`는 전부 주석인데, `jQuery`는 어디에서 온 걸까 의문을 가질 수 있다.   
주석 처리된 `<reference />` 파일 중 하나에는 있지 않을까라고 추측해 볼 수 있다.

<br>

## 2.2. ⚙️ `CommonJS` 모듈 타이핑 하는 방법과 `"esModuleInterop"` 옵션

### 2.2.1. 📥 📤 Module System : `ES Module`, `CommonJS`

**TypeScript**는 기본적으로 **`ES Module`** 문법의 `import`, `export` 키워드를 사용한다.

```typescript
// ES Module

import $ from 'jquery';

export { $ };
export default $;
```

**Node.js**에서 사용하는 **`CommonJS`** 문법은 다음과 같다.

```typescript
// CommonJS

const $ = require('jquery');

module.exports = { 
	$,
};
module.exports = $;
```

TypeScript에서는 기본적으로 **`ES Module`** 문법의 `import`, `export` 키워드를 사용한다고 했는데, jQuery 패키지에는 `CommonJS` 형식으로 `jQuery`를 `export`하고 있는 것을 볼 수 있다. 

**이건 TypeScript에서 `CommonJS` 라이브러리를 표시하는 방법이다.**

jQuery는 **`CommonJS`** 형식으로 쓰여진 라이브러리이기 때문에 이와 같이 하는 것이다.

![jquery-index.d.ts.png](/images/section02/jquery-index.d.ts.png)

`export = jQuery;`는 사실상 **`CommonJS`**의 `module.exports = jQuery;`와 같다고 보면 된다.

TypeScript에서 `export = jQuery;`로 표현하는 것일 뿐이다.

**`CommonJS`**에서 **`CommonJS`** 모듈을 불러오는 방식은 다음과 같다.

```typescript
// CommonJS

const $ = require('jquery');
```

TypeScript에서 **`CommonJS`** 모듈을 불러오는 방식은 아래와 같이 표현한다.

```typescript
// TypeScript

import $ = require('jquery');
```

이와 같이 TypeScript에서도 `require()` 함수를 사용해 모듈을 불러오는 경우가 있다.

그런데 위와 같이 모듈을 불러올 때 `CommonJS`, `TypeScript` 따로 문법을 나눠 쓰는 것보다는 하나로 통일하는 게 좋다.

그래서 이런 문법을 하나로 통일하는 방법은 TypeScript에서 모듈을 다음과 같이 불러와 사용하면 된다.

```typescript
// TypeScript

import * as $ from 'jquery';
```

위의 문법은 TypeScript에서 **`CommonJS`** 모듈을 불러오는 아래의 문법과 동일하다고 보면 된다.

```typescript
// TypeScript

import $ = require('jquery');
```

그런데 여기서 React 같은 라이브러리에서 모듈을 불러올 때 보통 다음과 같이 모듈을 불러온다.

```typescript
import React from 'react';
```

그런데 위와 같은 방식은 원칙적으로 잘못된 것이다.

원래는 다음과 같이 불러오는 게 올바르다.

```typescript
import * as React from 'react';
```

그럼 왜 다음과 같은 방식으로 불러올 수 있는가?

```typescript
import React from 'react';
```

<br>

### ⚙️ `"esModuleInterop"` 옵션

tsconfig.json **"esModuleInterop" 옵션이 활성화(true) 되어 있으므로** 일반적으로 사용하고 있는 `import React from 'react';` 방식으로 모듈을 불러올 수 있다.

즉, 만약 비활성화(false)일 경우 `import * as React from 'react';`로 작성해서 불러와야 한다.

```typescript
// tsconfig.json

{
  "compilerOptions": {
		// ...
		
    /* Interop Constraints */
    "esModuleInterop": true,
		
		// ...
  }
}
```

**`"esModuleInterop"`** 옵션이 **`CommonJS`**를 **`ES Module`**처럼 인식될 수 있게 해주는 옵션이다.

```typescript
export jQuery; // -> module.exports = jQuery;

import $ = require('jquery');
import * as from 'jquery';

// - "esModuleInterop": true로 활성화
import $ from 'jquery';
import React from 'react';
```

그럼 모든 라이브러리가 CommonJS인가 하면 그건 아니다.

어떤 라이브러리는 ES Module로 작성되어 있는 경우가 있다.

ES Module 라이브러리는 `export default` 키워드가 있는지 찾아보면 된다.

만약 `export = $;` 이런 식으로 모듈을 내보낼 경우 CommonJS이다.

```typescript
// commonjs
export = A; // export 방식
import A = require('a'); // import(module = commonjs)
import * as A from 'a'; // import(module = es2015, esModuleInterop = false)
import A from 'a'; // import(module = es2015, esModuleInterop = true)

// UMD
// commonjs를 위해
export = A; 

// 스크립트 파일을 위해, 스크립트 파일에서는 import 없이 namespace로 불러올 수 있음
export as namespace A; 

// ESM, 표준, 권장 방식
export default A;
import A from 'a';

// 모듈로부터 모든 것을 임포트한 다음에 다시 export, default 못 가져오고 commonjs 모듈도 못 가져옴
export * from '모듈명'; 

// 모듈로부터 모든 것을 임포트한 다음에 as에 적힌 namespace대로 export(default 가져올 수 있음, commonjs 모듈 못 가져옴)
export * as namespace from '모듈명'; 
import { namespace } from '모듈명'; 

namespace.default; // 이 방식으로 default 접근 가능
```

<br>

## 2.3. 네임스페이스(namespace)

JQuery 타입 정의를 분석하다 보면 다음과 같이 `declare namespace JQuery`로 정의된 것을 볼 수 있다. (namespace는 script src로 불러오는 라이브러리에서 주로 쓰인다. (전역))

내부에 저 정의된 type alias들을 하나의 이름으로 묶어줬다고 보면 된다.

```typescript
declare namespace JQuery {
    type TypeOrArray<T> = T | T[];
    type Node = Element | Text | Comment | Document | DocumentFragment;
    
    // ...    
}
```

하나의 이름으로 묶어준 이유는 추후에 타입을 만들 때 다른 파일에서 타입명이 같아 서로 충돌이 날 수 있기 때문이다.

그럴 경우 `namespace`로 묶어서 충돌을 방지할 수 있다.

<br>

## 2.4. 메서드와 this 타이핑

jQuery의 `removeClass` 메서드 타입을 가져와 분석해 보자.

```typescript
// jquery.ts

removeClass(className_function?: 
	JQuery.TypeOrArray<string> | 
	**((this: TElement, index: number, className: string) => string)**
): this;
```

두 번째 인자에 콜백을 전달 받는데, `(this: TElement, index: number, className: string) => string`으로 정의된 것을 볼 수 있다.

그런데 위와 같이 TypeScript에서 this가 매개변수일 경우 해당 this는 매개변수로는 존재하지 않는다고 봐야 한다. 빼고 보라는 말이다.

실제로는 `(index: number, className: string) => string` 이렇게 타입이 정의되었다고 봐도 무방하다.

그럼 첫 번째 매개변수에 들어온 this 역할은 뭐냐면 this의 타입을 정의해 준 것이다.

<aside>
this가 바뀌는 상황에서 타입이 정의되게 해준 것이다.

첫 번째 매개변수로 this가 되어 있다는 것은 매개변수가 아니라 this를 타이핑 했다는 것이고, 실제 매개변수는 첫 번째 매개변수 this 다음부터라는 것이다.

</aside>

그리고 `removeClass` 메서드는 this를 반환하므로 this는 `removeClass` 메서드를 호출한 jQuery 객체이기에 이어서 메서드를 호출해 메서드 체이닝을 할 수 있게 된다.

<br>

## 2.5. jQuery 타입 직접 만들어 보기

```typescript
// jQuery.ts

// ...

$(["p", "t"]).text("hello");
const tag = $("ul li").addClass(function(index) {
  return "item-" + index;
});
$(tag).html(function(i: number) {
  console.log(this);
  return $(this).data('name') + '입니다';
});
```

```typescript
// jQuery.ts

// zQuery 인터페이스 정의
interface zQuery<T extends Element> {
  text(param?: string | number | boolean | ((this: T, index: number) => void)): this;
  html(param: string | Document | DocumentFragment): void;
}

// zQuery 인터페이스를 사용하는 $tag 상수 정의
const $tag: zQuery<HTMLElement> = $(['p', 't']) as unknown as zQuery<HTMLElement>;

$tag.text("hello");
$tag.text(123);
$tag.text(function(index) {
  console.log(this); 
  return true;
});
$tag.text().html(document);
```

---