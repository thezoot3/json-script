export NPM_USERNAME=thezoot3
export NPM_PASSWORD=${GPTHEZOOT3TOKEN}
export NPM_EMAIL=myEmail
/usr/bin/expect <<EOD
spawn npm adduser -scope=@thezoot3 --registry=https://npm.pkg.github.com
expect {
  "Username:" {send "$NPM_USERNAME\r"; exp_continue}
  "Password:" {send "$NPM_PASSWORD\r"; exp_continue}
  "Email: (this IS public)" {send "$NPM_EMAIL\r"; exp_continue}
}
EOD
