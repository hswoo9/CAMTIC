package egovframework.com.devjitsu.common.utiles;


import javax.activation.DataHandler;
import javax.activation.FileDataSource;
import javax.mail.*;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import java.io.File;
import java.util.Map;
import java.util.Properties;

public class MailUtil {

    public void sendMail(Map<String, Object> params, String SMTPServer, int SMTPPort, String SMTPID, String SMTPPW) throws AddressException, MessagingException {
        String host = SMTPServer;
        int port = SMTPPort;

        String email = SMTPID;
        String password = SMTPPW;

//        String recipient = "anhan0804@dev-jitsu.com";
//        String subject = "TEST";
//        String contents = "내용";

        String recipient = params.get("receiveEml").toString();
        String subject = params.get("subject").toString();
        String contents = params.get("contents").toString();

        // SMTP 서버 설정 정보 세팅
        Properties props = System.getProperties();
        // smtp 서버
        props.put("mail.smtp.host", host);
//        props.put("mail.transport.protocol", "smtp");
        // smtp 포트
        props.put("mail.smtp.port", port);
        props.put("mail.debug", "true");
//        props.put("mail.smtp.auth", "false");
//        props.put("mail.smtp.starttls.enable", "false");
//        props.put("mail.smtp.ssl.trust", host);


//        Session session = Session.getInstance(props,  new javax.mail.Authenticator() {
//            protected javax.mail.PasswordAuthentication getPasswordAuthentication() {
//                return new javax.mail.PasswordAuthentication(email, password);
//            }
//        });
//
//        session.setDebug(true);

        Session session = Session.getDefaultInstance(props);

        //MimeMessage 생성 & 메일 세팅
        Message mimeMessage = new MimeMessage(session);
        mimeMessage.setFrom(new InternetAddress(email)); // 발신자

        File file = new File("");
        FileDataSource fds = new FileDataSource(file.getAbsolutePath());

        mimeMessage.setDataHandler(new DataHandler(fds));
        mimeMessage.setFileName(file.getName());

        /** 다중 보낼때
         * recipient 에 스트링 배열
         mimeMessage.addRecipients(Message.RecipientType.TO, new InternetAddress(recipient));
         */
        mimeMessage.addRecipient(Message.RecipientType.TO, new InternetAddress(recipient));

        mimeMessage.setSubject(subject); // 제목
        mimeMessage.setContent(contents, "text/html; charset=utf-8"); // 내용

        Transport transport = session.getTransport("smtp");
        transport.connect(host, "", "");
        transport.sendMessage(mimeMessage, mimeMessage.getAllRecipients());
        transport.close();
//        Transport.send(mimeMessage);

    }
}
