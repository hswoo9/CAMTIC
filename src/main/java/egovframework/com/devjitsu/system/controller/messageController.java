package egovframework.com.devjitsu.system.controller;

import egovframework.com.devjitsu.common.service.CommonService;
import egovframework.com.devjitsu.common.utiles.MailUtil;
import egovframework.com.devjitsu.gw.login.dto.LoginVO;
import egovframework.com.devjitsu.system.service.MessageService;
import net.sf.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.mail.MessagingException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class messageController {

    private static final Logger logger = (Logger) LoggerFactory.getLogger(messageController.class);

    @Autowired
    private MessageService messageService;

    @Autowired
    private CommonService commonService;

    @Value("#{properties['File.Server.Dir']}")
    private String SERVER_DIR;

    @Value("#{properties['File.Base.Directory']}")
    private String BASE_DIR;

    @Value("#{properties['Dev.Mail.SMTPServer']}")
    private String SMTPServer;

    @Value("#{properties['Dev.Mail.SMTPPort']}")
    private int SMTPPort;

    @Value("#{properties['Dev.Mail.SMTPID']}")
    private String SMTPID;

    @Value("#{properties['Dev.Mail.SMTPPW']}")
    private String SMTPPW;

    /** 문자함 */
    @RequestMapping("/message/message.do")
    public String menuManagement(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", login);
        return "system/message/message";
    }

    /** 문자이력 */
    @RequestMapping("/message/messageHistList.do")
    public String messageHistList(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", login);
        return "system/message/messageHistList";
    }

    /** 메일이력 */
    @RequestMapping("/message/mailHistList.do")
    public String mailHistList(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", login);
        return "system/message/mailHistList";
    }

    /** 문자 전송 팝업 */
    @RequestMapping("/system/pop/messageSendPop.do")
    public String messageSendPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", login);
        model.addAttribute("params", params);
        return "popup/system/message/messageSendPop";
    }

    /** 팩스 전송 팝업 */
    @RequestMapping("/system/pop/faxSendPop.do")
    public String faxSendPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", login);
        model.addAttribute("params", params);
        return "popup/system/message/faxSendPop";
    }

    /** 메일 전송 팝업 */
    @RequestMapping("/system/pop/mailReqPop.do")
    public String mailReqPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", login);
        model.addAttribute("params", params);
        return "popup/system/message/mailReqPop";
    }

    /** 주소등록 및 발송 팝업 */
    @RequestMapping("/system/pop/mailDetPop.do")
    public String mailDetPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", login);
        model.addAttribute("params", params);
        return "popup/system/message/mailDetPop";
    }


    /** 전화번호부 리스트 */
    @RequestMapping("/message/makeTreeView")
    public String makeTreeView(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        params.put("loginEmpSeq", loginVO.getUniqId());
        model.addAttribute("rs", messageService.getStringMenuList(params));
        return "jsonView";
    }

    /** 문자이력 리스트 */
    @RequestMapping("/message/getMessageHistList")
    public String getMessageHistList(@RequestParam Map<String, Object> params, Model model){
        List<Map<String, Object>> list = messageService.getMessageHistList(params);
        model.addAttribute("list", list);
        return "jsonView";
    }

    /** 메일이력 리스트 */
    @RequestMapping("/message/getMailHistList")
    public String getMailHistList(@RequestParam Map<String, Object> params, Model model){
        List<Map<String, Object>> list = messageService.getMailHistList(params);
        model.addAttribute("list", list);
        return "jsonView";
    }

    /** 메일이력 DATA */
    @RequestMapping("/message/getMailHistData")
    public String getMailHistData(@RequestParam Map<String, Object> params, Model model){
        Map<String, Object> data = messageService.getMailHistData(params);
        model.addAttribute("data", data);
        return "jsonView";
    }

    /** 메일주소 리스트 */
    @RequestMapping("/message/getMailDetList")
    public String getMailDetList(@RequestParam Map<String, Object> params, Model model){
        List<Map<String, Object>> list = messageService.getMailDetList(params);
        model.addAttribute("list", list);
        return "jsonView";
    }


    /** 문자 메세지 전송 */
    @RequestMapping("/message/sendMsg")
    public String sendMsg(@RequestBody Map<String, List<Map<String, Object>>> params, HttpServletRequest request, Model model){
        logger.info("문자 테스트" + params.toString());

        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        List<Map<String, Object>> messages = params.get("messages");
        for (int i = 0; i < messages.size(); i++) {

            Map<String, Object> message = messages.get(i);
            if (message.get("dest_phone") != null && !"".equals(message.get("dest_phone"))) {
                Map<String, Object> map = new HashMap<String, Object>();
                map.put("dest_phone", message.get("dest_phone"));
                map.put("msg_content", message.get("msg_content"));
                map.put("pkDate", message.get("pkDate"));
                map.put("callBack", message.get("callBack"));
                map.put("loginEmpSeq", loginVO.getUniqId());

                messageService.msgSend(map);
            }
        }

        Map<String, Object> resultMap = new HashMap<>();
        if (params != null) {
            model.addAttribute("code", "200");
            model.addAttribute("message", "메세지 전송이 완료되었습니다.");
        } else {
            model.addAttribute("code", "500");
            model.addAttribute("message", "메세지 전송에 실패하였습니다.");
        }

        return "jsonView";
    }


    /** 그룹 저장 */
    @RequestMapping("/message/setGroup")
    public String setGroup(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        params.put("loginEmpSeq", loginVO.getUniqId());
        messageService.setGroup(params);
        return "jsonView";
    }

    /** 그룹 수정 */
    @RequestMapping("/message/setGroupMod")
    public String setGroupMod(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        params.put("loginEmpSeq", loginVO.getUniqId());
        messageService.setGroupMod(params);
        return "jsonView";
    }

    /** 그룹 삭제 */
    @RequestMapping("/message/setGroupDel")
    public String setGroupDel(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        params.put("loginEmpSeq", loginVO.getUniqId());
        messageService.setGroupDel(params);
        return "jsonView";
    }

    /** 사용자 저장 */
    @RequestMapping("/message/setUser")
    public String setMenuUser(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        params.put("loginEmpSeq", loginVO.getUniqId());
        messageService.setUser(params);
        return "jsonView";
    }

    /** 사용자 수정 */
    @RequestMapping("/message/setUserMod")
    public String setUserMod(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        params.put("loginEmpSeq", loginVO.getUniqId());
        messageService.setUserMod(params);
        return "jsonView";
    }

    /** 사용자 삭제 */
    @RequestMapping("/textMessages/setUserDel")
    public String setMenuUserDel(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        params.put("loginEmpSeq", loginVO.getUniqId());
        messageService.setUserDel(params);
        return "jsonView";
    }

    /** 메일 저장 */
    @RequestMapping("/system/setMailHist")
    public String setMailHist(@RequestParam Map<String, Object> params, MultipartHttpServletRequest request, Model model){
        Map<String, Object> result = new HashMap<>();

        try {
            MultipartFile[] file = request.getFiles("file").toArray(new MultipartFile[0]);
            messageService.setMailHist(params, file, SERVER_DIR, BASE_DIR);
            result.put("mailHistSn", params.get("mailHistSn"));
            result.put("code", "200");
        } catch (ArithmeticException e) {
            System.out.println(e.getMessage());
            result.put("code", "500");
        }
        model.addAttribute("result", result);
        return "jsonView";
    }

    /** 메일 주소 저장 */
    @RequestMapping("/system/setMailDet")
    public String setMailDet(@RequestParam Map<String, Object> params, Model model) {
        try {
            messageService.setMailDet(params);
            params.put("code", "200");
        } catch (ArithmeticException e) {
            System.out.println(e.getMessage());
            params.put("code", "500");
        }
        model.addAttribute("params", params);
        return "jsonView";
    }


    /** 선택자 메일 전송 */
    @RequestMapping("/system/sendMailSel")
    public String sendMailSel(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) throws MessagingException, IOException {

        Map<String, Object> searchMap = new HashMap<>();
        searchMap.put("fileCd", "mailHist");
        searchMap.put("contentId", params.get("mailHistSn"));

        List<Map<String, Object>> fileArray = commonService.getFileList(searchMap);
        params.put("fileArray", fileArray);

        Map<String, Object> data = messageService.getMailHistData(params);
        params.put("receiveEml", data.get("SEND_EMAIL"));
        params.put("sendEml", data.get("SEND_EMAIL"));
        params.put("subject", data.get("MAIL_TILE"));
        params.put("contents", data.get("MAIL_CONTENT"));

        List<Map<String, Object>> list = messageService.getMailDetList(params);
        params.put("recipientList", list);

        /** 메일 */
        HttpServletRequest servletRequest = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        if(request.getServerName().contains("localhost") || request.getServerName().contains("127.0.0.1") || servletRequest.getServerName().contains("218.158.231.186")){
            params.put("fileServer", "http://218.158.231.186");
        } else{
            params.put("fileServer", "http://218.158.231.184");
        }

        MailUtil mailUtil = new MailUtil();
        params.put("mailType", "mailHist");

        mailUtil.orderSendMail(params, SMTPServer, SMTPPort, SMTPID, SMTPPW);
        model.addAttribute("rs", "SUCCESS");

        return "jsonView";
    }
}
