package egovframework.com.devjitsu.cam_manager.controller;

import egovframework.com.devjitsu.cam_manager.service.CompanyCardService;
import egovframework.com.devjitsu.cam_project.controller.ProjectController;
import egovframework.com.devjitsu.cam_project.service.ProjectService;
import egovframework.com.devjitsu.gw.login.dto.LoginVO;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class CompanyCardController {

    private static final Logger logger = LoggerFactory.getLogger(CompanyCardController.class);

    @Autowired
    private CompanyCardService companyCardService;

    @Autowired
    private ProjectService projectService;

    @RequestMapping("/card/cardList.do")
    public String paymentList(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        session.setAttribute("menuNm", request.getRequestURI());

        model.addAttribute("loginVO", loginVO);

        if(loginVO == null){
            return "error/error";
        }

        return "cam_manager/companyCard/cardList";
    }

    @RequestMapping("/card/cardListMng.do")
    public String cardListMng(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        session.setAttribute("menuNm", request.getRequestURI());

        model.addAttribute("loginVO", loginVO);

        if(loginVO == null){
            return "error/error";
        }

        return "cam_manager/companyCard/cardListMng";
    }

    @RequestMapping("/card/outUseList.do")
    public String outUseList(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        session.setAttribute("menuNm", request.getRequestURI());

        model.addAttribute("loginVO", loginVO);

        if(loginVO == null){
            return "error/error";
        }

        return "cam_manager/companyCard/outUseList";
    }

    @RequestMapping("/card/cardUseList")
    public String cardUseList(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){

        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        
        params.put("empSeq", loginVO.getUniqId());

        List<Map<String, Object>> list = new ArrayList<>();
        list = companyCardService.cardUseList(params);

        model.addAttribute("list", list);

        return "jsonView";
    }

    @RequestMapping("/card/cardAllList")
    public String cardAllList(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){

        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        params.put("empSeq", loginVO.getUniqId());

        List<Map<String, Object>> list = new ArrayList<>();
        list = companyCardService.cardAllList(params);

        model.addAttribute("list", list);

        return "jsonView";
    }

    @RequestMapping("/card/cardToUseList")
    public String cardToUseList(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){

        List<Map<String, Object>> list = new ArrayList<>();
        list = companyCardService.cardToUseList(params);

        model.addAttribute("list", list);

        return "jsonView";
    }

    @RequestMapping("/card/getCardTOHistList")
    public String getCardTOHistList(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){

        model.addAttribute("list", companyCardService.getCardTOHistList(params));

        return "jsonView";
    }

    @RequestMapping("/card/statementList.do")
    public String statementList(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        session.setAttribute("menuNm", request.getRequestURI());

        model.addAttribute("loginVO", loginVO);

        if(loginVO == null){
            return "error/error";
        }

        return "cam_manager/companyCard/statementList";
    }

    @RequestMapping("/card/getCardTOData")
    public String getCardTOData(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){

        List<Map<String, Object>> list = new ArrayList<>();
        list = companyCardService.getCardTOData(params);

        model.addAttribute("list", list);

        return "jsonView";
    }

    @RequestMapping("/card/getCardTOData2")
    public String getCardTOData2(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){

        List<Map<String, Object>> list = new ArrayList<>();
        list = companyCardService.getCardTOData2(params);

        model.addAttribute("list", list);

        return "jsonView";
    }

    @RequestMapping("/card/regCardToPop.do")
    public String regCardToPop(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){

        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("params", params);
        model.addAttribute("loginVO", loginVO);
        return "popup/cam_manager/companyCard/regCardToPop";
    }

    @RequestMapping("/card/getCardToInfo")
    public String getCardToInfo(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){

        Map<String, Object> cardInfo = companyCardService.getCardToInfo(params);
        model.addAttribute("cardInfo", cardInfo);

        return "jsonView";
    }


    @RequestMapping("/card/getCardUseCheck")
    public String getCardUseCheck(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){

        int checkCnt = companyCardService.getCardUseCheck(params);
        model.addAttribute("checkCnt", checkCnt);

        return "jsonView";
    }
    @RequestMapping("/card/saveRegCardTo")
    public String saveRegCardTo(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        try{
            if(params.get("frKey").equals("")){
                params.put("frKey", null);
            }
            companyCardService.saveRegCardTo(params);
            model.addAttribute("params", params);
            model.addAttribute("code", 200);
        } catch(Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    @RequestMapping("/card/pop/regMeeting.do")
    public String regMeeting(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){

        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        if(params.containsKey("cardToSn")){
            Map<String, Object> cardMap = companyCardService.getCardToInfo(params);
            model.addAttribute("cardMap", cardMap);
            if(cardMap.get("PJT_CD") != null){
                params.put("PJT_CD", cardMap.get("PJT_CD"));
            }
        }

        Map<String, Object> pjtInfo = new HashMap<String, Object>();
        pjtInfo = projectService.getProjectCodeData(params);
        model.addAttribute("pjtInfo", pjtInfo);

        return "popup/cam_manager/companyCard/regMeeting";
    }

    @RequestMapping("/card/pop/cardToList.do")
    public String cardToList(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){

        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        return "popup/cam_manager/companyCard/cardToList";
    }

    @RequestMapping("/card/setMeetingData")
    public String setMeetingData(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){

        try{
            companyCardService.setMeetingData(params);
            model.addAttribute("code", 200);
        } catch(Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    @RequestMapping("/card/getMeetingList")
    public String getMeetingList(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        List<Map<String, Object>> list = companyCardService.getMeetingList(params);
        model.addAttribute("list", list);
        return "jsonView";
    }

    @RequestMapping("/card/getMeetingData")
    public String getMeetingData(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        Map<String, Object> data = companyCardService.getMeetingData(params);
        model.addAttribute("data", data);
        params.put("pjtCd", data.get("PJT_CD"));
        model.addAttribute("pjtInfo", projectService.getProjectByPjtCd(params));
        model.addAttribute("extData", companyCardService.getExtData(params));
        return "jsonView";
    }

    @RequestMapping("/card/updRegCardTo")
    public String updRegCardTo(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        try{
            companyCardService.updRegCardTo(params);
            model.addAttribute("code", 200);
        } catch(Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    @RequestMapping("/card/delCardTo")
    public String delCardTo(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        try{
            companyCardService.delCardTo(params);
            model.addAttribute("code", 200);
        } catch(Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    @RequestMapping("/card/delCardHist")
    public String delCardHist(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        try{
            companyCardService.delCardHist(params);
            model.addAttribute("code", 200);
        } catch(Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    @RequestMapping("/card/pop/cardToHist.do")
    public String cardToHist(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        return "popup/cam_manager/companyCard/cardToHistPop";
    }

    @RequestMapping("/card/setUseCardHist")
    public String setUseCardHist(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        try{
            companyCardService.setUseCardHist(params);
            model.addAttribute("code", 200);
        } catch(Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    @RequestMapping("/cam_mng/companyCard/useCardDetailPop.do")
    public String useCardDetailPop(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){

        Map<String, Object> cardInfo = companyCardService.useCardDetailInfo(params);
        model.addAttribute("cardInfo", cardInfo);

        return "popup/cam_manager/companyCard/useCardDetailPop";
    }

    @RequestMapping("/cam_mng/companyCard/useCardDetail")
    public String useCardDetail(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){

        Map<String, Object> cardInfo = companyCardService.useCardDetailInfo(params);
        model.addAttribute("cardInfo", cardInfo);

        return "jsonView";
    }

    @RequestMapping("/card/updCardFromDe")
    public String updCardFromDe(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){

        try{
            companyCardService.updCardFromDe(params);
            model.addAttribute("code", 200);
        } catch(Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    @RequestMapping("/card/cardPrivateMngPop.do")
    public String privateMngPop(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){

        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("params", params);
        model.addAttribute("loginVO", loginVO);
        return "popup/cam_manager/cardPrivateMngPop";
    }

    @RequestMapping("/card/cardPrivateUserPop.do")
    public String privateUserPop(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("params", params);
        model.addAttribute("loginVO", loginVO);
        return "popup/cam_manager/cardPrivateUserPop";
    }

    @RequestMapping("/card/cardUserGroupList.do")
    public String cardUserGroupList(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        session.setAttribute("menuNm", request.getRequestURI());

        model.addAttribute("loginVO", loginVO);

        return "cam_manager/companyCard/cardUserGroupList";
    }

    @RequestMapping("/card/cardUserGroupPop.do")
    public String cardUserGroupPop(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        if(!StringUtils.isEmpty(params.get("groupId"))){
            model.addAttribute("map", companyCardService.getCardUserGroupOne(params));
        }

        model.addAttribute("params", params);
        model.addAttribute("loginVO", loginVO);
        return "popup/cam_manager/companyCard/cardUserGroupPop";
    }

    @RequestMapping("/card/saveCardUserGroup")
    public String saveCardUserGroup(@RequestParam Map<String, Object> params, Model model){
        try{
            companyCardService.saveCardUserGroup(params);
            model.addAttribute("code", 200);
        } catch(Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }
    @RequestMapping("/card/saveCardUserGroupList")
    public String saveCardUserGroupList(@RequestParam Map<String, Object> params, Model model){
        try{
            companyCardService.saveCardUserGroupList(params);
            model.addAttribute("code", 200);
        } catch(Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    @RequestMapping("/card/saveCardUserGroupSel")
    public String saveCardUserGroupSel(@RequestParam Map<String, Object> params, Model model){
        try{
            companyCardService.saveCardUserGroupSel(params);
            model.addAttribute("code", 200);
        } catch(Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }
    @RequestMapping("/card/saveCardUserGroupSelCancle")
    public String saveCardUserGroupSelCancle(@RequestParam Map<String, Object> params, Model model){
        try{
            companyCardService.saveCardUserGroupSelCancle(params);
            model.addAttribute("code", 200);
        } catch(Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    @RequestMapping("/card/getCardUserGroup")
    public String getCardUserGroup(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){

        List<Map<String, Object>> list = new ArrayList<>();
        list = companyCardService.getCardUserGroup(params);

        model.addAttribute("list", list);

        return "jsonView";
    }

    @RequestMapping("/card/getcardUserGroupList")
    public String getcardUserGroupList(@RequestParam Map<String, Object> params, Model model){

        model.addAttribute("list", companyCardService.getcardUserGroupList(params));

        return "jsonView";
    }

    @RequestMapping("/card/getcardUserGroupSel")
    public String getcardUserGroupSel(@RequestParam Map<String, Object> params, Model model){

        model.addAttribute("list", companyCardService.getcardUserGroupSel(params));

        return "jsonView";
    }

    @RequestMapping("/card/delCardUserGroup")
    public String delCardUserGroup(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        try{
            companyCardService.delCardUserGroup(params);
            model.addAttribute("code", 200);
        } catch(Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    @RequestMapping("/card/delGroupUser")
    public String delGroupUser(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        try{
            companyCardService.delGroupUser(params);
            model.addAttribute("code", 200);
        } catch(Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    @RequestMapping("/card/setPrivateCard")
    public String setShowCard(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){

        try{
            companyCardService.setPrivateCard(params);
            model.addAttribute("code", 200);
        } catch(Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    @RequestMapping("/card/setCardManager")
    public String setCardManager(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){

        try{
            companyCardService.setCardManager(params);
            model.addAttribute("code", 200);
        } catch(Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    @RequestMapping("/card/setCardHolder")
    public String setCardHolder(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){

        try{
            companyCardService.setCardHolder(params);
            model.addAttribute("code", 200);
        } catch(Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    /** 카드권한관리 */
    @RequestMapping("/card/cardAuthMng.do")
    public String cardAuthMng(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        session.setAttribute("menuNm", request.getRequestURI());

        model.addAttribute("loginVO", loginVO);

        if(loginVO == null){
            return "error/error";
        }

        return "cam_manager/companyCard/cardAuthMng";
    }

    @RequestMapping("/card/getCardAuthList")
    public String getCardAuthList(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("list", companyCardService.getCardAuthList(params));
        return "jsonView";
    }

    @RequestMapping("/card/getCardAuthUserList")
    public String getCardAuthUserList(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("list", companyCardService.getCardAuthUserList(params));
        return "jsonView";
    }

    @RequestMapping("/card/setCardAuthData")
    public String setCardAuthData(@RequestParam Map<String, Object> params, Model model){
        try{
            companyCardService.setCardAuthData(params);
            model.addAttribute("code", 200);
        } catch(Exception e){
            e.printStackTrace();
        }
        return "jsonView";
    }

    @RequestMapping("/card/delCardAuthData")
    public String delCardAuthData(@RequestParam Map<String, Object> params, Model model){
        try{
            companyCardService.delCardAuthData(params);
            model.addAttribute("code", 200);
        } catch(Exception e){
            e.printStackTrace();
        }
        return "jsonView";
    }

    @RequestMapping("/card/setCardAuthUserData")
    public String setCardAuthUserData(@RequestParam Map<String, Object> params, Model model){
        try{
            companyCardService.setCardAuthUserData(params);
            model.addAttribute("code", 200);
        } catch(Exception e){
            e.printStackTrace();
        }
        return "jsonView";
    }

    @RequestMapping("/card/delCardAuthUserData")
    public String delCardAuthUserData(@RequestParam Map<String, Object> params, Model model){
        try{
            companyCardService.delCardAuthUserData(params);
            model.addAttribute("code", 200);
        } catch(Exception e){
            e.printStackTrace();
        }
        return "jsonView";
    }

    /**
     * 회의실사용사전승인신청서 전자결재 양식 페이지
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/cam_manager/pop/meetingApprovalPop.do")
    public String meetingApprovalPop(HttpServletRequest request, @RequestParam Map<String, Object> params, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        return "popup/cam_manager/approvalFormPopup/meetingApprovalPop";
    }

    /** 회의실사용사전승인신청서 결재 상태값에 따른 UPDATE 메서드 */
    @RequestMapping(value = "/card/meetingReqApp")
    public String meetingReqApp(@RequestParam Map<String, Object> bodyMap, Model model) {
        System.out.println("bodyMap");
        System.out.println(bodyMap);
        String resultCode = "SUCCESS";
        String resultMessage = "성공하였습니다.";
        try{
            companyCardService.updateMeetingDocState(bodyMap);
        }catch(Exception e){
            logger.error(e.getMessage());
            resultCode = "FAIL";
            resultMessage = "연계 정보 갱신 오류 발생("+e.getMessage()+")";
        }
        model.addAttribute("resultCode", resultCode);
        model.addAttribute("resultMessage", resultMessage);
        return "jsonView";
    }

    @RequestMapping("/card/getCardInfo")
    public String getCardInfo(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("data", companyCardService.getCardInfo(params));
        return "jsonView";
    }
}
