package egovframework.com.devjitsu.common.utiles;


import org.apache.commons.lang3.text.StrSubstitutor;
import org.springframework.util.StringUtils;

import javax.activation.DataHandler;
import javax.activation.DataSource;
import javax.activation.FileDataSource;
import javax.mail.*;
import javax.mail.internet.*;
import javax.mail.util.ByteArrayDataSource;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.net.URLConnection;
import java.util.List;
import java.util.Map;
import java.util.Properties;

public class MailUtil {

    public void sendMail(Map<String, Object> params, String SMTPServer, int SMTPPort, String SMTPID, String SMTPPW) throws AddressException, MessagingException {
        String host = SMTPServer;
        int port = SMTPPort;

        String email = SMTPID;
        String password = SMTPPW;

        String recipient = "anhan0804@dev-jitsu.com";
        String subject = "TEST";
        String contents = "내용";

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

    public void orderSendMail(Map<String, Object> params, String SMTPServer, int SMTPPort, String SMTPID, String SMTPPW) throws MessagingException, IOException {
        String host = SMTPServer;
        int port = SMTPPort;

        String email = SMTPID;
        String password = SMTPPW;

        String recipient = params.get("receiveEml").toString();     // 수신자
        InternetAddress[] recipientArr = new InternetAddress[0];

        if(params.containsKey("mailType") && params.get("mailType").equals("estimate")) {
            recipientArr = new InternetAddress[2];
            recipientArr[0] = new InternetAddress(params.get("receiveEml").toString());
            recipientArr[1] = new InternetAddress(params.get("sendEml").toString());
        } else {
            recipientArr = new InternetAddress[3];
            recipientArr[0] = new InternetAddress(params.get("receiveEml").toString());
            recipientArr[1] = new InternetAddress(params.get("sendEml").toString());
            recipientArr[2] = new InternetAddress(params.get("purcEml").toString());
        }

        String sender = params.get("sendEml").toString();           // 발신자
        String subject = params.get("subject").toString();          // 제목
        String contents = params.get("contents").toString();        // 내용

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

        Session session = Session.getDefaultInstance(props);

        //MimeMessage 생성 & 메일 세팅
        Message mimeMessage = new MimeMessage(session);
        mimeMessage.setFrom(new InternetAddress(sender)); // 발신자

        // 내용 + 첨부파일 저장할 MimeMultipart 생성
        MimeMultipart multipart = new MimeMultipart();

        // 내용 저장할 MimeBodyPart 생성 후 내용 데이터 세팅
        MimeBodyPart contBodyPart = new MimeBodyPart();
        contBodyPart.setText(contents);

        // MimeMultipart에 내용 저장
        multipart.addBodyPart(contBodyPart);

        // 첨부파일 저장할 MimeBodyPart 생성 후 첨부파일 데이터 세팅
        List<Map<String, Object>> fileList = (List<Map<String, Object>>) params.get("fileArray");
        if(!StringUtils.isEmpty(fileList)){
            for(Map<String, Object> file : fileList){
                // MimeMultipart 생성
                MimeBodyPart fileBodyPart = new MimeBodyPart();

                String fileUrlString = params.get("fileServer").toString() + file.get("file_path").toString() + file.get("file_uuid");
                URL fileUrl = new URL(fileUrlString);
                URLConnection connection = fileUrl.openConnection();
                InputStream inputStream = connection.getInputStream();

                DataSource source = new ByteArrayDataSource(inputStream, "application/octet-stream");
                fileBodyPart.setDataHandler(new DataHandler(source));

                String fileName = file.get("file_org_name") + "." + file.get("file_ext");
                fileBodyPart.setFileName(MimeUtility.encodeText(fileName, "UTF-8", "B"));

                // MimeMultipart에 첨부파일 저장
                multipart.addBodyPart(fileBodyPart);
            }
        }

        /** 다중 보낼때
         * recipient 에 스트링 배열
         mimeMessage.addRecipients(Message.RecipientType.TO, new InternetAddress(recipient));
         */
        mimeMessage.addRecipients(Message.RecipientType.TO, recipientArr);

        mimeMessage.setSubject(subject); // 제목
        mimeMessage.setContent(multipart, "text/html; charset=utf-8"); // 내용

        Transport transport = session.getTransport("smtp");
        transport.connect(host, "", "");
        transport.sendMessage(mimeMessage, mimeMessage.getAllRecipients());
        transport.close();
//        Transport.send(mimeMessage);

    }

    public void mailHistSendMail(Map<String, Object> params, String SMTPServer, int SMTPPort, String SMTPID, String SMTPPW) throws MessagingException, IOException {
        String host = SMTPServer;
        int port = SMTPPort;

        String email = SMTPID;
        String password = SMTPPW;

        String recipient = params.get("receiveEml").toString();     // 수신자
        InternetAddress[] recipientArr = new InternetAddress[0];

        /*List<Map<String, Object>> list = (List<Map<String, Object>>) params.get("recipientList");
        recipientArr = new InternetAddress[list.size()];
        for(int i=0; i<list.size(); i++){
            recipientArr[i] = new InternetAddress(list.get(i).get("EMAIL").toString());
        }*/
        recipientArr = new InternetAddress[1];
        recipientArr[0] = new InternetAddress(params.get("receiveEml").toString());

        String sender = params.get("sendEml").toString();           // 발신자
        String subject = params.get("subject").toString();          // 제목
        String contents = params.get("contents").toString();        // 내용

        String mailTmp = "<!DOCTYPE html>\n" +
                "<html lang = \"kr\">\n" +
                "<head>\n" +
                "   <meta charset=\"UTF-8\" name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n" +
                "   <title>mail</title>\n" +
                "   <style>\n" +
                "       .back{\n" +
                "           background-color:#FFFFFF;\n" +
                "       }\n" +
                "       .content{\n" +
                "           background-color:#FFFFFF;\n" +
                "           width:auto;\n" +
                "           margin:50px;\n" +
                "           padding-left:10%;\n" +
                "           font-size:2vw;\n" +
                "       }\n" +
                "   </style>\n" +
                "</head>\n" +
                "<body>\n" +
                "   <div class=\"back\">\n" +
                "       <div class=\"content\">\n" + contents +
                "       </div>\n" +
                "   </div>\n" +
                "</body>\n" +
                "</html>\n";

        // SMTP 서버 설정 정보 세팅
        Properties props = System.getProperties();

        // smtp 서버
        props.put("mail.smtp.host", host);

        // smtp 포트
        props.put("mail.smtp.port", port);
        props.put("mail.debug", "true");

        Session session = Session.getDefaultInstance(props);

        //MimeMessage 생성 & 메일 세팅
        Message mimeMessage = new MimeMessage(session);
        mimeMessage.setFrom(new InternetAddress(sender)); // 발신자

        /** 다중 보낼때
         * recipient 에 스트링 배열
         mimeMessage.addRecipients(Message.RecipientType.TO, new InternetAddress(recipient));
         */
        mimeMessage.addRecipients(Message.RecipientType.TO, recipientArr);

        mimeMessage.setSubject(subject); // 제목
        mimeMessage.setContent(mailTmp, "text/html; charset=utf-8"); // 내용

        Transport transport = session.getTransport("smtp");
        transport.connect(host, "", "");
        transport.sendMessage(mimeMessage, mimeMessage.getAllRecipients());
        transport.close();
//        Transport.send(mimeMessage);

    }

    private String changeContents(Map<String, Object> param, String formatString) throws Exception{
        StrSubstitutor sub = new StrSubstitutor(param);
        return sub.replace(formatString);
    }
}
