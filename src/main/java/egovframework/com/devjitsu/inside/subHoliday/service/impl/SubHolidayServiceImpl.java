package egovframework.com.devjitsu.inside.subHoliday.service.impl;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import egovframework.com.devjitsu.gw.login.dto.LoginVO;
import egovframework.com.devjitsu.inside.subHoliday.repository.SubHolidayRepository;
import egovframework.com.devjitsu.inside.subHoliday.service.SubHolidayService;
import egovframework.expend.common.helper.convert.CommonConvert;
import egovframework.expend.common.helper.exception.NotFoundLoginSessionException;
import egovframework.expend.common.vo.ConnectionVO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class SubHolidayServiceImpl implements SubHolidayService {

    private static final Logger logger = (Logger) LoggerFactory.getLogger(SubHolidayServiceImpl.class);

    @Override
    public List<Map<String, Object>> getVacCodeList(Map<String, Object> params) {
        return subHolidayRepository.getVacCodeList(params);
    }

    @Autowired
    private SubHolidayRepository subHolidayRepository;

    @Override
    @Transactional
    public int setVacUseHist(Map<String, Object> params) {
        int result = 0;
        if(params.containsKey("vacUseHistId")){
            /** 업데이트 전에 대체휴가 였다가 다른 휴가로 바뀌면 targetSn 초기화 */
            params.put("subholidayUseId", params.get("vacUseHistId"));
            Map<String, Object> map = subHolidayRepository.getVacUseHistoryOne(params);

            if(map.get("SUBHOLIDAY_CODE_ID").toString().equals("9") && !params.get("vacCodeId").toString().equals(map.get("SUBHOLIDAY_CODE_ID").toString())){

                if(!"".equals(map.get("TARGET_ID").toString()) && map.get("TARGET_ID") != null){
                    subHolidayRepository.setVacUseHistSubDel(map);
                }
                params.put("targetReset", "Y");
            }

            subHolidayRepository.updateVacUseHist(params);
        }else{
            if(params.containsKey("checkUseYn")){
                subHolidayRepository.setVacUseHist(params);
                subHolidayRepository.updateVacUseHistWork(params);
                result = Integer.parseInt(params.get("vacUseHistId").toString());
            }else {
                subHolidayRepository.setVacUseHist(params);
                result = Integer.parseInt(params.get("vacUseHistId").toString());
            }
        }
        return result;
    }

    @Override
    @Transactional
    public int setVacUseHist2(Map<String, Object> params) {
        int result = 0;


        Gson gson = new Gson();
        List<Map<String, Object>> workDateArr = gson.fromJson((String) params.get("workDateArr"), new TypeToken<List<Map<String, Object>>>() {}.getType());

        if(!params.containsKey("holidayWorkMasterSn")){
            subHolidayRepository.setHolidayWorkMasterIns(params);
            result = Integer.parseInt(params.get("holidayWorkMasterSn").toString());
        }else{
            subHolidayRepository.setVacUseHistDel2(params);
        }



        for(Map<String, Object> map : workDateArr){
            map.put("holidayWorkMasterSn", params.get("holidayWorkMasterSn"));

            map.put("vacCodeId", params.get("vacCodeId"));
            map.put("applySeq", params.get("applySeq"));
            map.put("applyDate", params.get("applyDate"));
            map.put("saveSeq", params.get("saveSeq"));
            map.put("saveDate", params.get("saveDate"));
            map.put("rmk", params.get("rmk"));
            map.put("rmkOther", params.get("rmkOther"));
            map.put("vacTargetSeq", params.get("vacTargetSeq"));
            subHolidayRepository.setVacUseHist(map);
        }

        return result;
    }

    @Override
    public void setVacUseHistDel(Map<String, Object> params) {
        params.put("subholidayUseId", params.get("subHolidayUseId"));
        Map<String, Object> map = subHolidayRepository.getVacUseHistoryOne(params);

        if(map.get("SUBHOLIDAY_CODE_ID").toString().equals("9")){

            if(!map.get("TARGET_ID").toString().equals("") && map.get("TARGET_ID") != null){
                subHolidayRepository.setVacUseHistSubDel(map);
            }
            subHolidayRepository.deleteSubHoliDay(params);

        } else {
            subHolidayRepository.setVacUseHistDel(params);
        }
    }

    @Override
    public List<Map<String, Object>> getVacUseHistoryList(Map<String, Object> params) {
        return subHolidayRepository.getVacUseHistoryList(params);
    }

    @Override
    public List<Map<String, Object>> getVacUseHistoryListAdmin(Map<String, Object> params) {
        return subHolidayRepository.getVacUseHistoryListAdmin(params);
    }

    @Override
    public List<Map<String, Object>> getVacUseStatDetailList(Map<String, Object> params) {
        return subHolidayRepository.getVacUseStatDetailList(params);
    }

    @Override
    public Map<String, Object> getVacUseHistoryOne(Map<String, Object> params) {
        return subHolidayRepository.getVacUseHistoryOne(params);
    }

    @Override
    public Map<String, Object> getHolidayWorkMasterOne(Map<String, Object> params) {
        return subHolidayRepository.getHolidayWorkMasterOne(params);
    }

    @Override
    public List<Map<String, Object>> getHolidayWorkHistOne(Map<String, Object> params) {
        return subHolidayRepository.getHolidayWorkHistOne(params);
    }

    @Override
    public List<Map<String, Object>> getHolidayWorkDuplList(Map<String, Object> params) {
        return subHolidayRepository.getHolidayWorkDuplList(params);
    }

    @Override
    public List<Map<String, Object>> getVacUseHistoryWorkList(Map<String, Object> params) {
        return subHolidayRepository.getVacUseHistoryWorkList(params);
    }

    @Override
    public int getVacUseHistoryListTotal(Map<String, Object> params) {
        return subHolidayRepository.getVacUseHistoryListTotal(params);
    }

    @Override
    public List<Map<String, Object>> getUserVacList(Map<String, Object> params) {
        return subHolidayRepository.getUserVacList(params);
    }

    @Override
    public List<Map<String, Object>> getUserVacListStat(Map<String, Object> map) {
        if(map.containsKey("arr") && !"".equals(map.get("arr").toString())){
            String arrText = map.get("arr").toString();

            String[] arr = arrText.split("[|]");
            for(int i = 0; i < arr.length; i++){
                String[] arrL = arr[i].split("&");

                String returnTxt = "(DIVISION IN(" + arrL[0] + ")";
                if(arrL.length > 1){
                    if(!arrL[1].equals("N")){
                        returnTxt += " AND DIVISION_SUB IN(" + arrL[1] + ")";
                    }
                }
                returnTxt += ")";

                arr[i] = returnTxt;
            }
            map.put("arr", arr);
        }
        return subHolidayRepository.getUserVacListStat(map);
    }

    @Override
    public void setUserVac(Map<String, Object> params) {
            subHolidayRepository.setUserVacUpdate(params);
    }

    @Override
    public void updateDocState(Map<String, Object> bodyMap) throws Exception {
        bodyMap.put("docSts", bodyMap.get("approveStatCode"));
        String docSts = String.valueOf(bodyMap.get("docSts"));
        String approKey = String.valueOf(bodyMap.get("approKey"));
        String docId = String.valueOf(bodyMap.get("docId"));
        String processId = String.valueOf(bodyMap.get("processId"));
        String empSeq = String.valueOf(bodyMap.get("empSeq"));
        approKey = approKey.split("_")[1];
        System.out.println(approKey);
        System.out.println(processId);
        bodyMap.put("approKey", approKey);

        Map<String, Object> params = new HashMap<String, Object>();
        params.put("subholidayUseId", approKey);
        params.put("docName", bodyMap.get("formName"));
        params.put("docId", docId);
        params.put("docTitle", bodyMap.get("docTitle"));
        params.put("approveStatCode", docSts);
        params.put("empSeq", empSeq);

        if("10".equals(docSts) || "50".equals(docSts)) { // 상신 - 재상신
            params.put("status", "C");
            subHolidayRepository.updateApprStat(params);
        }else if("30".equals(docSts) || "40".equals(docSts)) { // 반려 - 회수
            params.put("status", "E");
            subHolidayRepository.updateApprStat(params);
        }else if("100".equals(docSts) || "101".equals(docSts)) { // 종결
            params.put("status", "Y");
            subHolidayRepository.updateFinalApprStat(params);
        }
    }


    @Override
    public Map<String, Object> getuserHolyData(Map<String, Object> params) {
        Map<String, Object> data = new HashMap<>();
        Map<String, Object> nowYearData = subHolidayRepository.getUserHolyData(params);
        params.put("befYear", (Integer.parseInt(params.get("year").toString()) - 1));
        params.put("bef2Year", (Integer.parseInt(params.get("year").toString()) - 2));
        Map<String, Object> befYearData = subHolidayRepository.getUserBefHolyData(params);

        if(nowYearData == null){
            data.put("remainDay", 0);
            data.put("occDay", 0);
            data.put("useDay", 0);
        } else {
            data.put("remainDay", nowYearData.get("REMAIN_DAY"));
            data.put("occDay", nowYearData.get("GRANT_DAY"));
            data.put("useDay", nowYearData.get("USE_DAY"));
        }

        if(befYearData == null){
            data.put("befYear", 0);
            data.put("bef2Year", 0);
            data.put("ann", 0);
            data.put("halfAnn", 0);
            data.put("sickLv", 0);
            data.put("pubHoly", 0);
            data.put("congHoly", 0);
            data.put("matHoly", 0);
            data.put("altHoly", 0);
            data.put("compHoly", 0);
            data.put("workHoly", 0);
            data.put("remainWorkHoly", 0);
        }else{
            data.put("befYear", befYearData.get("befYear"));
            data.put("bef2Year", befYearData.get("bef2Year"));
            data.put("ann", befYearData.get("ann"));
            data.put("halfAnn", befYearData.get("halfAnn"));
            data.put("sickLv", befYearData.get("sickLv"));
            data.put("pubHoly", befYearData.get("pubHoly"));
            data.put("congHoly", befYearData.get("congHoly"));
            data.put("matHoly", befYearData.get("matHoly"));
            data.put("altHoly", befYearData.get("altHoly"));
            data.put("compHoly", befYearData.get("compHoly"));
            data.put("workHoly", befYearData.get("workHoly"));
            data.put("remainWorkHoly", befYearData.get("remainWorkHoly"));
        }

        return data;
    }

    @Override
    public void setUserVacList(List<Map<String, Object>> list) {
        for (int i = 0; i < list.size(); i++) {
            Map<String, Object> item = list.get(i);
            List<Map<String, Object>> previousGrantDayList = subHolidayRepository.getGrantDay(item);

            if (!previousGrantDayList.isEmpty()) {
                Map<String, Object> previousGrantDayMap = previousGrantDayList.get(i);
                Object grantDay = previousGrantDayMap.get("GRANT_DAY");
                item.put("PREVIOUS_GRANT_DAY", grantDay);
                System.out.println("grantDay[" + i + "]: " + grantDay);
                System.out.println("previousGrantDayList[" + i + "]: " + previousGrantDayList);
            }
        }
        subHolidayRepository.setUserVacList(list);
    }

    @Override
    public void setUserVacList2(List<Map<String, Object>> list, String uniqId, String reason) {
        for (int i = 0; i < list.size(); i++) {
            Map<String, Object> json = list.get(i);
            Map<String, Object> data = subHolidayRepository.getUserVacInfo(json);

            /** 기존발생연차나 보상발생연차가 수정이 되었을 경우 */
            if(!json.get("GRANT_DAY").toString().equals(data.get("GRANT_DAY").toString())
            || !json.get("COMP_VAC").toString().equals(data.get("COMP_VAC").toString())){
                json.put("emqSeq", uniqId);
                json.put("reason", reason);
                subHolidayRepository.insUserVacChangeHist(json);
                subHolidayRepository.updUserVacInfo(json);
            }
            System.out.println(data);
        }
    }

    //공휴일 데이터 조회
    @Override
    public List<Map<String, Object>> getHolidayList(Map<String, Object> params) {
        return subHolidayRepository.getHolidayList(params);
    }

    //공휴일 저장(삽입,수정)
    @Override
    public void setHoliday(Map<String, Object> params) {
        if(subHolidayRepository.getHoliday(params) == 0) {
            subHolidayRepository.insertHoliday(params);
        }else{
            subHolidayRepository.updateHoliday(params);
        }
    }

    //공휴일 삭제
    @Override
    public void deleteHoliday(Map<String, Object> params){
        subHolidayRepository.deleteHoliday(params);
    }

    //연가 일괄 등록
    @Override
    public List<Map<String, Object>> getUserInfoList(Map<String, Object> map) {

        if(map.containsKey("arr") && !"".equals(map.get("arr").toString())){
            String arrText = map.get("arr").toString();

            String[] arr = arrText.split("[|]");
            for(int i = 0; i < arr.length; i++){
                String[] arrL = arr[i].split("&");

                String returnTxt = "(DIVISION IN(" + arrL[0] + ")";
                if(arrL.length > 1){
                    if(!arrL[1].equals("N")){
                        returnTxt += " AND DIVISION_SUB IN(" + arrL[1] + ")";
                    }
                }
                returnTxt += ")";

                arr[i] = returnTxt;
            }
            map.put("arr", arr);
        }

        return subHolidayRepository.getUserInfoList(map);
    }

    // 직원 구분(수)
    public Map<String, Integer> getCountMap2() {
        Map<String, Integer> countMap = new HashMap<>();
        countMap.put("dsA", subHolidayRepository.getCountForDsA2());
        countMap.put("dsB", subHolidayRepository.getCountForDsB2());
        countMap.put("dsC", subHolidayRepository.getCountForDsC2());
        countMap.put("dsD", subHolidayRepository.getCountForDsD2());
        countMap.put("dsE", subHolidayRepository.getCountForDsE2());
        countMap.put("dsG", subHolidayRepository.getCountForDsG2());

        return countMap;
    }

    // 연가일괄등록 저장
    @Override
    public void setSubHolidayByEmpInfo2(Map<String, Object> params){
        Gson gson = new Gson();
        List<Map<String, Object>> empArr = gson.fromJson((String) params.get("empArr"), new TypeToken<List<Map<String, Object>>>() {}.getType());

        if (empArr == null) {
            throw new IllegalArgumentException("empArr must not be null");
        }
        if(empArr.size() > 0){
            for(Map<String, Object> map : empArr){
                subHolidayRepository.setSubHolidayByEmpInfo2(map);
            }
        }
    }


    //이력관리 조회

    @Override
    public List<Map<String, Object>> getModVacList(Map<String, Object> map) {
        return subHolidayRepository.getModVacList(map);
    }

//    private Object getPreviousGrantDays(Map<String, Object> vac) {
//        Object grantDaysObj = vac.get("GRANT_DAY");
//        if (grantDaysObj instanceof Integer || grantDaysObj instanceof String) {
//            return grantDaysObj;
//        }
//        return null; // 또는 다른 처리 방식 선택
//    }

    @Override
    public List<Map<String, Object>> getGrantDay(Map<String, Object> map){
       return subHolidayRepository.getGrantDay(map);
    }

    @Override
    public void workHolidayReqApp(Map<String, Object> bodyMap) throws Exception {
        bodyMap.put("docSts", bodyMap.get("approveStatCode"));
        String docSts = String.valueOf(bodyMap.get("docSts"));
        String approKey = String.valueOf(bodyMap.get("approKey"));
        String docId = String.valueOf(bodyMap.get("docId"));
        String processId = String.valueOf(bodyMap.get("processId"));
        String empSeq = String.valueOf(bodyMap.get("empSeq"));
        approKey = approKey.split("_")[1];
        System.out.println(approKey);
        System.out.println(processId);
        bodyMap.put("approKey", approKey);

        Map<String, Object> params = new HashMap<String, Object>();
        params.put("holidayWorkMasterSn", approKey);
        params.put("docName", bodyMap.get("formName"));
        params.put("docId", docId);
        params.put("docTitle", bodyMap.get("docTitle"));
        params.put("approveStatCode", docSts);
        params.put("empSeq", empSeq);

        if("10".equals(docSts) || "50".equals(docSts)) { // 상신 - 재상신
            params.put("status", "C");
            subHolidayRepository.workHolidayReqApp(params);
        }else if("30".equals(docSts) || "40".equals(docSts)) { // 반려 - 회수
            params.put("status", "E");
            subHolidayRepository.workHolidayReqApp(params);
        }else if("100".equals(docSts) || "101".equals(docSts)) { // 종결
            params.put("status", "Y");
            subHolidayRepository.workHolidayReqApp(params);
        }

    }


    @Override
    public void workHolidayReqAdminApp(Map<String, Object> bodyMap) throws Exception {
        bodyMap.put("docSts", bodyMap.get("approveStatCode"));
        String docSts = String.valueOf(bodyMap.get("docSts"));
        String approKey = String.valueOf(bodyMap.get("approKey"));
        String docId = String.valueOf(bodyMap.get("docId"));
        String processId = String.valueOf(bodyMap.get("processId"));
        String empSeq = String.valueOf(bodyMap.get("empSeq"));
        approKey = approKey.split("_")[1];
        System.out.println(approKey);
        System.out.println(processId);
        bodyMap.put("approKey", approKey);

        Map<String, Object> params = new HashMap<String, Object>();
        params.put("subholidayUseId", approKey);
        params.put("docName", bodyMap.get("formName"));
        params.put("docId", docId);
        params.put("docTitle", bodyMap.get("docTitle"));
        params.put("approveStatCode", docSts);
        params.put("empSeq", empSeq);

        if("10".equals(docSts) || "50".equals(docSts)) { // 상신 - 재상신
            params.put("adminStatus", "C");
            subHolidayRepository.workHolidayReqAdminApp(params);
        }else if("30".equals(docSts) || "40".equals(docSts)) { // 반려 - 회수
            params.put("adminStatus", "E");
            subHolidayRepository.workHolidayReqAdminApp(params);
        }else if("100".equals(docSts) || "101".equals(docSts)) { // 종결
            params.put("adminStatus", "Y");
            subHolidayRepository.workHolidayReqAdminApp(params);
        }

    }

    @Override
    public void setDocReaderReset(Map<String, Object> params) {

        Map<String, Object> map = new HashMap<>();
        map = subHolidayRepository.getDocInfo(params);
        if(map != null){
            params.put("docId", map.get("DOC_ID"));
        }

        subHolidayRepository.setDocReaderReset(params);
    }

    @Override
    public void delYn(Map<String, Object> params) {
        Gson gson = new Gson();
        List<String> subHolidayUseIdArr = gson.fromJson((String) params.get("keyArr"), new TypeToken<List<String>>() {}.getType());

        if(subHolidayUseIdArr.size() > 0){
            for(String subHolidayUseId : subHolidayUseIdArr){
                subHolidayRepository.delYn(subHolidayUseId);
            }
        }
    }
}
