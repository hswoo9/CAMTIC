package egovframework.com.devjitsu.system.controller;

import egovframework.com.devjitsu.gw.login.dto.LoginVO;
import egovframework.com.devjitsu.system.service.MessageService;
import net.sf.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class messageController {

    private static final Logger logger = (Logger) LoggerFactory.getLogger(messageController.class);

    @Autowired
    private MessageService messageService;

    /** 문자함 */
    @RequestMapping("/message/message.do")
    public String menuManagement(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", login);
        return "system/message/message";
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
}
