# bitcoin-wallet
비트코인 월렛 만들기 토큰 전송에 대한 레포지터리 ( feat. BlockCypher API )

## 로컬 도커 컴포즈 실행 ( Node 및 Mongo 도커 실행 )
```
 ./start.sh
```

## 도커 이미지 및 다운로드 삭제
```
 ./stop.sh
```

## Develop 브랜치 Push 시 Github Action 실행
  - Step1. Docker Build
  - Step2. Push to AWS ECR
  - Step3. ECS 컨테이너 배포
  
## Document API Docs
  - https://documenter.getpostman.com/view/6131901/SzS1UUNB?version=latest

## API 서버 Endpoint
  - http://token-asset-alb-1399262277.ap-northeast-2.elb.amazonaws.com
