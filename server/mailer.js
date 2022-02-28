// nodemailer 참고문서 https://velog.io/@nemo/nodemailer
// 윈도우 & 맥 구분되어서 패스워드가 따로 발급되던데 테스트로 맥만 해봄.
// 윈도우 키 = ltecdvuvovwsanmr
// 맥 키 = jimtxkqeynvjklis

/* 
2. 환경 변수 생성
루트 경로에 .env 파일을 생성한 후 아래와 같이 환경 변수를 작성한다. 
환경 변수를 사용하는 이유는, 민감한 개인 정보를 여기에 담아두고 배포 시 공개되지 않도록 하기 위함이다.
=> 라고 적혀있는데 정확히 뭘 어떻게 하라는지 모르겠음. 
그래서 그냥 REACT_APP_GMAIL_ADDRESS, REACT_APP_GMAIL_PASSWORD 여기에 적음
*/

const nodeMailer = require('nodemailer')

module.exports = async (name, email, subject, message) => {
  const transporter = await nodeMailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com', // gmail server
    port: 587,
    secure: false,
    auth: {
      user: process.env.REACT_APP_GMAIL_ADDRESS,
      pass: process.env.REACT_APP_GMAIL_PASSWORD,
    }
  });

  const mailOption = {
    from: name,
    to: process.env.REACT_APP_GMAIL_ADDRESS,
    subject: subject,
    html: 
      `You got a message from <br /> 
      Email : ${email} <br />
      Name: ${name} <br />
      Message: ${message}`,
  };

  try {
    await transporter.sendMail(mailOption);
    return "success"
  } catch (error) {
    return error
  }
}