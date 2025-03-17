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

