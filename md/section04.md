# 🔍 React 타입 분석

## **1. UMD 모듈과 tsconfig.json jsx 설정하기**

- **타이핑 소스코드**
  🔗 **[ts-react/2.끝말잇기 at master · ZeroCho/ts-react](https://github.com/ZeroCho/ts-react/tree/master/2.%EB%81%9D%EB%A7%90%EC%9E%87%EA%B8%B0)**

React 라이브러리 타입 설치

```tsx
npm i -D @types/react
```

<br>

모듈 방식을 확인하기 위해 `@types/react/index.d.ts` 파일에 `React` 객체를 내보내는 것을 확인한다.

```tsx
// @types/react/index.d.ts

// ...

// eslint-disable-next-line @definitelytyped/export-just-namespace
export = React;
export as namespace React;

// ...
```

-> `export as namespace React;` 까지 있으면 **UMD** 모듈이다.

<br>
<br>

다음과 같이 jsx 에러가 출력되는 것을 볼 수 있는데

JavaScript, TypeScript 문법이 아닌 React 전용 문법이기 때문이다.

그래서 기본적으로 TypeScript가 jsx문법을 인식할 수 없기에 이와 같은 에러가 출력되는 것이다.

`react.tsx`
![jsx-react.png](/images/section04/jsx-react.png)

<br>

TypeScript가 jsx문법을 인식하게 하려면 

`tsconfig.json` 파일 `"compilerOptions"`의 `"jsx"` 옵션을 `"react"`로 설정하면

jsx 문법을 인식하게 된다.

```json
// tsconfig.json

{
  "compilerOptions": {
		// ...
    "jsx": "react", /* Specify what JSX code is generated. */
		// ...		
  }
}
```
<br>

컴포넌트 타입은 다음과 같이   

모듈에서 불러온 `React` 객체에 `FunctionComponent` 로 타입을 지정할 수 있는데  

```json
// react.ts

import React from 'react';
// ...

const WordRelay: React.FunctionComponent = () => {
		
		// ...

    return (
        <>
	        ... 
        </>
      );
};

export default WordRelay;
```

<br>
<br>

`@types/react/index.d.ts` 파일에서  정의된 `FunctionComponent` 타입을 확인하면

`props` 매개변수에 제네릭 `P`를 타입으로 지정하고 

`React | Promise<ReactNode>`를 반환하는 함수인 것을 볼 수 있다.

```tsx
// @types/react/index.d.ts

// ...

export = React;
export as namespace React;

declare namespace React {
	
	// ...
	
	interface FunctionComponent<P = {}> {
    (props: P): ReactNode | Promise<ReactNode>;
    /**
     * Ignored by React.
     * @deprecated Only kept in types for backwards compatibility. Will be removed in a future major release.
     */
    propTypes?: any;
    /**
     * Used in debugging messages. You might want to set it
     * explicitly if you want to display a different name for
     * debugging purposes.
     *
     * @see {@link https://legacy.reactjs.org/docs/react-component.html#displayname Legacy React Docs}
     *
     * @example
     *
     * ```tsx
     *
     * const MyComponent: FC = () => {
     *   return <div>Hello!</div>
     * }
     *
     * MyComponent.displayName = 'MyAwesomeComponent'
     * ```
     */
    displayName?: string | undefined;
	}

	// ...

}
```
<br>
<br>

컴포넌트에서 반환하는 jsx의 태그에 대한 타입들도 정의해놓은 것을 볼 수 있다.

```tsx
// @types/react/index.d.ts

// ...

export = React;
export as namespace React;

declare namespace React {
	
	// ...
	
	interface IntrinsicElements {
	    // HTML
	    a: React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>;
	    abbr: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
	    address: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
	    area: React.DetailedHTMLProps<React.AreaHTMLAttributes<HTMLAreaElement>, HTMLAreaElement>;
	    article: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
	    aside: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
	    audio: React.DetailedHTMLProps<React.AudioHTMLAttributes<HTMLAudioElement>, HTMLAudioElement>;
	    b: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
	    base: React.DetailedHTMLProps<React.BaseHTMLAttributes<HTMLBaseElement>, HTMLBaseElement>;
	    blockquote: React.DetailedHTMLProps<React.BlockquoteHTMLAttributes<HTMLQuoteElement>, HTMLQuoteElement>;
	    body: React.DetailedHTMLProps<React.HTMLAttributes<HTMLBodyElement>, HTMLBodyElement>;
	    br: React.DetailedHTMLProps<React.HTMLAttributes<HTMLBRElement>, HTMLBRElement>;
	    button: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;
	    canvas: React.DetailedHTMLProps<React.CanvasHTMLAttributes<HTMLCanvasElement>, HTMLCanvasElement>;
	    caption: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
	    center: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
	
	    // SVG
	    svg: React.SVGProps<SVGSVGElement>;
	
	    animate: React.SVGProps<SVGElement>; // TODO: It is SVGAnimateElement but is not in TypeScript's lib.dom.d.ts for now.
	    animateMotion: React.SVGProps<SVGElement>;
	}
	
	// ...

}

// ...
```
<br>
<br>

## **2. 함수 컴포넌트(FC vs VFC), Props 타이핑**

`React`에 `FunctionComponent<P>` 타입을 사용해서 

컴포넌트 타입을 정의할 수 있다.

`FC<P>`라는 타입도 **type alias**로 정의되어 있는데

`FunctionComponent<P>` 타입을 그대로 할당해 정의한것이므로 동일하다.

```tsx
// @types/react/index.d.ts

// ...

export = React;
export as namespace React;

declare namespace React {
	
	// ...
	
	interface FunctionComponent<P = {}> {
    (props: P): ReactNode | Promise<ReactNode>;
    /**
     * Ignored by React.
     * @deprecated Only kept in types for backwards compatibility. Will be removed in a future major release.
     */
    propTypes?: any;
    /**
     * Used in debugging messages. You might want to set it
     * explicitly if you want to display a different name for
     * debugging purposes.
     *
     * @see {@link https://legacy.reactjs.org/docs/react-component.html#displayname Legacy React Docs}
     *
     * @example
     *
     * ```tsx
     *
     * const MyComponent: FC = () => {
     *   return <div>Hello!</div>
     * }
     *
     * MyComponent.displayName = 'MyAwesomeComponent'
     * ```
     */
    displayName?: string | undefined;
	}

	// ...
	
	
	type FC<P = {}> = FunctionComponent<P>;
	
	// ...
	
}

// ...
```

<br>
<br>

`React.FC<P>` 으로 컴포넌트 타입을 정의하고 제네릭으로 `Props`의 타입을 전달한다.

`Props`의 타입에 `children` 속성의 경우 `React.ReactNode` 타입으로 정의를 한다.

```tsx
// react.tsx

import React from 'react';
// ...

interface P{
  name: string;
  title: string;
  children?: React.ReactNode;
}

const WordRelay: React.FC<P> = (props: P) => {
		
		// ...
		
    return (
        <>
	        ...
        </>
      );
};

export default WordRelay;
```

<br>
<br>

`React.ReactNode` 타입의 경우 `@types/react/index.d.ts` 파일에서 

다음과 같이 **type alias**로 정의된 것을 볼 수 있다.

```tsx
// @types/react/index.d.ts

// ...

export = React;
export as namespace React;

declare namespace React {
	
	// ...
	
	type ReactNode =
	    | ReactElement
	    | string
	    | number
	    | bigint
	    | Iterable<ReactNode>
	    | ReactPortal
	    | boolean
	    | null
	    | undefined
	    | DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_REACT_NODES[
	        keyof DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_REACT_NODES
	    ]
	    | Promise<AwaitedReactNode>;
	    
	// ...
}

// ...
```
<br>
<br>

## **3. useState, useEffect 타이핑**

이번엔 `useState`, `useEffect` 훅의 타이핑을 분석해보도록 하자

### **3.1. useState 타이핑**

```tsx
// react.tsx

import React from 'react';
import { useState, useCallback, useRef } from 'react';

// ...

const WordRelay: React.FC<P> = (props: P) => {
    const [word, setWord] = useState<string>('제로초');
    
		// ...

    return (
        <>
					...
        </>
      );
};
```

<br>

전달받는 제네릭 `S`가 인자 `initialState`에 타입으로 설정되고 또는(`|`)   

콜백이 인자로 들어올 경우 해당 콜백 반환값 타입은 제네릭 `S`로 설정된다.   

<br>

그리고 `useState`의 반환값은 `[ S, Dispatch<A> ]` 로 설정된다.

```tsx
// @types/react/index.d.ts

// ...

export = React;
export as namespace React;

declare namespace React {
	
	// ...
	
	type SetStateAction<S> = S | ((prevState: S) => S);

	/**
	 * A function that can be used to update the state of a {@link useState}
	 * or {@link useReducer} hook.
	 */
	type Dispatch<A> = (value: A) => void;
	
	// ...
	
	function useState<S>(initialState: S | (() => S)): 
	[
		S, 
		Dispatch<SetStateAction<S>>
	];

}
```

<br>

### **3.2. useEffect 타이핑**

`useEffect()` 인자로 전달하는 콜백에 `async`를 적용하는 것은   

JavaScript인 jsx에서는 가능했지만 TypeScript인 tsx에는 아래와 같이 타입 에러가 출력된다.   

![useEffect.png](/images/section04/useEffect1.png)

이유는 다음과 같이 `useEffect` 첫 번째 인자로 들어오는 콜백 

`effect`의 타입으로 정의된 `EffectCallback` 타입이 `() => void | Destructor;`로 고정되어 있기 때문이다.   

`async`의 반환값은 따로 `return` 값이 없어도 무조건 `Promise`로 고정이기 때문에   

반환 값 타입으로 `Promise` 타입이 있어야 하기 때문이다.   

```tsx
// @types/react/index.d.ts

// ...

export = React;
export as namespace React;

declare namespace React {

	// ...
	
	type Destructor = () => void | { [UNDEFINED_VOID_ONLY]: never };
	
	// ...
	
	type DependencyList = readonly unknown[];
	
	// ...	
	
	type EffectCallback = () => void | Destructor;
	
	// ...
	
	function useEffect(effect: EffectCallback, deps?: DependencyList): void;	
	
	// ...

}

// ...
```

<br>

만약 `EffectCallback` 타입과 useEffect를 다음과 같이 정의하면

```tsx
type EffectCallback = <T>() => void | Destructor | Promise<T>;
```

```tsx
function useEffect<T>(effect: EffectCallback<T>, deps?: DependencyList): void;
```

<br>

아래와 같이 타입 에러가 출력되지 않는것을 볼 수 있다.

![useEffect2](/images/section04/useEffect2.png)

<br>

## **4. useCallback, useRef 타이핑**

이번엔 `useCallback`, `useRef` 훅의 타이핑을 분석해보도록 하자

### **4.1. useCallback 타이핑**

`@types/react/index.d.ts` 파일에 `useCallback` 타입이   

제네릭 `T`를 `Function`의 서브타입으로 제한하고    

첫번째 인자로 들어오는 `callback`의 타입을 제네릭 `T`로 설정,   

두번째 인자로 들어오는 배열을 `readonly unknown[]`로 설정하고   

반환값 타입은 제네릭 `T`로 설정해놓았다.   

```tsx
// @types/react/index.d.ts

// ...

export = React;
export as namespace React;

declare namespace React {

	// ...
	
	type DependencyList = readonly unknown[];
	
	// ...
	
	function useCallback<T extends Function>(callback: T, deps: DependencyList): T;
	
	// ...
}

// ...
```

<br>

`callback`에 들어오는 인자가 이벤트 객체일 경우 다음과 같이   

`React`에 정의된 이벤트 타입으로 타이핑을 할 수 있다.

```tsx
// react.tsx

// ...

useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
  console.log('useCallback');
}, []);

// ...
```

<br>

이벤트 타입의 경우 `SyntheticEvent<T>` 타입 구조를 상속받고   

제네릭 `T`를 전달받고 기본값으로 `Element`가 설정되어 있다.

```tsx
// @types/react/index.d.ts

// ...

export = React;
export as namespace React;

declare namespace React {

	// ...
	
    interface PointerEvent<T = Element> extends MouseEvent<T, NativePointerEvent> {
			// ...    
    }

    interface FocusEvent<Target = Element, RelatedTarget = Element> extends SyntheticEvent<Target, NativeFocusEvent> {
			// ...    
		}

    interface FormEvent<T = Element> extends SyntheticEvent<T> {
    }

    interface InvalidEvent<T = Element> extends SyntheticEvent<T> {
        target: EventTarget & T;
    }

    interface ChangeEvent<T = Element> extends SyntheticEvent<T> {
        target: EventTarget & T;
    }		
	
	// ...
}

// ...
```

<br>

### 4.2. useRef 타이핑

`useRef`의 타입의 경우 3가지가 정의되어 있다.(오버라이딩)   

제네릭으로 T를 전달받고 인자로 들어오는 초기값 initialValue의 타입을 제네릭 T로 설정하거나   

또는( `|` ) `null`, `undefined`로 타입을 설정한다.   

<br>

그리고 반환값으로 `useRef`의 반환객체 타입인 `RefObject<T>`로 설정되어있으며   

`RefObject<T>` 경우 제네릭 `T`를 `current` 속성에 타입으로 지정한다.

```tsx
// @types/react/index.d.ts

// ...

export = React;
export as namespace React;

declare namespace React {
	
	// ...
	
	interface RefObject<T> {
    /**
     * The current value of the ref.
     */
    current: T;
  }	

	// ...
		
	function useRef<T>(initialValue: T): RefObject<T>;
	
	function useRef<T>(initialValue: T | null): RefObject<T | null>;
	
	function useRef<T>(initialValue: T | undefined): RefObject<T | undefined>;
	
	// ...
}

// ...
```

<br>

반환값에 다음과 같이 타입이 지정된다.

```tsx
// react.tsx

const inputEl = useRef<HTMLInputElement>(null); 
// -> inputEl: React.RefObject<HTMLInputElement | null>
```


---