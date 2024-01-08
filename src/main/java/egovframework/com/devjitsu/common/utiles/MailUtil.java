package egovframework.com.devjitsu.common.utiles;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailMessage;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Properties;

public class MailUtil {

    public void sendMail(String SMTPServer, int SMTPPort, String SMTPID, String SMTPPW) throws AddressException, MessagingException {

        String host = SMTPServer;
        int port = SMTPPort;

        String email = SMTPID;
        String password = SMTPPW;

        String recipient = "anhan0804@naver.com";
        String subject = "TEST";
        String contents = "내용";

        // SMTP 서버 설정 정보 세팅
        Properties props = System.getProperties();
        // smtp 서버
        props.put("mail.smtp.host", host);
        // smtp 포트
        props.put("mail.smtp.port", port);
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.ssl.enable", "true");
        props.put("mail.smtp.ssl.trust", host);


        Session session = Session.getInstance(props,  new javax.mail.Authenticator() {
            protected javax.mail.PasswordAuthentication getPasswordAuthentication() {
                return new javax.mail.PasswordAuthentication(email, password);
            }
        });

        session.setDebug(true);

        //MimeMessage 생성 & 메일 세팅
        Message mimeMessage = new MimeMessage(session);
        mimeMessage.setFrom(new InternetAddress(email)); // 발신자
        mimeMessage.setRecipient(Message.RecipientType.TO, new InternetAddress(recipient));

        mimeMessage.setSubject(subject); // 제목
        mimeMessage.setText(contents); // 내용


        Transport.send(mimeMessage);
    }
}
