# json-script
[![Build Status](http://jenkins.thezoot3.kro.kr:8080/buildStatus/icon?job=json-script)](http://jenkins.thezoot3.kro.kr:8080/job/json-script/)
### 리액트 프로젝트를 위한 스크립트 라이브러리입니다.
### Script library for React project

## 스크립트 문법
### Script Grammar
`Example.json`
```json5
{
  "lang": ["ko", "en", "jp"], //언어 목록
  "presets": ["preset1", "preset2"], //프리셋을 설정합니다. 먼저오는 프리셋이 우선순위가 있습니다.
  "script": {
    "global": {
      "abc": "global" //이 스크립트는 언어에 영향을 받지 않습니다. 이 스크립트를 사용하려면 /g_abc으로 사용하면 됩니다.
    },
    "ko": { //언어
      "hello": "안녕하세요 ${userName}님!"
    },
    "en": {
      "hello": "Hello User ${userName}!"
    },
    "jp": {
      "hello": "おはようございます ${userName}!"
    }
  }
}
```
`preset1.json`
```json5
{
  "placeholder": {
    "characters": {
      "startWith": "${",
      "endWith": "}"
    },
    "allowsReactChild": true,
    "allowsFunction": false
  },
  "input": {
    "type": "object",
    "noWholeNoRender": false,
    "nonExistedValue": ""
  }
}

```
