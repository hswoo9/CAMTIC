package egovframework.com.devjitsu.cam_achieve.controller;


import egovframework.com.devjitsu.cam_achieve.service.AchieveService;
import egovframework.com.devjitsu.cam_project.service.ProjectService;
import egovframework.com.devjitsu.cam_purc.service.PurcService;
import egovframework.com.devjitsu.g20.service.G20Service;
import egovframework.com.devjitsu.gw.dept.service.DeptService;
import egovframework.com.devjitsu.gw.login.dto.LoginVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class AchieveController {


    @Autowired
    private AchieveService achieveService;

    @Autowired
    private DeptService deptService;

    @Autowired
    private ProjectService projectService;

    @Autowired
    private G20Service g20Service;

    @Autowired
    private PurcService purcService;


    @RequestMapping("/cam_achieve/getRecordTotal.do")
    public String getRecordTotal(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request) {

        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        session.setAttribute("menuNm", request.getRequestURI());
        model.addAttribute("loginVO", loginVO);

        return "cam_achieve/recordTotal";
    }

    /**
     * 캠어취브 > 재무성과(팀별)
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/cam_achieve/finPerm.do")
    public String finPerm(@RequestParam Map<String, Object> params, Model model) {
        return "cam_achieve/finPerm";
    }

    /**
     * 캠어취브 > 주간회의 (부서)
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/cam_achieve/weekMeet.do")
    public String weekMeet(@RequestParam Map<String, Object> params, Model model) {

        params.put("deptLevel", "1");
        List<Map<String, Object>> list = deptService.getDeptAList(params);

        model.addAttribute("list", list);
        
        return "cam_achieve/weekMeet";
    }

    @RequestMapping("/cam_achieve/popObjSetting.do")
    public String popObjSetting(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        params.put("deptLevel", "1");
        List<Map<String, Object>> list = new ArrayList<>();
        if(achieveService.getDeptObjList(params).size() > 0){
            list = achieveService.getDeptObjList(params);
            params.put("type", "upd");
        } else {
            list = deptService.getDeptAList(params);
            params.put("type", "ins");
        }
        model.addAttribute("loginVO", loginVO);
        model.addAttribute("list", list);
        model.addAttribute("params", params);
    	return "popup/cam_achieve/popObjSetting";
    }

    @RequestMapping("/achieve/insDeptObjSetting")
    public String insDeptObjSetting(@RequestParam Map<String, Object> params, Model model) {
        achieveService.insDeptObjSetting(params);
        model.addAttribute("code", 200);
        return "jsonView";
    }


    @RequestMapping("/cam_achieve/monMeet.do")
    public String monMeet(@RequestParam Map<String, Object> params, Model model) {

        return "cam_achieve/monMeet";
    }

    @RequestMapping("/cam_achieve/getAllPjtCalc")
    public String getAllPjtCalc(@RequestParam Map<String, Object> params, Model model) {

        Map<String, Object> map = new HashMap<>();

        map = achieveService.getAllPjtCalc(params);

        model.addAttribute("map", map);
        return "jsonView";
    }

    @RequestMapping("/cam_achieve/getEngnList")
    public String getEngnList(@RequestParam Map<String, Object> params, Model model) {
    	List<Map<String, Object>> list = new ArrayList<>();

        list = achieveService.getEngnList(params);

    	model.addAttribute("list", list);
    	return "jsonView";
    }

    @RequestMapping("/cam_achieve/getEngnDeptData")
    public String getEngnDeptData(@RequestParam Map<String, Object> params, Model model) {

        model.addAttribute("ls", achieveService.getEngnDeptData(params));
        model.addAttribute("saleLs", achieveService.getSaleByDeptData(params));
        model.addAttribute("objLs", achieveService.getDeptObjList(params));
        return "jsonView";
    }

    @RequestMapping("/cam_achieve/getProjectList")
    public String getProjectList(@RequestParam Map<String, Object> params, Model model) {

        List<Map<String, Object>> list = new ArrayList<>();

        if(params.get("manageYn") != null) {
            list = projectService.getDepoManageProjectList(params);
        }else {
            list = projectService.getProjectList(params);
        }

        for(Map<String, Object> map : list) {

            params.put("pjtCd", map.get("PJT_CD"));
            params.put("pjtSn", map.get("PJT_SN"));

            if("R".equals(map.get("BUSN_CLASS")) || "S".equals(map.get("BUSN_CLASS"))) {
                List<Map<String, Object>> exnpList = achieveService.getExnpCompAmt(params);
                List<Map<String, Object>> incpList = achieveService.geincpCompAmt(params);

                int aSum = 0;
                int bSum = 0;

                int cSum = 0;
                int dSum = 0;
                for(Map<String, Object> exnpMap : exnpList) {
                    if("2".equals(exnpMap.get("PAY_APP_TYPE"))) {
                        bSum += Integer.parseInt(exnpMap.get("TOT_COST").toString());
                    } else{
                        aSum += Integer.parseInt(exnpMap.get("TOT_COST").toString());
                    }
                }
                map.put("exnpCompAmt", aSum-bSum);

                for(Map<String, Object> incpMap : incpList) {
                    if("2".equals(incpMap.get("PAY_APP_TYPE"))) {
                        dSum += Integer.parseInt(incpMap.get("TOT_COST").toString());
                    } else{
                        cSum += Integer.parseInt(incpMap.get("TOT_COST").toString());
                    }
                }
                map.put("incpCompAmt", cSum-dSum);

                List<Map<String, Object>> budgetAmtList = g20Service.getG20BudgetSum(params);

                long budgetAmt = 0;
                if(budgetAmtList.size() != 0){
                    for(Map<String, Object> budgetMap : budgetAmtList) {
                        if("1".equals(budgetMap.get("DRCR_FG"))) {
                            budgetAmt = Long.parseLong(budgetMap.get("TOT_COST").toString().split("\\.")[0]);
                        }
                    }
                }

                map.put("tmpSaleAmt", budgetAmt - Long.parseLong(map.get("exnpCompAmt").toString()));
                map.put("tmpProfitAmt", budgetAmt - Long.parseLong(map.get("incpCompAmt").toString()));
            } else {

                Map<String, Object> resultStat = achieveService.getResultProject(params);
                List<Map<String, Object>> purcList = purcService.getPurcReqClaimList(params);
                if(resultStat != null){
                    int resInvSum = 0;
                    map.put("exnpCompAmt", map.get("PJT_AMT"));

                    for(Map<String, Object> purcMap : purcList) {
                        if("CAYSY".equals(purcMap.get("CLAIM_STATUS"))){
                            resInvSum += Double.parseDouble(purcMap.get("PURC_ITEM_AMT_SUM").toString());
                        }
                    }
                    map.put("incpCompAmt", resInvSum);

                    map.put("tmpSaleAmt", 0);
                    map.put("tmpProfitAmt", 0);
                } else {
                    map.put("exnpCompAmt", 0);
                    map.put("incpCompAmt", 0);

                    Map<String, Object> getPjtDevSn = achieveService.getPjtDevSn(params);

                    if(getPjtDevSn != null) {
                        params.put("devSn", getPjtDevSn.get("DEV_SN"));
                        List<Map<String, Object>> invList = projectService.getInvList(params);

                        int invSum = 0;
                        for(Map<String, Object> invMap : invList) {
                            invSum += Integer.parseInt(invMap.get("EST_TOT_AMT").toString());
                        }
                        map.put("tmpSaleAmt", map.get("PJT_AMT"));
                        map.put("tmpProfitAmt", Integer.parseInt(map.get("PJT_AMT").toString()) - invSum);
                    } else {
                        map.put("tmpSaleAmt", map.get("PJT_AMT"));
                        map.put("tmpProfitAmt", 0);
                    }

                }
            }

            Map<String, Object> projectPaySetData = achieveService.getProjectPaySet(params);
            if(projectPaySetData != null) {
                map.put("befExpSaleAmt", projectPaySetData.get("BEF_EXP_SALE_AMT"));
                map.put("befExpProfitAmt", projectPaySetData.get("BEF_EXP_PROFIT_AMT"));

                map.put("aftSaleAmt", projectPaySetData.get("AFT_SALE_AMT"));
                map.put("aftProfitAmt", projectPaySetData.get("AFT_PROFIT_AMT"));
            } else {
                map.put("befExpSaleAmt", 0);
                map.put("befExpProfitAmt", 0);

                map.put("aftSaleAmt", 0);
                map.put("aftProfitAmt", 0);
            }
        }

        model.addAttribute("list", list);

        return "jsonView";
    }

    @RequestMapping("/cam_achieve/pop/paySetting.do")
    public String popPaySetting(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request) {

        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        model.addAttribute("data", achieveService.getProjectPaySet(params));

        return "popup/cam_achieve/popModPaySettings";
    }

    @RequestMapping("/cam_achieve/setProjectPaySet")
    public String setProjectPaySet(@RequestParam Map<String, Object> params, Model model) {
        achieveService.setProjectPaySet(params);
        model.addAttribute("code", 200);
        return "jsonView";
    }
}
