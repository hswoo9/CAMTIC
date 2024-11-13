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
     * @returnz
     */
    @RequestMapping("/cam_achieve/finPerm.do")
    public String finPerm(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request) {
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        session.setAttribute("menuNm", request.getRequestURI());
        return "cam_achieve/finPerm";
    }

    /**
     * 캠어취브 > 주간회의 (부서)
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/cam_achieve/weekMeet.do")
    public String weekMeet(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request) {
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        session.setAttribute("menuNm", request.getRequestURI());

        params.put("deptLevel", "1");
        List<Map<String, Object>> list = deptService.getDeptAList(params);

        model.addAttribute("list", list);
        
        return "cam_achieve/weekMeet";
    }

    @RequestMapping("/cam_achieve/popObjSetting.do")
    public String popObjSetting(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        params.put("deptLevel", "2");
        List<Map<String, Object>> list = achieveService.getDeptObjList(params);
        if(list.size() > 0){
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
    public String monMeet(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request) {
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        return "cam_achieve/monMeet";
    }

    @RequestMapping("/cam_achieve/getAllPjtCalc")
    public String getAllPjtCalc(@RequestParam Map<String, Object> params, Model model) {

        Map<String, Object> map = new HashMap<>();

        map = achieveService.getAllPjtCalc(params);

        model.addAttribute("map", map);
        model.addAttribute("payrollMap", achieveService.getDeptPayrollData(params));
        return "jsonView";
    }

    @RequestMapping("/cam_achieve/getDeptPayrollData")
    public String getDeptPayrollData(@RequestParam Map<String, Object> params, Model model) {
        model.addAttribute("data", achieveService.getDeptPayrollData(params));
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
        model.addAttribute("incpLs", achieveService.getIncpByDeptData(params));
        model.addAttribute("objLs", achieveService.getObjByDeptList(params));
        return "jsonView";
    }

    @RequestMapping("/cam_achieve/getProjectList")
    public String getProjectList(@RequestParam Map<String, Object> params, Model model) {

        List<Map<String, Object>> list = new ArrayList<>();
        list = achieveService.getProjectListByAchieve(params);

        for(Map<String, Object> map: list){

            // 특정 금액을 조회하기 위해 파라미터 추가
            params.put("pjtCd", map.get("PJT_CD"));
            params.put("pjtSn", map.get("PJT_SN"));
            params.put("reqType", "achieve");
            params.put("reqYear", map.get("YEAR"));
            params.put("busnClass", map.get("BUSN_CLASS"));

            /** 공통 */
            // 수행계획 - 투자금액
            Map<String, Object> getPjtDevInfo = achieveService.getPjtDevSn(params);
            if(getPjtDevInfo != null) {
                map.put("DEV_INV_AMT", getPjtDevInfo.get("INV_TOT_SUM"));
            }

            // 비용 (순서대로 지출, 구매, 출장)
            if("Y".equals(map.get("COST_CLOSE_CK"))){
                if(map.get("COST_CLOSE_DT") != null){
                    params.put("costCloseDt", map.get("COST_CLOSE_DT"));
                }else{
                    params.put("costCloseDt", map.get("LIST_END_DE"));
                }
            }
            Map<String, Object> realUseMap2 = achieveService.getRealUseExnpAmt(params);
            Map<String, Object> realUseMap3 = achieveService.getRealUseExnpAmt2(params);
            Map<String, Object> realUseMap4 = achieveService.getRealUseExnpAmt3(params);
            map.put("realUseAmt", realUseMap2.get("COST_SUM"));
            map.put("realUseAmt2", realUseMap3.get("PURC_SUM"));
            map.put("realUseAmt3", realUseMap4.get("BUST_SUM"));

            // 매출수익설정
            Map<String, Object> getPjtAmtSetData = projectService.getPjtAmtSetData(params);
            map.put("pjtAmtSetData", getPjtAmtSetData);

            /** 알앤디/비알앤디 */
            if("R".equals(map.get("BUSN_CLASS")) || "S".equals(map.get("BUSN_CLASS"))){

                // 달성 매출액
                Map<String, Object> exnpMap = achieveService.getExnpCompAmt(params);
                map.put("exnpCompAmt", exnpMap.get("TOT_COST"));

                // 전체 매출액
                Map<String, Object> exnpAllMap = achieveService.getExnpCompAmtAll(params);
                map.put("exnpCompAmtAll", exnpAllMap.get("TOT_COST"));

                // 수익설정 지출합계
                Map<String, Object> incpMap = achieveService.getIncpCompAmt(params);
                map.put("incpCompAmt1", incpMap.get("TOT_COST"));

                // 지출설정 지출합계
                Map<String, Object> incpMap2 = achieveService.getIncpCompAmt2(params);
                map.put("incpCompAmt2", incpMap2.get("TOT_COST"));

                // 수익설정 예산
                Map<String, Object> planMap = achieveService.getPlanExnpAmt(params);
                map.put("planAmt", planMap.get("TOT_COST"));

                // 직접비 예산
                Map<String, Object> useMap = achieveService.getUseExnpAmt(params);
                map.put("useAmt", useMap.get("TOT_COST"));

                // 전/차년도 설정
                Map<String, Object> projectPaySetData1 = new HashMap<>();
                Map<String, Object> projectPaySetData2 = new HashMap<>();

                // 다년프로젝트 체크해서 쿼리 분기
                if("C".equals(map.get("TEXT")) && "M".equals(map.get("YEAR_CLASS"))){
                    projectPaySetData1 = achieveService.getProjectPayBefMul(params);
                    projectPaySetData2 = achieveService.getProjectPayNowMul(params);
                }else{
                    projectPaySetData1 = achieveService.getProjectPayBef(params);
                    projectPaySetData2 = achieveService.getProjectPayNow(params);
                }

                // 해당년도 전년도 설정액
                if(projectPaySetData1 != null){
                    map.put("befExpSaleAmt", projectPaySetData1.get("AFT_SALE_AMT"));
                    map.put("befExpProfitAmt", projectPaySetData1.get("AFT_PROFIT_AMT"));
                    map.put("BEF_DEADLINE_YN", projectPaySetData1.get("DEADLINE_YN"));
                }

                // 해당년도 당해년도 설정액
                if(projectPaySetData2 != null){
                    map.put("nowExpSaleAmt", projectPaySetData2.get("AFT_SALE_AMT"));
                    map.put("nowExpProfitAmt", projectPaySetData2.get("AFT_PROFIT_AMT"));
                    map.put("nowBefExpSaleAmt", projectPaySetData2.get("BEF_EXP_SALE_AMT"));
                    map.put("nowBefExpProfitAmt", projectPaySetData2.get("BEF_EXP_PROFIT_AMT"));
                }

                // 리스트용 전/차년도 설정액
                if(projectPaySetData2 != null){
                    map.put("listBefSale", projectPaySetData2.get("BEF_EXP_SALE_AMT"));
                    map.put("listBefProfit", projectPaySetData2.get("BEF_EXP_PROFIT_AMT"));
                    map.put("listAftSale", projectPaySetData2.get("AFT_SALE_AMT"));
                    map.put("listAftProfit", projectPaySetData2.get("AFT_PROFIT_AMT"));
                    map.put("DEADLINE_YN", projectPaySetData2.get("DEADLINE_YN"));
                }

                // 전체년도 비용 (순서대로 지출, 구매, 출장)
                if (map.get("YEAR") != null){
                    try {
                        String yearStr = map.get("YEAR").toString();
                        int year = Integer.parseInt(yearStr);
                        params.put("reqYear", year - 1);

                        Map<String, Object> allRealUseMap2 = achieveService.getRealUseExnpAmt(params);
                        Map<String, Object> allRealUseMap3 = achieveService.getRealUseExnpAmt2(params);
                        Map<String, Object> allRealUseMap4 = achieveService.getRealUseExnpAmt3(params);
                        map.put("allRealUseAmt", allRealUseMap2.get("COST_SUM"));
                        map.put("allRealUseAmt2", allRealUseMap3.get("PURC_SUM"));
                        map.put("allRealUseAmt3", allRealUseMap4.get("BUST_SUM"));
                    } catch (NumberFormatException e) {
                        System.err.println("error");
                    }
                }

            /** 엔지니어링/용역기타 */
            }else{

                // 납품액
                Map<String, Object> goodsMap = achieveService.getGoodsAmt(params);
                if(goodsMap != null){
                    Long goodsTotAmt = Long.parseLong(goodsMap.get("GOODS_TOT_SUM").toString());
                    if(goodsMap.get("GOODS_VAT").equals("Y")) {
                        map.put("goodsTotAmt", Math.floor(goodsTotAmt / 1.1));
                    } else {
                        map.put("goodsTotAmt", goodsTotAmt);
                    }
                }

                // 전/차년도 설정
                Map<String, Object> projectPaySetData1 = achieveService.getProjectPayBef(params);
                Map<String, Object> projectPaySetData2 = achieveService.getProjectPayNow(params);

                // 해당년도 전년도 설정액
                if(projectPaySetData1 != null){
                    map.put("befExpSaleAmt", projectPaySetData1.get("AFT_SALE_AMT"));
                    map.put("befExpProfitAmt", projectPaySetData1.get("AFT_PROFIT_AMT"));
                    map.put("BEF_DEADLINE_YN", projectPaySetData1.get("DEADLINE_YN"));
                }

                // 해당년도 당해년도 설정액
                if(projectPaySetData2 != null){
                    map.put("nowExpSaleAmt", projectPaySetData2.get("AFT_SALE_AMT"));
                    map.put("nowExpProfitAmt", projectPaySetData2.get("AFT_PROFIT_AMT"));
                    map.put("nowBefExpSaleAmt", projectPaySetData2.get("BEF_EXP_SALE_AMT"));
                    map.put("nowBefExpProfitAmt", projectPaySetData2.get("BEF_EXP_PROFIT_AMT"));
                }

                // 리스트용 전/차년도 설정액
                if(projectPaySetData2 != null){
                    map.put("listBefSale", projectPaySetData2.get("BEF_EXP_SALE_AMT"));
                    map.put("listBefProfit", projectPaySetData2.get("BEF_EXP_PROFIT_AMT"));
                    map.put("listAftSale", projectPaySetData2.get("AFT_SALE_AMT"));
                    map.put("listAftProfit", projectPaySetData2.get("AFT_PROFIT_AMT"));
                    map.put("DEADLINE_YN", projectPaySetData2.get("DEADLINE_YN"));
                }
            }

            // 전년도 비용 (순서대로 지출, 구매, 출장)
            if (map.get("YEAR") != null){
                try {
                    String yearStr = map.get("YEAR").toString();
                    int year = Integer.parseInt(yearStr);
                    params.put("reqYear", year - 1);

                    Map<String, Object> befRealUseMap2 = achieveService.getRealUseExnpAmt(params);
                    Map<String, Object> befRealUseMap3 = achieveService.getRealUseExnpAmt2(params);
                    Map<String, Object> befRealUseMap4 = achieveService.getRealUseExnpAmt3(params);
                    map.put("befRealUseAmt", befRealUseMap2.get("COST_SUM"));
                    map.put("befRealUseAmt2", befRealUseMap3.get("PURC_SUM"));
                    map.put("befRealUseAmt3", befRealUseMap4.get("BUST_SUM"));
                } catch (NumberFormatException e) {
                    System.err.println("error");
                }
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

    @RequestMapping("/cam_achieve/expenseDetail.do")
    public String expenseDetail(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request) {

        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        session.setAttribute("menuNm", request.getRequestURI());

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        params.put("deptLevel", "2");
        List<Map<String, Object>> list = deptService.getDeptCList(params);

        model.addAttribute("list", list);

        return "cam_achieve/expenseDetail";
    }

    @RequestMapping("/cam_achieve/personnelExpenseDetail.do")
    public String personnelExpenseDetail(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request) {

        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        session.setAttribute("menuNm", request.getRequestURI());

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        params.put("deptLevel", "2");
        List<Map<String, Object>> list = deptService.getDeptBList(params);

        model.addAttribute("list", list);

        return "cam_achieve/personnelExpenseDetail";
    }

    @RequestMapping("/cam_achieve/getDeptPayrollList")
    public String getDeptPayrollList(@RequestParam Map<String, Object> params, Model model) {

        List<Map<String, Object>> list = achieveService.getDeptPayrollList(params);
        List<Map<String, Object>> list2 = achieveService.getDeptPayrollDutyList(params);
        model.addAttribute("list", list);
        model.addAttribute("dutyList", list2);
        return "jsonView";
    }

    @RequestMapping("/cam_achieve/getExnpList")
    public String getExnpList(@RequestParam Map<String, Object> params, Model model) {

        List<Map<String, Object>> list = new ArrayList<>();

        list = achieveService.getExnpList(params);

        model.addAttribute("list", list);

        return "jsonView";
    }

    @RequestMapping("/cam_achieve/getExnpDetailList")
    public String getExnpDetailList(@RequestParam Map<String, Object> params, Model model) {

        List<Map<String, Object>> list = new ArrayList<>();

        list = achieveService.getExnpDetailList(params);

        model.addAttribute("list", list);

        return "jsonView";
    }

    @RequestMapping("/cam_achieve/getDeptExnpList")
    public String getDeptExnpList(@RequestParam Map<String, Object> params, Model model) {
        model.addAttribute("list", achieveService.getDeptExnpList(params));
        return "jsonView";
    }

    @RequestMapping("/cam_achieve/getDeptPayrollListForTotRate")
    public String getDeptPayrollListForTotRate(@RequestParam Map<String, Object> params, Model model) {
        List<Map<String, Object>> list = achieveService.getDeptPayrollListForTotRate(params);
        model.addAttribute("list", list);
        return "jsonView";
    }

    @RequestMapping("/cam_achieve/getExnpListForTotRate")
    public String getExnpListForTotRate(@RequestParam Map<String, Object> params, Model model) {
        List<Map<String, Object>> list = achieveService.getExnpListForTotRate(params);
        model.addAttribute("list", list);
        return "jsonView";
    }

    @RequestMapping("/cam_achieve/updateExnpStatus")
    public String updateExnpStatus(@RequestParam Map<String, Object> params, Model model) {
        try{
            achieveService.updateExnpStatus(params);
            model.addAttribute("code", 200);
        } catch(Exception e) {
            e.printStackTrace();
        }

        return "jsonView";

    }

    @RequestMapping("/cam_achieve/teamChangePop.do")
    public String teamChangePop(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request) {

        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        return "popup/cam_achieve/teamChangePop";
    }

    @RequestMapping("/cam_achieve/updChangeTeam")
    public String updChangeTeam(@RequestParam Map<String, Object> params, Model model) {
        try{
            achieveService.updChangeTeam(params);
            model.addAttribute("code", 200);
        } catch (Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    @RequestMapping("/cam_achieve/updateExnpExceptPay")
    public String updateExnpExceptPay(@RequestParam Map<String, Object> params, Model model) {
        try{
            achieveService.updateExnpExceptPay(params);
        } catch (Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    @RequestMapping("/cam_achieve/totRateValue.do")
    public String totRateValue(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request) {

        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        session.setAttribute("menuNm", request.getRequestURI());

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        return "cam_achieve/totRateValue";
    }

    @RequestMapping("/cam_achieve/getEmpRateValue")
    public String getEmpRateValue(@RequestParam Map<String, Object> params, Model model) {

        List<Map<String, Object>> list = achieveService.getEmpRateValue(params);
        model.addAttribute("list", list);
        return "jsonView";
    }

    @RequestMapping("/cam_achieve/insDeptExpenseRateValue")
    public String insDeptExpenseRateValue(@RequestParam Map<String, Object> params, Model model) {
        achieveService.insDeptExpenseRateValue(params);
        model.addAttribute("code", 200);
        return "jsonView";
    }

    @RequestMapping("/cam_achieve/updDeptExpenseRateStatus")
    public String updDeptExpenseRateStatus(@RequestParam Map<String, Object> params, Model model) {
        achieveService.updDeptExpenseRateStatus(params);
        model.addAttribute("code", 200);
        return "jsonView";
    }

    @RequestMapping("/cam_achieve/fourInsuranceDetail.do")
    public String fourInsuranceDetail(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request) {

        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        session.setAttribute("menuNm", request.getRequestURI());

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        params.put("deptLevel", "2");
        List<Map<String, Object>> list = deptService.getDeptBList(params);

        model.addAttribute("list", list);

        return "cam_achieve/fourInsuranceDetail";
    }

    @RequestMapping("/cam_achieve/getPayRollCompList.do")
    public String getPayRollCompList(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("list", achieveService.getPayRollCompList(params));
        return "jsonView";
    }

    @RequestMapping("/cam_achieve/getDeptPayrollCompDutyList")
    public String getDeptPayrollCompDutyList(@RequestParam Map<String, Object> params, Model model) {

        List<Map<String, Object>> list = achieveService.getDeptPayRollCompList(params);
        List<Map<String, Object>> list2 = achieveService.getDeptPayrollCompDutyList(params);
        model.addAttribute("list", list);
        model.addAttribute("dutyList", list2);
        return "jsonView";
    }

    @RequestMapping("/cam_achieve/retirementPension.do")
    public String retirementPension(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request) {

        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        session.setAttribute("menuNm", request.getRequestURI());

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        params.put("deptLevel", "2");
        List<Map<String, Object>> list = deptService.getDeptBList(params);

        model.addAttribute("list", list);

        return "cam_achieve/retirementPension";
    }

    @RequestMapping("/cam_achieve/popup/popObjHist.do")
    public String popObjHist(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request) {

        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        return "popup/cam_achieve/popObjHist";
    }

    @RequestMapping("/cam_achieve/getObjHistList")
    public String getObjHistList(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request) {

        model.addAttribute("list", achieveService.getObjHistList(params));

        return "jsonView";
    }

    @RequestMapping("/cam_achieve/fundsManagement.do")
    public String fundsManagement(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request) {

        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", loginVO);
        session.setAttribute("menuNm", request.getRequestURI());

        return "cam_achieve/fundsManagement";
    }

    @RequestMapping("/cam_achieve/getCorpProjectData")
    public String getCorpProjectData(@RequestParam Map<String, Object> params, Model model){

        Map<String, Object> map = achieveService.getCorpProjectData(params);

        model.addAttribute("data", map);
        return "jsonView";
    }

    @RequestMapping("/cam_achieve/getIncpPayData")
    public String getIncpPayData(@RequestParam Map<String, Object> params, Model model){

        model.addAttribute("data", achieveService.getIncpPayData(params));
        return "jsonView";
    }

    @RequestMapping("/cam_achieve/getExnpPayData")
    public String getExnpPayData(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("data", achieveService.getExnpPayData(params));
        return "jsonView";
    }

    @RequestMapping("/cam_achieve/expManagement.do")
    public String expManagement(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request) {

        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", loginVO);
        session.setAttribute("menuNm", request.getRequestURI());

        return "cam_achieve/expManagement";
    }

    @RequestMapping("/cam_achieve/getIncpExpList")
    public String getIncpExpList(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("list", achieveService.getIncpExpList(params));
        return "jsonView";
    }

    @RequestMapping("/cam_achieve/getExnpExpList")
    public String getExnpExpList(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("list", achieveService.getExnpExpList(params));
        return "jsonView";
    }

    @RequestMapping("/cam_achieve/insExpStatus")
    public String insExpStatus(@RequestParam Map<String, Object> params, Model model){
        achieveService.insExpStatus(params);
        return "jsonView";
    }

    @RequestMapping("/cam_achieve/regExpData.do")
    public String regExpData(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);
        return "/popup/cam_achieve/popRegExpData";
    }

    @RequestMapping("/cam_achieve/insExpectPayData")
    public String insExpectPayData(@RequestParam Map<String, Object> params, Model model){
        achieveService.insExpectPayData(params);
        model.addAttribute("code", 200);
        return "jsonView";
    }

    @RequestMapping("/cam_achieve/updExpectPayStatus")
    public String updExpectPayStatus(@RequestParam Map<String, Object> params, Model model){
        achieveService.updExpectPayStatus(params);
        return "jsonView";
    }

    @RequestMapping("/cam_achieve/getExpertPayData")
    public String getExpertPayData(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("data", achieveService.getExpertPayData(params));
        return "jsonView";
    }

    /** 구매현황 */
    @RequestMapping("/cam_achieve/purcManagement.do")
    public String purcManagement(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request) {
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", loginVO);
        session.setAttribute("menuNm", request.getRequestURI());
        return "cam_achieve/purcManagement";
    }

    /** 구매거래협력업체 */
    @RequestMapping("/cam_achieve/purcCrmManagement.do")
    public String purcCrmManagement(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request) {
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", loginVO);
        session.setAttribute("menuNm", request.getRequestURI());
        return "cam_achieve/purcCrmManagement";
    }

    /** 구매자금관리 */
    @RequestMapping("/cam_achieve/purcFundManagement.do")
    public String purcFundManagement(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request) {
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", loginVO);
        session.setAttribute("menuNm", request.getRequestURI());
        return "cam_achieve/purcFundManagement";
    }

    @RequestMapping("/cam_achieve/getPurcClaimList")
    public String getPurcClaimList(@RequestParam Map<String, Object> params, Model model){
        List<Map<String, Object>> list = achieveService.getPurcClaimList(params);
        model.addAttribute("list", list);
        return "jsonView";
    }

    @RequestMapping("/cam_achieve/getPurcClaimDetList")
    public String getPurcClaimDetList(@RequestParam Map<String, Object> params, Model model){
        List<Map<String, Object>> list = achieveService.getPurcClaimDetList(params);
        model.addAttribute("list", list);
        return "jsonView";
    }

    @RequestMapping("/cam_achieve/getPurcCrmAchieveData")
    public String getPurcCrmAchieveData(@RequestParam Map<String, Object> params, Model model){
        Map<String, Object> data = achieveService.getPurcCrmAchieveData(params);
        model.addAttribute("data", data);
        return "jsonView";
    }

    @RequestMapping("/cam_achieve/getPurcCrmLocAchieveData")
    public String getPurcCrmLocAchieveData(@RequestParam Map<String, Object> params, Model model){
        Map<String, Object> data = achieveService.getPurcCrmLocAchieveData(params);
        model.addAttribute("data", data);
        return "jsonView";
    }

    @RequestMapping("/cam_achieve/getPurcCrmCKAchieveData")
    public String getPurcCrmCKAchieveData(@RequestParam Map<String, Object> params, Model model){
        List<Map<String, Object>> list = achieveService.getPurcCrmCKAchieveData(params);
        model.addAttribute("list", list);
        return "jsonView";
    }

    @RequestMapping("/cam_achieve/getPurcCrmCKAchieveDataDet")
    public String getPurcCrmCKAchieveDataDet(@RequestParam Map<String, Object> params, Model model){
        List<Map<String, Object>> list = achieveService.getPurcCrmCKAchieveDataDet(params);
        model.addAttribute("list", list);
        return "jsonView";
    }

    @RequestMapping("/cam_achieve/getPurcFundAchieveData")
    public String getPurcFundAchieveData(@RequestParam Map<String, Object> params, Model model){
        List<Map<String, Object>> list = achieveService.getPurcFundAchieveData(params);
        model.addAttribute("list", list);
        return "jsonView";
    }

    @RequestMapping("/cam_achieve/getPurcFund2AchieveData")
    public String getPurcFund2AchieveData(@RequestParam Map<String, Object> params, Model model){
        List<Map<String, Object>> list = achieveService.getPurcFund2AchieveData(params);
        model.addAttribute("list", list);
        return "jsonView";
    }

    @RequestMapping("/cam_achieve/getPurcAchieveMngList")
    public String getPurcAchieveMngList(@RequestParam Map<String, Object> params, Model model){
        List<Map<String, Object>> list = achieveService.getPurcAchieveMngList(params);
        model.addAttribute("list", list);
        return "jsonView";
    }

    @RequestMapping("/cam_achieve/getGoodsLastInfo")
    public String getGoodsLastInfo(@RequestParam Map<String, Object> params, Model model){

        Map<String, Object> goodsMap = achieveService.getGoodsAmt(params);
        Map<String, Object> goodsTempMap = achieveService.getGoodsLastInfo(params);
        Map<String, Object> resultMap = new HashMap<>();

        if(goodsMap != null){
            if(Integer.parseInt(String.valueOf(goodsMap.get("GOODS_TOT_SUM"))) == Integer.parseInt(String.valueOf(goodsMap.get("EST_AMT_SUM")))) {
                resultMap.put("GOODS_STAT", goodsTempMap.get("GOODS_STAT"));
            } else {
                resultMap.put("GOODS_STAT", "N");
            }
        }

        model.addAttribute("data", resultMap);

        return "jsonView";
    }
}
