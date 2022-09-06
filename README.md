# json-script
### 리액트 프로젝트를 위한 스크립트 라이브러리입니다.
### Script library for React project

## 스크립트 문법
### Script Grammar
`Example.json`
```json5
{
  "lang": ["ko", "en", "jp"], //언어 목록
  "defaultLang": "ko", // 언어가 설정 되지 않았을 때 기본적으로 사용할 언어
  "defaultPresets": ['preset1'], // 스크립트 설정이 없을때 기본적으로 사용할 값을 설정합니다. 상속보다 우선 순위가 낮습니다.
  "script": {
    "ko": { //언어
      "hello": { //스크립트 이름
        "options": {
          "placeholder": {
            "characters": {
              "startWith": "${", //플레이스홀더가 시작되는 문자
              "endWith": "}" //플레이스홀더가 끝나는 문자
            },
            "allowsReactChild": true //플레이스홀더 내용으로 JSX를 넣을 수 있는지 여부를 설정합니다.
          },
        },
        "content": "안녕하세요 ${userName}님!"
      },
    },
    "en": {
      "hello": {
        "inherited": true, //이 옵션을 켜면 같은 스크립트 이름, 다른 언어의 설정을 가져옵니다. 다시 선언하여 덮어쓸 수 있습니다. 
        "content": "Hello User ${userName}!"
      },
    },
    "jp": {
      "hello": { //여기서는 어느것에서도 상속을 받지 않고 디폴드 플레이스홀더 값을 사용합니다.
        "content": "おはようございます ${userName}!" 
      }
    }
  }
}
```
