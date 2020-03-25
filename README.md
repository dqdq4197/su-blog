# Su_blog
> 웹/모바일을 지원하는 개발자들을 위한 블로그입니다. 여러분의 개발 지식과 여러가지 정보들을 이 블로그를 통해 공유해보세요!
> > As a web/mobile developer, you can start a blog to share your knowledge with others who want to make big in this industry.

__demo: [Sublog][<https://sublog.co>]__

> 기능 : 로그인(local)/소셜로그인(Oouth), 회원가입, 포스트 마크다운(image,embed,코드 highlight, codepen.io 불러오기),포스트 등록(해시태그, 썸네일, 카테고리, 공개/비공개 설정), 포스트 설정(좋아요, 수정, 삭제, 페이스북 공유, 주소복사, 댓글 ), 해시태그 검색, 포스트 검색, 프로필 설정(보유 기술, 소개글, 소셜정보, 프로필 사진 설정)

### FrontEnd
- React Hooks
- markdownEditor(editorjs)

### Ui-Design  
+ semantic-ui-react
+ styled-components
+ @material-ui

### 상태관리 (state)
- Redux + immer + thunk

### BackEnd
- Nodejs + Mysql
- DB ORM (sequelize사용)
- passport를 이용한 로그인 구현 (local + Oouth)
- 회원가입 인증메일 (nodemailer)

### 인프라(배포) + 보안
- aws ec2 -> ubuntu운영체제 -> nginx서버 
- aws router53 도메인 연결 
- aws s3 multer 프로필/포스트이미지 저장 (람다 함수 적용)
- Let’s encrypt  certbot -> ssl + https 
- 암호화 설정하기 (디피 헬만 그룹, HSTS )



