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
$tag.text(function (index) {
  console.log(this); 
  return true;
});
$tag.text().html(document);