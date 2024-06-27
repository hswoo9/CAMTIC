package egovframework.com.devjitsu.inside.interviewCard.controller;

import egovframework.com.devjitsu.gw.login.dto.LoginVO;
import egovframework.com.devjitsu.gw.user.service.UserService;
import egovframework.com.devjitsu.inside.interviewCard.service.InterviewCardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.jws.WebParam;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.text.SimpleDateFormat;
import java.util.*;

@Controller
public class InterviewCardController {

    @Autowired
    private UserService userService;

    @Autowired
    private InterviewCardService interviewCardService;

//   @RequestMapping("/Inside/setInterviewTitle.do")
//    public String setInterviewTitle(@RequestParam Map<String, Object> params){
//       interviewCardService.setInterviewTitle(params);
//       return "jsonView";
//   }
    @RequestMapping(value = "/Inside/setInterviewTitle.do", method = RequestMethod.POST)
      public String setInterviewTitle(@RequestParam Map<String, Object> params){
        interviewCardService.setInterviewTitle(params);
        return "jsonView";
}
    @RequestMapping(value = "/Inside/getTopicList.do", method = RequestMethod.GET)
    public String getTopicList(@RequestParam Map<String, Object> params, Model model){
        List<Map<String, Object>> list = interviewCardService.getTopicList(params);
        model.addAttribute("list", list);
        return "jsonView";
    }

    @RequestMapping(value= "/Inside/setInterviewContent.do", method = RequestMethod.POST)
    public String setInterviewContent(@RequestParam Map<String, Object> params){
        interviewCardService.setInterviewContent(params);
        return "jsonView";
    }

    @RequestMapping(value= "/Inside/setInterviewContent2.do", method = RequestMethod.POST)
    public String setInterviewContent2(@RequestParam Map<String, Object> params){
        interviewCardService.setInterviewContent2(params);
        return "jsonView";
    }

    @RequestMapping(value = "/Inside/employeeInterviewCard.do", method = RequestMethod.POST)
    public String getInterviewCardList(@RequestParam Map<String,Object> params, Model model) {
        List<Map<String, Object>> list = interviewCardService.getInterviewCardList(params);
        System.out.println("====컨트롤러 탔다 ====");
        model.addAttribute("list", list);
        System.out.println("================================");
        System.out.println(model.addAttribute("list", list));
        System.out.println("================================");
        return "jsonView";
    }

    @RequestMapping(value = "/Inside/getInterviewDetail.do",method = RequestMethod.POST)
    public String getInterviewDetail(@RequestParam Map<String, Object> params, Model model){
        List<Map<String, Object>> list = interviewCardService.getInterviewDetail(params);
        model.addAttribute("list", list);
        return "jsonView";
    }

    @RequestMapping(value = "/Inside/getInterviewCardByEmpSeq.do", method = RequestMethod.POST)
    public String getInterviewCardByEmpSeq(@RequestParam Map<String, Object> params, Model model){
        List<Map<String, Object>> list = interviewCardService.getInterviewCardByEmpSeq(params);
        model.addAttribute("list", list);
        return "jsonView";
    }



}


