package egovframework.com.cmm.config;

import egovframework.com.devjitsu.gw.login.dto.LoginVO;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import javax.annotation.Resource;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Repository
public class WebSocketHandler extends TextWebSocketHandler {

    @Resource(name="sqlSessionTemplate")
    SqlSession sqlSession;

    private Map<String, WebSocketSession> users = new ConcurrentHashMap<>();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        String senderId = getMemberId(session);
        if(senderId != null){
            users.put(senderId, session);
        }
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        String senderId = getMemberId(session);

        String msg = message.getPayload();

        if(msg != null){
            String[] strs = msg.split(",");

            if(strs != null && strs.length == 5){
                String title = strs[0];
                String type = strs[1];
                String target = strs[2];
                String content = strs[3];
                String url = strs[4];
                WebSocketSession targetSession = users.get(target);

                if(targetSession!=null) {
                    Date date = new Date();
                    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
                    String sdfDate = sdf.format(date);
                    // ex: [&분의일] 신청이 들어왔습니다.
                    TextMessage tmpMsg = new TextMessage("<a target='_blank' href='"+ url +"'>[<b>" + title + "</b>] <br>" + sdfDate + "<br>" + type + "<br>" + content + "</a>" );
                    targetSession.sendMessage(tmpMsg);
                }
            }
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        super.afterConnectionClosed(session, status);
    }

    private String getMemberId(WebSocketSession session){
        Map<String, Object> httpSession = session.getAttributes();
        LoginVO loginVO = (LoginVO) httpSession.get("LoginVO");

        if(loginVO == null) {
            return session.getId();
        } else {
            return loginVO.getUniqId();
        }
    }
}
