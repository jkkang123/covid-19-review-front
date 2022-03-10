const path = require('path');
const model = require('./model');

const salt = require(path.join(__dirname, 'config', 'db.json'))
 .salt

const hashing = require(path.join(__dirname, 'config', 'hashing.js'))

const moment = require('moment');
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");

const nodeMailer = require('nodemailer');

const now_date = moment().format('YYYY-MM-DD HH:mm:ss');
/*
const mailPoster = nodeMailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'tori@ryanlab.kr',
    pass: '보내는 이 비번'
  }
});

const mailOpt = (user_data) => {
  const mailOptions = {
    from: 'tori@ryanlab.kr',
    to: 'tori@ryanlab.kr',
    subject: '테스트',
    text: '테스트입니다.'
  };

  return mailOptions;
}

// 메일 전송
const sendMail = (mailOption) => {
  mailPoster.sendMail(mailOption, function(error, info){
    if (error) {
      console.log('에러 ' + error);
    }
    else {
      console.log('전송 완료 ' + info.response);
    }
  });
}
*/
// 사용자 아이피 가져오기
const user_ip = require("ip");

  module.exports = {
    needs: () => upload,
    api : {
        sendPw : (req, res) => {

          const body = req.body;
          const hash = hashing.enc(body.id, body.password, salt)

          model.api.searchInfo(body, hash, result => {
          
            var obj = {};
            if(result[0]) {
                obj['suc'] = result[0].dataValues;
                obj['msg'] = '로그인 성공';
                obj['ip'] = user_ip.address();

              } else {
                obj['suc'] = false;
                obj['msg'] = '로그인 실패';
              }
              res.send(obj);
          })
        },
    },

    search : {
      id : (req, res) => {
        const body = req.body;

        model.search.id(body, result => {
          res.send(result)
        })
      },
      // 추가
      pw : (req, res) => {
        const body = req.body;

        model.search.pw(body, result => {
          /*
          if(result[0]) {
            // 조회되는 데이터가 있는 경우 (메일 전송)
            const mailOption = mailOpt(result[0].dataValues);
            sendMail(mailOption)
          }
          */
          res.send(result)
        })
      }
    },

    add : {
      board : (req, res) => {
        const body = req.body;

        model.add.board(body, result => {
          if(result) {
            res.send(true);
          }
        })
      },

      category : (req, res) => {
        const body = req.body;

        model.add.category(body, result => {
          var obj = {};
          if(result) {
              obj['suc'] = true;
              obj['msg'] = '카테고리가 생성되었습니다.';

            } else {
              obj['suc'] = false;
              obj['msg'] = '이미 있는 카테고리 입니다.';
            }
          
          res.send(obj)
        })
      },

      user : (req, res) => {
        const body = req.body;

        const hash_pw = hashing.enc(body.id, body.password, salt);
        
        model.add.user(body, hash_pw, now_date, result => {
          res.send(result);
        })
      }
    },

    update : {
      view_cnt : (req, res) => {
        const body = req.body;

        const expires = new Date()
        expires.setDate(expires.getDate() + 1)

        const cookie_name = 'board_' + body.id
        const exist_cookie = req.cookies[cookie_name]

        if(!exist_cookie) {
          res.cookie(cookie_name, true, {
            expires: expires
          });
          
          model.update.view_cnt(body, result => {
            if(result) {
              res.send(true);
            }
          })
        }
      }
    },

    delete : {
      category : (req, res) => {
        const body = req.body;

        model.delete.category(body, result => {
          if(result) {
            res.send(result);
          }
        })
      }
    },

    modify : {
      category : (req, res) => {
        const body = req.body;

        model.modify.category(body, result => {
          var obj = {};

          if(result) {
              obj['suc'] = true;
              obj['msg'] = '카테고리가 변경되었습니다.';

            } else {
              obj['suc'] = false;
              obj['msg'] = '이미 있는 카테고리 입니다.';
            }
          
          res.send(obj)
        })
      }
    },

    get : {
      board : (req, res) => {
        const body = req.body;
        
        model.get.board(body, result => {
          if(result) {
            res.send(result);
          }
        })
      },

      board_cnt : (req, res) => {
        const body = req.body;

        model.get.board_cnt(body, cnt => {
          const result = { cnt : cnt }
          res.send(result)
        })
      },

      board_data : (req, res) => {
        const body = req.body;

        model.get.board_data(body, data => {
          res.send(data)
        })
      },

      category : (req, res) => {

        model.get.category(data => {
          res.send(data)
        })
      }
    }
    
  }