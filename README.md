# Su_blog
> 웹/모바일을 지원하는 개발자들을 위한 블로그입니다. 여러분의 개발 지식과 여러가지 정보들을 이 블로그를 통해 공유해보세요!
>> As a web/mobile developer, you can start a blog to share your knowledge with others who want to make big in this industry.

  배포 후 최근 코드는 다음 Repository에서 확인하실 수있습니다.<br/>
  client: https://github.com/dqdq4197/su_blog-client 
  <br/>
  server: https://github.com/dqdq4197/su_blog-server 


Su_blog 주요 기능은 다음과 같습니다.

1. 글 작성 · 편집
    - 다양한 편집 기능이 있는 마크다운 편집기를 제공합니다.
    - 나만 보기, 썸네일 지정, 태그 작성 등 더 많은 부가적인 기능을 제공합니다.
2. 내 정보 및 설정
    - 다른 사용자에게 "나"를 표현할 수 있도록 설정 기능을 제공합니다.
    - 프로필 사진, 소셜 정보, 소개 글, 기술 스택 등 작성 할 수 있습니다.
3. 키워드 또는 태그 검색
    - 흥미 있는 키워드를 검색하여 제목 또는 내용에 일치하는 유사한 글들을 보여줍니다.
    - 태그 검색을 통해 같은 관심사를 가진 글들을 모아 볼 수 있습니다.
4. 작성 글 보기
    - 다른 작성자 혹은 내가 작성한 글을 마크다운 편집기로 작성한 UI로 볼 수 있습니다.
    - 코드의 경우 syntax highlighter를 통해 가독성 좋게 제공합니다.
    - 글 좋아요, 페이스북 공유, 주소 복사, 글 삭제, 댓글 작성 등 부가적인 기능을 제공합니다.
5. 사용자 편의성 기능
    - 모바일로도 볼 수 있도록 반응형 웹으로 개발되었습니다.
    - 많은 글을 볼 수 있는 피드의 경우 무한 스크롤링으로 개발되었습니다.
    - 회원 가입시 메일인증을 통해 손쉽게 가입이 가능합니다.
    - ~~로컬 로그인뿐만 아니라 소셜 로그인(카카오, 페이스북)을 제공합니다.~~ ( ssl을 적용하는 동시에 제공 예정입니다. )

## Su_blog 사용하기

현재 [sublog](http://www.sublog.co) 웹 사이트를 통해 확인하실 수 있습니다. 
```
// 기능 테스트를 위한 테스터 계정입니다.

email: test@sublog.co
password: test
```
## 프로젝트 스택

### Client
다음 항목은 이 프로젝트에 사용된 핵심 프론트엔드 기술입니다.
- React Hooks
- Redux + thunk
- semantic-ui-react
- styled-components
- Editorjs (MarkdownEditor)

### Server
다음 항목은 이 프로젝트에 사용된 핵심 백엔드 기술입니다.
- Nodejs 
- Express
- Mysql
- DB ORM (Sequelize)
- Passport를 이용한 로그인 구현 (local + Oouth)
- nodemailer
- Aws S3

### Deploy
다음 항목은 이 프로젝트를 배포하는데 사용된 기술입니다.
- Aws ec2 - ubuntu운영체제 
- nginx 
- Aws router53 
- Docker
- ~~Let’s encrypt  certbot -> ssl~~ 